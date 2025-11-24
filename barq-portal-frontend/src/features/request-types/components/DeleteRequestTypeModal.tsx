import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/shared/components/ui/dialog";
import { Button } from "@/shared/components/ui/button";
import { useContactUsRequestTypeControllerSoftDelete } from "@/sdk/modules/contactusrequesttype.gen";
import type { ContactUsRequestTypeEntity } from "@/sdk/types.gen";
import { useModal } from "@/shared/store/modal-store";
import { useLang } from "@/shared/hooks/use-lang";
import { toast } from "sonner";

export const DeleteRequestTypeModal = () => {
  const { t } = useLang();
  const { onClose, refetch, isOpen, type, data } = useModal();
  const open = isOpen && type === "deleteRequestType";
  const requestType = data?.requestType;
  const deleteRequestTypeMutation = useContactUsRequestTypeControllerSoftDelete();

  const handleDelete = async () => {
    if (!requestType) return;

    try {
      await deleteRequestTypeMutation.mutateAsync({
        path: {
          id: requestType.id.toString(),
        },
      });
      toast.success(t("requestTypes.messages.requestTypeDeleted"));
      onClose();
      if (refetch) refetch();
    } catch (error: any) {
      toast.error(
        error?.message || t("requestTypes.messages.errorDeletingRequestType")
      );
      console.error("Error deleting request type:", error);
    }
  };

  if (!requestType) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>{t("requestTypes.deleteRequestTypeTitle")}</DialogTitle>
          <DialogDescription>
            {t("requestTypes.deleteRequestTypeDescription", { title: requestType.title })}
          </DialogDescription>
        </DialogHeader>

        <div className="flex justify-end space-x-2">
          <Button type="button" variant="outline" onClick={onClose}>
            {t("common.cancel")}
          </Button>
          <Button
            type="button"
            variant="destructive"
            disabled={deleteRequestTypeMutation.isPending}
            onClick={handleDelete}
          >
            {deleteRequestTypeMutation.isPending
              ? t("requestTypes.form.loading")
              : t("requestTypes.deleteRequestType")}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
