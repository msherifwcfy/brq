import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/shared/components/ui/dialog";
import { useModal } from "@/shared/store/modal-store";
import ManagedServiceCardForm from "./ManagedServiceCardForm";
import { useLang } from "@/shared/hooks/use-lang";

export function CreateManagedServiceCardModal() {
  const { t } = useLang();
  const { isOpen, type, onClose, refetch } = useModal();
  const open = isOpen && type === "createManagedServiceCard";

  const handleClose = () => {
    onClose();
    if (refetch) refetch();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{t("cms.managedServices.coreCards.modals.createTitle")}</DialogTitle>
        </DialogHeader>
        <ManagedServiceCardForm card={undefined} onClose={handleClose} />
      </DialogContent>
    </Dialog>
  );
}

