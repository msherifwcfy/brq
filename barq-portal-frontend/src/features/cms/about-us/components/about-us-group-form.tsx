import { useEffect, useState, useMemo } from "react";
import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
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
import { useForm, useFieldArray } from "react-hook-form";
import {
  createAboutUsGroupSchema,
  updateAboutUsGroupSchema,
  type CreateAboutUsGroupFormData,
  type UpdateAboutUsGroupFormData,
} from "../schemas/about-us-group.schema";
import { toast } from "sonner";
import {
  useAboutBarqGroupAffiliationControllerReadQuery,
  useAboutBarqGroupAffiliationControllerCreate,
  useAboutBarqGroupAffiliationControllerUpdate,
} from "@/sdk/modules/aboutbarqgroupaffiliation.gen";
import { Trash2, Plus } from "lucide-react";

export default function AboutUsGroupSectionForm() {
  const { lang, t } = useLang();
  const [currentLanguage, setCurrentLanguage] = useState<LanguageCode>("en");

  const { data, isLoading } = useAboutBarqGroupAffiliationControllerReadQuery({
    query: {
      query: {
        relations: {
          about_barq_group_affiliation_id_about_barq_group_affiliation_translations: true,
          about_barq_group_affiliation_cards_id_about_barq_group_affiliation_cards:{
            about_barq_group_affiliation_cards_id_about_barq_group_affiliation_cards_translations:true
          },
          images:true
        },
        pagination: { take: 1, skip: 0 },
      },
    },
    headers: {
      "x-skip-translations": "true",
    },
  });

  const existingGroupAffiliation = data?.data?.[0];


  const isUpdate = !!existingGroupAffiliation;

  type FormData = CreateAboutUsGroupFormData | UpdateAboutUsGroupFormData;
  const form = useForm<FormData>({
    resolver: zodResolver(
      isUpdate ? updateAboutUsGroupSchema : createAboutUsGroupSchema
    ),
    defaultValues: {
      title: { en: "", ar: "" },
      description: { en: "", ar: "" },
      group_logo: [],
      cards: [
        {
          id: "1",
          number: "",
          label: { en: "", ar: "" },
        },
      ],
    } as unknown as FormData,
    mode: "onChange",
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "cards",
  });

  useEffect(() => {
    if (!existingGroupAffiliation) return;

    // Transform API data to i18n format
    const enTranslation = existingGroupAffiliation.about_barq_group_affiliation_id_about_barq_group_affiliation_translations?.find(
      (t) => t.language === "en"
    );
    const arTranslation = existingGroupAffiliation.about_barq_group_affiliation_id_about_barq_group_affiliation_translations?.find(
      (t) => t.language === "ar"
    );

    // Transform cards data
    const cards = existingGroupAffiliation.about_barq_group_affiliation_cards_id_about_barq_group_affiliation_cards?.map((card, index) => {
      const enCardTranslation = card.about_barq_group_affiliation_cards_id_about_barq_group_affiliation_cards_translations?.find(
        (t) => t.language === "en"
      );
      const arCardTranslation = card.about_barq_group_affiliation_cards_id_about_barq_group_affiliation_cards_translations?.find(
        (t) => t.language === "ar"
      );

      return {
        id: String(card.id),
        number: String(card.number),
        label: {
          en: enCardTranslation?.label || "",
          ar: card.label || arCardTranslation?.label || "",
        },
      };
    }) || [
      {
        id: "1",
        number: "",
        label: { en: "", ar: "" },
      },
    ];

    form.reset({
      title: {
        en: enTranslation?.title || "",
        ar: existingGroupAffiliation.title || arTranslation?.title || "",
      },
      description: {
        en: enTranslation?.description || "",
        ar: existingGroupAffiliation.description || arTranslation?.description || "",
      },
      group_logo: existingGroupAffiliation.images?.[0]?.id ? [existingGroupAffiliation.images?.[0]] : [],
      cards,
    } as unknown as FormData);
  }, [existingGroupAffiliation, form]);

  const createMutation = useAboutBarqGroupAffiliationControllerCreate();
  const updateMutation = useAboutBarqGroupAffiliationControllerUpdate();

  const onSubmit = async (values: FormData) => {
    const groupLogoId = Array.isArray((values as any).group_logo)
      ? (values as any).group_logo?.[0]?.id
      : undefined;

    // Transform cards data for API
    const cardsData = (values as any).cards?.map((card: any) => ({
      label: card.label?.ar || "",
      number: Number(card.number) || 0,
      about_barq_group_affiliation_cards_id_about_barq_group_affiliation_cards_translations: [
        {
          label: card.label?.en || "",
          language: "en",
        },
      ],
    })) || [];

    if (!existingGroupAffiliation) {
      await createMutation.mutateAsync(
        {
          body: {
            title: values.title?.ar || "",
            description: values.description?.ar || "",
            images_ids: groupLogoId ? [groupLogoId] : [],
            about_barq_group_affiliation_cards_id_about_barq_group_affiliation_cards: cardsData,
            about_barq_group_affiliation_id_about_barq_group_affiliation_translations: [
              {
                title: values.title?.en || "",
                description: values.description?.en || "",
                language: "en",
              },
            ],
          },
        },
        {
          onSuccess: () => {
            toast.success(t("aboutUs.groupSection.messages.created"));
          },
          onError: (error) => {
            toast.error(error.message || t("aboutUs.groupSection.messages.errorCreating"));
          },
        }
      );
    } else {
      await updateMutation.mutateAsync(
        {
          path: { id: String(existingGroupAffiliation.id) },
          body: {
            title: values.title?.ar || "",
            description: values.description?.ar || "",
            images_ids: groupLogoId ? [groupLogoId] : [],
            about_barq_group_affiliation_cards_id_about_barq_group_affiliation_cards: cardsData,
            about_barq_group_affiliation_id_about_barq_group_affiliation_translations: [
              {
                title: values.title?.en || "",
                description: values.description?.en || "",
                language: "en",
              },
            ],
          },
        },
        {
          onSuccess: () => {
            toast.success(t("aboutUs.groupSection.messages.updated"));
          },
          onError: (error) => {
            toast.error(error.message || t("aboutUs.groupSection.messages.errorUpdating"));
          },
        }
      );
    }
  };

  if (isLoading) return <div />;

  return (
    <div>
      <Form {...form}>
        <form className="grid gap-4" onSubmit={form.handleSubmit(onSubmit)}>
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
                    label={t("aboutUs.groupSection.form.title")}
                    required
                  />
                  <I18nFormTextareaField
                    name="description"
                    control={form.control}
                    label={t("aboutUs.groupSection.form.description")}
                    required
                  />
                </div>
              </I18nTabContent>
              <I18nTabContent language="ar">
                <div className="grid gap-4">
                  <I18nFormTextField
                    name="title"
                    control={form.control}
                    label={t("aboutUs.groupSection.form.title")}
                    required
                  />
                  <I18nFormTextareaField
                    name="description"
                    control={form.control}
                    label={t("aboutUs.groupSection.form.description")}
                    required
                  />
                </div>
              </I18nTabContent>
            </I18nFormProvider>
          </I18nTabs>

          <FormField
            control={form.control}
            name={"group_logo" as any}
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("aboutUs.groupSection.form.groupLogo")}</FormLabel>
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

          <div className="border-t pt-4 mt-2">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">{t("aboutUs.groupSection.form.statisticsCards")}</h3>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => append({
                  id: String(Date.now()),
                  number: "",
                  label: { en: "", ar: "" },
                })}
              >
                <Plus className="w-4 h-4 mr-2" />
                {t("aboutUs.groupSection.form.addCard")}
              </Button>
            </div>
            
            <div className="space-y-4">
              {fields.map((field, index) => (
                <div key={field.id} className="border rounded-lg p-4">
                  <div className="flex justify-between items-center mb-4">
                    <h4 className="font-medium">{t("aboutUs.groupSection.form.card")} {index + 1}</h4>
                    {fields.length > 1 && (
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => remove(index)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                  
                  <div className="grid gap-4">
                    <I18nTabs
                      value={currentLanguage}
                      onValueChange={setCurrentLanguage}
                      className="w-full"
                    >
                      <I18nFormProvider currentLanguage={currentLanguage}>
                        <I18nTabContent language="en">
                          <I18nFormTextField
                            name={`cards.${index}.label`}
                            control={form.control}
                            label={t("aboutUs.groupSection.form.cardLabel")}
                            required
                          />
                        </I18nTabContent>
                        <I18nTabContent language="ar">
                          <I18nFormTextField
                            name={`cards.${index}.label`}
                            control={form.control}
                            label={t("aboutUs.groupSection.form.cardLabel")}
                            required
                          />
                        </I18nTabContent>
                      </I18nFormProvider>
                    </I18nTabs>
                    
                    <FormField
                      control={form.control}
                      name={`cards.${index}.number`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{t("aboutUs.groupSection.form.cardValue")}</FormLabel>
                          <FormControl>
                            <Input {...field} placeholder={t("aboutUs.groupSection.form.cardValuePlaceholder")} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-end items-center gap-3">
            <Button type="submit" loading={form.formState.isSubmitting}>
              {existingGroupAffiliation ? t("aboutUs.groupSection.form.update") : t("aboutUs.groupSection.form.create")}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
