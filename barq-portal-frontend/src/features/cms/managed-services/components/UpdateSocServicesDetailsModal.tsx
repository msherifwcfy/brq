import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/shared/components/ui/dialog";
import { useModal } from "@/shared/store/modal-store";
import SocServicesDetailsForm from "./SocServicesDetailsForm";
import type { ManagedSocServicesDetailsControllerReadOneResponse } from "@/sdk";

export function UpdateSocServicesDetailsModal() {
  const { isOpen, type, onClose, refetch, data } = useModal();
  const open = isOpen && type === "updateSocServicesDetails";
  const service = data?.service as ManagedSocServicesDetailsControllerReadOneResponse['data'] | undefined;

  const handleClose = () => {
    onClose();
    if (refetch) refetch();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Update SOC Services Details</DialogTitle>
        </DialogHeader>
        {service && (
          <SocServicesDetailsForm service={service} onClose={handleClose} />
        )}
      </DialogContent>
    </Dialog>
  );
}

