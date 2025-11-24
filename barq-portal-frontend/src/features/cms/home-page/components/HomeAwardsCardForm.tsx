import { Button } from "@/shared/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shared/components/ui/form";
import { Input } from "@/shared/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  createHomeAwardsCardSchema,
  updateHomeAwardsCardSchema,
} from "../schemas/home-awards-cards.schema";
import type {
  CreateHomeAwardsCardFormData,
  UpdateHomeAwardsCardFormData,
} from "../schemas/home-awards-cards.schema";
import { useLang } from "@/shared/hooks/use-lang";
import { useState } from "react";
import { type LanguageCode } from "@/shared/constants";
import {
  DocumentUploader,
  type DocumentUploadValue,
} from "@/shared/components/custom/DocumentUploader";
import {
  I18nFormTextField,
  I18nTabs,
  I18nTabContent,
  I18nFormProvider,
} from "@/shared/components/custom/i18n";
import DatePicker from "@/shared/components/custom/DatePicker";

export type HomeAwardsCardFormProps = {
  defaultValues?: Partial<
    CreateHomeAwardsCardFormData | UpdateHomeAwardsCardFormData
  >;
  onSubmit: (
    values: CreateHomeAwardsCardFormData | UpdateHomeAwardsCardFormData
  ) => void;
  isLoading?: boolean;
  submitLabel?: string;
  isUpdate?: boolean;
};

export function HomeAwardsCardForm({
  defaultValues,
  onSubmit,
  isLoading,
  submitLabel,
  isUpdate = false,
}: HomeAwardsCardFormProps) {
  const { t, lang } = useLang();
  const [currentLanguage, setCurrentLanguage] = useState<LanguageCode>("en");

  const schema = isUpdate ? updateHomeAwardsCardSchema : createHomeAwardsCardSchema;

  const methods = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      title: defaultValues?.title || { en: "", ar: "" },
      date: defaultValues?.date || "",
      icon: defaultValues?.icon || [],
    },
    mode: "onChange",
  });

  const { handleSubmit, control } = methods;

  const handleFormSubmit = (values: any) => {
    const formData = {
      ...values,
      icon_id: values.icon?.[0]?.id,
    };
    delete formData.icon;
    onSubmit(formData);
  };

  return (
    <Form {...methods}>
      <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
        <I18nTabs
          value={currentLanguage}
          onValueChange={setCurrentLanguage}
          className="w-full"
        >
          <I18nFormProvider currentLanguage={currentLanguage}>
            <I18nTabContent language="en">
              <I18nFormTextField
                name="title"
                control={control}
                label={t("cms.homePage.homeAwards.cards.form.title")}
                required
              />
            </I18nTabContent>
            <I18nTabContent language="ar">
              <I18nFormTextField
                name="title"
                control={control}
                label={t("cms.homePage.homeAwards.cards.form.title")}
                required
              />
            </I18nTabContent>
          </I18nFormProvider>
        </I18nTabs>

        <FormField
          name="date"
          control={control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("cms.homePage.homeAwards.cards.form.date")}</FormLabel>
              <FormControl>
                <DatePicker
                  date={field.value ? new Date(field.value) : undefined}
                  onSelect={(date) => field.onChange(date?.toISOString())}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="icon"
          control={control}
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>{t("cms.homePage.homeAwards.cards.form.icon")}</FormLabel>
              <FormControl>
                <DocumentUploader
                  value={field.value as DocumentUploadValue[]}
                  onChange={field.onChange}
                  disabled={isLoading}
                  layout="single"
                  multiple={false}
                  maxDocuments={1}
                  placeholder={t("cms.homePage.homeAwards.cards.form.iconPlaceholder")}
                  acceptedFileTypes={[
                    "image/jpeg",
                    "image/png",
                    "image/jpg",
                    "image/webp",
                    "image/svg+xml",
                  ]}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" disabled={isLoading} className="w-full">
          {isLoading
            ? t("cms.homePage.homeAwards.cards.form.loading")
            : submitLabel || t("cms.homePage.homeAwards.cards.form.save")}
        </Button>
      </form>
    </Form>
  );
}

