import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/shared/components/ui/dialog";
import { useModal } from "@/shared/store/modal-store";
import { CareerCategoryForm } from "./CareerCategoryForm";
import { useCareerCategoryControllerUpdate } from "@/sdk/modules/careercategory.gen";
import { toast } from "sonner";
import { useLang } from "@/shared/hooks/use-lang";
import type { CareerCategoryFormData } from "../schemas/career-category.schema";

export function UpdateCareerCategoryModal() {
  const { t } = useLang();
  const { isOpen, type, onClose, refetch, data } = useModal();
  const open = isOpen && type === "updateCareerCategory";
  const updateMutation = useCareerCategoryControllerUpdate();
  const category = data?.category;

  const handleSubmit = async (values: CareerCategoryFormData) => {
    if (!category) return;

    try {
      await updateMutation.mutateAsync({
        path: { id: String(category.id) },
        body: {
          name: values.name.en,
          career_category_id_career_category_translations: [
            {
              name: values.name.en,
              language: "en",
            },
            {
              name: values.name.ar,
              language: "ar",
            },
          ],
        },
      } as any);
      toast.success(t("cms.careers.manageItems.categories.messages.updated"));
      onClose();
      if (refetch) refetch();
    } catch (error: any) {
      toast.error(error?.message || t("cms.careers.manageItems.categories.messages.error", { action: "update" }));
    }
  };

  if (!category) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{t("cms.careers.manageItems.categories.modals.updateTitle")}</DialogTitle>
        </DialogHeader>
        <CareerCategoryForm
          category={category}
          onSubmit={handleSubmit}
          isLoading={updateMutation.isPending}
          submitLabel={t("cms.careers.manageItems.categories.form.update")}
        />
      </DialogContent>
    </Dialog>
  );
}

