import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/shared/components/ui/dialog";
import { Button } from "@/shared/components/ui/button";
import { useRolesControllerSoftDelete } from "@/sdk/modules/role.gen";
import type { RolesEntity } from "@/sdk/types.gen";
import { useModal } from "@/shared/store/modal-store";
import { useLang } from "@/shared/hooks/use-lang";
import { toast } from "sonner";

interface DeleteRoleModalProps {
  open: boolean;
  onClose: () => void;
  role: RolesEntity | null;
  refetch?: () => void;
}

export const DeleteRoleModal = () => {
  const { t } = useLang();
  const { onClose, refetch, isOpen, type, data } = useModal();
  const open = isOpen && type === "deleteRole";
  const role = data?.role;
  const deleteRoleMutation = useRolesControllerSoftDelete();

  const handleDelete = async () => {
    if (!role) return;

    try {
      await deleteRoleMutation.mutateAsync({
        path: {
          id: role.id.toString(),
        },
      });
      toast.success(t("roles.messages.roleDeleted"));
      onClose();
      if (refetch) refetch();
    } catch (error: any) {
      toast.error(error?.message || t("roles.messages.errorDeletingRole"));
      console.error("Error deleting role:", error);
    }
  };

  if (!role) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>{t("roles.deleteRoleTitle")}</DialogTitle>
          <DialogDescription>
            {t("roles.deleteRoleDescription", { name: role.name })}
          </DialogDescription>
        </DialogHeader>

        <div className="flex justify-end space-x-2">
          <Button type="button" variant="outline" onClick={onClose}>
            {t("common.cancel")}
          </Button>
          <Button
            type="button"
            variant="destructive"
            disabled={deleteRoleMutation.isPending}
            onClick={handleDelete}
          >
            {deleteRoleMutation.isPending
              ? t("roles.form.loading")
              : t("roles.deleteRole")}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
