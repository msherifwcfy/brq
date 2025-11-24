import { useEffect, useState } from "react";
import { Button } from "@/shared/components/ui/button";
import { PlusIcon, Trash2 } from "lucide-react";
import { useLang } from "@/shared/hooks/use-lang";
import { type LanguageCode } from "@/shared/constants";
import {
  useBarqAcademyProgramsOpportunitiesInternshipControllerReadQuery,
  useBarqAcademyProgramsOpportunitiesInternshipControllerCreate,
  useBarqAcademyProgramsOpportunitiesInternshipControllerUpdate,
} from "@/sdk/modules/barqacademyprogramsopportunitiesinternship.gen";
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
import { useForm, useFieldArray } from "react-hook-form";
import { Input } from "@/shared/components/ui/input";
import { DocumentUploader } from "@/shared/components/custom/DocumentUploader";
import {
  createAcademyProgramsOpportunitiesInternshipSchema,
  updateAcademyProgramsOpportunitiesInternshipSchema,
  type CreateAcademyProgramsOpportunitiesInternshipFormData,
  type UpdateAcademyProgramsOpportunitiesInternshipFormData,
} from "../schemas/academy-internship-program.schema";
import { toast } from "sonner";

export default function AcademyInternshipProgramsSection() {
  const { t } = useLang();
  const [currentLanguage, setCurrentLanguage] = useState<LanguageCode>("en");

  const { data, isLoading, refetch } = useBarqAcademyProgramsOpportunitiesInternshipControllerReadQuery({
    query: {
      query: {
        relations: {
          barq_academy_programs_opportunities_internship_id_barq_academy_programs_opportunities_internship_translations: true,
          barq_academy_programs_opportunities_internship_cards_id_barq_academy_programs_opportunities_internship_cards: {
            image: true,
            barq_academy_programs_opportunities_internship_cards_id_barq_academy_programs_opportunities_internship_cards_translations: true,
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

  const createMutation = useBarqAcademyProgramsOpportunitiesInternshipControllerCreate();
  const updateMutation = useBarqAcademyProgramsOpportunitiesInternshipControllerUpdate();

  const isUpdate = !!existing;

  type FormData = CreateAcademyProgramsOpportunitiesInternshipFormData | UpdateAcademyProgramsOpportunitiesInternshipFormData;
  const form = useForm<FormData>({
    resolver: zodResolver(
      isUpdate ? updateAcademyProgramsOpportunitiesInternshipSchema : createAcademyProgramsOpportunitiesInternshipSchema
    ),
    defaultValues: {
      title: { en: "", ar: "" },
      cards: [],
    } as unknown as FormData,
    mode: "onChange",
  });

  useEffect(() => {
    if (!existing || isLoading) return;

    const translations = existing.barq_academy_programs_opportunities_internship_id_barq_academy_programs_opportunities_internship_translations || [];
    const enTranslation = translations.find((t) => t.language === "en");

    const cards = existing.barq_academy_programs_opportunities_internship_cards_id_barq_academy_programs_opportunities_internship_cards || [];

    const formattedCards = cards.map((card) => {
      const translations = card.barq_academy_programs_opportunities_internship_cards_id_barq_academy_programs_opportunities_internship_cards_translations || [];
      const cardEnTranslation = translations.find((t) => t.language === "en");
      const cardArTranslation = translations.find((t) => t.language === "ar");
      return {
        id: card.id,
        image: card.image ? [{ ...card.image }] : [],
        title: {
          en: cardEnTranslation?.title || card.title || "",
          ar: cardArTranslation?.title || card.title || "",
        },
        description: { en: cardEnTranslation?.description || card.description || "", ar: cardArTranslation?.description || card.description || "" },
      };
    });

    form.reset({
      title: {
        en: enTranslation?.title  || "",
        ar:  existing?.title || "",
      },
      cards: formattedCards,
    } );
  }, [existing, form, isLoading]);

  const { fields: cardFields, append: appendCard, remove: removeCard } = useFieldArray({
    control: form.control,
    name: "cards",
  });

  const cardsError = form.formState.errors.cards as { message?: string; root?: { message?: string } } | undefined;
  const cardsErrorMessage = cardsError?.root?.message ?? cardsError?.message;

  const onSubmit = async (values: FormData) => {
    try {
      if (existing) {
        await updateMutation.mutateAsync({
          path: { id: String(existing.id) },
          body: {
            title: values.title?.ar || "",
            barq_academy_programs_opportunities_internship_id_barq_academy_programs_opportunities_internship_translations: [
              {
                language: "en",
                title: values.title?.en || "",
              },
           
            ],
            barq_academy_programs_opportunities_internship_cards_id_barq_academy_programs_opportunities_internship_cards: values.cards?.map((card) => ({
              title: card.title.ar,
              description: card.description.ar,
              cta_label: "قدم الطلب الآن",
              image_id: card.image?.[0]?.id,
              barq_academy_programs_opportunities_internship_cards_id_barq_academy_programs_opportunities_internship_cards_translations: [
                {
                  language: "en",
                  title: card.title.en,
                  description: card.description.en,
                  cta_label: "Apply Now",
                },
             
              ],
            })) || [],
          },
        });
        toast.success(
          t("cms.academy.internshipPrograms.messages.updated")
        );
        refetch();
      } else {
        await createMutation.mutateAsync({
          body: {
            title: values.title?.ar || "",
            barq_academy_programs_opportunities_internship_id_barq_academy_programs_opportunities_internship_translations: [
              {
                language: "en",
                title: values.title?.en || "",
              },
            ],
            barq_academy_programs_opportunities_internship_cards_id_barq_academy_programs_opportunities_internship_cards: values.cards?.map((card) => ({
              title: card.title.ar,
              description: card.description.ar,
              cta_label: "قدم الطلب الآن",
              image_id: card.image?.[0]?.id,
              barq_academy_programs_opportunities_internship_cards_id_barq_academy_programs_opportunities_internship_cards_translations: [
                {
                  language: "en",
                  title: card.title.en,
                  description: card.description.en,
                  cta_label: "Apply Now",
                },
              
              ],
            })) || [],
          },
        });
        toast.success(
          t("cms.academy.internshipPrograms.messages.created")
        );
        refetch();
      }
    } catch (error: any) {
      toast.error(
        error?.message ||
          t("cms.academy.internshipPrograms.messages.error")
      );
    }
  };

  const handleAddCard = () => {
    if (cardFields.length >= 12) {
      toast.error(t("cms.academy.internshipPrograms.messages.maxCards"));
      return;
    }
    appendCard({
      image: [],
      title: { en: "", ar: "" },
      description: { en: "", ar: "" },
    });
  };

  if (isLoading) return <div>{t("common.loading")}</div>;

  return (
    <div className="space-y-6">
      <Form {...form}>
        <form className="grid gap-4" onSubmit={form.handleSubmit(onSubmit)}>
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
                label={t("cms.academy.internshipPrograms.form.title")}
                placeholder={t(
                  "cms.academy.internshipPrograms.form.titlePlaceholder"
                )}
                required
              />
              </I18nTabContent>
              <I18nTabContent language="ar">
                <I18nFormTextField
                  name="title"
                  control={form.control}
                  label={t("cms.academy.internshipPrograms.form.title")}
                  placeholder={t(
                    "cms.academy.internshipPrograms.form.titlePlaceholder"
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
              {t("cms.academy.internshipPrograms.cards.title")}
            </h3>
            <p className="text-sm text-gray-600 mt-1">
              {t("cms.academy.internshipPrograms.cards.description")}
            </p>
          </div>
          <Button
            type="button"
            size="sm"
            onClick={handleAddCard}
            disabled={cardFields.length >= 12}
          >
            <PlusIcon className="w-4 h-4 mr-2" />
            {t("cms.academy.internshipPrograms.cards.add")}
          </Button>
        </div>
        {cardsErrorMessage ? (
          <p className="text-sm text-destructive">{cardsErrorMessage}</p>
        ) : null}

        {cardFields.length === 0 ? (
          <div className="text-center py-12 text-gray-500 border-2 border-dashed rounded-lg">
            <p>{t("cms.academy.internshipPrograms.cards.empty")}</p>
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
                    {t("cms.academy.internshipPrograms.cards.cardNumber", {
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
                  name={`cards.${index}.image`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        {t("cms.academy.internshipPrograms.cards.image")}
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
                          name={`cards.${index}.title.en`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>
                                {t(
                                  "cms.academy.internshipPrograms.cards.titleEn"
                                )}
                              </FormLabel>
                              <FormControl>
                                <Input
                                  {...field}
                                  placeholder={t(
                                    "cms.academy.internshipPrograms.cards.titleEnPlaceholder"
                                  )}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name={`cards.${index}.description.en`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>
                                {t(
                                  "cms.academy.internshipPrograms.cards.descriptionEn"
                                )}
                              </FormLabel>
                              <FormControl>
                                <Input
                                  {...field}
                                  placeholder={t(
                                    "cms.academy.internshipPrograms.cards.descriptionEnPlaceholder"
                                  )}
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
                          name={`cards.${index}.title.ar`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>
                                {t(
                                  "cms.academy.internshipPrograms.cards.titleAr"
                                )}
                              </FormLabel>
                              <FormControl>
                                <Input
                                  {...field}
                                  placeholder={t(
                                    "cms.academy.internshipPrograms.cards.titleArPlaceholder"
                                  )}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name={`cards.${index}.description.ar`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>
                                {t(
                                  "cms.academy.internshipPrograms.cards.descriptionAr"
                                )}
                              </FormLabel>
                              <FormControl>
                                <Input
                                  {...field}
                                  placeholder={t(
                                    "cms.academy.internshipPrograms.cards.descriptionArPlaceholder"
                                  )}
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
                ? t("cms.academy.internshipPrograms.form.submitUpdate")
                : t("cms.academy.internshipPrograms.form.submitCreate")}
            </Button>
          </div>

        </form>

        
      </Form>
    </div>
  );
}
