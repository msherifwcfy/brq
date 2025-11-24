import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/shared/components/ui/dialog";
import { useModal } from "@/shared/store/modal-store";
import ManagedServiceCardForm from "./ManagedServiceCardForm";
import type { ManagedServiceCardsControllerFindOneResponse } from "@/sdk";
import { useLang } from "@/shared/hooks/use-lang";

export function UpdateManagedServiceCardModal() {
  const { t } = useLang();
  const { isOpen, type, onClose, refetch, data } = useModal();
  const open = isOpen && type === "updateManagedServiceCard";
  const card = data?.card as ManagedServiceCardsControllerFindOneResponse['data'] | undefined;

  const handleClose = () => {
    onClose();
    if (refetch) refetch();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{t("cms.managedServices.coreCards.modals.updateTitle")}</DialogTitle>
        </DialogHeader>
        {
          card && (
            <ManagedServiceCardForm card={card} onClose={handleClose} />
          )
        }
      </DialogContent>
    </Dialog>
  );
}

