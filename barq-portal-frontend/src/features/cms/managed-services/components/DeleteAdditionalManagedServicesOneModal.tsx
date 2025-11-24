import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/shared/components/ui/dialog";
import { useModal } from "@/shared/store/modal-store";
import { useAdditionalManagedServicesOneControllerDelete } from "@/sdk/modules/additionalmanagedservicesone.gen";
import { toast } from "sonner";
import { Button } from "@/shared/components/ui/button";

export function DeleteAdditionalManagedServicesOneModal() {
  const deleteMutation = useAdditionalManagedServicesOneControllerDelete();
  const { onClose, refetch, isOpen, type, data } = useModal();
  const open = isOpen && type === "deleteAdditionalManagedServicesOne";

  const service = data?.service;

  const handleDelete = async () => {
    try {
      await deleteMutation.mutateAsync({
        path: { id: String(service?.id) },
      });
      toast.success("Additional managed service deleted successfully");
      onClose();
      if (refetch) refetch();
    } catch (error: any) {
      toast.error(error?.message || "Error deleting additional managed service");
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete Additional Managed Service</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete this additional managed service? This action cannot be undone.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={handleDelete}
            loading={deleteMutation.isPending}
          >
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

