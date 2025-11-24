import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/shared/components/ui/dialog";
import { useModal } from "@/shared/store/modal-store";
import CybersecurityServicesDetailsForm from "./CybersecurityServicesDetailsForm";
import type { ManagedCybersecurityServicesDetailsControllerReadOneResponse } from "@/sdk";

export function UpdateCybersecurityServicesDetailsModal() {
  const { isOpen, type, onClose, refetch, data } = useModal();
  const open = isOpen && type === "updateCybersecurityServicesDetails";
  const service = data?.service as ManagedCybersecurityServicesDetailsControllerReadOneResponse['data'] | undefined;

  const handleClose = () => {
    onClose();
    if (refetch) refetch();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Update Cybersecurity Services Details</DialogTitle>
        </DialogHeader>
        {service && (
          <CybersecurityServicesDetailsForm service={service} onClose={handleClose} />
        )}
      </DialogContent>
    </Dialog>
  );
}

