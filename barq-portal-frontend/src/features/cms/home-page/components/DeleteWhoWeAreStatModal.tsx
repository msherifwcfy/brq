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
import { useLandingNumbersControllerSoftDelete } from "@/sdk/modules/landingnumber.gen";

export const DeleteWhoWeAreStatModal = () => {
  const { t } = useLang();
  const { onClose, isOpen, type, data } = useModal();
  const open = isOpen && type === "deleteWhoWeAreStat";

  const {mutateAsync: deleteMutation, isPending: isDeleting} = useLandingNumbersControllerSoftDelete();

  const onConfirm = async () => {
    try {
      await deleteMutation({
        path: {
          id: data?.id,
        },
      });
      toast.success(t("cms.homePage.whoWeAreStats.messages.deleted"));
      onClose();
    } catch (error: any) {
      toast.error(error?.message || t("cms.homePage.whoWeAreStats.messages.errorDeleting"));
    }
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
          <Button variant="destructive" onClick={onConfirm} loading={isDeleting}>
            {t("common.delete")}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
