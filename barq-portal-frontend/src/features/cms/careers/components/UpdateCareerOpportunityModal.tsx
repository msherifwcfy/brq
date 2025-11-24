import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/shared/components/ui/dialog";
import { useModal } from "@/shared/store/modal-store";
import { CareerOpportunityForm } from "./CareerOpportunityForm";
import { useCareerOpportunityControllerUpdate } from "@/sdk/modules/careeropportunity.gen";
import { toast } from "sonner";
import { useLang } from "@/shared/hooks/use-lang";
import type { CareerOpportunityFormData } from "../schemas/career-opportunity.schema";

export function UpdateCareerOpportunityModal() {
  const { t } = useLang();
  const { isOpen, type, onClose, refetch, data } = useModal();
  const open = isOpen && type === "updateCareerOpportunity";
  const updateMutation = useCareerOpportunityControllerUpdate();
  const opportunity = data?.opportunity;

  const handleSubmit = async (values: CareerOpportunityFormData) => {
    if (!opportunity) return;

    try {
      await updateMutation.mutateAsync({
        path: { id: String(opportunity.id) },
        body: {
          name: values.name.ar,
          career_opportunity_id_career_opportunity_translations: [
            {
              name: values.name.en,
              language: "en",
            },
          ],
        },
      } as any);
      toast.success(t("cms.careers.manageItems.opportunities.messages.updated"));
      onClose();
      if (refetch) refetch();
    } catch (error: any) {
      toast.error(error?.message || t("cms.careers.manageItems.opportunities.messages.error", { action: "update" }));
    }
  };

  if (!opportunity) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{t("cms.careers.manageItems.opportunities.modals.updateTitle")}</DialogTitle>
        </DialogHeader>
        <CareerOpportunityForm
          opportunity={opportunity}
          onSubmit={handleSubmit}
          isLoading={updateMutation.isPending}
          submitLabel={t("cms.careers.manageItems.opportunities.form.update")}
        />
      </DialogContent>
    </Dialog>
  );
}

