import { Button } from "@/shared/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shared/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, type FieldErrors } from "react-hook-form";
import {
  createCaseStudySchema,
  updateCaseStudySchema,
  type CreateCaseStudyFormData,
  type UpdateCaseStudyFormData,
} from "../schemas/case-studies.schema";
import { useLang } from "@/shared/hooks/use-lang";
import { CountrySelect, IndustrySelect } from "@/shared/components/select";
import {
  DocumentUploader,
  type DocumentUploadValue,
} from "@/shared/components/custom/DocumentUploader";
import { Input } from "@/shared/components/ui/input";
import { useState, useEffect } from "react";
import DatePicker from "@/shared/components/custom/DatePicker";
import {
  I18nTabs,
  I18nTabContent,
  I18nFormProvider,
  I18nFormTextField,
  I18nFormTextareaField,
} from "@/shared/components/custom/i18n";
import { type LanguageCode } from "@/shared/constants";
import type { SuccessStoryCaseStudiesEntity } from "@/sdk";
import { Switch } from "@/shared/components/ui/switch";
import { toast } from "sonner";
import { hasLanguageErrors } from "@/shared/utils/hasLanguageErrors";

export type CaseStudyFormProps = {
  defaultValues?: SuccessStoryCaseStudiesEntity | null;
  onSubmit: (values: CreateCaseStudyFormData | UpdateCaseStudyFormData) => void;
  isLoading?: boolean;
  submitLabel?: string;
  isUpdate?: boolean;
};

export function CaseStudyForm({
  defaultValues,
  onSubmit,
  isLoading,
  submitLabel,
  isUpdate = false,
}: CaseStudyFormProps) {
  const { t } = useLang();
  const [currentLanguage, setCurrentLanguage] = useState<LanguageCode>("en");

  const schema = isUpdate ? updateCaseStudySchema : createCaseStudySchema;

  const existing =
    defaultValues?.success_story_case_studies_id_success_story_case_studies_translations ||
    [];

  const enTranslation = existing.find((t) => t.language === "en");

  const methods = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      title: {
        en: typeof enTranslation?.title === "string" ? enTranslation.title : "",
        ar: defaultValues?.title || "",
      },
      description: {
        en:
          typeof enTranslation?.description === "string"
            ? enTranslation.description
            : "",
        ar: defaultValues?.description || "",
      },
      long_description: {
        en:
          typeof enTranslation?.long_description === "string"
            ? enTranslation.long_description
            : "",
        ar: defaultValues?.long_description || "",
      },
      featured: defaultValues?.featured || false,
      is_featured: defaultValues?.is_featured || false,
      date: defaultValues?.date || "",
      image: defaultValues?.image ? [defaultValues?.image] : [],
      home_image: defaultValues?.home_image ? [defaultValues?.home_image] : [],
      read_time: defaultValues?.read_time || 0,
      industries_id: defaultValues?.industries_id || 0,
      country_id: defaultValues?.country_id || 0,
    },
    mode: "onChange",
    reValidateMode: "onChange",
  });

  const { handleSubmit, control, reset } = methods;

  useEffect(() => {
    if (!defaultValues) return;

    const existing =
      defaultValues.success_story_case_studies_id_success_story_case_studies_translations ||
      [];
    const enTranslation = existing.find((t) => t.language === "en");

    reset({
      title: {
        en:
          typeof enTranslation?.title === "string"
            ? enTranslation.title
            : defaultValues?.title || "",
        ar: defaultValues?.title || "",
      },
      description: {
        en:
          typeof enTranslation?.description === "string"
            ? enTranslation.description
            : defaultValues?.description || "",
        ar: defaultValues?.description || "",
      },
      long_description: {
        en:
          typeof enTranslation?.long_description === "string"
            ? enTranslation.long_description
            : defaultValues?.long_description || "",
        ar: defaultValues?.long_description || "",
      },
      featured: defaultValues.featured || false,
      is_featured: defaultValues.is_featured || false,
      date: defaultValues.date || "",
      image: defaultValues.image ? [defaultValues.image] : [],
      read_time: defaultValues.read_time || 0,
      industries_id: defaultValues.industries_id || 0,
      country_id: defaultValues.country_id || 0,
    });
  }, [defaultValues, reset]);

  const handleFormSubmit = (
    values: CreateCaseStudyFormData | UpdateCaseStudyFormData
  ) => {
    onSubmit(values);
  };

  const onError = (errors: any) => {
    const hasOppositeLangErrors = hasLanguageErrors(errors, currentLanguage);
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
    console.log(errors);
  };

  return (
    <Form {...methods}>
      <form
        onSubmit={handleSubmit(handleFormSubmit, onError)}
        className="space-y-6"
      >
        <FormField
          name="date"
          control={control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("caseStudies.form.date")}</FormLabel>
              <FormControl>
                <DatePicker
                  date={field.value ? new Date(field.value) : undefined}
                  onSelect={(date) => field.onChange(date?.toISOString())}
                  className="w-full"
                  placeholder={t("caseStudies.form.datePlaceholder")}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="is_featured"
          control={control}
          render={({ field }) => (
            <FormItem className="flex flex-row items-center gap-2">
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                  disabled={isLoading}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>{t("caseStudies.form.showOnHomepage")}</FormLabel>
              </div>
            </FormItem>
          )}
        />
        <FormField
          name="featured"
          control={control}
          render={({ field }) => (
            <FormItem className="flex flex-row items-center gap-2">
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                  disabled={isLoading}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>{t("caseStudies.form.featured")}</FormLabel>
              </div>
            </FormItem>
          )}
        />

        <FormField
          name="read_time"
          control={control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("caseStudies.form.readTime")}</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="number"
                  disabled={isLoading}
                  placeholder={t("caseStudies.form.readTimePlaceholder")}
                  onChange={(e) => field.onChange(Number(e.target.value))}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="home_image"
          control={control}
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>{t("caseStudies.form.thumbnailImage")}</FormLabel>
              <FormControl>
                <DocumentUploader
                  value={field.value as DocumentUploadValue[]}
                  onChange={field.onChange}
                  disabled={isLoading}
                  layout="single"
                  multiple={false}
                  maxDocuments={1}
                  placeholder={t("caseStudies.form.thumbnailImagePlaceholder")}
                  acceptedFileTypes={[
                    "image/jpeg",
                    "image/png",
                    "image/jpg",
                    "image/webp",
                  ]}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="image"
          control={control}
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>{t("caseStudies.form.image")}</FormLabel>
              <FormControl>
                <DocumentUploader
                  value={field.value as DocumentUploadValue[]}
                  onChange={field.onChange}
                  disabled={isLoading}
                  layout="single"
                  multiple={false}
                  maxDocuments={1}
                  placeholder={t("caseStudies.form.imagePlaceholder")}
                  acceptedFileTypes={[
                    "video/mp4",
                    "video/mov",
                    "video/avi",
                    "video/mkv",
                    "video/webm",
                    "image/jpeg",
                    "image/png",
                    "image/jpg",
                    "image/webp",
                  ]}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="country_id"
          control={control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("caseStudies.form.countryId")}</FormLabel>
              <FormControl>
                <CountrySelect
                  value={field.value ? String(field.value) : undefined}
                  onValueChange={(value) => field.onChange(Number(value))}
                  disabled={isLoading}
                  placeholder={t("caseStudies.form.countryIdPlaceholder")}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="industries_id"
          control={control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("caseStudies.form.industriesId")}</FormLabel>
              <FormControl>
                <IndustrySelect
                  value={field.value ? String(field.value) : undefined}
                  onValueChange={(value) => field.onChange(Number(value))}
                  disabled={isLoading}
                  placeholder={t("caseStudies.form.industriesIdPlaceholder")}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="space-y-6 border-t pt-6">
          <I18nTabs
            value={currentLanguage}
            onValueChange={(value) => setCurrentLanguage(value as LanguageCode)}
            className="w-full"
          >
            <I18nFormProvider currentLanguage={currentLanguage}>
              <I18nTabContent language="en">
                <div className="space-y-4">
                  <I18nFormTextField
                    name="title"
                    control={control}
                    label={t("caseStudies.form.title")}
                    placeholder={t("caseStudies.form.titlePlaceholder")}
                    disabled={isLoading}
                    required={!isUpdate}
                  />
                  <I18nFormTextareaField
                    name="description"
                    control={control}
                    label={t("caseStudies.form.description")}
                    placeholder={t("caseStudies.form.descriptionPlaceholder")}
                    disabled={isLoading}
                    rows={4}
                    required={!isUpdate}
                  />
                  <I18nFormTextareaField
                    name="long_description"
                    control={control}
                    label={t("caseStudies.form.longDescription")}
                    placeholder={t(
                      "caseStudies.form.longDescriptionPlaceholder"
                    )}
                    rows={6}
                    disabled={isLoading}
                    required={!isUpdate}
                  />
                </div>
              </I18nTabContent>
              <I18nTabContent language="ar">
                <div className="space-y-4">
                  <I18nFormTextField
                    name="title"
                    control={control}
                    label={t("caseStudies.form.title")}
                    placeholder={t("caseStudies.form.titlePlaceholder")}
                    disabled={isLoading}
                    required={!isUpdate}
                  />
                  <I18nFormTextareaField
                    name="description"
                    control={control}
                    label={t("caseStudies.form.description")}
                    placeholder={t("caseStudies.form.descriptionPlaceholder")}
                    disabled={isLoading}
                    rows={4}
                    required={!isUpdate}
                  />
                  <I18nFormTextareaField
                    name="long_description"
                    control={control}
                    label={t("caseStudies.form.longDescription")}
                    placeholder={t(
                      "caseStudies.form.longDescriptionPlaceholder"
                    )}
                    rows={6}
                    disabled={isLoading}
                    required={!isUpdate}
                  />
                </div>
              </I18nTabContent>
            </I18nFormProvider>
          </I18nTabs>
        </div>

        <Button type="submit" disabled={isLoading} className="w-full">
          {isLoading
            ? t("caseStudies.form.loading")
            : submitLabel || t("caseStudies.form.save")}
        </Button>
      </form>
    </Form>
  );
}
