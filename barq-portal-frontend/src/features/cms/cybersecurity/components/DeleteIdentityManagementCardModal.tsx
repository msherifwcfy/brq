import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/shared/components/ui/dialog";
import { useModal } from "@/shared/store/modal-store";
import { useIdentityManagementCardsControllerRemove } from "@/mock-sdk/modules/identity-management-cards.mock";
import { toast } from "sonner";
import { useLang } from "@/shared/hooks/use-lang";
import { Button } from "@/shared/components/ui/button";

export const DeleteIdentityManagementCardModal = () => {
  const { t } = useLang();
  const deleteMutation = useIdentityManagementCardsControllerRemove();
  const { onClose, refetch, isOpen, type, data } = useModal();
  const open = isOpen && type === "deleteIdentityManagementCard";

  const card = data?.card;

  const handleDelete = async () => {
    try {
      await deleteMutation.mutateAsync({
        path: { id: String(card?.id) },
      } as any);
      toast.success(
        t("cms.cybersecurity.identityManagement.cards.messages.deleted")
      );
      onClose();
      if (refetch) refetch();
    } catch (error: any) {
      toast.error(
        error?.message ||
          t("cms.cybersecurity.identityManagement.cards.messages.errorDeleting")
      );
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {t("cms.cybersecurity.identityManagement.cards.delete")}
          </DialogTitle>
          <DialogDescription>
            {t("cms.cybersecurity.identityManagement.cards.deleteConfirmation")}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            {t("common.cancel")}
          </Button>
          <Button
            variant="destructive"
            onClick={handleDelete}
            loading={deleteMutation.isPending}
          >
            {t("common.delete")}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
