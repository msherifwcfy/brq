import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/shared/components/ui/dialog";
import { useModal } from "@/shared/store/modal-store";
import { useApplicationDataBulletsControllerRemove } from "@/mock-sdk/modules/application-data-bullets.mock";
import { toast } from "sonner";
import { useLang } from "@/shared/hooks/use-lang";
import { Button } from "@/shared/components/ui/button";

export const DeleteApplicationDataBulletModal = () => {
  const { t } = useLang();
  const deleteMutation = useApplicationDataBulletsControllerRemove();
  const { onClose, refetch, isOpen, type, data } = useModal();
  const open = isOpen && type === "deleteApplicationDataBullet";

  const bullet = data?.bullet;

  const handleDelete = async () => {
    try {
      await deleteMutation.mutateAsync({
        path: { id: String(bullet?.id) },
      } as any);
      toast.success(
        t("cms.cybersecurity.applicationData.bullets.messages.deleted")
      );
      onClose();
      if (refetch) refetch();
    } catch (error: any) {
      toast.error(
        error?.message ||
          t("cms.cybersecurity.applicationData.bullets.messages.errorDeleting")
      );
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {t("cms.cybersecurity.applicationData.bullets.delete")}
          </DialogTitle>
          <DialogDescription>
            {t("cms.cybersecurity.applicationData.bullets.deleteConfirmation")}
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
