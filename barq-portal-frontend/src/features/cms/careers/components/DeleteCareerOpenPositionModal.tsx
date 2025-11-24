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
import { useCareerOpenPositionControllerDelete } from "@/sdk/modules/careeropenposition.gen";
import { toast } from "sonner";
import { useLang } from "@/shared/hooks/use-lang";

export function DeleteCareerOpenPositionModal() {
  const { t } = useLang();
  const { isOpen, type, onClose, refetch, data } = useModal();
  const open = isOpen && type === "deleteCareerOpenPosition";
  const deleteMutation = useCareerOpenPositionControllerDelete();
  const position = data?.position;

  const handleDelete = async () => {
    if (!position) return;

    try {
      await deleteMutation.mutateAsync({
        path: { id: String(position.id) },
      });
      toast.success(t("cms.careers.openPositions.messages.deleted"));
      onClose();
      if (refetch) refetch();
    } catch (error: any) {
      toast.error(error?.message || t("cms.careers.openPositions.messages.error", { action: "delete" }));
    }
  };

  if (!position) return null;

  const enTranslation = position.career_open_position_id_career_open_position_translations?.find(
    (t) => t.language === "en"
  );
  const jobTitle = enTranslation?.job_title || position.job_title;

  return (
    <AlertDialog open={open} onOpenChange={onClose}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{t("cms.careers.openPositions.modals.deleteTitle")}</AlertDialogTitle>
          <AlertDialogDescription>
            {t("cms.careers.openPositions.modals.deleteConfirmation", { jobTitle })}
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

