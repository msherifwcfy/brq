import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/shared/components/ui/alert-dialog";
import { useModal } from "@/shared/store/modal-store";
import { useCareerOpportunityControllerDelete } from "@/sdk/modules/careeropportunity.gen";
import { toast } from "sonner";
import { useLang } from "@/shared/hooks/use-lang";

export function DeleteCareerOpportunityModal() {
  const { t } = useLang();
  const { isOpen, type, onClose, refetch, data } = useModal();
  const open = isOpen && type === "deleteCareerOpportunity";
  const deleteMutation = useCareerOpportunityControllerDelete();
  const opportunity = data?.opportunity;

  const handleDelete = async () => {
    if (!opportunity) return;

    try {
      await deleteMutation.mutateAsync({
        path: { id: String(opportunity.id) },
      });
      toast.success(t("cms.careers.manageItems.opportunities.messages.deleted"));
      onClose();
      if (refetch) refetch();
    } catch (error: any) {
      toast.error(error?.message || t("cms.careers.manageItems.opportunities.messages.error", { action: "delete" }));
    }
  };

  if (!opportunity) return null;

  const enTranslation = opportunity.career_opportunity_id_career_opportunity_translations?.find(
    (t) => t.language === "en"
  );
  const name = enTranslation?.name || opportunity.name;

  return (
    <AlertDialog open={open} onOpenChange={onClose}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{t("cms.careers.manageItems.opportunities.modals.deleteTitle")}</AlertDialogTitle>
          <AlertDialogDescription>
            {t("cms.careers.manageItems.opportunities.modals.deleteConfirmation", { name })}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>{t("common.cancel")}</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDelete}
            disabled={deleteMutation.isPending}
          >
            {deleteMutation.isPending ? t("common.loading") : t("common.delete")}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

