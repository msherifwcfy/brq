import { useEffect, useState } from "react";
import { Button } from "@/shared/components/ui/button";
import { PlusIcon, Trash2 } from "lucide-react";
import { type LanguageCode } from "@/shared/constants";
import {
  useBarqAcademyProgramsOpportunitiesControllerReadQuery,
  useBarqAcademyProgramsOpportunitiesControllerCreate,
  useBarqAcademyProgramsOpportunitiesControllerUpdate,
} from "@/sdk/modules/barqacademyprogramsopportunity.gen";
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
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useFieldArray, type FieldErrors } from "react-hook-form";
import {
  createAcademyProgramsOpportunitiesSchema,
  updateAcademyProgramsOpportunitiesSchema,
  type CreateAcademyProgramsOpportunitiesFormData,
  type UpdateAcademyProgramsOpportunitiesFormData,
} from "../schemas/academy-foundation-track.schema";
import { toast } from "sonner";
import { DocumentUploader } from "@/shared/components/custom/DocumentUploader";
import { Input } from "@/shared/components/ui/input";
import { Textarea } from "@/shared/components/ui/textarea";
import { useLang } from "@/shared/hooks/use-lang";
import { hasLanguageErrors } from "@/shared/utils/hasLanguageErrors";

export default function AcademyFoundationTracksSection() {
  const [currentLanguage, setCurrentLanguage] = useState<LanguageCode>("en");
  const { t } = useLang();
  const { data, isLoading, refetch } = useBarqAcademyProgramsOpportunitiesControllerReadQuery({
    query: {
      query: {
        relations: {
          barq_academy_programs_opportunities_id_barq_academy_programs_opportunities_translations: true,
          barq_academy_programs_opportunities_cards_id_barq_academy_programs_opportunities_cards: {
            image: true,
            barq_academy_programs_opportunities_cards_id_barq_academy_programs_opportunities_cards_translations: true,
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

  const createMutation = useBarqAcademyProgramsOpportunitiesControllerCreate();
  const updateMutation = useBarqAcademyProgramsOpportunitiesControllerUpdate();

  const isUpdate = !!existing;
  const MAX_CARDS = 12;
  const MIN_CARDS = 3;

  const setCardsError = (type: "minCards" | "maxCards") => {
    form.setError("cards", {
      type: "manual",
      message: t(`cms.academy.foundationTracks.messages.${type}`),
    });
  };

  const clearCardsError = () => {
    form.clearErrors("cards");
  };

  type FormData = CreateAcademyProgramsOpportunitiesFormData | UpdateAcademyProgramsOpportunitiesFormData;
  const form = useForm<FormData>({
    resolver: zodResolver(
      isUpdate ? updateAcademyProgramsOpportunitiesSchema : createAcademyProgramsOpportunitiesSchema
    ),
    defaultValues: {
      title: { en: "", ar: "" },
      cards: [],
    } as unknown as FormData,
    mode: "onChange",
  });

  useEffect(() => {
    if (!existing || isLoading) return;

    const translations = existing.barq_academy_programs_opportunities_id_barq_academy_programs_opportunities_translations || [];
    const enTranslation = translations.find((t) => t.language === "en");
    const arTranslation = translations.find((t) => t.language === "ar");

    const cards = existing.barq_academy_programs_opportunities_cards_id_barq_academy_programs_opportunities_cards || [];
    const formattedCards = cards.map((card) => {
      const cardTranslations = card.barq_academy_programs_opportunities_cards_id_barq_academy_programs_opportunities_cards_translations || [];
      const enCardTranslation = cardTranslations.find((t) => t.language === "en");
      const arCardTranslation = cardTranslations.find((t) => t.language === "ar");

      return {
        id: card.id,
        image: card.image ? [{ ...card.image }] : [],
        translations: {
          en: {
            title: enCardTranslation?.title || card.title || "",
            description: enCardTranslation?.description || card.description || "",
          },
          ar: {
            title: arCardTranslation?.title || card.title || "",
            description: arCardTranslation?.description || card.description || "",
          },
        },
      };
    });

    form.reset({
      title: {
        en: enTranslation?.title || existing.title || "",
        ar: arTranslation?.title || existing.title || "",
      },
      cards: formattedCards,
    } as unknown as FormData);
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
            barq_academy_programs_opportunities_id_barq_academy_programs_opportunities_translations: [
              {
                language: "en",
                title: values.title?.en || "",
              },
              {
                language: "ar",
                title: values.title?.ar || "",
              },
            ],
            barq_academy_programs_opportunities_cards_id_barq_academy_programs_opportunities_cards: values.cards?.map((card) => ({
              id: card.id,
              long_description: "",
              title: card.translations.ar.title,
              description: card.translations.ar.description,
              cta_label: "Apply Now",
              image_id: card.image?.[0]?.id,
              barq_academy_programs_opportunities_cards_id_barq_academy_programs_opportunities_cards_translations: [
                {
                  language: "en",
                  title: card.translations.en.title,
                  description: card.translations.en.description,
                  cta_label: "Apply Now",
                  long_description: "",
                },
                {
                  language: "ar",
                  title: card.translations.ar.title,
                  description: card.translations.ar.description,
                  cta_label: "Apply Now",
                  long_description: "",
                },
              ],
            })) || [],
          },
        });
        toast.success(
          t("cms.academy.foundationTracks.messages.updated")
        );
        refetch();
      } else {
        await createMutation.mutateAsync({
          body: {
            title: values.title?.ar || "",
            barq_academy_programs_opportunities_id_barq_academy_programs_opportunities_translations: [
              {
                language: "en",
                title: values.title?.en || "",
              },
              {
                language: "ar",
                title: values.title?.ar || "",
              },
            ],
            barq_academy_programs_opportunities_cards_id_barq_academy_programs_opportunities_cards: values.cards?.map((card) => ({
              id: card.id,
              long_description: "",
              title: card.translations.ar.title,
              description: card.translations.ar.description,
              cta_label: "Apply Now",
              image_id: card.image?.[0]?.id,
              barq_academy_programs_opportunities_cards_id_barq_academy_programs_opportunities_cards_translations: [
                {
                  language: "en",
                  title: card.translations.en.title,
                  description: card.translations.en.description,
                  cta_label: "Apply Now",
                  long_description: "",
                },
                {
                  language: "ar",
                  title: card.translations.ar.title,
                  description: card.translations.ar.description,
                  cta_label: "Apply Now",
                  long_description: "",
                },
              ],
            })) || [],
          },
        });
        toast.success(
          t("cms.academy.foundationTracks.messages.created")
        );
        refetch();
      }
    } catch (error: any) {
      toast.error(
        error?.message ||
        t("cms.academy.foundationTracks.messages.error")
      );
    }
  };

  const onError = (_errors: FieldErrors<FormData> | undefined) => {
    if (_errors?.cards) {
      const hasOppositeLangErrors =
        Array.isArray(_errors.cards) &&
        _errors.cards.some(
          (error) => error && hasLanguageErrors(error, currentLanguage)
        );
      if (hasOppositeLangErrors) {
        const oppositeLanguage: LanguageCode =
          currentLanguage === "en" ? "ar" : "en";
        const languageName = t(`common.language.${oppositeLanguage}`);
        toast.error(
          t("common.formValidation.completeLanguageForm", {
            language: languageName,
          }),
          {
            duration: 5000,
          }
        );
      }
      console.log(_errors);
    }
  };


  const handleAddCard = () => {
    if (cardFields.length >= MAX_CARDS) {
      setCardsError("maxCards");
      return;
    }
    clearCardsError();
    appendCard({
      image: [],
      translations: {
        en: {
          title: "",
          description: "",
        },
        ar: {
          title: "",
          description: "",
        },
      },
    });
  };

  const handleRemoveCard = (index: number) => {
    if (cardFields.length <= MIN_CARDS) {
      setCardsError("minCards");
      return;
    }
    clearCardsError();
    removeCard(index);
  };

  if (isLoading) return <div>{t("common.loading")}</div>;

  return (
    <div className="space-y-6">
      <Form {...form}>
        <form className="grid gap-4" onSubmit={form.handleSubmit(onSubmit, onError)}>
          <I18nTabs
            value={currentLanguage}
            onValueChange={setCurrentLanguage}
            className="w-full"
          >
            <I18nFormProvider currentLanguage={currentLanguage}>
              <I18nTabContent language="en">
                <I18nFormTextField
                  name="title"
                  control={form.control}
                  label={t("cms.academy.foundationTracks.form.title")}
                  placeholder={t(
                    "cms.academy.foundationTracks.form.titlePlaceholder"
                  )}
                  required
                />
              </I18nTabContent>
              <I18nTabContent language="ar">
                <I18nFormTextField
                  name="title"
                  control={form.control}
                  label={t("cms.academy.foundationTracks.form.title")}
                  placeholder={t(
                    "cms.academy.foundationTracks.form.titlePlaceholder"
                  )}
                  required
                />
              </I18nTabContent>
            </I18nFormProvider>
          </I18nTabs>
          <div className="mt-8 space-y-6 border-t pt-6">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-lg font-semibold">
                  {t("cms.academy.foundationTracks.cards.title")}
                </h3>
                <p className="text-sm text-gray-600 mt-1">
                  {t("cms.academy.foundationTracks.cards.description")}
                </p>
              </div>
              <Button
                type="button"
                size="sm"
                onClick={handleAddCard}
              >
                <PlusIcon className="w-4 h-4 mr-2" />
                {t("cms.academy.foundationTracks.cards.add")}
              </Button>
            </div>

            <FormField
              control={form.control}
              name="cards"
              render={() => (
                <FormItem>
                  <FormMessage />
                </FormItem>
              )}
            />

            {cardFields.length === 0 ? (
              <div className="text-center py-12 text-gray-500 border-2 border-dashed rounded-lg">
                <p>{t("cms.academy.foundationTracks.cards.empty")}</p>
              </div>
            ) : (
              <div className="space-y-4">
                {cardFields.map((field, index) => (
                  <div
                    key={field.id}
                    className="border rounded-lg p-6 space-y-4"
                  >
                    <div className="flex justify-between items-center mb-4">
                      <h4 className="font-semibold text-lg">
                        {t("cms.academy.foundationTracks.cards.cardNumber", {
                          index: index + 1,
                        })}
                      </h4>
                      <Button
                        type="button"
                        variant="destructive"
                        size="sm"
                        onClick={() => handleRemoveCard(index)}
                      >
                        {t('common.delete')}
                      </Button>
                    </div>

                    <FormField
                      control={form.control}
                      name={`cards.${index}.image`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            {t("cms.academy.foundationTracks.cards.image")}
                          </FormLabel>
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
                          <div className="grid gap-4">
                            <FormField
                              control={form.control}
                              name={`cards.${index}.translations.en.title`}
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>
                                    {t(
                                      "cms.academy.foundationTracks.cards.titleEn"
                                    )}
                                  </FormLabel>
                                  <FormControl>
                                    <Input
                                      {...field}
                                      placeholder={t(
                                        "cms.academy.foundationTracks.cards.titleEnPlaceholder"
                                      )}
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            <FormField
                              control={form.control}
                              name={`cards.${index}.translations.en.description`}
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>
                                    {t(
                                      "cms.academy.foundationTracks.cards.descriptionEn"
                                    )}
                                  </FormLabel>
                                  <FormControl>
                                    <Textarea
                                      {...field}
                                      placeholder={t(
                                        "cms.academy.foundationTracks.cards.descriptionEnPlaceholder"
                                      )}
                                      rows={3}
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>
                        </I18nTabContent>
                        <I18nTabContent language="ar">
                          <div className="grid gap-4">
                            <FormField
                              control={form.control}
                              name={`cards.${index}.translations.ar.title`}
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>
                                    {t(
                                      "cms.academy.foundationTracks.cards.titleAr"
                                    )}
                                  </FormLabel>
                                  <FormControl>
                                    <Input
                                      {...field}
                                      placeholder={t(
                                        "cms.academy.foundationTracks.cards.titleArPlaceholder"
                                      )}
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            <FormField
                              control={form.control}
                              name={`cards.${index}.translations.ar.description`}
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>
                                    {t(
                                      "cms.academy.foundationTracks.cards.descriptionAr"
                                    )}
                                  </FormLabel>
                                  <FormControl>
                                    <Textarea
                                      {...field}
                                      placeholder={t(
                                        "cms.academy.foundationTracks.cards.descriptionArPlaceholder"
                                      )}
                                      rows={3}
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>
                        </I18nTabContent>
                      </I18nFormProvider>
                    </I18nTabs>
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className="flex justify-end items-center gap-3">
            <Button type="submit" loading={form.formState.isSubmitting}>
              {existing
                ? t("cms.academy.foundationTracks.form.submitUpdate")
                : t("cms.academy.foundationTracks.form.submitCreate")}
            </Button>
          </div>
        </form>


      </Form>
    </div>
  );
}
