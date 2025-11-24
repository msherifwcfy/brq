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
import { Textarea } from "@/shared/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { type LanguageCode } from "@/shared/constants";
import {
  I18nFormTextField,
  I18nFormTextareaField,
  I18nTabs,
  I18nTabContent,
  I18nFormProvider,
} from "@/shared/components/custom/i18n";

import {
  createCardSocialSchema,
  updateCardSocialSchema,
} from "../schemas/sustainability-card-social.schema";
import type {
  CreateCardSocialFormData,
  UpdateCardSocialFormData,
} from "../schemas/sustainability-card-social.schema";
import { useLang } from "@/shared/hooks/use-lang";
import { z } from "zod";
import { DocumentUploader } from "@/shared/components/custom/DocumentUploader";

export type SustainabilityCardSocialFormProps = {
  defaultValues?: Partial<CreateCardSocialFormData | UpdateCardSocialFormData>;
  onSubmit: (
    values: CreateCardSocialFormData | UpdateCardSocialFormData
  ) => void;
  isLoading?: boolean;
  submitLabel?: string;
  isUpdate?: boolean;
};

export function SustainabilityCardSocialForm({
  defaultValues,
  onSubmit,
  isLoading,
  submitLabel,
  isUpdate = false,
}: SustainabilityCardSocialFormProps) {
  const { t } = useLang();
  const [currentLanguage, setCurrentLanguage] = useState<LanguageCode>("en");

  const schema = isUpdate ? updateCardSocialSchema : createCardSocialSchema;

  const methods = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      title: { en: "", ar: "" },
      description: { en: "", ar: "" },
      ...defaultValues,
    },
    mode: "onChange",
  });

  const { handleSubmit } = methods;

  return (
    <Form {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
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
                  control={methods.control}
                  label={t("sustainability.cardSocial.form.title")}
                  placeholder={t(
                    "sustainability.cardSocial.form.titlePlaceholder"
                  )}
                  disabled={isLoading}
                  required
                />
                <I18nFormTextareaField
                  name="description"
                  control={methods.control}
                  label={t("sustainability.cardSocial.form.description")}
                  placeholder={t(
                    "sustainability.cardSocial.form.descriptionPlaceholder"
                  )}
                  disabled={isLoading}
                  required
                  rows={4}
                />
              </div>
            </I18nTabContent>
            <I18nTabContent language="ar">
              <div className="grid gap-4">
                <I18nFormTextField
                  name="title"
                  control={methods.control}
                  label={t("sustainability.cardSocial.form.title")}
                  placeholder={t(
                    "sustainability.cardSocial.form.titlePlaceholder"
                  )}
                  disabled={isLoading}
                  required
                />
                <I18nFormTextareaField
                  name="description"
                  control={methods.control}
                  label={t("sustainability.cardSocial.form.description")}
                  placeholder={t(
                    "sustainability.cardSocial.form.descriptionPlaceholder"
                  )}
                  disabled={isLoading}
                  required
                  rows={4}
                />
              </div>
            </I18nTabContent>
          </I18nFormProvider>
        </I18nTabs>

        <FormField
          name="icon"
          control={methods.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("sustainability.cardSocial.form.media")}</FormLabel>
              <FormControl>
                <DocumentUploader
                  {...field}
                  disabled={isLoading}
                  acceptedFileTypes={[
                    "image/svg+xml",
                    "image/png",
                    "image/jpeg",
                    "image/webp",
                  ]}
                  multiple={false}
                  maxDocuments={1}
                  layout="single"
                  value={field.value ? [field.value] : ([] as any)}
                />
              </FormControl>
            </FormItem>
          )}
        />

        <Button type="submit" disabled={isLoading} className="w-full">
          {isLoading
            ? t("sustainability.cardSocial.form.loading")
            : submitLabel || t("sustainability.cardSocial.form.save")}
        </Button>
      </form>
    </Form>
  );
}
