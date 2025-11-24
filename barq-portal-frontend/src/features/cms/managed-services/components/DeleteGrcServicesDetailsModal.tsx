import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/shared/components/ui/dialog";
import { useModal } from "@/shared/store/modal-store";
import { useManagedGrcServicesDetailsControllerRemove } from "@/sdk/modules/managedgrcservicesdetail.gen";
import { toast } from "sonner";
import { Button } from "@/shared/components/ui/button";

export function DeleteGrcServicesDetailsModal() {
  const deleteMutation = useManagedGrcServicesDetailsControllerRemove();
  const { onClose, refetch, isOpen, type, data } = useModal();
  const open = isOpen && type === "deleteGrcServicesDetails";

  const service = data?.service;

  const handleDelete = async () => {
    try {
      await deleteMutation.mutateAsync({
        path: { id: service?.id },
      });
      toast.success("GRC Services Details deleted successfully");
      onClose();
      if (refetch) refetch();
    } catch (error: any) {
      toast.error(error?.message || "Error deleting GRC Services Details");
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete GRC Services Details</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete this GRC Services Details? This action cannot be undone.
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

