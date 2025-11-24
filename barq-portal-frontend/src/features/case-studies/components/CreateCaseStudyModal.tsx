import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/shared/components/ui/dialog";
import { useSuccessStoryCaseStudiesControllerCreate } from "@/sdk/modules/successstorycasestudy.gen";
import { useModal } from "@/shared/store/modal-store";
import { CaseStudyForm } from "./CaseStudyForm";
import type { CreateCaseStudyFormData } from "../schemas/case-studies.schema";
import { toast } from "sonner";
import { useLang } from "@/shared/hooks/use-lang";
import type { SuccessStoryCaseStudiesControllerCreateData } from "@/sdk";

export const CreateCaseStudyModal = () => {
  const { t, lang } = useLang();
  const createCaseStudyMutation = useSuccessStoryCaseStudiesControllerCreate();
  const { onClose, refetch, isOpen, type } = useModal();
  const open = isOpen && type === "createCaseStudy";

  const handleSubmit = async (data: CreateCaseStudyFormData) => {
    const translations: SuccessStoryCaseStudiesControllerCreateData["body"]["success_story_case_studies_id_success_story_case_studies_translations"] =
      [
        {
          language: "en",
          title: data.title.en,
          description: data.description.en,
          long_description: data.long_description.en,
        }
      ];

    try {
      await createCaseStudyMutation.mutateAsync({
        body: {
          title: data.title.ar,
          description: data.description.ar,
          featured: data.featured,
          date: data.date,
          long_description: data.long_description.ar,
          is_featured: data.is_featured,
          home_image_id: data.home_image[0]?.id,
          image_id: data.image[0]?.id,
          read_time: data.read_time,
          industries_id: data.industries_id,
          country_id: data.country_id,
          success_story_case_studies_id_success_story_case_studies_translations:
            translations,
        },
      });
      toast.success(t("caseStudies.messages.caseStudyCreated"));
      onClose();
      if (refetch) refetch();
    } catch (error: any) {
      toast.error(
        error?.message || t("caseStudies.messages.errorCreatingCaseStudy")
      );
      console.error("Error creating case study:", error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{t("caseStudies.createNewCaseStudy")}</DialogTitle>
        </DialogHeader>

        <CaseStudyForm
          onSubmit={handleSubmit}
          isLoading={createCaseStudyMutation.isPending}
          submitLabel={t("caseStudies.createCaseStudy")}
          isUpdate={false}
        />
      </DialogContent>
    </Dialog>
  );
};
