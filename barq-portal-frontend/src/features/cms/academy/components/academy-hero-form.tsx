import { useEffect, useState } from "react";
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
  createAcademyHeroSchema,
  updateAcademyHeroSchema,
  type CreateAcademyHeroFormData,
  type UpdateAcademyHeroFormData,
} from "../schemas/academy-hero.schema";
import { toast } from "sonner";
import {
  useBarqAcademyHeroControllerReadQuery,
  useBarqAcademyHeroControllerCreate,
  useBarqAcademyHeroControllerUpdate,
} from "@/sdk/modules/barqacademyhero.gen";

export default function AcademyHeroForm() {
  const { t } = useLang();
  const [currentLanguage, setCurrentLanguage] = useState<LanguageCode>("en");

  const { data, isLoading } = useBarqAcademyHeroControllerReadQuery({
    query: {
      query: {
        relations: {
          image: true,
          logo: true,
          logos: true,
          barq_academy_hero_id_barq_academy_hero_translations: true,
        },
        pagination: { skip: 0, take: 1 },
      },
    },
    headers: {
      "x-skip-translations": "true",
    },
  });

  const existing = data?.data?.[0];

  const createMutation = useBarqAcademyHeroControllerCreate();
  const updateMutation = useBarqAcademyHeroControllerUpdate();

  const isUpdate = !!existing;

  type FormData = CreateAcademyHeroFormData | UpdateAcademyHeroFormData;
  const form = useForm<FormData>({
    resolver: zodResolver(
      isUpdate ? updateAcademyHeroSchema : createAcademyHeroSchema
    ),
    defaultValues: {
      logo: [],
      title: { en: "", ar: "" },
      sub_title: { en: "", ar: "" },
      image: [],
    } as unknown as FormData,
    mode: "onChange",
  });

  useEffect(() => {
    if (!existing || isLoading) return;

    const translations = existing.barq_academy_hero_id_barq_academy_hero_translations || [];
    const enTranslation = translations.find((t) => t.language === "en");

    form.reset({
      logo: existing.logo
        ? [
            {
              id: existing.logo.id,
              url: existing.logo.url,
              key: existing.logo.key,
              format: existing.logo.format,
              mime_type: existing.logo.mime_type,
              size: existing.logo.size,
            },
          ]
        : [],
      title: {
        en: enTranslation?.title || "",
        ar: existing.title || "",
      },
      sub_title: {
        en: enTranslation?.sub_title || "",
        ar: existing.sub_title || "",
      },
      image: existing.image
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
    } as unknown as FormData);
  }, [existing, form, isLoading]);

  const onSubmit = async (values: FormData) => {
    try {
      const logoId = values.logo?.[0]?.id;
      const imageId = values.image?.[0]?.id;

      if (existing) {
        await updateMutation.mutateAsync({
          path: { id: String(existing.id) },
          body: {
            title: values.title?.ar || "",
            sub_title: values.sub_title?.ar || "",
            image_id: imageId,
            logo_id: logoId,
            barq_academy_hero_id_barq_academy_hero_translations: [
              {
                language: "en",
                title: values.title?.en || "",
                sub_title: values.sub_title?.en || "",
              },

            ],
          },
        });
        toast.success(t("cms.academy.hero.messages.updated"));
      } else {
        await createMutation.mutateAsync({
          body: {
            title: values.title?.ar || "",
            sub_title: values.sub_title?.ar || "",
            image_id: imageId,
            logo_id: logoId,
            barq_academy_hero_id_barq_academy_hero_translations: [
              {
                language: "en",
                title: values.title?.en || "",
                sub_title: values.sub_title?.en || "",
              },
            ],
          },
        });
        toast.success(t("cms.academy.hero.messages.created"));
      }
    } catch (error: any) {
      toast.error(error?.message || t("cms.academy.hero.messages.error"));
    }
  };

  if (isLoading) return <div>{t("common.loading")}</div>;

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="logo"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("common.logo")}</FormLabel>
              <FormControl>
                <DocumentUploader
                  value={(field.value as any) || []}
                  maxDocuments={1}
                  maxSize={50 * 1024 * 1024}
                  acceptedFileTypes={["image/*"]}
                  onChange={field.onChange}
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
                  name="title"
                  control={form.control}
                  label={t("cms.academy.hero.form.title")}
                  placeholder={t("cms.academy.hero.form.titlePlaceholder")}
                  required
                />
                <I18nFormTextareaField
                  name="sub_title"
                  control={form.control}
                  label={t("cms.academy.hero.form.subtext")}
                  placeholder={t("cms.academy.hero.form.subtextPlaceholder")}
                  required
                />
              </div>
            </I18nTabContent>
            <I18nTabContent language="ar">
              <div className="grid gap-4">
                <I18nFormTextField
                  name="title"
                  control={form.control}
                  label={t("cms.academy.hero.form.title")}
                  placeholder={t("cms.academy.hero.form.titlePlaceholder")}
                  required
                />
                <I18nFormTextareaField
                  name="sub_title"
                  control={form.control}
                  label={t("cms.academy.hero.form.subtext")}
                  placeholder={t("cms.academy.hero.form.subtextPlaceholder")}
                  required
                />
              </div>
            </I18nTabContent>
          </I18nFormProvider>
        </I18nTabs>

        <FormField
          control={form.control}
          name="image"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("cms.academy.hero.form.heroImage")}</FormLabel>
              <FormControl>
                <DocumentUploader
                  value={(field.value as any) || []}
                  maxDocuments={1}
                  maxSize={50 * 1024 * 1024}
                  acceptedFileTypes={["image/*"]}
                  onChange={field.onChange}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end w-full gap-2">
          <Button
            type="submit"
            loading={createMutation.isPending || updateMutation.isPending}
          >
            {existing ? t("common.update") : t("common.create")}
          </Button>
        </div>
      </form>
    </Form>
  );
}
