import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/shared/components/ui/dialog";
import {
  useContactUsRequestTypeControllerReadOneQuery,
  useContactUsRequestTypeControllerUpdate,
} from "@/sdk/modules/contactusrequesttype.gen";
import { useModal } from "@/shared/store/modal-store";
import { RequestTypeForm } from "./RequestTypeForm";
import type { UpdateRequestTypeFormData } from "../schemas/request-types.schema";
import { useLang } from "@/shared/hooks/use-lang";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

export const UpdateRequestTypeModal = () => {
  const { t } = useLang();
  const { onClose, refetch, isOpen, type, data } = useModal();
  const open = isOpen && type === "updateRequestType";

  const { data: requestTypeData, isLoading } = useContactUsRequestTypeControllerReadOneQuery(
    {
      path: {
        id: data?.requestType?.id.toString(),
      },

      query: {
        query: {
          relations: {
            contact_us_request_type_id_contact_us_request_type_translations: true,
          },
        },
      },
      headers: {
        "x-skip-translations": "true",
      },
    },
    {}
  );
  const requestType = requestTypeData?.data;

  const updateRequestTypeMutation = useContactUsRequestTypeControllerUpdate();

  const handleSubmit = async (formData: UpdateRequestTypeFormData) => {
    if (!requestType) return;

    try {
      await updateRequestTypeMutation.mutateAsync({
        body: {
          title: formData.title,
          contact_us_request_type_id_contact_us_request_type_translations:
            formData.contact_us_request_type_id_contact_us_request_type_translations || [],
        },
        path: {
          id: requestType.id.toString(),
        },
      });
      toast.success(t("requestTypes.messages.requestTypeUpdated"));
      onClose();
      if (refetch) refetch();
    } catch (error: any) {
      toast.error(
        error?.message || t("requestTypes.messages.errorUpdatingRequestType")
      );
      console.error("Error updating request type:", error);
    }
  };

  if (!requestType) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {t("requestTypes.updateRequestTypeTitle", { title: requestType.title })}
          </DialogTitle>
        </DialogHeader>

        {isLoading ? (
          <div className="flex justify-center items-center h-full">
            <Loader2 className="w-4 h-4 animate-spin" />
          </div>
        ) : (
          <RequestTypeForm
            defaultValues={{
              title: requestType.title,
              contact_us_request_type_id_contact_us_request_type_translations:
                requestType.contact_us_request_type_id_contact_us_request_type_translations?.map((trans) => ({
                  id: trans.id,
                  contact_us_request_type_id: trans.contact_us_request_type_id,
                  title: trans.title,
                  language: trans.language,
                })) || [],
            }}
            onSubmit={handleSubmit as any}
            isLoading={updateRequestTypeMutation.isPending}
            submitLabel={t("requestTypes.updateRequestType")}
            isUpdate={true}
          />
        )}
      </DialogContent>
    </Dialog>
  );
};
