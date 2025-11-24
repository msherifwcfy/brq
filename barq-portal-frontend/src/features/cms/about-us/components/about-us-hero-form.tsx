import { useEffect, useState, useMemo } from "react";
import { Button } from "@/shared/components/ui/button";
import { useLang } from "@/shared/hooks/use-lang";
import { type LanguageCode } from "@/shared/constants";
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
  createAboutUsHeroSchema,
  updateAboutUsHeroSchema,
  type CreateAboutUsHeroFormData,
  type UpdateAboutUsHeroFormData,
} from "../schemas/about-us-hero.schema";
import { toast } from "sonner";
import {
  useAboutBarqHeroControllerReadQuery,
  useAboutBarqHeroControllerCreate,
  useAboutBarqHeroControllerUpdate,
} from "@/sdk/modules/aboutbarqhero.gen";

export default function AboutUsHeroSectionForm() {
  const { lang, t } = useLang();
  const [currentLanguage, setCurrentLanguage] = useState<LanguageCode>("en");

  const { data, isLoading } = useAboutBarqHeroControllerReadQuery({
    query: {
      query: {
        relations: {
          media: true,
          about_barq_hero_id_about_barq_hero_translations: true,
        },
        pagination: { take: 1, skip: 0 },
      },
    },
    headers: {
      "x-skip-translations": "true",
    },
  });

  const existingHero = data?.data?.[0];
 

  const isUpdate = !!existingHero;

  type FormData = CreateAboutUsHeroFormData | UpdateAboutUsHeroFormData;
  const form = useForm<FormData>({
    resolver: zodResolver(
      isUpdate ? updateAboutUsHeroSchema : createAboutUsHeroSchema
    ),
    defaultValues: {
      title: { en: "", ar: "" },
      description: { en: "", ar: "" },
      background_media: [],
    } as unknown as FormData,
    mode: "onChange",
  });

  useEffect(() => {
    if (!existingHero) return;

    // Transform API data to i18n format
    const enTranslation = existingHero.about_barq_hero_id_about_barq_hero_translations?.find(
      (t) => t.language === "en"
    );
    const arTranslation = existingHero.about_barq_hero_id_about_barq_hero_translations?.find(
      (t) => t.language === "ar"
    );

    form.reset({
      title: {
        en: enTranslation?.title || "",
        ar: existingHero.title || arTranslation?.title || "",
      },
      description: {
        en: enTranslation?.sub_title || "",
        ar: existingHero.sub_title || arTranslation?.sub_title || "",
      },
      background_media: existingHero.media?.id
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

  const createMutation = useAboutBarqHeroControllerCreate();
  const updateMutation = useAboutBarqHeroControllerUpdate();

  const onSubmit = async (values: FormData) => {
    const mediaId = Array.isArray((values as any).background_media)
      ? (values as any).background_media?.[0]?.id
      : undefined;

    if (!existingHero) {
      await createMutation.mutateAsync(
        {
          body: {
            title: values.title?.ar || "",
            sub_title: values.description?.ar || "",
            media_id: mediaId as number,
            about_barq_hero_id_about_barq_hero_translations: [
              {
                title: values.title?.en || "",
                sub_title: values.description?.en || "",
                language: "en",
              },
            ],
          },
        },
        {
          onSuccess: () => {
            toast.success(t("aboutUs.heroSection.messages.created"));
          },
          onError: (error) => {
            toast.error(error.message || t("aboutUs.heroSection.messages.errorCreating"));
          },
        }
      );
    } else {
      await updateMutation.mutateAsync(
        {
          path: { id: String(existingHero.id) },
          body: {
            title: values.title?.ar || "",
            sub_title: values.description?.ar || "",
            media_id: mediaId,
            about_barq_hero_id_about_barq_hero_translations: [
              {
                title: values.title?.en || "",
                sub_title: values.description?.en || "",
                language: "en",
              },
            ],
          },
        },
        {
          onSuccess: () => {
            toast.success(t("aboutUs.heroSection.messages.updated"));
          },
          onError: (error) => {
            toast.error(error.message || t("aboutUs.heroSection.messages.errorUpdating"));
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
                  <I18nFormTextField
                    name="title"
                    control={form.control}
                    label={t("aboutUs.heroSection.form.title")}
                    required
                  />
                  <I18nFormTextareaField
                    name="description"
                    control={form.control}
                    label={t("aboutUs.heroSection.form.description")}
                    required
                  />
                </div>
              </I18nTabContent>
              <I18nTabContent language="ar">
                <div className="grid gap-4">
                  <I18nFormTextField
                    name="title"
                    control={form.control}
                    label={t("aboutUs.heroSection.form.title")}
                    required
                  />
                  <I18nFormTextareaField
                    name="description"
                    control={form.control}
                    label={t("aboutUs.heroSection.form.description")}
                    required
                  />
                </div>
              </I18nTabContent>
            </I18nFormProvider>
          </I18nTabs>

          <FormField
            control={form.control}
            name={"background_media" as any}
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("aboutUs.heroSection.form.backgroundImage")}</FormLabel>
                <FormControl>
                  <DocumentUploader
                    value={(field.value as any) || []}
                    maxDocuments={1}
                    maxSize={50 * 1024 * 1024}
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
              {existingHero ? t("aboutUs.heroSection.form.update") : t("aboutUs.heroSection.form.create")}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
