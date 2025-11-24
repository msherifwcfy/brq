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
import { useCareerCategoryControllerDelete } from "@/sdk/modules/careercategory.gen";
import { toast } from "sonner";
import { useLang } from "@/shared/hooks/use-lang";

export function DeleteCareerCategoryModal() {
  const { t } = useLang();
  const { isOpen, type, onClose, refetch, data } = useModal();
  const open = isOpen && type === "deleteCareerCategory";
  const deleteMutation = useCareerCategoryControllerDelete();
  const category = data?.category;

  const handleDelete = async () => {
    if (!category) return;

    try {
      await deleteMutation.mutateAsync({
        path: { id: String(category.id) },
      });
      toast.success(t("cms.careers.manageItems.categories.messages.deleted"));
      onClose();
      if (refetch) refetch();
    } catch (error: any) {
      toast.error(error?.message || t("cms.careers.manageItems.categories.messages.error", { action: "delete" }));
    }
  };

  if (!category) return null;

  const enTranslation = category.career_category_id_career_category_translations?.find(
    (t) => t.language === "en"
  );
  const name = enTranslation?.name || category.name;

  return (
    <AlertDialog open={open} onOpenChange={onClose}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{t("cms.careers.manageItems.categories.modals.deleteTitle")}</AlertDialogTitle>
          <AlertDialogDescription>
            {t("cms.careers.manageItems.categories.modals.deleteConfirmation", { name })}
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

