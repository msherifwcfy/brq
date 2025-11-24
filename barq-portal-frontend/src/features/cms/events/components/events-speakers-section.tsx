import { useEffect, useState, useMemo, useRef } from "react";
import { Button } from "@/shared/components/ui/button";
import { useLang } from "@/shared/hooks/use-lang";
import { type LanguageCode } from "@/shared/constants";
import {
  useEventsSpeakersControllerReadQuery,
  useEventsSpeakersControllerCreate,
  useEventsSpeakersControllerUpdate,
} from "@/sdk/modules/eventsspeaker.gen";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shared/components/ui/form";
import {
  I18nFormTextField,
  I18nTabs,
  I18nTabContent,
  I18nFormProvider,
} from "@/shared/components/custom/i18n";
import { DocumentUploader } from "@/shared/components/custom/DocumentUploader";
import { toast } from "sonner";
import {
  createEventsSpeakersSchema,
  updateEventsSpeakersSchema,
  type CreateEventsSpeakersFormValues,
  type UpdateEventsSpeakersFormValues,
} from "../schemas/events-speakers.schema";
import { PlusIcon } from "lucide-react";

export default function EventsSpeakersSection() {
  const { t } = useLang();
  const [currentLanguage, setCurrentLanguage] = useState<LanguageCode>("en");

  const { data, isLoading, refetch } = useEventsSpeakersControllerReadQuery({
    query: {
      query: {
        relations: {
          events_speakers_id_events_speakers_translations: true,
          events_speakers_cards_id_events_speakers_cards: {
            events_speakers_cards_id_events_speakers_cards_translations: true,
            image: true,
          },
        },
        pagination: { take: 1, skip: 0 },
      },
    },
    headers: {
      "x-skip-translations": "true",
    },
  });

  const existing = data?.data?.[0];
  const cards = existing?.events_speakers_cards_id_events_speakers_cards || [];

  const createMutation = useEventsSpeakersControllerCreate();
  const updateMutation = useEventsSpeakersControllerUpdate();

  const isUpdate = !!existing;
  const form = useForm<CreateEventsSpeakersFormValues | UpdateEventsSpeakersFormValues>({
    resolver: zodResolver(
      isUpdate ? updateEventsSpeakersSchema : createEventsSpeakersSchema
    ),
    defaultValues: {
      title: { en: "", ar: "" },
      cards: [],
    } as any,
  });

  const existingIdRef = useRef<number | undefined>(undefined);
  const cardsIdsRef = useRef<string>("");

  useEffect(() => {
    const currentExistingId = existing?.id;
    const currentCardsIds = cards.map((c) => c.id).join(",");

    if (existingIdRef.current === currentExistingId && cardsIdsRef.current === currentCardsIds) {
      return;
    }

    existingIdRef.current = currentExistingId;
    cardsIdsRef.current = currentCardsIds;

    if (!existing) {
      form.reset({
        title: { en: "", ar: "" },
        cards: [],
      } as any);
      return;
    }

    const enTranslation = existing.events_speakers_id_events_speakers_translations?.find(
      (t) => t.language === "en"
    );
    const arTranslation = existing.events_speakers_id_events_speakers_translations?.find(
      (t) => t.language === "ar"
    );

    const cardsData = cards.map((card) => {
      const enCardTranslation = card.events_speakers_cards_id_events_speakers_cards_translations?.find(
        (t) => t.language === "en"
      );
      const arCardTranslation = card.events_speakers_cards_id_events_speakers_cards_translations?.find(
        (t) => t.language === "ar"
      );

      return {
        id: card.id,
        name: {
          en: enCardTranslation?.name || card.name || "",
          ar: arCardTranslation?.name || card.name || "",
        },
        role: {
          en: enCardTranslation?.role || card.role || "",
          ar: arCardTranslation?.role || card.role || "",
        },
        image: card.image?.id
          ? [
              {
                id: card.image.id,
                url: card.image.url,
                key: card.image.key,
                format: card.image.format,
                mime_type: card.image.mime_type,
                size: card.image.size,
              },
            ]
          : [],
      };
    });

    form.reset({
      title: {
        en: enTranslation?.title || existing.title || "",
        ar: arTranslation?.title || existing.title || "",
      },
      cards: cardsData,
    } as any);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [existing?.id, cards.length]);

  const handleAddCard = () => {
    const currentCards = form.getValues("cards") || [];
    if (currentCards.length >= 8) {
      toast.error(t("cms.events.speakers.cards.validation.maxCards"));
      return;
    }
    form.setValue("cards", [
      ...currentCards,
      {
        name: { en: "", ar: "" },
        role: { en: "", ar: "" },
        image: [],
      },
    ] as any);
  };

  const handleDeleteCard = (index: number) => {
    const currentCards = form.getValues("cards") || [];
    if (currentCards.length <= 1) {
      toast.error(t("cms.events.speakers.cards.validation.minCards"));
      return;
    }
    form.setValue(
      "cards",
      currentCards.filter((_, i) => i !== index) as any
    );
  };

  const onSubmit = async (values: CreateEventsSpeakersFormValues | UpdateEventsSpeakersFormValues) => {
    try {
      const cardsData = (values.cards || []).map((card: any) => {
        const imageId = Array.isArray(card.image) ? card.image?.[0]?.id : undefined;
        return {
          name: card.name?.ar || "",
          role: card.role?.ar || "",
          image_id: imageId,
          events_speakers_cards_id_events_speakers_cards_translations: [
            {
              name: card.name?.en || "",
              role: card.role?.en || "",
              language: "en" as const,
            },
          ],
        };
      });

      if (existing) {
        await updateMutation.mutateAsync({
          path: { id: String(existing.id) },
          body: {
            title: values.title?.ar || "",
            events_speakers_id_events_speakers_translations: [
              {
                title: values.title?.en || "",
                language: "en" as const,
              },
            ],
            events_speakers_cards_id_events_speakers_cards: cardsData,
          },
        });
        toast.success(t("cms.events.speakers.messages.updated"));
      } else {
        await createMutation.mutateAsync({
          body: {
            title: values.title?.ar || "",
            events_speakers_id_events_speakers_translations: [
              {
                title: values.title?.en || "",
                language: "en" as const,
              },
            ],
            events_speakers_cards_id_events_speakers_cards: cardsData,
          },
        });
        toast.success(t("cms.events.speakers.messages.created"));
      }
      await refetch();
    } catch (error: any) {
      toast.error(error?.message || t("cms.events.speakers.messages.error"));
    }
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const formCards = useMemo(() => form.watch("cards") || [], [form.watch("cards")]);

  if (isLoading) return <div>{t("cms.events.speakers.messages.loading")}</div>;

  return (
    <div className="space-y-6">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">{t("cms.events.speakers.hero.title")}</h3>
            <I18nTabs
              value={currentLanguage}
              onValueChange={setCurrentLanguage}
              className="w-full"
            >
              <I18nFormProvider currentLanguage={currentLanguage}>
                <I18nTabContent language="en">
                  <div className="grid gap-4">
                    <I18nFormTextField
                      name="title"
                      control={form.control}
                      label={t("cms.events.speakers.hero.form.title")}
                      required
                    />
                  </div>
                </I18nTabContent>
                <I18nTabContent language="ar">
                  <div className="grid gap-4">
                    <I18nFormTextField
                      name="title"
                      control={form.control}
                      label={t("cms.events.speakers.hero.form.title")}
                      required
                    />
                  </div>
                </I18nTabContent>
              </I18nFormProvider>
            </I18nTabs>
          </div>

          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">{t("cms.events.speakers.cards.title")}</h3>
              <Button
                type="button"
                onClick={handleAddCard}
                disabled={formCards.length >= 8}
                size="sm"
              >
            <PlusIcon className="w-4 h-4 mr-2" />
                {t("cms.events.speakers.cards.addCard")}
              </Button>
            </div>

            {formCards.map((card: any, index: number) => (
              <div key={index} className="border rounded-lg p-4 space-y-4">
                <div className="flex justify-between items-center">
                  <h4 className="font-medium">{t("cms.events.speakers.cards.cardNumber", { index: index + 1 })}</h4>
                  <Button
                    type="button"
                    variant="destructive"
                    size="sm"
                    onClick={() => handleDeleteCard(index)}
                  >
                    {t("common.delete")}
          </Button>
      </div>

                <I18nTabs
                  value={currentLanguage}
                  onValueChange={setCurrentLanguage}
                  className="w-full"
                >
                  <I18nFormProvider currentLanguage={currentLanguage}>
                    <I18nTabContent language="en">
                      <div className="grid gap-4">
                        <I18nFormTextField
                          name={`cards.${index}.name` as any}
                          control={form.control}
                          label={t("cms.events.speakers.cards.form.name")}
                          required
                        />
                        <I18nFormTextField
                          name={`cards.${index}.role` as any}
                          control={form.control}
                          label={t("cms.events.speakers.cards.form.role")}
                          required
                        />
                      </div>
                    </I18nTabContent>
                    <I18nTabContent language="ar">
                      <div className="grid gap-4">
                        <I18nFormTextField
                          name={`cards.${index}.name` as any}
                          control={form.control}
                          label={t("cms.events.speakers.cards.form.name")}
                          required
                        />
                        <I18nFormTextField
                          name={`cards.${index}.role` as any}
                          control={form.control}
                          label={t("cms.events.speakers.cards.form.role")}
                          required
                        />
                      </div>
                    </I18nTabContent>
                  </I18nFormProvider>
                </I18nTabs>

                <FormField
                  control={form.control}
                  name={`cards.${index}.image` as any}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t("cms.events.speakers.cards.form.image")}</FormLabel>
                      <FormControl>
                        <DocumentUploader
                          value={(field.value as any) || []}
                          maxDocuments={1}
                          maxSize={5 * 1024 * 1024}
                          acceptedFileTypes={["image/*"]}
                          onChange={field.onChange}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            ))}
          </div>

          <div className="flex justify-end">
            <Button
              type="submit"
              loading={createMutation.isPending || updateMutation.isPending}
            >
              {existing ? t("cms.events.speakers.buttons.update") : t("cms.events.speakers.buttons.create")}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}

