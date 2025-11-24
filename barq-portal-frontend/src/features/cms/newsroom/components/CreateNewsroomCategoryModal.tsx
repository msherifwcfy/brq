import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/shared/components/ui/dialog";
import { useModal } from "@/shared/store/modal-store";
import { NewsroomCategoryForm } from "./NewsroomCategoryForm";
import { useNewsroomCategoryControllerCreate } from "@/sdk/modules/newsroomcategory.gen";
import { toast } from "sonner";
import { useLang } from "@/shared/hooks/use-lang";
import type { NewsroomCategoryFormData } from "../schemas/newsroom-category.schema";

export function CreateNewsroomCategoryModal() {
  const { t } = useLang();
  const { isOpen, type, onClose, refetch } = useModal();
  const open = isOpen && type === "createNewsroomCategory";
  const createMutation = useNewsroomCategoryControllerCreate();

  const handleSubmit = async (values: NewsroomCategoryFormData) => {
    try {
      await createMutation.mutateAsync({
        body: {
          name: values.name.ar,
          newsroom_category_id_newsroom_category_translations: [
            {
              name: values.name.en,
              language: "en",
            },
          ],
        },
      } as any);
      toast.success(t("cms.newsroom.manageItems.categories.messages.created"));
      onClose();
      if (refetch) refetch();
    } catch (error: any) {
      toast.error(error?.message || t("cms.newsroom.manageItems.categories.messages.error", { action: "create" }));
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{t("cms.newsroom.manageItems.categories.modals.createTitle")}</DialogTitle>
        </DialogHeader>
        <NewsroomCategoryForm
          onSubmit={handleSubmit}
          isLoading={createMutation.isPending}
          submitLabel={t("cms.newsroom.manageItems.categories.form.create")}
        />
      </DialogContent>
    </Dialog>
  );
}

