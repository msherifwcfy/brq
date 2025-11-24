import { useMemo } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/shared/components/ui/dialog";
import { useEventsSpeakersControllerUpdate } from "@/sdk/modules/eventsspeaker.gen";
import { useModal } from "@/shared/store/modal-store";
import { EventsSpeakersForm } from "./EventsSpeakersForm";
import { toast } from "sonner";
import { useLang } from "@/shared/hooks/use-lang";
import type { CreateEventsSpeakersFormValues } from "../schemas/events-speakers.schema";
import type { EventsSpeakersEntity } from "@/sdk/types.gen";
import { type DocumentUploadValue } from "@/shared/components/custom/DocumentUploader";

export const UpdateEventsSpeakersModal = () => {
  const { t } = useLang();
  const { isOpen, type, onClose, data, refetch } = useModal();
  const updateMutation = useEventsSpeakersControllerUpdate();

  const open = isOpen && type === "updateEventsSpeakers";
  const speakers = data?.speakers as EventsSpeakersEntity | undefined;

  const defaultValues = useMemo<Partial<CreateEventsSpeakersFormValues>>(() => {
    if (!speakers) return {};
    const translations = speakers.events_speakers_id_events_speakers_translations || [];
    const en = translations.find((translation) => translation.language === "en");
    const ar = translations.find((translation) => translation.language === "ar");

    const cards =
      speakers.events_speakers_cards_id_events_speakers_cards?.map((card) => {
        const cardTranslations =
          card.events_speakers_cards_id_events_speakers_cards_translations || [];
        const enCard = cardTranslations.find((translation) => translation.language === "en");
        const arCard = cardTranslations.find((translation) => translation.language === "ar");

        const image = card.image
          ? [
              {
                id: card.image.id,
                url: card.image.url,
                key: card.image.key,
                format: card.image.format,
                mime_type: card.image.mime_type,
                size: card.image.size,
                name: card.image.key,
              } satisfies DocumentUploadValue,
            ]
          : [];

        return {
          id: card.id,
          name: {
            en: enCard?.name || "",
            ar: card.name || arCard?.name || "",
          },
          role: {
            en: enCard?.role || "",
            ar: card.role || arCard?.role || "",
          },
          image,
        };
      }) || [];

    return {
      title: {
        en: en?.title || "",
        ar: speakers.title || ar?.title || "",
      },
      cards,
    };
  }, [speakers]);

  const handleSubmit = async (values: CreateEventsSpeakersFormValues) => {
    if (!speakers) return;

    const cards = values.cards.map((card) => ({
      ...(card.id ? { id: card.id } : {}),
      name: card.name.ar,
      role: card.role.ar,
      image_id: card.image?.[0]?.id,
      events_speakers_cards_id_events_speakers_cards_translations: [
        {
          language: "en",
          name: card.name.en,
          role: card.role.en,
        },
      ],
    }));

    try {
      await updateMutation.mutateAsync({
        path: { id: String(speakers.id) },
        body: {
          title: values.title.ar,
          events_speakers_id_events_speakers_translations: [
            {
              language: "en",
              title: values.title.en,
            },
          ],
          events_speakers_cards_id_events_speakers_cards: cards,
        } as any,
      });
      toast.success(t("cms.events.speakers.messages.updated"));
      onClose();
      await refetch?.();
    } catch (error: any) {
      toast.error(
        error?.message || t("cms.events.speakers.messages.errorUpdating")
      );
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{t("cms.events.speakers.updateTitle")}</DialogTitle>
        </DialogHeader>
        <EventsSpeakersForm
          defaultValues={defaultValues}
          submitLabel={t("cms.events.speakers.actions.update")}
          onSubmit={handleSubmit}
          isLoading={updateMutation.isPending}
        />
      </DialogContent>
    </Dialog>
  );
};

