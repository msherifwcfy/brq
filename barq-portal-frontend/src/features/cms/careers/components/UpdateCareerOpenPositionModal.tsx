import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/shared/components/ui/dialog";
import { useModal } from "@/shared/store/modal-store";
import { CareerOpenPositionForm } from "./CareerOpenPositionForm";
import { useCareerOpenPositionControllerUpdate } from "@/sdk/modules/careeropenposition.gen";
import { toast } from "sonner";
import { useLang } from "@/shared/hooks/use-lang";
import type { CareerOpenPositionFormData } from "../schemas/career-open-position.schema";
import type { CareerOpenPositionEntity } from "@/sdk";

export function UpdateCareerOpenPositionModal() {
  const { t } = useLang();
  const { isOpen, type, onClose, refetch, data } = useModal();
  const open = isOpen && type === "updateCareerOpenPosition";
  const updateMutation = useCareerOpenPositionControllerUpdate();
  const position = data?.position as CareerOpenPositionEntity;

  const handleSubmit = async (values: CareerOpenPositionFormData) => {
    if (!position) return;

    try {
      await updateMutation.mutateAsync({
        path: { id: String(position.id) },
        body: {
          job_title: values.job_title.ar,
          job_description: values.job_description.ar,
          opening_date: values.opening_date ? values.opening_date.toISOString() : undefined,
          closing_date: values.closing_date ? values.closing_date.toISOString() : undefined,
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
      });
      toast.success(t("cms.careers.openPositions.messages.updated"));
      onClose();
      if (refetch) refetch();
    } catch (error: any) {
      toast.error(error?.message || t("cms.careers.openPositions.messages.error", { action: "update" }));
    }
  };

  if (!position) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{t("cms.careers.openPositions.modals.updateTitle")}</DialogTitle>
        </DialogHeader>
        <CareerOpenPositionForm
          position={position}
          onSubmit={handleSubmit}
          isLoading={updateMutation.isPending}
          submitLabel={t("cms.careers.openPositions.form.update")}
        />
      </DialogContent>
    </Dialog>
  );
}

