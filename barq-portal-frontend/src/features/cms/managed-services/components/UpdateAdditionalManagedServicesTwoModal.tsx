import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/shared/components/ui/dialog";
import { useModal } from "@/shared/store/modal-store";
import AdditionalManagedServicesTwoForm from "./AdditionalManagedServicesTwoForm";

export function UpdateAdditionalManagedServicesTwoModal() {
  const { isOpen, type, onClose, refetch, data } = useModal();
  const open = isOpen && type === "updateAdditionalManagedServicesTwo";
  const service = data?.service;

  const handleClose = () => {
    onClose();
    if (refetch) refetch();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Update Additional Service</DialogTitle>
        </DialogHeader>
        {service && (
          <AdditionalManagedServicesTwoForm service={service} onClose={handleClose} />
        )}
      </DialogContent>
    </Dialog>
  );
}

