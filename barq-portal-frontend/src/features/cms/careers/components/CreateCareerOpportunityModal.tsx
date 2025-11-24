import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/shared/components/ui/dialog";
import { useModal } from "@/shared/store/modal-store";
import { CareerOpportunityForm } from "./CareerOpportunityForm";
import { useCareerOpportunityControllerCreate } from "@/sdk/modules/careeropportunity.gen";
import { toast } from "sonner";
import { useLang } from "@/shared/hooks/use-lang";
import type { CareerOpportunityFormData } from "../schemas/career-opportunity.schema";

export function CreateCareerOpportunityModal() {
  const { t } = useLang();
  const { isOpen, type, onClose, refetch } = useModal();
  const open = isOpen && type === "createCareerOpportunity";
  const createMutation = useCareerOpportunityControllerCreate();

  const handleSubmit = async (values: CareerOpportunityFormData) => {
    try {
      await createMutation.mutateAsync({
        body: {
          name: values.name.ar,
          career_opportunity_id_career_opportunity_translations: [
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
      toast.success(t("cms.careers.manageItems.opportunities.messages.created"));
      onClose();
      if (refetch) refetch();
    } catch (error: any) {
      toast.error(error?.message || t("cms.careers.manageItems.opportunities.messages.error", { action: "create" }));
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{t("cms.careers.manageItems.opportunities.modals.createTitle")}</DialogTitle>
        </DialogHeader>
        <CareerOpportunityForm
          onSubmit={handleSubmit}
          isLoading={createMutation.isPending}
          submitLabel={t("cms.careers.manageItems.opportunities.form.create")}
        />
      </DialogContent>
    </Dialog>
  );
}

