import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/shared/components/ui/dialog";
import { useIndustriesControllerCreate } from "@/sdk/modules/industry.gen";
import { useModal } from "@/shared/store/modal-store";
import { IndustryForm } from "./IndustryForm";
import type { CreateIndustryFormData } from "../schemas/industries.schema";
import { toast } from "sonner";
import { useLang } from "@/shared/hooks/use-lang";

export const CreateIndustryModal = () => {
  const { t } = useLang();
  const createIndustryMutation = useIndustriesControllerCreate();
  const { onClose, refetch, isOpen, type } = useModal();
  const open = isOpen && type === "createIndustry";

  const handleSubmit = async (data: CreateIndustryFormData) => {
    try {
      await createIndustryMutation.mutateAsync({
        body: {
          name: data.name,
          industries_id_industries_translations:
            data.industry_id_industry_translations || [],
        },
      });
      toast.success(t("industries.messages.industryCreated"));
      onClose();
      if (refetch) refetch();
    } catch (error: any) {
      toast.error(
        error?.message || t("industries.messages.errorCreatingIndustry")
      );
      console.error("Error creating industry:", error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{t("industries.createNewIndustry")}</DialogTitle>
        </DialogHeader>

        <IndustryForm
          onSubmit={handleSubmit as any}
          isLoading={createIndustryMutation.isPending}
          submitLabel={t("industries.createIndustry")}
          isUpdate={false}
        />
      </DialogContent>
    </Dialog>
  );
};
