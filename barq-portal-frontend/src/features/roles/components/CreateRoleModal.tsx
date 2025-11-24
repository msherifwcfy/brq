import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/shared/components/ui/dialog";
import { useRolesControllerCreate } from "@/sdk/modules/role.gen";
import { useModal } from "@/shared/store/modal-store";
import { RoleForm } from "./RoleForm";
import type { CreateRoleFormData } from "../schemas/roles.schema";
import { toast } from "sonner";
import { useLang } from "@/shared/hooks/use-lang";

export const CreateRoleModal = () => {
  const { t } = useLang();
  const createRoleMutation = useRolesControllerCreate();
  const { onClose, refetch, isOpen, type } = useModal();
  const open = isOpen && type === "createRole";

  const handleSubmit = async (data: CreateRoleFormData) => {
    try {
      await createRoleMutation.mutateAsync({
        body: {
          name: data.name,
          role_role_permissions: data.role_role_permissions || [],
        },
      });
      toast.success(t("roles.messages.roleCreated"));
      onClose();
      if (refetch) refetch();
    } catch (error: any) {
      toast.error(error?.message || t("roles.messages.errorCreatingRole"));
      console.error("Error creating role:", error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-hidden">
        <DialogHeader>
          <DialogTitle>{t("roles.createNewRole")}</DialogTitle>
        </DialogHeader>

        <RoleForm
          onSubmit={handleSubmit as any}
          isLoading={createRoleMutation.isPending}
          submitLabel={t("roles.createRole")}
          isUpdate={false}
        />
      </DialogContent>
    </Dialog>
  );
};
