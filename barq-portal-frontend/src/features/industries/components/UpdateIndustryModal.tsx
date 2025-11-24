import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/shared/components/ui/dialog";
import {
  useIndustriesControllerReadOneQuery,
  useIndustriesControllerUpdate,
} from "@/sdk/modules/industry.gen";
import { useModal } from "@/shared/store/modal-store";
import { IndustryForm } from "./IndustryForm";
import type { UpdateIndustryFormData } from "../schemas/industries.schema";
import { useLang } from "@/shared/hooks/use-lang";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

export const UpdateIndustryModal = () => {
  const { t } = useLang();
  const { onClose, refetch, isOpen, type, data } = useModal();
  const open = isOpen && type === "updateIndustry";

  const { data: industryData, isLoading } = useIndustriesControllerReadOneQuery(
    {
      path: {
        id: data?.industry?.id.toString(),
      },

      query: {
        query: {
          relations: {
            industries_id_industries_translations: true,
          },
        },
      },
      headers: {
        "x-skip-translations": "true",
      },
    },
    {}
  );
  const industry = industryData?.data;

  const updateIndustryMutation = useIndustriesControllerUpdate();

  const handleSubmit = async (formData: UpdateIndustryFormData) => {
    if (!industry) return;

    try {
      await updateIndustryMutation.mutateAsync({
        body: {
          name: formData.name,
          industries_id_industries_translations:
            formData.industry_id_industry_translations || [],
        },
        path: {
          id: industry.id.toString(),
        },
      });
      toast.success(t("industries.messages.industryUpdated"));
      onClose();
      if (refetch) refetch();
    } catch (error: any) {
      toast.error(
        error?.message || t("industries.messages.errorUpdatingIndustry")
      );
      console.error("Error updating industry:", error);
    }
  };

  if (!industry) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {t("industries.updateIndustryTitle", { name: industry.name })}
          </DialogTitle>
        </DialogHeader>

        {isLoading ? (
          <div className="flex justify-center items-center h-full">
            <Loader2 className="w-4 h-4 animate-spin" />
          </div>
        ) : (
          <IndustryForm
            defaultValues={{
              name: industry.name,
              industry_id_industry_translations:
                industry.industries_id_industries_translations?.map(
                  (trans) => ({
                    id: trans.id,
                    industry_id: trans.industries_id,
                    name: trans.name,
                    language: trans.language,
                  })
                ) || [],
            }}
            onSubmit={handleSubmit as any}
            isLoading={updateIndustryMutation.isPending}
            submitLabel={t("industries.updateIndustry")}
            isUpdate={true}
          />
        )}
      </DialogContent>
    </Dialog>
  );
};
