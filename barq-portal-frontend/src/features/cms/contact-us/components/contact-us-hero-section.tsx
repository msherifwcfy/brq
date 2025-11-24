import { useEffect, useState } from "react";
import { Button } from "@/shared/components/ui/button";
import { toast } from "sonner";
import { useContactUsHeroControllerReadQuery, useContactUsHeroControllerCreate, useContactUsHeroControllerUpdate } from "@/sdk/modules/contactushero.gen";
import { useLang } from "@/shared/hooks/use-lang";
import { type LanguageCode } from "@/shared/constants";
import { DocumentUploader } from "@/shared/components/custom/DocumentUploader";
import { I18nTabs, I18nTabContent, I18nFormProvider, I18nFormTextField, I18nFormTextareaField } from "@/shared/components/custom/i18n";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/shared/components/ui/form";
import { contactUsHeroSchema, type ContactUsHeroFormData } from "../schemas/contact-us-hero.schema";

export default function ContactUsHeroSection() {
  const { t } = useLang();

  const { data } = useContactUsHeroControllerReadQuery({
    query: {
      query: {
        relations: {
          contact_us_hero_id_contact_us_hero_translations: true,
          image: true,
        },
        pagination: { take: 1, skip: 0 },
      },
    },
    headers: {
      "x-skip-translations": "true",
    },
  });

  const existing = data?.data?.[0];
  const isUpdate = !!existing;

  const createMutation = useContactUsHeroControllerCreate();
  const updateMutation = useContactUsHeroControllerUpdate();

  const [currentLanguage, setCurrentLanguage] = useState<LanguageCode>("en");

  const form = useForm<ContactUsHeroFormData>({
    resolver: zodResolver(contactUsHeroSchema),
    defaultValues: {
      title: { en: "", ar: "" },
      description: { en: "", ar: "" },
      backgroundMedia: [],
    },
    mode: "onChange",
  });

  useEffect(() => {
    if (existing) {
      const en = existing.contact_us_hero_id_contact_us_hero_translations?.find((t: any) => t.language === "en");
      const ar = existing.contact_us_hero_id_contact_us_hero_translations?.find((t: any) => t.language === "ar");
      form.reset({
        title: {
          en: en?.title ?? existing.title ?? "",
          ar: ar?.title ?? existing.title ?? "",
        },
        description: {
          en: en?.sub_title ?? existing.sub_title ?? "",
          ar: ar?.sub_title ?? existing.sub_title ?? "",
        },
        backgroundMedia: existing.image
          ? [
              {
                id: existing.image.id,
                url: existing.image.url,
                key: existing.image.key,
                format: existing.image.format,
                mime_type: existing.image.mime_type,
                size: existing.image.size,
              },
            ]
          : [],
      });
    }
  }, [existing, form]);

  const onSave = async (values: ContactUsHeroFormData) => {
    try {
      const mediaId = values.backgroundMedia?.[0]?.id;
      if (!mediaId) {
        toast.error(t("cms.contactUs.validation.backgroundImageRequired"));
        return;
      }
      if (isUpdate && existing) {
        await updateMutation.mutateAsync(
          {
            path: { id: String(existing.id) },
            body: {
              title: values.title.ar,
              sub_title: values.description.ar,
              media_id: mediaId,
              contact_us_hero_id_contact_us_hero_translations: [
                { title: values.title.en, sub_title: values.description.en, language: "en" as const },
                { title: values.title.ar, sub_title: values.description.ar, language: "ar" as const },
              ],
            },
          },
          {
            onSuccess: () => toast.success(t("cms.contactUs.messages.updated")),
            onError: (e) => toast.error(e.message || t("cms.contactUs.messages.errorUpdating")),
          }
        );
      } else {
        await createMutation.mutateAsync(
          {
            body: {
              title: values.title.ar,
              sub_title: values.description.ar,
              media_id: mediaId,
              contact_us_hero_id_contact_us_hero_translations: [
                { title: values.title.en, sub_title: values.description.en, language: "en" as const },
                { title: values.title.ar, sub_title: values.description.ar, language: "ar" as const },
              ],
            },
          },
          {
            onSuccess: () => toast.success(t("cms.contactUs.messages.created")),
            onError: (e) => toast.error(e.message || t("cms.contactUs.messages.errorCreating")),
          }
        );
      }
    } catch (error) {
      console.error("Error saving contact us hero:", error);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSave)} className="flex flex-col gap-4">
        <I18nTabs value={currentLanguage} onValueChange={setCurrentLanguage}>
          <I18nFormProvider currentLanguage={currentLanguage}>
            <I18nTabContent language="en">
              <div className="grid grid-cols-1 gap-4">
                <I18nFormTextField
                  name="title"
                  control={form.control}
                  label={t("cms.contactUs.form.heroTitle")}
                  placeholder={t("cms.contactUs.form.heroTitle")}
                  required
                />
                <I18nFormTextareaField
                  name="description"
                  control={form.control}
                  label={t("cms.contactUs.form.heroSubtext")}
                  placeholder={t("cms.contactUs.form.heroSubtext")}
                  required
                />
              </div>
            </I18nTabContent>
            <I18nTabContent language="ar">
              <div className="grid grid-cols-1 gap-4">
                <I18nFormTextField
                  name="title"
                  control={form.control}
                  label={t("cms.contactUs.form.heroTitle")}
                  placeholder={t("cms.contactUs.form.heroTitle")}
                  required
                />
                <I18nFormTextareaField
                  name="description"
                  control={form.control}
                  label={t("cms.contactUs.form.heroSubtext")}
                  placeholder={t("cms.contactUs.form.heroSubtext")}
                  required
                />
              </div>
            </I18nTabContent>
          </I18nFormProvider>
        </I18nTabs>
        <FormField
          control={form.control}
          name="backgroundMedia"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("cms.contactUs.form.backgroundImage")}</FormLabel>
              <FormControl>
                <DocumentUploader
                  value={field.value ?? []}
                  maxDocuments={1}
                  maxSize={50 * 1024 * 1024}
                  acceptedFileTypes={["image/*"]}
                  onChange={(value) => field.onChange(value ?? [])}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-end">
          <Button type="submit" disabled={createMutation.isPending || updateMutation.isPending}>{t("common.save")}</Button>
        </div>
      </form>
    </Form>
  );
}


