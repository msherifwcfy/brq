import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/shared/components/ui/dialog";
import { useAlliancesClientsControllerCreate } from "@/sdk/modules/alliancesclient.gen";
import { useModal } from "@/shared/store/modal-store";
import { AlliancesClientForm } from "./AlliancesClientForm";
import type { CreateAlliancesClientFormData } from "../schemas/alliances-clients.schema";
import { toast } from "sonner";
import { useLang } from "@/shared/hooks/use-lang";

export const CreateAlliancesClientModal = () => {
  const { t } = useLang();
  const createAlliancesClientMutation = useAlliancesClientsControllerCreate();
  const { onClose, refetch, isOpen, type } = useModal();
  const open = isOpen && type === "createAlliancesClient";

  const handleSubmit = async (data: CreateAlliancesClientFormData) => {
    try {
      await createAlliancesClientMutation.mutateAsync({
        body: {
          media_id: (data as any)?.media_id,
          country_id: data.country_id,
          industries_id: data.industries_id,
        },
      });
      toast.success(t("alliancesClients.messages.alliancesClientCreated"));
      onClose();
      if (refetch) refetch();
    } catch (error: any) {
      toast.error(
        error?.message ||
          t("alliancesClients.messages.errorCreatingAlliancesClient")
      );
      console.error("Error creating alliances client:", error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {t("alliancesClients.createNewAlliancesClient")}
          </DialogTitle>
        </DialogHeader>

        <AlliancesClientForm
          onSubmit={handleSubmit as any}
          isLoading={createAlliancesClientMutation.isPending}
          submitLabel={t("alliancesClients.createAlliancesClient")}
          isUpdate={false}
        />
      </DialogContent>
    </Dialog>
  );
};
