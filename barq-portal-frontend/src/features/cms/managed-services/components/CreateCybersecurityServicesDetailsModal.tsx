import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/shared/components/ui/dialog";
import { useModal } from "@/shared/store/modal-store";
import CybersecurityServicesDetailsForm from "./CybersecurityServicesDetailsForm";

export function CreateCybersecurityServicesDetailsModal() {
  const { isOpen, type, onClose, refetch } = useModal();
  const open = isOpen && type === "createCybersecurityServicesDetails";

  const handleClose = () => {
    onClose();
    if (refetch) refetch();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Create Cybersecurity Services Details</DialogTitle>
        </DialogHeader>
        <CybersecurityServicesDetailsForm service={undefined} onClose={handleClose} />
      </DialogContent>
    </Dialog>
  );
}

