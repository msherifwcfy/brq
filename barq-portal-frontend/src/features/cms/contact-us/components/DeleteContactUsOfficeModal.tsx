import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/shared/components/ui/dialog";
import { Button } from "@/shared/components/ui/button";
import { useModal } from "@/shared/store/modal-store";
import { useContactUsOfficesControllerUpdate } from "@/sdk/modules/contactusoffice.gen";
import { toast } from "sonner";
import { useLang } from "@/shared/hooks/use-lang";

export function DeleteContactUsOfficeModal() {
  const { t } = useLang();
  const { isOpen, type, onClose, refetch, data } = useModal();
  const open = isOpen && type === "deleteContactUsOffice";
  const updateMutation = useContactUsOfficesControllerUpdate();

  const existingOffices = data?.existingOffices;
  const office = data?.office;

  const handleDelete = async () => {
    const prevBullets =
      existingOffices?.contact_us_offices_bullets_id_contact_us_offices_bullets ||
      [];
    const nextBullets = prevBullets.filter((b: any) => b.id !== office?.id);
    try {
      await updateMutation.mutateAsync({
        path: { id: String(existingOffices.id) },
        body: {
          contact_us_offices_bullets_id_contact_us_offices_bullets: nextBullets,
        },
      });
      toast.success(t("cms.contactUs.offices.messages.officeDeleted"));
      onClose();
      if (refetch) refetch();
    } catch (error: any) {
      toast.error(
        error?.message || t("cms.contactUs.offices.messages.errorDeleting")
      );
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>{t("cms.contactUs.offices.deleteOffice")}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <p>{t("cms.contactUs.offices.deleteConfirmation")}</p>
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={onClose}>
              {t("actions.cancel")}
            </Button>
            <Button
              variant="destructive"
              onClick={handleDelete}
              disabled={updateMutation.isPending}
            >
              {t("actions.delete")}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
