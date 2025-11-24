import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/shared/components/ui/dialog";
import { Button } from "@/shared/components/ui/button";
import { useAwardsCardsControllerDelete } from "@/sdk/modules/awardscard.gen";
import { useModal } from "@/shared/store/modal-store";
import { toast } from "sonner";
import { useLang } from "@/shared/hooks/use-lang";

export const DeleteAwardsCardsModal = () => {
  const { t } = useLang();
  const deleteAwardsCardsMutation = useAwardsCardsControllerDelete();
  const { onClose, refetch, isOpen, type, data } = useModal();
  const open = isOpen && type === "deleteAwardsCards";
  const awardsCard = data?.awardsCard;

  const handleDelete = async () => {
    if (!awardsCard) return;

    try {
      await deleteAwardsCardsMutation.mutateAsync({
        path: {
          id: awardsCard.id.toString(),
        },
      });
      toast.success(t("awardsCards.messages.awardsCardDeleted"));
      onClose();
      if (refetch) refetch();
    } catch (error: any) {
      toast.error(
        error?.message || t("awardsCards.messages.errorDeletingAwardsCard")
      );
      console.error("Error deleting awards card:", error);
    }
  };

  if (!awardsCard) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>{t("awardsCards.deleteAwardsCard")}</DialogTitle>
        </DialogHeader>

        <div className="py-4">
          <p className="text-sm">
            {t("awardsCards.messages.confirmDelete", {
              name: awardsCard.name,
            })}
          </p>
        </div>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={onClose}
            disabled={deleteAwardsCardsMutation.isPending}
          >
            {t("common.cancel")}
          </Button>
          <Button
            variant="destructive"
            onClick={handleDelete}
            disabled={deleteAwardsCardsMutation.isPending}
            loading={deleteAwardsCardsMutation.isPending}
          >
            {t("common.delete")}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
