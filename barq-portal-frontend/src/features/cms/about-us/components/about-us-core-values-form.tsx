import { useEffect, useState, useMemo } from "react";
import { Button } from "@/shared/components/ui/button";
import { useLang } from "@/shared/hooks/use-lang";
import { type LanguageCode } from "@/shared/constants";
import { DocumentUploader } from "@/shared/components/custom/DocumentUploader";
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
import { useForm } from "react-hook-form";
import {
  createAboutUsCoreValuesSchema,
  updateAboutUsCoreValuesSchema,
  type CreateAboutUsCoreValuesFormData,
  type UpdateAboutUsCoreValuesFormData,
} from "../schemas/about-us-core-values.schema";
import { toast } from "sonner";
import {
  useAboutBarqCoreValuesControllerReadQuery,
  useAboutBarqCoreValuesControllerCreate,
  useAboutBarqCoreValuesControllerUpdate,
} from "@/sdk/modules/aboutbarqcorevalue.gen";
import CoreValuesCardsManagement from "./about-us-core-values-cards-management";

export default function AboutUsCoreValuesSectionForm() {
  const { lang, t } = useLang();
  const [currentLanguage, setCurrentLanguage] = useState<LanguageCode>("en");

  const { data, isLoading } = useAboutBarqCoreValuesControllerReadQuery({
    query: {
      query: {
        relations: {
          about_barq_core_values_id_about_barq_core_values_translations: true,
          about_barq_core_values_cards_id_about_barq_core_values_cards: {
            about_barq_core_values_cards_id_about_barq_core_values_cards_translations: true,
            icon: true,
          },
          image: true,
        },
        pagination: { take: 1, skip: 0 },
      },
    },
    headers: {
      "x-skip-translations": "true",
    },
  });

  const existingCoreValues = data?.data?.[0];
  const currentTranslation = useMemo(
    () =>
      existingCoreValues?.about_barq_core_values_id_about_barq_core_values_translations?.find((t) => t.language === lang),
    [existingCoreValues, lang]
  );

  const isUpdate = !!existingCoreValues;

  type FormData = CreateAboutUsCoreValuesFormData | UpdateAboutUsCoreValuesFormData;
  const form = useForm<FormData>({
    resolver: zodResolver(
      isUpdate ? updateAboutUsCoreValuesSchema : createAboutUsCoreValuesSchema
    ),
    defaultValues: {
      section_title: { en: "", ar: "" },
      section_description: { en: "", ar: "" },
      core_values: [],
      supporting_image: [],
    } as unknown as FormData,
    mode: "onChange",
  });

  useEffect(() => {
    if (!existingCoreValues) return;

    const enTranslation = existingCoreValues.about_barq_core_values_id_about_barq_core_values_translations?.find(
      (t) => t.language === "en"
    );
    const arTranslation = existingCoreValues.about_barq_core_values_id_about_barq_core_values_translations?.find(
      (t) => t.language === "ar"
    );

    const cards = existingCoreValues.about_barq_core_values_cards_id_about_barq_core_values_cards || [];
    const transformedCards = cards.map((card, index) => {
      const enCardTranslation = card.about_barq_core_values_cards_id_about_barq_core_values_cards_translations?.find(
        (t) => t.language === "en"
      );
      const arCardTranslation = card.about_barq_core_values_cards_id_about_barq_core_values_cards_translations?.find(
        (t) => t.language === "ar"
      );

      return {
        title: {
          en: enCardTranslation?.title || "",
          ar: card.title || arCardTranslation?.title || "",
        },
        description: {
          en: "",
          ar: "",
        },
        icon_media: card.icon ? [{
          id: card.icon.id,
          url: card.icon.url,
          key: card.icon.key || "",
          format: card.icon.format,
          mime_type: card.icon.mime_type,
          size: card.icon.size,
        }] : [],
        order_index: index,
      };
    });

    form.reset({
      section_title: {
        en: enTranslation?.title || "",
        ar: existingCoreValues.title || arTranslation?.title || "",
      },
      section_description: {
        en: enTranslation?.description || "",
        ar: existingCoreValues.description || arTranslation?.description || "",
      },
      core_values: transformedCards,
      supporting_image: existingCoreValues.image ? [existingCoreValues.image] : [],
    } as unknown as FormData);
  }, [existingCoreValues, form]);

  const createMutation = useAboutBarqCoreValuesControllerCreate();
  const updateMutation = useAboutBarqCoreValuesControllerUpdate();

  const onSubmit = async (values: FormData) => {
    const supportingImageId = Array.isArray((values as any).supporting_image)
      ? (values as any).supporting_image?.[0]?.id
      : undefined;

    const cardsData = (values.core_values || []).map((card) => ({
      title: card.title?.ar || "",
      icon_id: card.icon_media?.[0]?.id || 1,
      about_barq_core_values_cards_id_about_barq_core_values_cards_translations: [
        {
          title: card.title?.en || "",
          language: "en" as const,
        },
      ],
    }));

    if (!existingCoreValues) {
      await createMutation.mutateAsync(
        {
          body: {
            title: values.section_title?.ar || "",
            description: values.section_description?.ar || "",
            image_id: supportingImageId || 1, // Default image ID if none provided
            about_barq_core_values_id_about_barq_core_values_translations: [
              {
                title: values.section_title?.en || "",
                description: values.section_description?.en || "",
                language: "en",
              },
            ],
            about_barq_core_values_cards_id_about_barq_core_values_cards: cardsData,
          },
        },
        {
          onSuccess: () => {
            toast.success(t("aboutUs.coreValuesSection.messages.created"));
          },
          onError: (error) => {
            toast.error(error.message || t("aboutUs.coreValuesSection.messages.errorCreating"));
          },
        }
      );
    } else {
      await updateMutation.mutateAsync(
        {
          path: { id: String(existingCoreValues.id) },
          body: {
            title: values.section_title?.ar || "",
            description: values.section_description?.ar || "",
            image_id: supportingImageId,
            about_barq_core_values_id_about_barq_core_values_translations: [
              {
                title: values.section_title?.en || "",
                description: values.section_description?.en || "",
                language: "en",
              },
            ],
            about_barq_core_values_cards_id_about_barq_core_values_cards: cardsData,
          },
        },
        {
          onSuccess: () => {
            toast.success(t("aboutUs.coreValuesSection.messages.updated"));
          },
          onError: (error) => {
            toast.error(error.message || t("aboutUs.coreValuesSection.messages.errorUpdating"));
          },
        }
      );
    }
  };
  console.log(form.formState.errors, "errors");

  if (isLoading) return <div />;

  return (
    <div>
      <Form {...form}>
        <form className="grid gap-6" onSubmit={form.handleSubmit(onSubmit)}>
          <I18nTabs
            value={currentLanguage}
            onValueChange={setCurrentLanguage}
            className="w-full"
          >
            <I18nFormProvider currentLanguage={currentLanguage}>
              <I18nTabContent language="en">
                <div className="grid gap-6">
                  <I18nFormTextField
                    name="section_title"
                    control={form.control}
                    label={t("aboutUs.coreValuesSection.form.sectionTitle")}
                    required
                  />
                  <I18nFormTextareaField
                    name="section_description"
                    control={form.control}
                    label={t("aboutUs.coreValuesSection.form.sectionDescription")}
                    required
                  />
                </div>
              </I18nTabContent>
              <I18nTabContent language="ar">
                <div className="grid gap-6">
                  <I18nFormTextField
                    name="section_title"
                    control={form.control}
                    label={t("aboutUs.coreValuesSection.form.sectionTitle")}
                    required
                  />
                  <I18nFormTextareaField
                    name="section_description"
                    control={form.control}
                    label={t("aboutUs.coreValuesSection.form.sectionDescription")}
                    required
                  />
                </div>
              </I18nTabContent>
            </I18nFormProvider>
          </I18nTabs>

          <FormField
            control={form.control}
            name={"supporting_image" as any}
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("aboutUs.coreValuesSection.form.supportingImage")}</FormLabel>
                <FormControl>
                  <DocumentUploader
                    value={(field.value as any) || []}
                    maxDocuments={1}
                    maxSize={10 * 1024 * 1024}
                    acceptedFileTypes={["image/*"]}
                    onChange={field.onChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="border-t pt-4">
            <FormField
              control={form.control}
              name="core_values"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <CoreValuesCardsManagement
                      cards={field.value || []}
                      onCardsChange={field.onChange}
                      maxCards={6}
                      errors={form.formState.errors.core_values}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="flex justify-end items-center gap-3">
            <Button type="submit" loading={form.formState.isSubmitting}>
              {existingCoreValues ? t("aboutUs.coreValuesSection.form.update") : t("aboutUs.coreValuesSection.form.create")}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
