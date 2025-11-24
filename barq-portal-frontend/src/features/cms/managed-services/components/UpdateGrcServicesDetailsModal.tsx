import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/shared/components/ui/dialog";
import { useModal } from "@/shared/store/modal-store";
import GrcServicesDetailsForm from "./GrcServicesDetailsForm";
import type { ManagedGrcServicesDetailsControllerFindOneResponse } from "@/sdk";

export function UpdateGrcServicesDetailsModal() {
  const { isOpen, type, onClose, refetch, data } = useModal();
  const open = isOpen && type === "updateGrcServicesDetails";
  const service = data?.service as ManagedGrcServicesDetailsControllerFindOneResponse['data'] | undefined;

  const handleClose = () => {
    onClose();
    if (refetch) refetch();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Update GRC Services Details</DialogTitle>
        </DialogHeader>
        {service && (
          <GrcServicesDetailsForm service={service} onClose={handleClose} />
        )}
      </DialogContent>
    </Dialog>
  );
}

