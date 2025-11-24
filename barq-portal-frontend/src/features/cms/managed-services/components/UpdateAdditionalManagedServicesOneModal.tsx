import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/shared/components/ui/dialog";
import { useModal } from "@/shared/store/modal-store";
import AdditionalManagedServicesOneForm from "./AdditionalManagedServicesOneForm";
import type { AdditionalManagedServicesOneControllerReadOneResponse } from "@/sdk";

export function UpdateAdditionalManagedServicesOneModal() {
  const { isOpen, type, onClose, refetch, data } = useModal();
  const open = isOpen && type === "updateAdditionalManagedServicesOne";
  const service = data?.service as AdditionalManagedServicesOneControllerReadOneResponse['data'] | undefined;

  const handleClose = () => {
    onClose();
    if (refetch) refetch();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Update Additional Managed Service</DialogTitle>
        </DialogHeader>
        {
          service && (
            <AdditionalManagedServicesOneForm service={service} onClose={handleClose} />
          )
        }
      </DialogContent>
    </Dialog>
  );
}

