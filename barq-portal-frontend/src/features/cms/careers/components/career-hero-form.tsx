import { useEffect, useState } from "react";
import { Button } from "@/shared/components/ui/button";
import { useLang } from "@/shared/hooks/use-lang";
import { type LanguageCode } from "@/shared/constants";
import {
  useCareerHeroControllerReadQuery,
  useCareerHeroControllerCreate,
  useCareerHeroControllerUpdate,
} from "@/sdk/modules/careerhero.gen";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
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
import { DocumentUploader } from "@/shared/components/custom/DocumentUploader";
import { toast } from "sonner";
import {
  careerHeroSchema,
  type CareerHeroFormData,
} from "../schemas/career-hero.schema";

export default function CareerHeroForm() {
  const { lang, t } = useLang();
  const [currentLanguage, setCurrentLanguage] = useState<LanguageCode>("en");

  const { data } = useCareerHeroControllerReadQuery({
    query: {
      query: {
        relations: {
          media: true,
          career_hero_id_career_hero_translations: true,
        },
        pagination: { skip: 0, take: 1 },
      },
    },
    headers: {
      "x-skip-translations": "true",
    },
  });

  const createMutation = useCareerHeroControllerCreate();
  const updateMutation = useCareerHeroControllerUpdate();

  const existing = data?.data?.[0];

  const form = useForm<CareerHeroFormData>({
    resolver: zodResolver(careerHeroSchema),
    defaultValues: {
      title: { en: "", ar: "" },
      description: { en: "", ar: "" },
      media: [],
    },
  });

  useEffect(() => {
    if (!existing) return;

    const enTranslation =
      existing?.career_hero_id_career_hero_translations?.find(
        (t) => t.language === "en"
      );
    const arTranslation =
      existing?.career_hero_id_career_hero_translations?.find(
        (t) => t.language === "ar"
      );

    form.reset({
      title: {
        en: enTranslation?.title || "",
        ar: existing?.title || arTranslation?.title || "",
      },
      description: {
        en: enTranslation?.description || "",
        ar: existing?.description || arTranslation?.description || "",
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
    });
  }, [existing, form]);

  const onSubmit = async (values: CareerHeroFormData) => {
    try {
      const mediaId = values.media?.[0]?.id;

      if (existing) {
        await updateMutation.mutateAsync({
          path: { id: String(existing.id) },
          body: {
            title: values.title.ar,
            description: values.description.ar,
            media_id: mediaId,
            career_hero_id_career_hero_translations: [
              {
                language: "en",
                title: values.title.en,
                description: values.description.en,
              },
            ],
          },
        });
        toast.success(t("cms.careers.hero.messages.updated"));
      } else {
        await createMutation.mutateAsync({
          body: {
            title: values.title.ar,
            description: values.description.ar,
            media_id: mediaId,
            career_hero_id_career_hero_translations: [
              {
                language: "en",
                title: values.title.en,
                description: values.description.en,
              },
            ],
          },
        } as any);
        toast.success(t("cms.careers.hero.messages.created"));
      }
    } catch (error: any) {
      toast.error(error?.message || t("cms.careers.hero.messages.error"));
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
                  label={t("cms.careers.hero.form.title")}
                  placeholder={t("cms.careers.hero.form.titlePlaceholder")}
                  required
                />
                <I18nFormTextareaField
                  name="description"
                  control={form.control}
                  label={t("cms.careers.hero.form.description")}
                  placeholder={t("cms.careers.hero.form.descriptionPlaceholder")}
                />
              </div>
            </I18nTabContent>
            <I18nTabContent language="ar">
              <div className="grid gap-4">
                <I18nFormTextField
                  name="title"
                  control={form.control}
                  label={t("cms.careers.hero.form.title")}
                  placeholder={t("cms.careers.hero.form.titlePlaceholder")}
                  required
                />
                <I18nFormTextareaField
                  name="description"
                  control={form.control}
                  label={t("cms.careers.hero.form.description")}
                  placeholder={t("cms.careers.hero.form.descriptionPlaceholder")}
                />
              </div>
            </I18nTabContent>
          </I18nFormProvider>
        </I18nTabs>

        <FormField
          control={form.control}
          name="media"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("cms.careers.hero.form.media")}</FormLabel>
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

        <div className="flex justify-end w-full gap-2">
          <Button
            type="submit"
            loading={createMutation.isPending || updateMutation.isPending}
          >
            {existing ? t("cms.careers.hero.form.update") : t("cms.careers.hero.form.create")}
          </Button>
        </div>
      </form>
    </Form>
  );
}

