import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/shared/components/ui/dialog";
import { Button } from "@/shared/components/ui/button";
import { useUsersControllerSoftDelete } from "@/sdk/modules/user.gen";
import { useModal } from "@/shared/store/modal-store";
import { useLang } from "@/shared/hooks/use-lang";

export const DeleteEmployeeModal = () => {
  const { t } = useLang();
  const { onClose, refetch, isOpen, type, data } = useModal();
  const open = isOpen && type === "deleteEmployee";
  const user = data?.user;
  const deleteMutation = useUsersControllerSoftDelete();

  const handleDelete = async () => {
    if (!user) return;
    try {
      await deleteMutation.mutateAsync({
        path: { id: String(user.id) },
      });
      onClose();
      if (refetch) refetch();
    } catch (error) {
      console.error("Error deleting employee:", error);
    }
  };

  if (!user) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>{t("employees.deleteEmployeeTitle")}</DialogTitle>
          <DialogDescription>
            {t("employees.deleteEmployeeDescription", { name: user.name })}
          </DialogDescription>
        </DialogHeader>
        <div className="flex justify-end space-x-2">
          <Button type="button" variant="outline" onClick={onClose}>
            {t("common.cancel")}
          </Button>
          <Button
            type="button"
            variant="destructive"
            disabled={deleteMutation.isPending}
            onClick={handleDelete}
          >
            {deleteMutation.isPending
              ? t("employees.form.deleting")
              : t("employees.columns.delete")}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
