import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/shared/components/ui/dialog";
import { Button } from "@/shared/components/ui/button";
import { useAlliancesVendorsControllerDelete } from "@/sdk/modules/alliancesvendor.gen";
import type { AlliancesVendorsEntity } from "@/sdk/types.gen";
import { useModal } from "@/shared/store/modal-store";
import { useLang } from "@/shared/hooks/use-lang";
import { toast } from "sonner";

export const DeleteAlliancesVendorModal = () => {
  const { t } = useLang();
  const { onClose, refetch, isOpen, type, data } = useModal();
  const open = isOpen && type === "deleteAlliancesVendor";
  const alliancesVendor = data?.alliancesVendor;
  const deleteAlliancesVendorMutation = useAlliancesVendorsControllerDelete();

  const handleDelete = async () => {
    if (!alliancesVendor) return;

    try {
      await deleteAlliancesVendorMutation.mutateAsync({
        path: {
          id: alliancesVendor.id.toString(),
        },
      });
      toast.success(t("alliancesVendors.messages.alliancesVendorDeleted"));
      onClose();
      if (refetch) refetch();
    } catch (error: any) {
      toast.error(
        error?.message ||
          t("alliancesVendors.messages.errorDeletingAlliancesVendor")
      );
      console.error("Error deleting alliances vendor:", error);
    }
  };

  if (!alliancesVendor) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>
            {t("alliancesVendors.deleteAlliancesVendorTitle")}
          </DialogTitle>
          <DialogDescription>
            {t("alliancesVendors.deleteAlliancesVendorDescription", {
              id: alliancesVendor.id,
            })}
          </DialogDescription>
        </DialogHeader>

        <div className="flex justify-end space-x-2">
          <Button type="button" variant="outline" onClick={onClose}>
            {t("common.cancel")}
          </Button>
          <Button
            type="button"
            variant="destructive"
            disabled={deleteAlliancesVendorMutation.isPending}
            onClick={handleDelete}
          >
            {deleteAlliancesVendorMutation.isPending
              ? t("alliancesVendors.form.loading")
              : t("alliancesVendors.deleteAlliancesVendor")}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
