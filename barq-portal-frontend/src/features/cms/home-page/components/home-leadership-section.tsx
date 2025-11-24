import { useEffect, useMemo, useState } from "react";
import { Input } from "@/shared/components/ui/input";
import { Textarea } from "@/shared/components/ui/textarea";
import { Button } from "@/shared/components/ui/button";
import { useLang } from "@/shared/hooks/use-lang";
import { type LanguageCode } from "@/shared/constants";
import {
  useLeadershipControllerReadQuery,
  useLeadershipControllerCreate,
  useLeadershipControllerUpdate,
} from "@/sdk/modules/leadership.gen";
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
  createLeadershipSchema,
  updateLeadershipSchema,
} from "../schemas/leadership.schema";
import type {
  CreateLeadershipFormData,
  UpdateLeadershipFormData,
} from "../schemas/leadership.schema";
import { toast } from "sonner";

export default function HomeLeadershipSection() {
  const { lang, t } = useLang();
  const [currentLanguage, setCurrentLanguage] = useState<LanguageCode>("en");

  const { data, isLoading } = useLeadershipControllerReadQuery({
    query: {
      query: {
        relations: {
          media: true,
          leadership_id_leadership_translations: true,
        },
        pagination: { take: 1, skip: 0 },
      },
    },
  });

  const existing = data?.data?.[0];
  const currentTranslation = useMemo(
    () =>
      existing?.leadership_id_leadership_translations?.find(
        (tr) => tr.language === lang
      ),
    [existing, lang]
  );

  const isUpdate = !!existing;

  type FormData = CreateLeadershipFormData | UpdateLeadershipFormData;
  const form = useForm<FormData>({
    resolver: zodResolver(
      isUpdate ? updateLeadershipSchema : createLeadershipSchema
    ),
    defaultValues: {
      quote: { en: "", ar: "" },
      name: { en: "", ar: "" },
      position: { en: "", ar: "" },
      media: [],
    } as unknown as FormData,
    mode: "onChange",
  });

  useEffect(() => {
    if (!existing) return;

    // Transform API data to i18n format
    const enTranslation = existing.leadership_id_leadership_translations?.find(
      (t) => t.language === "en"
    );
    const arTranslation = existing.leadership_id_leadership_translations?.find(
      (t) => t.language === "ar"
    );

    form.reset({
      quote: {
        en: enTranslation?.quote || existing.quote || "",
        ar: arTranslation?.quote || "",
      },
      name: {
        en: enTranslation?.name || existing.name || "",
        ar: arTranslation?.name || "",
      },
      position: {
        en: enTranslation?.position || existing.position || "",
        ar: arTranslation?.position || "",
      },
      media: existing.media?.id
        ? [
            {
              id: existing.media.id,
              url: existing.media.url,
              key: existing.media.key,
              format: existing.media.format,
              mime_type: existing.media.mime_type,
              size: existing.media.size,
            },
          ]
        : [],
    } as unknown as FormData);
  }, [existing, form]);

  const createMutation = useLeadershipControllerCreate();
  const updateMutation = useLeadershipControllerUpdate();

  const onSubmit = async (values: FormData) => {
    const mediaId = Array.isArray((values as any).media)
      ? (values as any).media?.[0]?.id
      : undefined;

    if (!existing) {
      await createMutation.mutateAsync(
        {
          body: {
            quote: values.quote?.en || "",
            name: values.name?.en || "",
            position: values.position?.en || "",
            media_id: mediaId as number,
            leadership_id_leadership_translations: [
              {
                quote: values.quote?.en || "",
                name: values.name?.en || "",
                position: values.position?.en || "",
                language: "en",
              },
              {
                quote: values.quote?.ar || "",
                name: values.name?.ar || "",
                position: values.position?.ar || "",
                language: "ar",
              },
            ],
          },
        },
        {
          onSuccess: () => {
            toast.success(t("cms.homePage.leadership.messages.created"));
          },
          onError: (error) => {
            toast.error(
              error.message ||
                t("cms.homePage.leadership.messages.errorCreating")
            );
          },
        }
      );
    } else {
      await updateMutation.mutateAsync(
        {
          path: { id: String(existing.id) },
          body: {
            quote: values.quote?.en || "",
            name: values.name?.en || "",
            position: values.position?.en || "",
            media_id: mediaId,
            leadership_id_leadership_translations: [
              {
                quote: values.quote?.en || "",
                name: values.name?.en || "",
                position: values.position?.en || "",
                language: "en",
              },
              {
                quote: values.quote?.ar || "",
                name: values.name?.ar || "",
                position: values.position?.ar || "",
                language: "ar",
              },
            ],
          },
        },
        {
          onSuccess: () => {
            toast.success(t("cms.homePage.leadership.messages.updated"));
          },
          onError: (error) => {
            toast.error(
              error.message ||
                t("cms.homePage.leadership.messages.errorUpdating")
            );
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
                  <div className="grid md:grid-cols-2 gap-4">
                    <I18nFormTextField
                      name="name"
                      control={form.control}
                      label={t("cms.homePage.leadership.form.name")}
                      required
                    />
                    <I18nFormTextField
                      name="position"
                      control={form.control}
                      label={t("cms.homePage.leadership.form.position")}
                      required
                    />
                  </div>
                  <I18nFormTextareaField
                    name="quote"
                    control={form.control}
                    label={t("cms.homePage.leadership.form.quote")}
                    required
                  />
                </div>
              </I18nTabContent>
              <I18nTabContent language="ar">
                <div className="grid gap-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <I18nFormTextField
                      name="name"
                      control={form.control}
                      label={t("cms.homePage.leadership.form.name")}
                      required
                    />
                    <I18nFormTextField
                      name="position"
                      control={form.control}
                      label={t("cms.homePage.leadership.form.position")}
                      required
                    />
                  </div>
                  <I18nFormTextareaField
                    name="quote"
                    control={form.control}
                    label={t("cms.homePage.leadership.form.quote")}
                    required
                  />
                </div>
              </I18nTabContent>
            </I18nFormProvider>
          </I18nTabs>
          <FormField
            control={form.control}
            name={"media" as any}
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("cms.homePage.leadership.form.image")}</FormLabel>
                <FormControl>
                  <DocumentUploader
                    value={(field.value as any) || []}
                    maxDocuments={1}
                    maxSize={2 * 1024 * 1024}
                    acceptedFileTypes={["image/*"]}
                    onChange={field.onChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex justify-end items-center gap-3">
            <Button type="submit" loading={form.formState.isSubmitting}>
              {existing
                ? t("cms.homePage.leadership.form.update")
                : t("cms.homePage.leadership.form.create")}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
