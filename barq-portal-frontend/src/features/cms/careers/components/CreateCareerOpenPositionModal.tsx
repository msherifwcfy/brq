import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/shared/components/ui/dialog";
import { useModal } from "@/shared/store/modal-store";
import { CareerOpenPositionForm } from "./CareerOpenPositionForm";
import { useCareerOpenPositionControllerCreate } from "@/sdk/modules/careeropenposition.gen";
import { toast } from "sonner";
import { useLang } from "@/shared/hooks/use-lang";
import type { CareerOpenPositionFormData } from "../schemas/career-open-position.schema";

export function CreateCareerOpenPositionModal() {
  const { t } = useLang();
  const { isOpen, type, onClose, refetch } = useModal();
  const open = isOpen && type === "createCareerOpenPosition";
  const createMutation = useCareerOpenPositionControllerCreate();

  const handleSubmit = async (values: CareerOpenPositionFormData) => {
    try {
      const openingDate = values.opening_date ? new Date(values.opening_date) : null;
      const closingDate = values.closing_date ? new Date(values.closing_date) : null;
      await createMutation.mutateAsync({
        body: {
          job_title: values.job_title.ar,
          job_description: values.job_description.ar,
          opening_date: openingDate,
          closing_date: closingDate,
          status: values.status,
          city_id: values.city_id,
          career_opportunity_id: values.career_opportunity_id,
          career_category_id: values.career_category_id,
          career_open_position_id_career_open_position_translations: [
            {
              job_title: values.job_title.en,
              job_description: values.job_description.en,
              language: "en",
            },
          ],
        },
      } as any);
      toast.success(t("cms.careers.openPositions.messages.created"));
      onClose();
      if (refetch) refetch();
    } catch (error: any) {
      toast.error(error?.message || t("cms.careers.openPositions.messages.error", { action: "create" }));
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{t("cms.careers.openPositions.modals.createTitle")}</DialogTitle>
        </DialogHeader>
        <CareerOpenPositionForm
          onSubmit={handleSubmit}
          isLoading={createMutation.isPending}
          submitLabel={t("cms.careers.openPositions.form.create")}
        />
      </DialogContent>
    </Dialog>
  );
}

