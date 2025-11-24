import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/shared/components/ui/dialog";
import { Button } from "@/shared/components/ui/button";
import { useModal } from "@/shared/store/modal-store";
import { useLang } from "@/shared/hooks/use-lang";
import { toast } from "sonner";

export const DeleteWhoWeAreStatModal = () => {
  const { t } = useLang();
  const { onClose, isOpen, type } = useModal();
  const open = isOpen && type === "deleteWhoWeAreStat";

  const onConfirm = async () => {
    toast.error(t("cms.homePage.whoWeAreStats.messages.deleteNotAvailable"));
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>
            {t("cms.homePage.whoWeAreStats.deleteTitle")}
          </DialogTitle>
          <DialogDescription>
            {t("cms.homePage.whoWeAreStats.deleteDescription")}
          </DialogDescription>
        </DialogHeader>
        <div className="flex justify-end gap-2">
          <Button variant="secondary" onClick={onClose}>
            {t("common.cancel")}
          </Button>
          <Button variant="destructive" onClick={onConfirm}>
            {t("common.delete")}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
