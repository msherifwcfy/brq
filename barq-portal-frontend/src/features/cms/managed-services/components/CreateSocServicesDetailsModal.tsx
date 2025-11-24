import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/shared/components/ui/dialog";
import { useModal } from "@/shared/store/modal-store";
import SocServicesDetailsForm from "./SocServicesDetailsForm";

export function CreateSocServicesDetailsModal() {
  const { isOpen, type, onClose, refetch } = useModal();
  const open = isOpen && type === "createSocServicesDetails";

  const handleClose = () => {
    onClose();
    if (refetch) refetch();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Create SOC Services Details</DialogTitle>
        </DialogHeader>
        <SocServicesDetailsForm service={undefined} onClose={handleClose} />
      </DialogContent>
    </Dialog>
  );
}

