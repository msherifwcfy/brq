import { useMemo } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/shared/components/ui/dialog";
import { useEventsPartnerControllerUpdate } from "@/sdk/modules/eventspartner.gen";
import { useModal } from "@/shared/store/modal-store";
import { EventsPartnerForm } from "./EventsPartnerForm";
import { toast } from "sonner";
import { useLang } from "@/shared/hooks/use-lang";
import type { CreateEventsPartnerFormValues } from "../schemas/events-partner.schema";
import type { EventsPartnerEntity } from "@/sdk/types.gen";
import { type DocumentUploadValue } from "@/shared/components/custom/DocumentUploader";

export const UpdateEventsPartnerModal = () => {
  const { t } = useLang();
  const { isOpen, type, onClose, data, refetch } = useModal();
  const updateMutation = useEventsPartnerControllerUpdate();

  const open = isOpen && type === "updateEventsPartner";
  const partner = data?.partner as EventsPartnerEntity | undefined;

  const defaultValues = useMemo<Partial<CreateEventsPartnerFormValues>>(() => {
    if (!partner) return {};
    const translations = partner.events_partner_id_events_partner_translations || [];
    const en = translations.find((translation) => translation.language === "en");
    const ar = translations.find((translation) => translation.language === "ar");
    const logos =
      partner.logos?.map<DocumentUploadValue>((logo) => ({
        id: logo.id,
        url: logo.url,
        key: logo.key,
        format: logo.format,
        mime_type: logo.mime_type,
        size: logo.size,
        name: logo.key,
      })) || [];

    return {
      title: {
        en: en?.title || "",
        ar: partner.title || ar?.title || "",
      },
      subTitle: {
        en: en?.sub_title || "",
        ar: partner.sub_title || ar?.sub_title || "",
      },
      logos,
    };
  }, [partner]);

  const handleSubmit = async (values: CreateEventsPartnerFormValues) => {
    if (!partner) return;
    const logos = values.logos?.map((logo) => ({ id: logo.id }));
    try {
      await updateMutation.mutateAsync({
        path: { id: String(partner.id) },
        body: {
          title: values.title?.ar ?? partner.title,
          sub_title: values.subTitle?.ar ?? partner.sub_title,
          logos: logos && logos.length ? logos : undefined,
          events_partner_id_events_partner_translations: [
            {
              language: "en",
              title: values.title?.en ?? "",
              sub_title: values.subTitle?.en ?? "",
            },
          ],
        } as any,
      });
      toast.success(t("cms.events.partners.messages.updated"));
      onClose();
      await refetch?.();
    } catch (error: any) {
      toast.error(
        error?.message || t("cms.events.partners.messages.errorUpdating")
      );
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{t("cms.events.partners.updateTitle")}</DialogTitle>
        </DialogHeader>
        <EventsPartnerForm
          defaultValues={defaultValues}
          submitLabel={t("cms.events.partners.actions.update")}
          onSubmit={handleSubmit}
          isLoading={updateMutation.isPending}
        />
      </DialogContent>
    </Dialog>
  );
};

