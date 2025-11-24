import { useEffect, useState, useMemo, useRef } from "react";
import { Button } from "@/shared/components/ui/button";
import { useLang } from "@/shared/hooks/use-lang";
import { type LanguageCode } from "@/shared/constants";
import {
  useCareerWorkingAtBarqControllerReadQuery,
  useCareerWorkingAtBarqControllerCreate,
  useCareerWorkingAtBarqControllerUpdate,
} from "@/sdk/modules/careerworkingatbarq.gen";
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
  I18nFormTextareaField,
  I18nTabs,
  I18nTabContent,
  I18nFormProvider,
} from "@/shared/components/custom/i18n";
import { DocumentUploader } from "@/shared/components/custom/DocumentUploader";
import { toast } from "sonner";
import {
  createCareerWorkingAtBarqSchema,
  updateCareerWorkingAtBarqSchema,
  type CreateCareerWorkingAtBarqFormData,
  type UpdateCareerWorkingAtBarqFormData,
} from "../schemas/career-working-at-barq.schema";
import { PlusIcon } from "lucide-react";

export default function CareerWorkingAtBarqSection() {
  const { t } = useLang();
  const [currentLanguage, setCurrentLanguage] = useState<LanguageCode>("en");

  const { data, isLoading, refetch } = useCareerWorkingAtBarqControllerReadQuery({
    query: {
      query: {
        relations: {
          career_working_at_barq_id_career_working_at_barq_translations: true,
          career_working_at_barq_cards_id_career_working_at_barq_cards: {
            icon: true,
            career_working_at_barq_cards_id_career_working_at_barq_cards_translations: true,
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
  const cards = existing?.career_working_at_barq_cards_id_career_working_at_barq_cards || [];

  const createMutation = useCareerWorkingAtBarqControllerCreate();
  const updateMutation = useCareerWorkingAtBarqControllerUpdate();

  const isUpdate = !!existing;
  const form = useForm<CreateCareerWorkingAtBarqFormData | UpdateCareerWorkingAtBarqFormData>({
    resolver: zodResolver(
      isUpdate ? updateCareerWorkingAtBarqSchema : createCareerWorkingAtBarqSchema
    ),
    defaultValues: {
      title: { en: "", ar: "" },
      sub_title: { en: "", ar: "" },
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
        sub_title: { en: "", ar: "" },
        cards: [],
      } as any);
      return;
    }

    const enTranslation = existing.career_working_at_barq_id_career_working_at_barq_translations?.find(
      (t) => t.language === "en"
    );
    const arTranslation = existing.career_working_at_barq_id_career_working_at_barq_translations?.find(
      (t) => t.language === "ar"
    );

    const cardsData = cards.map((card) => {
      const enCardTranslation = card.career_working_at_barq_cards_id_career_working_at_barq_cards_translations?.find(
        (t) => t.language === "en"
      );
      return {
        id: card.id,
        title: {
          en: enCardTranslation?.title || card.title || "",
          ar:  card.title || "",
        },
        sub_title: {
          en: enCardTranslation?.sub_title || card.sub_title || "",
          ar: card.sub_title || "",
        },
        icon: card.icon?.id
          ? [
              {
                id: card.icon.id,
                url: card.icon.url,
                key: card.icon.key,
                format: card.icon.format,
                mime_type: card.icon.mime_type,
                size: card.icon.size,
              },
            ]
          : [],
      };
    });

    form.reset({
      title: {
        en: enTranslation?.title || existing.title || "",
        ar: existing.title || "",
      },
      sub_title: {
        en: enTranslation?.sub_title || existing.sub_title || "",
        ar: existing.sub_title || "",
      },
      cards: cardsData,
    } as any);
  }, [existing?.id, cards.length]);

  const handleAddCard = () => {
    const currentCards = form.getValues("cards") || [];
    form.setValue("cards", [
      ...currentCards,
      {
        title: { en: "", ar: "" },
        sub_title: { en: "", ar: "" },
        icon: [],
      },
    ] as any);
  };

  const handleDeleteCard = (index: number) => {
    const currentCards = form.getValues("cards") || [];
    if (currentCards.length <= 1) {
      toast.error(t("cms.careers.workingAtBarq.cards.validation.minCards"));
      return;
    }
    form.setValue(
      "cards",
      currentCards.filter((_, i) => i !== index) as any
    );
  };

  const onSubmit = async (values: CreateCareerWorkingAtBarqFormData | UpdateCareerWorkingAtBarqFormData) => {
    try {
      const cardsData = (values.cards || []).map((card: any) => {
        const iconId = Array.isArray(card.icon) ? card.icon?.[0]?.id : undefined;
        return {
          title: card.title?.ar || "",
          sub_title: card.sub_title?.ar || "",
          icon_id: iconId,
          career_working_at_barq_cards_id_career_working_at_barq_cards_translations: [
            {
              title: card.title?.en || "",
              sub_title: card.sub_title?.en || "",
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
            sub_title: values.sub_title?.ar || "",
            career_working_at_barq_id_career_working_at_barq_translations: [
              {
                title: values.title?.en || "",
                sub_title: values.sub_title?.en || "",
                language: "en" as const,
              },
            ],
            career_working_at_barq_cards_id_career_working_at_barq_cards: cardsData,
          },
        });
        toast.success(t("cms.careers.workingAtBarq.messages.updated"));
      } else {
        await createMutation.mutateAsync({
          body: {
            title: values.title?.ar || "",
            sub_title: values.sub_title?.ar || "",
            career_working_at_barq_id_career_working_at_barq_translations: [
              {
                title: values.title?.en || "",
                sub_title: values.sub_title?.en || "",
                language: "en" as const,
              },
            ],
            career_working_at_barq_cards_id_career_working_at_barq_cards: cardsData,
          },
        });
        toast.success(t("cms.careers.workingAtBarq.messages.created"));
      }
      await refetch();
    } catch (error: any) {
      toast.error(error?.message || t("cms.careers.workingAtBarq.messages.error"));
    }
  };

  const formCards = useMemo(() => form.watch("cards") || [], [form.watch("cards")]);

  if (isLoading) return <div>{t("cms.careers.workingAtBarq.messages.loading")}</div>;

  return (
    <div className="space-y-6">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">{t("cms.careers.workingAtBarq.hero.title")}</h3>
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
                      label={t("cms.careers.workingAtBarq.hero.form.title")}
                      required
                    />
                    <I18nFormTextareaField
                      name="sub_title"
                      control={form.control}
                      label={t("cms.careers.workingAtBarq.hero.form.subTitle")}
                      required
                    />
                  </div>
                </I18nTabContent>
                <I18nTabContent language="ar">
                  <div className="grid gap-4">
                    <I18nFormTextField
                      name="title"
                      control={form.control}
                      label={t("cms.careers.workingAtBarq.hero.form.title")}
                      required
                    />
                    <I18nFormTextareaField
                      name="sub_title"
                      control={form.control}
                      label={t("cms.careers.workingAtBarq.hero.form.subTitle")}
                      required
                    />
                  </div>
                </I18nTabContent>
              </I18nFormProvider>
            </I18nTabs>
          </div>

          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">{t("cms.careers.workingAtBarq.cards.title")}</h3>
              <Button
                type="button"
                onClick={handleAddCard}
                size="sm"
              >
                <PlusIcon className="w-4 h-4 mr-2" />
                {t("cms.careers.workingAtBarq.cards.addCard")}
              </Button>
            </div>

            {formCards.map((card: any, index: number) => (
              <div key={index} className="border rounded-lg p-4 space-y-4">
                <div className="flex justify-between items-center">
                  <h4 className="font-medium">{t("cms.careers.workingAtBarq.cards.cardNumber", { index: index + 1 })}</h4>
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
                          name={`cards.${index}.title` as any}
                          control={form.control}
                          label={t("cms.careers.workingAtBarq.cards.form.title")}
                          required
                        />
                        <I18nFormTextareaField
                          name={`cards.${index}.sub_title` as any}
                          control={form.control}
                          label={t("cms.careers.workingAtBarq.cards.form.subTitle")}
                          required
                        />
                      </div>
                    </I18nTabContent>
                    <I18nTabContent language="ar">
                      <div className="grid gap-4">
                        <I18nFormTextField
                          name={`cards.${index}.title` as any}
                          control={form.control}
                          label={t("cms.careers.workingAtBarq.cards.form.title")}
                          required
                        />
                        <I18nFormTextareaField
                          name={`cards.${index}.sub_title` as any}
                          control={form.control}
                          label={t("cms.careers.workingAtBarq.cards.form.subTitle")}
                          required
                        />
                      </div>
                    </I18nTabContent>
                  </I18nFormProvider>
                </I18nTabs>

                <FormField
                  control={form.control}
                  name={`cards.${index}.icon` as any}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t("cms.careers.workingAtBarq.cards.form.icon")}</FormLabel>
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
              {existing ? t("cms.careers.workingAtBarq.buttons.update") : t("cms.careers.workingAtBarq.buttons.create")}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}

