import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/shared/components/ui/dialog";
import { useModal } from "@/shared/store/modal-store";
import { useManagedServiceCardsControllerRemove } from "@/sdk/modules/managedservicecard.gen";
import { toast } from "sonner";
import { Button } from "@/shared/components/ui/button";

export function DeleteManagedServiceCardModal() {
  const deleteMutation = useManagedServiceCardsControllerRemove();
  const { onClose, refetch, isOpen, type, data } = useModal();
  const open = isOpen && type === "deleteManagedServiceCard";

  const card = data?.card;

  const handleDelete = async () => {
    try {
      await deleteMutation.mutateAsync({
        path: { id: Number(card?.id) },
      });
      toast.success("Managed service card deleted successfully");
      onClose();
      if (refetch) refetch();
    } catch (error: any) {
      toast.error(error?.message || "Error deleting managed service card");
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete Managed Service Card</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete this managed service card? This action cannot be undone.
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

