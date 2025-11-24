import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/shared/components/ui/dialog";
import { useEventsSpeakersControllerCreate } from "@/sdk/modules/eventsspeaker.gen";
import { useModal } from "@/shared/store/modal-store";
import { EventsSpeakersForm } from "./EventsSpeakersForm";
import { toast } from "sonner";
import { useLang } from "@/shared/hooks/use-lang";
import type { CreateEventsSpeakersFormValues } from "../schemas/events-speakers.schema";

export const CreateEventsSpeakersModal = () => {
  const { t } = useLang();
  const { isOpen, type, onClose, refetch } = useModal();
  const createMutation = useEventsSpeakersControllerCreate();

  const open = isOpen && type === "createEventsSpeakers";

  const handleSubmit = async (values: CreateEventsSpeakersFormValues) => {
    const cards = values.cards.map((card) => ({
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
      await createMutation.mutateAsync({
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
      toast.success(t("cms.events.speakers.messages.created"));
      onClose();
      await refetch?.();
    } catch (error: any) {
      toast.error(
        error?.message || t("cms.events.speakers.messages.errorCreating")
      );
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{t("cms.events.speakers.createTitle")}</DialogTitle>
        </DialogHeader>
        <EventsSpeakersForm
          submitLabel={t("cms.events.speakers.actions.create")}
          onSubmit={handleSubmit}
          isLoading={createMutation.isPending}
        />
      </DialogContent>
    </Dialog>
  );
};

