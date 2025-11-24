import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/shared/components/ui/dialog";
import { useUsersControllerCreate } from "@/sdk/modules/user.gen";
import { useModal } from "@/shared/store/modal-store";
import { EmployeeForm } from "./EmployeeForm";
import { useLang } from "@/shared/hooks/use-lang";

export const CreateEmployeeModal = () => {
  const { t } = useLang();
  const createMutation = useUsersControllerCreate();
  const { onClose, refetch, isOpen, type } = useModal();
  const open = isOpen && type === "createEmployee";

  const handleSubmit = async (data: any) => {
    try {
      await createMutation.mutateAsync({
        body: {
          email: data.email,
          name: data.name,
          role_id: Number(data.role_id),
        },
      } as any);
      onClose();
      if (refetch) refetch();
    } catch (error) {
      console.error("Error creating employee:", error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>{t("employees.createEmployee")}</DialogTitle>
        </DialogHeader>
        <EmployeeForm
          onSubmit={handleSubmit}
          isLoading={createMutation.isPending}
          submitLabel={t("employees.createEmployee")}
          isUpdate={false}
        />
      </DialogContent>
    </Dialog>
  );
};
