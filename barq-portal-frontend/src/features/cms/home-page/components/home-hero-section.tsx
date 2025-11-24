import { useEffect, useMemo } from "react";
import { Input } from "@/shared/components/ui/input";
import { Textarea } from "@/shared/components/ui/textarea";
import { Button } from "@/shared/components/ui/button";
import { useLang } from "@/shared/hooks/use-lang";
import {
  useHeroControllerReadQuery,
  useHeroControllerCreate,
  useHeroControllerUpdate,
} from "@/sdk/modules/hero.gen";
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
import { createHeroSchema, updateHeroSchema } from "../schemas/hero.schema";
import { useState } from "react";
import { type LanguageCode } from "@/shared/constants";
import type {
  CreateHeroFormData,
  UpdateHeroFormData,
} from "../schemas/hero.schema";
import { useLangNavigate } from "@/shared/hooks/use-lang-navigate";
import { toast } from "sonner";

export default function HomeHeroSection() {
  const { lang, t } = useLang();
  const navigate = useLangNavigate();
  const [currentLanguage, setCurrentLanguage] = useState<LanguageCode>("en");

  const { data, isLoading } = useHeroControllerReadQuery({
    query: {
      query: {
        relations: {
          media: true,
          hero_id_hero_translations: true,
        },
        pagination: { take: 1, skip: 0 },
      },
    },
    headers: {
      "x-skip-translations": "true",
    },
  });

  const existingHero = data?.data?.[0];
  const currentTranslation = useMemo(
    () =>
      existingHero?.hero_id_hero_translations?.find((t) => t.language === lang),
    [existingHero, lang]
  );

  const isUpdate = !!existingHero;

  type FormData = CreateHeroFormData | UpdateHeroFormData;
  const form = useForm<FormData>({
    resolver: zodResolver(isUpdate ? updateHeroSchema : createHeroSchema),
    defaultValues: {
      headline: { en: "", ar: "" },
      sub_headline: { en: "", ar: "" },
      cta_label: { en: "", ar: "" },
      media: [],
    } as unknown as FormData,
    mode: "onChange",
  });

  useEffect(() => {
    if (!existingHero) return;

    // Transform API data to i18n format
    const enTranslation = existingHero.hero_id_hero_translations?.find(
      (t) => t.language === "en"
    );
    const arTranslation = existingHero.hero_id_hero_translations?.find(
      (t) => t.language === "ar"
    );

    form.reset({
      headline: {
        en: enTranslation?.headline || "",
        ar: existingHero.headline || arTranslation?.headline || "",
      },
      sub_headline: {
        en: enTranslation?.sub_headline || "",
        ar: existingHero.sub_headline || arTranslation?.sub_headline || "",
      },
      cta_label: {
        en: enTranslation?.cta_label || "",
        ar: existingHero.cta_label || arTranslation?.cta_label || "",
      },
      media: existingHero.media?.id
        ? [
            {
              id: existingHero.media.id,
              url: existingHero.media.url,
              key: existingHero.media.key,
              format: existingHero.media.format,
              mime_type: existingHero.media.mime_type,
              size: existingHero.media.size,
            },
          ]
        : [],
    } as unknown as FormData);
  }, [existingHero, form]);

  const createMutation = useHeroControllerCreate();
  const updateMutation = useHeroControllerUpdate();

  const onSubmit = async (values: FormData) => {
    const mediaId = Array.isArray((values as any).media)
      ? (values as any).media?.[0]?.id
      : undefined;

    if (!existingHero) {
      await createMutation.mutateAsync(
        {
          body: {
            headline: values.headline?.ar || "",
            sub_headline: values.sub_headline?.ar || "",
            cta_label: values.cta_label?.ar || "",
            media_id: mediaId as number,
            hero_id_hero_translations: [
              {
                headline: values.headline?.en || "",
                sub_headline: values.sub_headline?.en || "",
                cta_label: values.cta_label?.en || "",
                language: "en",
              },
            ],
          },
        },
        {
          onSuccess: () => {
            toast.success(t("cms.homePage.hero.messages.heroCreated"));
          },
          onError: (error) => {
            toast.error(
              error.message || t("cms.homePage.hero.messages.errorCreatingHero")
            );
          },
        }
      );
    } else {
      await updateMutation.mutateAsync(
        {
          path: { id: String(existingHero.id) },
          body: {
            headline: values.headline?.ar || "",
            sub_headline: values.sub_headline?.ar || "",
            cta_label: values.cta_label?.ar || "",
            media_id: mediaId,
            hero_id_hero_translations: [
              {
                headline: values.headline?.en || "",
                sub_headline: values.sub_headline?.en || "",
                cta_label: values.cta_label?.en || "",
                language: "en",
              },
            ],
          },
        },
        {
          onSuccess: () => {
            toast.success(t("cms.homePage.hero.messages.heroUpdated"));
          },
          onError: (error) => {
            toast.error(
              error.message || t("cms.homePage.hero.messages.errorUpdatingHero")
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
                  <div className="grid md:grid-cols-2 gap-4 items-start">
                    <I18nFormTextField
                      name="headline"
                      control={form.control}
                      label={t("cms.homePage.hero.form.headline")}
                      required
                    />
                    <I18nFormTextField
                      name="cta_label"
                      control={form.control}
                      label={t("cms.homePage.hero.form.ctaLabel")}
                      required
                    />
                  </div>
                  <I18nFormTextareaField
                    name="sub_headline"
                    control={form.control}
                    label={t("cms.homePage.hero.form.subHeadline")}
                    required
                  />
                </div>
              </I18nTabContent>
              <I18nTabContent language="ar">
                <div className="grid gap-4">
                  <div className="grid md:grid-cols-2 gap-4 items-start">
                    <I18nFormTextField
                      name="headline"
                      control={form.control}
                      label={t("cms.homePage.hero.form.headline")}
                      required
                    />
                    <I18nFormTextField
                      name="cta_label"
                      control={form.control}
                      label={t("cms.homePage.hero.form.ctaLabel")}
                      required
                    />
                  </div>
                  <I18nFormTextareaField
                    name="sub_headline"
                    control={form.control}
                    label={t("cms.homePage.hero.form.subHeadline")}
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
                <FormLabel>{t("cms.homePage.hero.form.heroImage")}</FormLabel>
                <FormControl>
                  <DocumentUploader
                    value={(field.value as any) || []}
                    maxDocuments={1}
                    maxSize={100 * 1024 * 1024}
                    acceptedFileTypes={["image/*", "video/*"]}
                    onChange={field.onChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex justify-end items-center gap-3">
            <Button type="submit" loading={form.formState.isSubmitting}>
              {existingHero
                ? t("cms.homePage.hero.form.update")
                : t("cms.homePage.hero.form.create")}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
