import { useState } from "react";
import { Input } from "@/shared/components/ui/input";
import { Button } from "@/shared/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shared/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { contactUsOfficeSchema } from "../schemas/contact-us-offices.schema";
import { z } from "zod";
import { type LanguageCode } from "@/shared/constants";
import {
  I18nFormTextField,
  I18nFormTextareaField,
  I18nTabs,
  I18nTabContent,
  I18nFormProvider,
} from "@/shared/components/custom/i18n";
import {
  DocumentUploader,
  type DocumentUploadValue,
} from "@/shared/components/custom/DocumentUploader";
import { useLang } from "@/shared/hooks/use-lang";

export type ContactUsOfficeFormValues = z.infer<typeof contactUsOfficeSchema>;

type Props = {
  defaultValues?: Partial<ContactUsOfficeFormValues>;
  onSubmit: (values: ContactUsOfficeFormValues) => Promise<void> | void;
  isLoading?: boolean;
  submitLabel?: string;
};

export function ContactUsOfficeForm({
  defaultValues = {},
  onSubmit,
  isLoading,
  submitLabel = "Save",
}: Props) {
  const { t } = useLang();
  const [currentLanguage, setCurrentLanguage] = useState<LanguageCode>("en");

  const form = useForm<ContactUsOfficeFormValues>({
    resolver: zodResolver(contactUsOfficeSchema),
    defaultValues: {
      country: defaultValues.country || { en: "", ar: "" },
      countryFlag: defaultValues.countryFlag || [],
      officeTitle: defaultValues.officeTitle || { en: "", ar: "" },
      location: defaultValues.location || { en: "", ar: "" },
      phone: defaultValues.phone || "",
      fax: defaultValues.fax || "",
      email: defaultValues.email || "",
    },
  });

  const handleSubmit = async (values: ContactUsOfficeFormValues) => {
    await onSubmit(values);
  };

  return (
    <Form {...form}>
      <form className="space-y-4" onSubmit={form.handleSubmit(handleSubmit)}>
        <I18nTabs
          value={currentLanguage}
          onValueChange={setCurrentLanguage}
          className="w-full"
        >
          <I18nFormProvider currentLanguage={currentLanguage}>
            <I18nTabContent language="en">
              <div className="space-y-4">
                <I18nFormTextField
                  name="country"
                  control={form.control}
                  label={t("cms.contactUs.offices.form.country")}
                  required
                />
                <I18nFormTextField
                  name="officeTitle"
                  control={form.control}
                  label={t("cms.contactUs.offices.form.officeTitle")}
                  required
                />
                <I18nFormTextareaField
                  name="location"
                  control={form.control}
                  label={t("cms.contactUs.offices.form.location")}
                  required
                  rows={3}
                />
              </div>
            </I18nTabContent>
            <I18nTabContent language="ar">
              <div className="space-y-4">
                <I18nFormTextField
                  name="country"
                  control={form.control}
                  label={t("cms.contactUs.offices.form.country")}
                  required
                />
                <I18nFormTextField
                  name="officeTitle"
                  control={form.control}
                  label={t("cms.contactUs.offices.form.officeTitle")}
                  required
                />
                <I18nFormTextareaField
                  name="location"
                  control={form.control}
                  label={t("cms.contactUs.offices.form.location")}
                  rows={3}
                />
              </div>
            </I18nTabContent>
          </I18nFormProvider>
        </I18nTabs>

        <FormField
          control={form.control}
          name="countryFlag"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Country Flag</FormLabel>
              <FormControl>
                <DocumentUploader
                  value={field.value as DocumentUploadValue[]}
                  onChange={field.onChange}
                  maxDocuments={1}
                  maxSize={5 * 1024 * 1024}
                  acceptedFileTypes={["image/*"]}
                  placeholder="Upload country flag image"
                  layout="single"
                  disabled={isLoading}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("cms.contactUs.offices.form.phone")}</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="fax"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("cms.contactUs.offices.form.fax")}</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("cms.contactUs.offices.form.email")}</FormLabel>
                <FormControl>
                  <Input type="email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex justify-end">
          <Button type="submit" disabled={isLoading}>
            {submitLabel}
          </Button>
        </div>
      </form>
    </Form>
  );
}
