import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/shared/components/ui/dialog";
import { useModal } from "@/shared/store/modal-store";
import GrcServicesDetailsForm from "./GrcServicesDetailsForm";

export function CreateGrcServicesDetailsModal() {
  const { isOpen, type, onClose, refetch } = useModal();
  const open = isOpen && type === "createGrcServicesDetails";

  const handleClose = () => {
    onClose();
    if (refetch) refetch();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Create GRC Services Details</DialogTitle>
        </DialogHeader>
        <GrcServicesDetailsForm service={undefined} onClose={handleClose} />
      </DialogContent>
    </Dialog>
  );
}

