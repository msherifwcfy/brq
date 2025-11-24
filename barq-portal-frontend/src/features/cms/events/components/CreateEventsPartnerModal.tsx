import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/shared/components/ui/dialog";
import { useEventsPartnerControllerCreate } from "@/sdk/modules/eventspartner.gen";
import { useModal } from "@/shared/store/modal-store";
import { EventsPartnerForm } from "./EventsPartnerForm";
import { toast } from "sonner";
import { useLang } from "@/shared/hooks/use-lang";
import type { CreateEventsPartnerFormValues } from "../schemas/events-partner.schema";

export const CreateEventsPartnerModal = () => {
  const { t } = useLang();
  const { isOpen, type, onClose, refetch } = useModal();
  const createMutation = useEventsPartnerControllerCreate();

  const open = isOpen && type === "createEventsPartner";

  const handleSubmit = async (values: CreateEventsPartnerFormValues) => {
    const logos = values.logos.map((logo) => ({ id: logo.id }));
    try {
      await createMutation.mutateAsync({
        body: {
          title: values.title.ar,
          sub_title: values.subTitle.ar,
          logos: logos.length ? logos : undefined,
          events_partner_id_events_partner_translations: [
            {
              language: "en",
              title: values.title.en,
              sub_title: values.subTitle.en,
            },
          ],
        } as any,
      });
      toast.success(t("cms.events.partners.messages.created"));
      onClose();
      await refetch?.();
    } catch (error: any) {
      toast.error(
        error?.message || t("cms.events.partners.messages.errorCreating")
      );
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{t("cms.events.partners.createTitle")}</DialogTitle>
        </DialogHeader>
        <EventsPartnerForm
          submitLabel={t("cms.events.partners.actions.create")}
          onSubmit={handleSubmit}
          isLoading={createMutation.isPending}
        />
      </DialogContent>
    </Dialog>
  );
};

