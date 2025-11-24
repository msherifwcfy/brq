import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/shared/components/ui/dialog";
import { useAlliancesClientsControllerUpdate } from "@/sdk/modules/alliancesclient.gen";
import { useModal } from "@/shared/store/modal-store";
import { AlliancesClientForm } from "./AlliancesClientForm";
import type { UpdateAlliancesClientFormData } from "../schemas/alliances-clients.schema";
import { useLang } from "@/shared/hooks/use-lang";
import { toast } from "sonner";

export const UpdateAlliancesClientModal = () => {
  const { t } = useLang();
  const { onClose, refetch, isOpen, type, data } = useModal();
  const open = isOpen && type === "updateAlliancesClient";
  const alliancesClient = data?.alliancesClient;

  const updateAlliancesClientMutation = useAlliancesClientsControllerUpdate();

  const handleSubmit = async (formData: UpdateAlliancesClientFormData) => {
    if (!alliancesClient) return;

    try {
      await updateAlliancesClientMutation.mutateAsync({
        body: {
          media_id: (formData as any)?.media_id,
          country_id: formData.country_id,
          industries_id: formData.industries_id,
        },
        path: {
          id: alliancesClient.id.toString(),
        },
      });
      toast.success(t("alliancesClients.messages.alliancesClientUpdated"));
      onClose();
      if (refetch) refetch();
    } catch (error: any) {
      toast.error(
        error?.message ||
          t("alliancesClients.messages.errorUpdatingAlliancesClient")
      );
      console.error("Error updating alliances client:", error);
    }
  };

  if (!alliancesClient) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {t("alliancesClients.updateAlliancesClientTitle", {
              id: alliancesClient.id,
            })}
          </DialogTitle>
        </DialogHeader>

        <AlliancesClientForm
          defaultValues={{
            media: [alliancesClient.media],
            country_id: alliancesClient.country_id,
            industries_id: alliancesClient.industries_id,
          }}
          onSubmit={handleSubmit as any}
          isLoading={updateAlliancesClientMutation.isPending}
          submitLabel={t("alliancesClients.updateAlliancesClient")}
          isUpdate={true}
        />
      </DialogContent>
    </Dialog>
  );
};
