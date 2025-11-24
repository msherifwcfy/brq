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
import { useFooterLocationsControllerDelete } from "@/sdk/modules/footerlocation.gen";

export const DeleteFooterLocationModal = () => {
  const { t } = useLang();
  const deleteMutation = useFooterLocationsControllerDelete();
  const { onClose, refetch, isOpen, type, data } = useModal();
  const open = isOpen && type === "deleteFooterLocation";

  const onConfirm = async () => {
    try {
      await deleteMutation.mutateAsync({
        path: { id: String(data?.id) },
      });
      toast.success(t("footerLocations.messages.footerLocationDeleted"));
      onClose();
      if (refetch) refetch();
    } catch (error: any) {
      toast.error(
        error?.message ||
          t("footerLocations.messages.errorDeletingFooterLocation")
      );
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>{t("footerLocations.deleteFooterLocation")}</DialogTitle>
          <DialogDescription>
            {t("footerLocations.deleteDescription")}
          </DialogDescription>
        </DialogHeader>
        <div className="flex justify-end gap-2">
          <Button variant="secondary" onClick={onClose}>
            {t("common.cancel")}
          </Button>
          <Button
            variant="destructive"
            onClick={onConfirm}
            loading={deleteMutation.isPending}
          >
            {t("common.delete")}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
