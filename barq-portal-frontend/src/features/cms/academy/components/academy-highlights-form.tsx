import { useEffect, useState } from "react";
import { Button } from "@/shared/components/ui/button";
import { PlusIcon } from "lucide-react";
import { useLang } from "@/shared/hooks/use-lang";
import { type LanguageCode } from "@/shared/constants";
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
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useFieldArray } from "react-hook-form";
import {
  createAcademyHighlightsSchema,
  updateAcademyHighlightsSchema,
  type CreateAcademyHighlightsFormData,
  type UpdateAcademyHighlightsFormData,
} from "../schemas/academy-highlights.schema";
import { toast } from "sonner";
import {
  useBarqAcademyHighlightsControllerReadQuery,
  useBarqAcademyHighlightsControllerCreate,
  useBarqAcademyHighlightsControllerUpdate,
} from "@/sdk/modules/barqacademyhighlight.gen";
import { DocumentUploader } from "@/shared/components/custom/DocumentUploader";
import { Input } from "@/shared/components/ui/input";

export default function AcademyHighlightsForm() {
  const { t } = useLang();
  const [currentLanguage, setCurrentLanguage] = useState<LanguageCode>("en");
  const [cardsError, setCardsError] = useState("");

  const { data, isLoading, refetch } = useBarqAcademyHighlightsControllerReadQuery({
    query: {
      query: {
        relations: {
          barq_academy_highlights_id_barq_academy_highlights_translations: true,
          barq_academy_highlights_cards_id_barq_academy_highlights_cards: {
            icon: true,
            barq_academy_highlights_cards_id_barq_academy_highlights_cards_translations: true,
          },
        },
        pagination: { skip: 0, take: 1 },
      },
    },
    headers: {
      "x-skip-translations": "true",
    },
  });

  const existing = data?.data?.[0];

  const createMutation = useBarqAcademyHighlightsControllerCreate();
  const updateMutation = useBarqAcademyHighlightsControllerUpdate();

  const isUpdate = !!existing;

  type FormData = CreateAcademyHighlightsFormData | UpdateAcademyHighlightsFormData;
  const form = useForm<FormData>({
    resolver: zodResolver(
      isUpdate ? updateAcademyHighlightsSchema : createAcademyHighlightsSchema
    ),
    defaultValues: {
      title: { en: "", ar: "" },
      sub_title: { en: "", ar: "" },
      cards: [],
    } as unknown as FormData,
    mode: "onChange",
  });

  useEffect(() => {
    if (!existing || isLoading) return;

    const translations = existing.barq_academy_highlights_id_barq_academy_highlights_translations || [];
    const enTranslation = translations.find((t) => t.language === "en");

    const cards = existing.barq_academy_highlights_cards_id_barq_academy_highlights_cards || [];
    const formattedCards = cards.map((card) => {
      const cardTranslations = card.barq_academy_highlights_cards_id_barq_academy_highlights_cards_translations || [];
      const enCardTranslation = cardTranslations.find((t) => t.language === "en");

      return {
        icon: card.icon ? [{ ...card.icon }] : [],
        title: {
          en: enCardTranslation?.title  || "",
          ar:  card.title || "",
        },
        state_title_one: {
          en: enCardTranslation?.state_title_one   || "",
          ar:  card.state_title_one || "",
        },
        state_number_one: card.state_number_one,
        state_title_two: {
          en: enCardTranslation?.state_title_two  || "",
          ar:  card.state_title_two || "",
        },
        state_number_two: card.state_number_two ?? 0,
        state_title_three: {
          en: enCardTranslation?.state_title_three  || "",
          ar:  card.state_title_three || "",
        },
        state_number_three: card.state_number_three ?? 0,
        state_title_four: {
          en: (enCardTranslation as any)?.state_title_four  || "",
          ar:  (card as any).state_title_four || "",
        },
        state_number_four: (card as any).state_number_four ?? 0,
      };
    });

    form.reset({
      title: {
        en: enTranslation?.title  || "",
        ar:  existing.title || "",
      },
      sub_title: {
        en: enTranslation?.sub_title  || "",
        ar:  existing.sub_title || "",
      },
      cards: formattedCards,
    } );
  }, [existing, form, isLoading]);

  const { fields: cardFields, append: appendCard, remove: removeCard } = useFieldArray({
    control: form.control,
    name: "cards",
  });

  const onSubmit = async (values: FormData) => {
    try {
      if (existing) {
        await updateMutation.mutateAsync({
          path: { id: String(existing.id) },
          body: {
            title: values.title?.ar || "",
            sub_title: values.sub_title?.ar || "",
            barq_academy_highlights_id_barq_academy_highlights_translations: [
              {
                language: "en",
                title: values.title?.en || "",
                sub_title: values.sub_title?.en || "",
              },
            ],
            barq_academy_highlights_cards_id_barq_academy_highlights_cards: values.cards?.map((card) => ({
              title: card.title?.ar || "",
              state_title_one: card.state_title_one?.ar || "",
              state_number_one: card.state_number_one,
              state_title_two: card.state_title_two?.ar || "",
              state_number_two: card.state_number_two,
              state_title_three: card.state_title_three?.ar || "",
              state_number_three: card.state_number_three,
              state_title_four: card.state_title_four?.ar || "",
              state_number_four: card.state_number_four,
              icon_id: card.icon?.[0]?.id || 0,
              barq_academy_highlights_cards_id_barq_academy_highlights_cards_translations: [
                {
                  language: "en",
                  title: card.title?.en || "",
                  state_title_one: card.state_title_one?.en || "",
                  state_title_two: card.state_title_two?.en || "",
                  state_title_three: card.state_title_three?.en || "",
                  state_title_four: card.state_title_four?.en || "",
                },
              ],
            })) || [],
          },
        });
        toast.success(t("cms.academy.highlights.messages.updated"));
        refetch();
      } else {
        await createMutation.mutateAsync({
          body: {
            title: values.title?.ar || "",
            sub_title: values.sub_title?.ar || "",
            barq_academy_highlights_id_barq_academy_highlights_translations: [
              {
                language: "en",
                title: values.title?.en || "",
                sub_title: values.sub_title?.en || "",
              },
            ],
            barq_academy_highlights_cards_id_barq_academy_highlights_cards: values.cards?.map((card) => ({
              title: card.title?.ar || "",
              state_title_one: card.state_title_one?.ar || "",
              state_number_one: card.state_number_one,
              state_title_two: card.state_title_two?.ar || "",
              state_number_two: card.state_number_two,
              state_title_three: card.state_title_three?.ar || "",
              state_number_three: card.state_number_three,
              state_title_four: card.state_title_four?.ar || "",
              state_number_four: card.state_number_four,
              icon_id: card.icon?.[0]?.id || 0,
              barq_academy_highlights_cards_id_barq_academy_highlights_cards_translations: [
                {
                  language: "en",
                  title: card.title?.en || "",
                  state_title_one: card.state_title_one?.en || "",
                  state_title_two: card.state_title_two?.en || "",
                  state_title_three: card.state_title_three?.en || "",
                  state_title_four: card.state_title_four?.en || "",
                },
              ],
            })) || [],
          },
        });
        toast.success(t("cms.academy.highlights.messages.created"));
        refetch();
      }
    } catch (error: any) {
      toast.error(error?.message || t("cms.academy.highlights.messages.error"));
    }
  };

  const handleAddCard = () => {
    if (cardFields.length >= 4) {
      setCardsError(t("cms.academy.highlights.messages.maxCards"));
      return;
    }
    if (cardsError) {
      setCardsError("");
    }
    appendCard({
      icon: [],
      title: { en: "", ar: "" },
      state_title_one: { en: "", ar: "" },
      state_number_one: 0,
      state_title_two: { en: "", ar: "" },
      state_number_two: 0,
      state_title_three: { en: "", ar: "" },
      state_number_three: 0,
      state_title_four: { en: "", ar: "" },
      state_number_four: 0,
    });
  };

  useEffect(() => {
    if (cardFields.length < 4 && cardsError) {
      setCardsError("");
    }
  }, [cardFields.length, cardsError]);
  if (isLoading) return <div>{t("common.loading")}</div>;

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
                  label={t("cms.academy.highlights.form.title")}
                  placeholder={t("cms.academy.highlights.form.titlePlaceholder")}
                  required
                />
                <I18nFormTextareaField
                  name="sub_title"
                  control={form.control}
                  label={t("cms.academy.highlights.form.subtext")}
                  placeholder={t("cms.academy.highlights.form.subtextPlaceholder")}
                  required
                />
              </div>
            </I18nTabContent>
            <I18nTabContent language="ar">
              <div className="grid gap-4">
                <I18nFormTextField
                  name="title"
                  control={form.control}
                  label={t("cms.academy.highlights.form.title")}
                  placeholder={t("cms.academy.highlights.form.titlePlaceholder")}
                  required
                />
                <I18nFormTextareaField
                  name="sub_title"
                  control={form.control}
                  label={t("cms.academy.highlights.form.subtext")}
                  placeholder={t("cms.academy.highlights.form.subtextPlaceholder")}
                  required
                />
              </div>
            </I18nTabContent>
          </I18nFormProvider>
        </I18nTabs>
<div className="mt-8 space-y-6 border-t pt-6">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="text-lg font-semibold">
              {t("cms.academy.highlights.cards.title")}
            </h3>
            <p className="text-sm text-gray-600 mt-1">
              {t("cms.academy.highlights.cards.description")}
            </p>
          </div>
          <Button
            type="button"
            size="sm"
            onClick={handleAddCard}
          >
            <PlusIcon className="w-4 h-4 mr-2" />
            {t("cms.academy.highlights.cards.add")}
          </Button>
        </div>

        {cardFields.length === 0 ? (
          <div className="text-center py-12 text-gray-500 border-2 border-dashed rounded-lg">
            <p>{t("cms.academy.highlights.cards.empty")}</p>
          </div>
        ) : (
          <div className="space-y-4">
            {cardFields.map((field, index) => (
              <div
                key={field.id}
                className="border rounded-lg p-6 space-y-4 "
              >
                <div className="flex justify-between items-center mb-4">
                  <h4 className="font-semibold text-lg">
                    {t("cms.academy.highlights.cards.cardNumber", {
                      index: index + 1,
                    })}
                  </h4>
                  <Button
                    type="button"
                    variant="destructive"
                    size="sm"
                    onClick={() => removeCard(index)}
                  >
                    {t('common.delete')}
                  </Button>
                </div>

                <FormField
                  control={form.control}
                  name={`cards.${index}.icon`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t("common.icon")}</FormLabel>
                      <FormControl>
                        <DocumentUploader
                          value={(field.value as any) || []}
                          maxDocuments={1}
                          maxSize={50 * 1024 * 1024}
                          acceptedFileTypes={["image/*"]}
                          onChange={field.onChange}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <I18nTabs
                  value={currentLanguage}
                  onValueChange={setCurrentLanguage}
                  className="w-full"
                >
                  <I18nFormProvider currentLanguage={currentLanguage}>
                    <I18nTabContent language="en">
                      <div className="grid gap-4 md:grid-cols-2">
                        <I18nFormTextField
                          name={`cards.${index}.title`}
                          control={form.control}
                          label={t("cms.academy.highlights.cards.cardTitle")}
                          placeholder={t(
                            "cms.academy.highlights.cards.cardTitlePlaceholder"
                          )}
                          required
                        />
                        <I18nFormTextField
                          name={`cards.${index}.state_title_one`}
                          control={form.control}
                          label={t("cms.academy.highlights.cards.statLabel", {
                            number: 1,
                          })}
                          placeholder={t(
                            "cms.academy.highlights.cards.statLabelPlaceholder"
                          )}
                          required
                        />
                        <I18nFormTextField
                          name={`cards.${index}.state_title_two`}
                          control={form.control}
                          label={t("cms.academy.highlights.cards.statLabel", {
                            number: 2,
                          })}
                          placeholder={t(
                            "cms.academy.highlights.cards.statLabelPlaceholder"
                          )}
                          required
                        />
                        <I18nFormTextField
                          name={`cards.${index}.state_title_three`}
                          control={form.control}
                          label={t("cms.academy.highlights.cards.statLabel", {
                            number: 3,
                          })}
                          placeholder={t(
                            "cms.academy.highlights.cards.statLabelPlaceholder"
                          )}
                          required
                        />
                        <I18nFormTextField
                          name={`cards.${index}.state_title_four`}
                          control={form.control}
                          label={t("cms.academy.highlights.cards.statLabel", {
                            number: 4,
                          })}
                          placeholder={t(
                            "cms.academy.highlights.cards.statLabelPlaceholder"
                          )}
                          required
                        />
                      </div>
                    </I18nTabContent>
                    <I18nTabContent language="ar">
                      <div className="grid gap-4 md:grid-cols-2">
                        <I18nFormTextField
                          name={`cards.${index}.title`}
                          control={form.control}
                          label={t("cms.academy.highlights.cards.cardTitle")}
                          placeholder={t(
                            "cms.academy.highlights.cards.cardTitlePlaceholder"
                          )}
                          required
                        />
                        <I18nFormTextField
                          name={`cards.${index}.state_title_one`}
                          control={form.control}
                          label={t("cms.academy.highlights.cards.statLabel", {
                            number: 1,
                          })}
                          placeholder={t(
                            "cms.academy.highlights.cards.statLabelPlaceholder"
                          )}
                          required
                        />
                        <I18nFormTextField
                          name={`cards.${index}.state_title_two`}
                          control={form.control}
                          label={t("cms.academy.highlights.cards.statLabel", {
                            number: 2,
                          })}
                          placeholder={t(
                            "cms.academy.highlights.cards.statLabelPlaceholder"
                          )}
                          required
                        />
                        <I18nFormTextField
                          name={`cards.${index}.state_title_three`}
                          control={form.control}
                          label={t("cms.academy.highlights.cards.statLabel", {
                            number: 3,
                          })}
                          placeholder={t(
                            "cms.academy.highlights.cards.statLabelPlaceholder"
                          )}
                          required
                        />
                        <I18nFormTextField
                          name={`cards.${index}.state_title_four`}
                          control={form.control}
                          label={t("cms.academy.highlights.cards.statLabel", {
                            number: 4,
                          })}
                          placeholder={t(
                            "cms.academy.highlights.cards.statLabelPlaceholder"
                          )}
                          required
                        />
                      </div>
                    </I18nTabContent>
                  </I18nFormProvider>
                </I18nTabs>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <FormField
                    control={form.control}
                    name={`cards.${index}.state_number_one`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          {t("cms.academy.highlights.cards.statNumber", {
                            number: 1,
                          })}
                        </FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            type="number"
                            placeholder={t(
                              "cms.academy.highlights.cards.statNumberPlaceholder"
                            )}
                            value={field.value ?? ""}
                            onChange={(e) => field.onChange(e.target.value ? Number(e.target.value) : 0)}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`cards.${index}.state_number_two`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          {t("cms.academy.highlights.cards.statNumber", {
                            number: 2,
                          })}
                        </FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            type="number"
                            placeholder={t(
                              "cms.academy.highlights.cards.statNumberPlaceholder"
                            )}
                            value={field.value ?? ""}
                            onChange={(e) => field.onChange(e.target.value ? Number(e.target.value) : 0)}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`cards.${index}.state_number_three`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          {t("cms.academy.highlights.cards.statNumber", {
                            number: 3,
                          })}
                        </FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            type="number"
                            placeholder={t(
                              "cms.academy.highlights.cards.statNumberPlaceholder"
                            )}
                            value={field.value ?? ""}
                            onChange={(e) => field.onChange(e.target.value ? Number(e.target.value) : 0)}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`cards.${index}.state_number_four`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          {t("cms.academy.highlights.cards.statNumber", {
                            number: 4,
                          })}
                        </FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            type="number"
                            placeholder={t(
                              "cms.academy.highlights.cards.statNumberPlaceholder"
                            )}
                            value={field.value ?? ""}
                            onChange={(e) => field.onChange(e.target.value ? Number(e.target.value) : 0)}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

              </div>
            ))}
          </div>
        )}
      </div>
      {cardsError && (
        <p className="text-sm text-destructive">{cardsError}</p>
      )}
        <div className="flex justify-end w-full gap-2">
          <Button
            type="submit"
            loading={createMutation.isPending || updateMutation.isPending}
          >
            {existing
              ? t("cms.academy.highlights.form.submitUpdate")
              : t("cms.academy.highlights.form.submitCreate")}
          </Button>
        </div>
      </form>

      
    </Form>
  );
}
