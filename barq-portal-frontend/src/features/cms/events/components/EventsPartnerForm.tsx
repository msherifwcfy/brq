import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/shared/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shared/components/ui/form";
import {
  I18nFormProvider,
  I18nFormTextField,
  I18nFormTextareaField,
  I18nTabContent,
  I18nTabs,
} from "@/shared/components/custom/i18n";
import {
  createEventsPartnerSchema,
  type CreateEventsPartnerFormValues,
} from "../schemas/events-partner.schema";
import { type DocumentUploadValue, DocumentUploader } from "@/shared/components/custom/DocumentUploader";
import { useLang } from "@/shared/hooks/use-lang";
import { type LanguageCode } from "@/shared/constants";

type EventsPartnerFormProps = {
  defaultValues?: Partial<CreateEventsPartnerFormValues>;
  onSubmit: (values: CreateEventsPartnerFormValues) => Promise<void> | void;
  isLoading?: boolean;
  submitLabel: string;
};

export function EventsPartnerForm({
  defaultValues,
  onSubmit,
  isLoading,
  submitLabel,
}: EventsPartnerFormProps) {
  const { t } = useLang();
  const [currentLanguage, setCurrentLanguage] = useState<LanguageCode>("en");

  const form = useForm<CreateEventsPartnerFormValues>({
    resolver: zodResolver(createEventsPartnerSchema),
    defaultValues: {
      title: { en: "", ar: "" },
      subTitle: { en: "", ar: "" },
      logos: [],
    },
  });

  useEffect(() => {
    if (!defaultValues) {
      form.reset({
        title: { en: "", ar: "" },
        subTitle: { en: "", ar: "" },
        logos: [],
      });
      return;
    }
    form.reset({
      title: defaultValues.title || { en: "", ar: "" },
      subTitle: defaultValues.subTitle || { en: "", ar: "" },
      logos:
        (defaultValues.logos as DocumentUploadValue[] | undefined)?.map(
          (logo) => ({
            id: logo.id,
            url: logo.url,
            key: logo.key,
            name: logo.name,
            format: logo.format,
            mime_type: logo.mime_type,
            size: logo.size,
          })
        ) || [],
    });
  }, [defaultValues, form]);

  const handleSubmit = async (values: CreateEventsPartnerFormValues) => {
    await onSubmit(values);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="space-y-6"
      >
        <I18nTabs
          value={currentLanguage}
          onValueChange={(value) => setCurrentLanguage(value as LanguageCode)}
          className="w-full"
        >
          <I18nFormProvider currentLanguage={currentLanguage}>
            <I18nTabContent language="en">
              <div className="grid gap-4">
                <I18nFormTextField
                  name="title"
                  control={form.control}
                  label={t("cms.events.partners.form.title")}
                  placeholder={t("cms.events.partners.form.titlePlaceholder")}
                  required
                />
                <I18nFormTextareaField
                  name="subTitle"
                  control={form.control}
                  label={t("cms.events.partners.form.subTitle")}
                  placeholder={t("cms.events.partners.form.subTitlePlaceholder")}
                  required
                />
              </div>
            </I18nTabContent>
            <I18nTabContent language="ar">
              <div className="grid gap-4">
                <I18nFormTextField
                  name="title"
                  control={form.control}
                  label={t("cms.events.partners.form.title")}
                  placeholder={t("cms.events.partners.form.titlePlaceholder")}
                  required
                />
                <I18nFormTextareaField
                  name="subTitle"
                  control={form.control}
                  label={t("cms.events.partners.form.subTitle")}
                  placeholder={t("cms.events.partners.form.subTitlePlaceholder")}
                  required
                />
              </div>
            </I18nTabContent>
          </I18nFormProvider>
        </I18nTabs>

        <FormField
          control={form.control}
          name="logos"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("cms.events.partners.form.logos")}</FormLabel>
              <FormControl>
                <DocumentUploader
                  value={(field.value as DocumentUploadValue[]) || []}
                  onChange={field.onChange}
                  multiple
                  maxDocuments={12}
                  acceptedFileTypes={["image/*"]}
                  disabled={isLoading}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end">
          <Button type="submit" loading={isLoading}>
            {submitLabel}
          </Button>
        </div>
      </form>
    </Form>
  );
}

