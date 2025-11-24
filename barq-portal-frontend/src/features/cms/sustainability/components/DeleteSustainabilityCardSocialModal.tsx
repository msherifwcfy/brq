import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/shared/components/ui/dialog";
import { Button } from "@/shared/components/ui/button";
import { useModal } from "@/shared/store/modal-store";
import { toast } from "sonner";
import { useLang } from "@/shared/hooks/use-lang";

export const DeleteSustainabilityCardSocialModal = () => {
  const { t } = useLang();
  const { onClose, refetch, isOpen, type, data } = useModal();
  const open = isOpen && type === "deleteSustainabilityCardSocial";
  const cardSocial = data?.cardSocial;

  const handleDelete = async () => {
    try {
      // Note: There's no delete endpoint in the SDK, so we'll show a message
      // If delete functionality is needed, it should be added to the backend
      toast.error(t("sustainability.cardSocial.messages.deleteNotSupported"));
      onClose();
    } catch (error: any) {
      toast.error(
        error?.message ||
          t("sustainability.cardSocial.messages.errorDeletingCardSocial")
      );
      console.error("Error deleting card social:", error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>
            {t("sustainability.cardSocial.deleteCardSocial")}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">
            {t("sustainability.cardSocial.messages.deleteConfirmation", {
              title: cardSocial?.title || "",
            })}
          </p>

          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={onClose}>
              {t("common.cancel")}
            </Button>
            <Button variant="destructive" onClick={handleDelete}>
              {t("common.delete")}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
