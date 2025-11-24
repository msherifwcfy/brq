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
import { useFooterTermsControllerDelete } from "@/sdk/modules/footerterm.gen";

export const DeleteFooterTermModal = () => {
  const { t } = useLang();
  const deleteMutation = useFooterTermsControllerDelete();
  const { onClose, refetch, isOpen, type, data } = useModal();
  const open = isOpen && type === "deleteFooterTerm";

  const onConfirm = async () => {
    try {
      console.log(data,"data");
      await deleteMutation.mutateAsync({
        path: { id: String(data?.id) },
      });
      toast.success(t("footerTerms.messages.footerTermDeleted"));
      onClose();
      if (refetch) refetch();
    } catch (error: any) {
      toast.error(
        error?.message ||
          t("footerTerms.messages.errorDeletingFooterTerm")
      );
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>{t("footerTerms.deleteFooterTerm")}</DialogTitle>
          <DialogDescription>
            {t("footerTerms.deleteDescription")}
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

