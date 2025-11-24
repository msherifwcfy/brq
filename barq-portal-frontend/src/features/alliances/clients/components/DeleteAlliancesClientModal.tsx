import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/shared/components/ui/dialog";
import { Button } from "@/shared/components/ui/button";
import { useAlliancesClientsControllerDelete } from "@/sdk/modules/alliancesclient.gen";
import type { AlliancesClientsEntity } from "@/sdk/types.gen";
import { useModal } from "@/shared/store/modal-store";
import { useLang } from "@/shared/hooks/use-lang";
import { toast } from "sonner";

export const DeleteAlliancesClientModal = () => {
  const { t } = useLang();
  const { onClose, refetch, isOpen, type, data } = useModal();
  const open = isOpen && type === "deleteAlliancesClient";
  const alliancesClient = data?.alliancesClient;
  const deleteAlliancesClientMutation = useAlliancesClientsControllerDelete();

  const handleDelete = async () => {
    if (!alliancesClient) return;

    try {
      await deleteAlliancesClientMutation.mutateAsync({
        path: {
          id: alliancesClient.id.toString(),
        },
      });
      toast.success(t("alliancesClients.messages.alliancesClientDeleted"));
      onClose();
      if (refetch) refetch();
    } catch (error: any) {
      toast.error(
        error?.message ||
          t("alliancesClients.messages.errorDeletingAlliancesClient")
      );
      console.error("Error deleting alliances client:", error);
    }
  };

  if (!alliancesClient) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>
            {t("alliancesClients.deleteAlliancesClientTitle")}
          </DialogTitle>
          <DialogDescription>
            {t("alliancesClients.deleteAlliancesClientDescription", {
              id: alliancesClient.id,
            })}
          </DialogDescription>
        </DialogHeader>

        <div className="flex justify-end space-x-2">
          <Button type="button" variant="outline" onClick={onClose}>
            {t("common.cancel")}
          </Button>
          <Button
            type="button"
            variant="destructive"
            disabled={deleteAlliancesClientMutation.isPending}
            onClick={handleDelete}
          >
            {deleteAlliancesClientMutation.isPending
              ? t("alliancesClients.form.loading")
              : t("alliancesClients.deleteAlliancesClient")}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
