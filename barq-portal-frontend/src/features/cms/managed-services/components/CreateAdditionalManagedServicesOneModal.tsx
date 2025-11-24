import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/shared/components/ui/dialog";
import { useModal } from "@/shared/store/modal-store";
import AdditionalManagedServicesOneForm from "./AdditionalManagedServicesOneForm";

export function CreateAdditionalManagedServicesOneModal() {
  const { isOpen, type, onClose, refetch } = useModal();
  const open = isOpen && type === "createAdditionalManagedServicesOne";

  const handleClose = () => {
    onClose();
    if (refetch) refetch();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Create Additional Managed Service</DialogTitle>
        </DialogHeader>
        <AdditionalManagedServicesOneForm service={undefined} onClose={handleClose} />
      </DialogContent>
    </Dialog>
  );
}

