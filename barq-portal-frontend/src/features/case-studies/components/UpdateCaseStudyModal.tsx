import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/shared/components/ui/dialog";
import { useSuccessStoryCaseStudiesControllerMarkAsFeatured, useSuccessStoryCaseStudiesControllerUpdate } from "@/sdk/modules/successstorycasestudy.gen";
import { useModal } from "@/shared/store/modal-store";
import { CaseStudyForm } from "./CaseStudyForm";
import type { UpdateCaseStudyFormData } from "../schemas/case-studies.schema";
import { useLang } from "@/shared/hooks/use-lang";
import { toast } from "sonner";
import type { UpdateSuccessStoryCaseStudies } from "@/sdk/types.gen";

export const UpdateCaseStudyModal = () => {
  const { t } = useLang();
  const { onClose, refetch, isOpen, type, data } = useModal();
  const open = isOpen && type === "updateCaseStudy";
  const caseStudy = data?.caseStudy;

  const updateCaseStudyMutation = useSuccessStoryCaseStudiesControllerUpdate();
  const markAsFeaturedMutation = useSuccessStoryCaseStudiesControllerMarkAsFeatured({
    body: {
      featured: true,
    },
    path: {
      id: caseStudy?.id.toString() ?? "",
    },
  });

  const handleSubmit = async (formData: UpdateCaseStudyFormData) => {
    if (!caseStudy) return;

    const translations: UpdateSuccessStoryCaseStudies["success_story_case_studies_id_success_story_case_studies_translations"] =
      [
        {
          language: "en",
          title: formData.title.en,
          description: formData.description.en,
          long_description: formData.long_description.en,
        },
      ];

    try {
      await updateCaseStudyMutation.mutateAsync({
        body: {
          date: formData.date,
          image_id: formData.image[0]?.id,
          read_time: formData.read_time,
          is_featured: formData.is_featured,
          industries_id: formData.industries_id,
          home_image_id: formData.home_image[0]?.id,
          country_id: formData.country_id,
          description: formData.description.ar,
          long_description: formData.long_description.ar,
          title: formData.title.ar,
          success_story_case_studies_id_success_story_case_studies_translations:
            translations,
        },
        path: {
          id: caseStudy.id.toString(),
        },
      });

      if (formData.featured !== caseStudy.featured) {
        await markAsFeaturedMutation.mutateAsync({
          body: {
            featured: formData.featured,
          },
          path: {
            id: caseStudy.id.toString(),
          },
        });
      }
      toast.success(t("caseStudies.messages.caseStudyUpdated"));
      onClose();
      if (refetch) refetch();
    } catch (error: any) {
      toast.error(
        error?.message || t("caseStudies.messages.errorUpdatingCaseStudy")
      );
      console.error("Error updating case study:", error);
    }
  };

  if (!caseStudy) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {t("caseStudies.updateCaseStudyTitle", {
              id: caseStudy.id,
            })}
          </DialogTitle>
        </DialogHeader>

        <CaseStudyForm
          defaultValues={caseStudy}
          onSubmit={handleSubmit}
          isLoading={updateCaseStudyMutation.isPending}
          submitLabel={t("caseStudies.updateCaseStudy")}
          isUpdate={true}
        />
      </DialogContent>
    </Dialog>
  );
};
