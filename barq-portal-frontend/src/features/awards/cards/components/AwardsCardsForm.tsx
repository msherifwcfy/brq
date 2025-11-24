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
  createAwardsCardsSchema,
  updateAwardsCardsSchema,
} from "../schemas/awards-cards.schema";
import type {
  CreateAwardsCardsFormData,
  UpdateAwardsCardsFormData,
} from "../schemas/awards-cards.schema";
import { useLang } from "@/shared/hooks/use-lang";
import { z } from "zod";
import { DocumentUploader } from "@/shared/components/custom/DocumentUploader";

export type AwardsCardsFormProps = {
  defaultValues?: Partial<
    CreateAwardsCardsFormData | UpdateAwardsCardsFormData
  >;
  onSubmit: (
    values: CreateAwardsCardsFormData | UpdateAwardsCardsFormData
  ) => void;
  isLoading?: boolean;
  submitLabel?: string;
  isUpdate?: boolean;
};

export function AwardsCardsForm({
  defaultValues,
  onSubmit,
  isLoading,
  submitLabel,
  isUpdate = false,
}: AwardsCardsFormProps) {
  const { t } = useLang();
  const [currentLanguage, setCurrentLanguage] = useState<LanguageCode>("en");

  const schema = isUpdate ? updateAwardsCardsSchema : createAwardsCardsSchema;

  type FormData = CreateAwardsCardsFormData | UpdateAwardsCardsFormData;

  const methods = useForm<FormData>({
    resolver: zodResolver(schema) as any,
    defaultValues: {
      media: undefined,
      name: { en: "", ar: "" },
      description: { en: "", ar: "" },
      ...defaultValues,
    },
    mode: "onChange",
  });

  const { handleSubmit, control } = methods;

  const handleFormSubmit = (values: any) => {
    const formData = {
      ...values,
      media_id: values.media?.[0]?.id,
    };
    delete formData.media;
    onSubmit(formData);
  };

  return (
    <Form {...methods}>
      <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
        <FormField
          name="media"
          control={control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("awardsCards.form.media")}</FormLabel>
              <FormControl>
                <DocumentUploader
                  {...field}
                  acceptedFileTypes={[
                    "image/jpeg",
                    "image/png",
                    "image/jpg",
                    "image/webp",
                  ]}
                  disabled={isLoading}
                  layout="single"
                  multiple={false}
                  maxDocuments={1}
                  placeholder={t("awardsCards.form.mediaPlaceholder")}
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
                <I18nFormTextField
                  name="name"
                  control={control}
                  label={t("awardsCards.form.name")}
                  placeholder={t("awardsCards.form.namePlaceholder")}
                  disabled={isLoading}
                  required
                />
                <I18nFormTextareaField
                  name="description"
                  control={control}
                  label={t("awardsCards.form.description")}
                  placeholder={t("awardsCards.form.descriptionPlaceholder")}
                  disabled={isLoading}
                  required
                  className="min-h-[100px]"
                />
              </div>
            </I18nTabContent>
            <I18nTabContent language="ar">
              <div className="grid gap-4">
                <I18nFormTextField
                  name="name"
                  control={control}
                  label={t("awardsCards.form.name")}
                  placeholder={t("awardsCards.form.namePlaceholder")}
                  disabled={isLoading}
                  required
                />
                <I18nFormTextareaField
                  name="description"
                  control={control}
                  label={t("awardsCards.form.description")}
                  placeholder={t("awardsCards.form.descriptionPlaceholder")}
                  disabled={isLoading}
                  required
                  className="min-h-[100px]"
                />
              </div>
            </I18nTabContent>
          </I18nFormProvider>
        </I18nTabs>

        <Button type="submit" disabled={isLoading} className="w-full">
          {isLoading
            ? t("awardsCards.form.loading")
            : submitLabel || t("awardsCards.form.save")}
        </Button>
      </form>
    </Form>
  );
}
