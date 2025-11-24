import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/shared/components/ui/dialog";
import { useModal } from "@/shared/store/modal-store";
import { NewsroomCategoryForm } from "./NewsroomCategoryForm";
import { useNewsroomCategoryControllerUpdate } from "@/sdk/modules/newsroomcategory.gen";
import { toast } from "sonner";
import { useLang } from "@/shared/hooks/use-lang";
import type { NewsroomCategoryFormData } from "../schemas/newsroom-category.schema";

export function UpdateNewsroomCategoryModal() {
  const { t } = useLang();
  const { isOpen, type, onClose, refetch, data } = useModal();
  const open = isOpen && type === "updateNewsroomCategory";
  const updateMutation = useNewsroomCategoryControllerUpdate();
  const category = data?.category;

  const handleSubmit = async (values: NewsroomCategoryFormData) => {
    if (!category) return;

    try {
      await updateMutation.mutateAsync({
        path: { id: String(category.id) },
        body: {
          name: values.name.ar,
          newsroom_category_id_newsroom_category_translations: [
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
      toast.success(t("cms.newsroom.manageItems.categories.messages.updated"));
      onClose();
      if (refetch) refetch();
    } catch (error: any) {
      toast.error(error?.message || t("cms.newsroom.manageItems.categories.messages.error", { action: "update" }));
    }
  };

  if (!category) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{t("cms.newsroom.manageItems.categories.modals.updateTitle")}</DialogTitle>
        </DialogHeader>
        <NewsroomCategoryForm
          category={category}
          onSubmit={handleSubmit}
          isLoading={updateMutation.isPending}
          submitLabel={t("cms.newsroom.manageItems.categories.form.update")}
        />
      </DialogContent>
    </Dialog>
  );
}

