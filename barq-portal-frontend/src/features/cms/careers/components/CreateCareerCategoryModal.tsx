import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/shared/components/ui/dialog";
import { useModal } from "@/shared/store/modal-store";
import { CareerCategoryForm } from "./CareerCategoryForm";
import { useCareerCategoryControllerCreate } from "@/sdk/modules/careercategory.gen";
import { toast } from "sonner";
import { useLang } from "@/shared/hooks/use-lang";
import type { CareerCategoryFormData } from "../schemas/career-category.schema";

export function CreateCareerCategoryModal() {
  const { t } = useLang();
  const { isOpen, type, onClose, refetch } = useModal();
  const open = isOpen && type === "createCareerCategory";
  const createMutation = useCareerCategoryControllerCreate();

  const handleSubmit = async (values: CareerCategoryFormData) => {
    try {
      await createMutation.mutateAsync({
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
      toast.success(t("cms.careers.manageItems.categories.messages.created"));
      onClose();
      if (refetch) refetch();
    } catch (error: any) {
      toast.error(error?.message || t("cms.careers.manageItems.categories.messages.error", { action: "create" }));
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{t("cms.careers.manageItems.categories.modals.createTitle")}</DialogTitle>
        </DialogHeader>
        <CareerCategoryForm
          onSubmit={handleSubmit}
          isLoading={createMutation.isPending}
          submitLabel={t("cms.careers.manageItems.categories.form.create")}
        />
      </DialogContent>
    </Dialog>
  );
}

