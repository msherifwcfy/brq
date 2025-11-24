import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/shared/components/ui/dialog";
import { useUsersControllerUpdate } from "@/sdk/modules/user.gen";
import { useModal } from "@/shared/store/modal-store";
import { EmployeeForm } from "./EmployeeForm";
import { useLang } from "@/shared/hooks/use-lang";

export const UpdateEmployeeModal = () => {
  const { t } = useLang();
  const { onClose, refetch, isOpen, type, data } = useModal();
  const open = isOpen && type === "updateEmployee";
  const user = data?.user;

  const updateMutation = useUsersControllerUpdate();

  const handleSubmit = async (formData: any) => {
    if (!user) return;
    try {
      await updateMutation.mutateAsync({
        body: {
          name: formData.name,
          role_id: Number(formData.role_id),
        },
        path: {
          id: String(user.id),
        },
      });
      onClose();
      if (refetch) refetch();
    } catch (error) {
      console.error("Error updating employee:", error);
    }
  };

  if (!user) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>
            {t("employees.updateEmployeeTitle", { name: user.name })}
          </DialogTitle>
        </DialogHeader>
        <EmployeeForm
          defaultValues={{
            name: user.name,
            role_id: String(user.role_id),
          }}
          onSubmit={handleSubmit}
          isLoading={updateMutation.isPending}
          submitLabel={t("employees.updateEmployee")}
          isUpdate={true}
        />
      </DialogContent>
    </Dialog>
  );
};
