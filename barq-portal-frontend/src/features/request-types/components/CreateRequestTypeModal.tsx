import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/shared/components/ui/dialog";
import { useContactUsRequestTypeControllerCreate } from "@/sdk/modules/contactusrequesttype.gen";
import { useModal } from "@/shared/store/modal-store";
import { RequestTypeForm } from "./RequestTypeForm";
import type { CreateRequestTypeFormData } from "../schemas/request-types.schema";
import { toast } from "sonner";
import { useLang } from "@/shared/hooks/use-lang";

export const CreateRequestTypeModal = () => {
  const { t } = useLang();
  const createRequestTypeMutation = useContactUsRequestTypeControllerCreate();
  const { onClose, refetch, isOpen, type } = useModal();
  const open = isOpen && type === "createRequestType";

  const handleSubmit = async (data: CreateRequestTypeFormData) => {
    try {
      await createRequestTypeMutation.mutateAsync({
        body: {
          title: data.title,
          contact_us_request_type_id_contact_us_request_type_translations:
            data.contact_us_request_type_id_contact_us_request_type_translations || [],
        },
      });
      toast.success(t("requestTypes.messages.requestTypeCreated"));
      onClose();
      if (refetch) refetch();
    } catch (error: any) {
      toast.error(
        error?.message || t("requestTypes.messages.errorCreatingRequestType")
      );
      console.error("Error creating request type:", error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{t("requestTypes.createNewRequestType")}</DialogTitle>
        </DialogHeader>

        <RequestTypeForm
          onSubmit={handleSubmit as any}
          isLoading={createRequestTypeMutation.isPending}
          submitLabel={t("requestTypes.createRequestType")}
          isUpdate={false}
        />
      </DialogContent>
    </Dialog>
  );
};
