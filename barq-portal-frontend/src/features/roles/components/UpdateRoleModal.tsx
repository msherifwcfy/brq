import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/shared/components/ui/dialog";
import { useRolesControllerUpdate } from "@/sdk/modules/role.gen";
import { useModal } from "@/shared/store/modal-store";
import { RoleForm } from "./RoleForm";
import type { UpdateRoleFormData } from "../schemas/roles.schema";
import { useLang } from "@/shared/hooks/use-lang";
import { toast } from "sonner";

export const UpdateRoleModal = () => {
  const { t } = useLang();
  const { onClose, refetch, isOpen, type, data } = useModal();
  const open = isOpen && type === "updateRole";
  const role = data?.role;

  const updateRoleMutation = useRolesControllerUpdate();

  const handleSubmit = async (formData: UpdateRoleFormData) => {
    if (!role) return;

    try {
      await updateRoleMutation.mutateAsync({
        body: {
          name: formData.name,
          role_role_permissions: formData.role_role_permissions || [],
        },
        path: {
          id: role.id.toString(),
        },
      });
      toast.success(t("roles.messages.roleUpdated"));
      onClose();
      if (refetch) refetch();
    } catch (error: any) {
      toast.error(error?.message || t("roles.messages.errorUpdatingRole"));
      console.error("Error updating role:", error);
    }
  };

  if (!role) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-hidden">
        <DialogHeader>
          <DialogTitle>
            {t("roles.updateRoleTitle", { name: role.name })}
          </DialogTitle>
        </DialogHeader>

        <RoleForm
          defaultValues={{
            name: role.name,
            role_role_permissions:
              role.role_role_permissions?.map((rp) => ({
                permission_id: rp.permission_id,
              })) || [],
          }}
          onSubmit={handleSubmit as any}
          isLoading={updateRoleMutation.isPending}
          submitLabel={t("roles.updateRole")}
          isUpdate={true}
        />
      </DialogContent>
    </Dialog>
  );
};
