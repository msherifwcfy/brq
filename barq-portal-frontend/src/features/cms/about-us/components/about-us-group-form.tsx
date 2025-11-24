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
import { useForm } from "react-hook-form";
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
  const currentTranslation = useMemo(
    () =>
      existingGroupAffiliation?.about_barq_group_affiliation_id_about_barq_group_affiliation_translations?.find((t) => t.language === lang),
    [existingGroupAffiliation, lang]
  );

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
      stat_1_value: "",
      stat_1_label: { en: "", ar: "" },
      stat_2_value: "",
      stat_2_label: { en: "", ar: "" },
      stat_3_value: "",
      stat_3_label: { en: "", ar: "" },
    } as unknown as FormData,
    mode: "onChange",
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

    form.reset({
      title: {
        en: enTranslation?.title || "",
        ar: existingGroupAffiliation.title || arTranslation?.title || "",
      },
      description: {
        en: enTranslation?.description || "",
        ar: existingGroupAffiliation.description || arTranslation?.description || "",
      },
      group_logo: [], // TODO: Add group logo handling when API supports it
      stat_1_value: "",
      stat_1_label: {
        en: "",
        ar: "",
      },
      stat_2_value: "",
      stat_2_label: {
        en: "",
        ar: "",
      },
      stat_3_value: "",
      stat_3_label: {
        en: "",
        ar: "",
      },
    } as unknown as FormData);
  }, [existingGroupAffiliation, form]);

  const createMutation = useAboutBarqGroupAffiliationControllerCreate();
  const updateMutation = useAboutBarqGroupAffiliationControllerUpdate();

  const onSubmit = async (values: FormData) => {
    const groupLogoId = Array.isArray((values as any).group_logo)
      ? (values as any).group_logo?.[0]?.id
      : undefined;

    if (!existingGroupAffiliation) {
      await createMutation.mutateAsync(
        {
          body: {
            title: values.title?.ar || "",
            description: values.description?.ar || "",
            images_ids: groupLogoId ? [groupLogoId] : [],
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
                  <div className="grid md:grid-cols-2 gap-4">
                    <I18nFormTextField
                      name="stat_1_label"
                      control={form.control}
                      label={t("aboutUs.groupSection.form.stat1Label")}
                      required
                    />
                    <I18nFormTextField
                      name="stat_2_label"
                      control={form.control}
                      label={t("aboutUs.groupSection.form.stat2Label")}
                      required
                    />
                  </div>
                  <I18nFormTextField
                    name="stat_3_label"
                    control={form.control}
                    label={t("aboutUs.groupSection.form.stat3Label")}
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
                  <div className="grid md:grid-cols-2 gap-4">
                    <I18nFormTextField
                      name="stat_1_label"
                      control={form.control}
                      label={t("aboutUs.groupSection.form.stat1Label")}
                      required
                    />
                    <I18nFormTextField
                      name="stat_2_label"
                      control={form.control}
                      label={t("aboutUs.groupSection.form.stat2Label")}
                      required
                    />
                  </div>
                  <I18nFormTextField
                    name="stat_3_label"
                    control={form.control}
                    label={t("aboutUs.groupSection.form.stat3Label")}
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
            <h3 className="text-lg font-semibold mb-4">{t("aboutUs.groupSection.form.statisticsValues")}</h3>
            <div className="grid md:grid-cols-3 gap-4">
              <FormField
                control={form.control}
                name="stat_1_value"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("aboutUs.groupSection.form.stat1Value")}</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder={t("aboutUs.groupSection.form.stat1Placeholder")} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="stat_2_value"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("aboutUs.groupSection.form.stat2Value")}</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder={t("aboutUs.groupSection.form.stat2Placeholder")} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="stat_3_value"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("aboutUs.groupSection.form.stat3Value")}</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder={t("aboutUs.groupSection.form.stat3Placeholder")} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
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
