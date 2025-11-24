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
import { useForm } from "react-hook-form";
import { useLang } from "@/shared/hooks/use-lang";
import { z } from "zod";
import { DocumentUploader, type DocumentUploadValue } from "@/shared/components/custom/DocumentUploader";
import {
  I18nFormProvider,
  I18nFormTextField,
  I18nTabContent,
  I18nTabs,
} from "@/shared/components/custom/i18n";
import { createI18nFieldSchema } from "@/shared/schemas/i18n.schema";
import { type LanguageCode } from "@/shared/constants";
import { useState } from "react";
import { documentSchema } from "@/shared/schemas/file.schema";

const createFooterTermsSchema = z.object({
  title: createI18nFieldSchema(
    z.string().min(1, "Title is required").max(255, "Title must not exceed 255 characters")
  ),
  file: documentSchema
    .optional(),
});

const updateFooterTermsSchema = createFooterTermsSchema;

type CreateFooterTermsFormData = z.infer<typeof createFooterTermsSchema>;
type UpdateFooterTermsFormData = z.infer<typeof updateFooterTermsSchema>;

type Props = {
  defaultValues?: Partial<CreateFooterTermsFormData>;
  onSubmit: (values: CreateFooterTermsFormData) => void;
  isLoading?: boolean;
  submitLabel: string;
  isUpdate?: boolean;
};

export function FooterTermsForm({
  defaultValues,
  onSubmit,
  isLoading,
  submitLabel,
  isUpdate,
}: Props) {
  const { t } = useLang();
  const [currentLanguage, setCurrentLanguage] = useState<LanguageCode>("en");
  const schema = isUpdate
    ? updateFooterTermsSchema
    : createFooterTermsSchema;

  const methods = useForm<CreateFooterTermsFormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      title: defaultValues?.title && typeof defaultValues.title === "object"
        ? defaultValues.title
        : { en: (typeof defaultValues?.title === "string" ? defaultValues.title : "") || "", ar: "" },
      file: defaultValues?.file,
    },
    mode: "onChange",
  });

  const { handleSubmit, control } = methods;

  return (
    <Form {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <I18nTabs value={currentLanguage} onValueChange={setCurrentLanguage} className="w-full">
          <I18nFormProvider currentLanguage={currentLanguage}>
            <I18nTabContent language="en">
              <I18nFormTextField
                name="title"
                control={control}
                label={t("footerTerms.form.title")}
                placeholder={t("footerTerms.form.titlePlaceholder")}
                required
                disabled={isLoading}
              />
            </I18nTabContent>
            <I18nTabContent language="ar">
              <I18nFormTextField
                name="title"
                control={control}
                label={t("footerTerms.form.title")}
                placeholder={t("footerTerms.form.titlePlaceholder")}
                required
                disabled={isLoading}
              />
            </I18nTabContent>
          </I18nFormProvider>
        </I18nTabs>

        <FormField
          name="file"
          control={control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("footerTerms.form.file")}</FormLabel>
              <FormControl>
                <DocumentUploader
                  value={field.value ? [field.value] : []}
                  onChange={(value) => {
                    field.onChange(value && value.length > 0 ? value[0] : null);
                  }}
                  multiple={false}
                  maxDocuments={1}
                  acceptedFileTypes={["application/pdf", "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"]}
                  placeholder={t("footerTerms.form.filePlaceholder")}
                  supportingText={t("footerTerms.form.fileSupportingText")}
                  disabled={isLoading}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" loading={isLoading} className="w-full">
          {isLoading ? t("common.loading") : submitLabel}
        </Button>
      </form>
    </Form>
  );
}

