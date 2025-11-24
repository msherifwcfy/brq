import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/shared/components/ui/dialog";
import { Button } from "@/shared/components/ui/button";
import { useIndustriesControllerDelete } from "@/sdk/modules/industry.gen";
import type { IndustriesEntity } from "@/sdk/types.gen";
import { useModal } from "@/shared/store/modal-store";
import { useLang } from "@/shared/hooks/use-lang";
import { toast } from "sonner";

export const DeleteIndustryModal = () => {
  const { t } = useLang();
  const { onClose, refetch, isOpen, type, data } = useModal();
  const open = isOpen && type === "deleteIndustry";
  const industry = data?.industry;
  const deleteIndustryMutation = useIndustriesControllerDelete();

  const handleDelete = async () => {
    if (!industry) return;

    try {
      await deleteIndustryMutation.mutateAsync({
        path: {
          id: industry.id.toString(),
        },
      });
      toast.success(t("industries.messages.industryDeleted"));
      onClose();
      if (refetch) refetch();
    } catch (error: any) {
      toast.error(
        error?.message || t("industries.messages.errorDeletingIndustry")
      );
      console.error("Error deleting industry:", error);
    }
  };

  if (!industry) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>{t("industries.deleteIndustryTitle")}</DialogTitle>
          <DialogDescription>
            {t("industries.deleteIndustryDescription", { name: industry.name })}
          </DialogDescription>
        </DialogHeader>

        <div className="flex justify-end space-x-2">
          <Button type="button" variant="outline" onClick={onClose}>
            {t("common.cancel")}
          </Button>
          <Button
            type="button"
            variant="destructive"
            disabled={deleteIndustryMutation.isPending}
            onClick={handleDelete}
          >
            {deleteIndustryMutation.isPending
              ? t("industries.form.loading")
              : t("industries.deleteIndustry")}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
