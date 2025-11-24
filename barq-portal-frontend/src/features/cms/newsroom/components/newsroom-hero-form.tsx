import { useEffect, useState } from "react";
import { Button } from "@/shared/components/ui/button";
import { Form } from "@/shared/components/ui/form";
import { useLang } from "@/shared/hooks/use-lang";
import { type LanguageCode } from "@/shared/constants";
import {
  I18nFormTextField,
  I18nFormTextareaField,
  I18nTabs,
  I18nTabContent,
  I18nFormProvider,
} from "@/shared/components/custom/i18n";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { newsroomHeroSchema, type NewsroomHeroFormData } from "../schemas/newsroom-hero.schema";
import { toast } from "sonner";
import { useNewsroomHeroControllerCreate, useNewsroomHeroControllerReadQuery, useNewsroomHeroControllerUpdate } from "@/sdk/modules/newsroomhero.gen";

export default function NewsroomHeroForm() {
  const { t } = useLang();
  const [currentLanguage, setCurrentLanguage] = useState<LanguageCode>("en");
  const { data, isLoading } = useNewsroomHeroControllerReadQuery({
    query: {
      query: {
        relations: {
          newsroom_hero_id_newsroom_hero_translations: true,
        },
        pagination: { skip: 0, take: 1 },
      },
    },
    headers: {
      "x-skip-translations": "true",
    },
  });
  const createMutation = useNewsroomHeroControllerCreate();
  const updateMutation = useNewsroomHeroControllerUpdate();
  const existing = data?.data?.[0];

  const form = useForm<NewsroomHeroFormData>({
    resolver: zodResolver(newsroomHeroSchema),
    defaultValues: {
      title: { en: "", ar: "" },
      subtitle: { en: "", ar: "" },
    },
    mode: "onChange",
  });

  useEffect(() => {
    if (!existing || isLoading) return;
    const translations = existing.newsroom_hero_id_newsroom_hero_translations || [];
    const enTranslation = translations.find((t) => t.language === "en");

    form.reset({
      title: {
        en: enTranslation?.title  || "",
        ar: existing.title || "",
      },
      subtitle: {
        en: enTranslation?.sub_title || "",
        ar: existing.sub_title || "",
      },
    });
  }, [existing, form, isLoading]);

  const onSubmit = async (values: NewsroomHeroFormData) => {
    try {
      if (existing) {
        await updateMutation.mutateAsync({
          body: {
            title: values.title?.ar || "",
            sub_title: values.subtitle?.ar || "",
            newsroom_hero_id_newsroom_hero_translations: [
              {
                language: "en",
                title: values.title?.en || "",
                sub_title: values.subtitle?.en || "",
              },
            ],
          },
          path: {
            id: existing.id.toString(),
          },
        });
        toast.success(t("cms.newsroom.hero.messages.updated"));
      } else {
        await createMutation.mutateAsync({
          body: {
            title: values.title?.ar || "",
            sub_title: values.subtitle?.ar || "",
            newsroom_hero_id_newsroom_hero_translations: [
              {
                language: "en",
                title: values.title?.en || "",
                sub_title: values.subtitle?.en || "",
              },
            ],
          },
        });
        toast.success(t("cms.newsroom.hero.messages.created"));
      }
    } catch (error: any) {
      toast.error(error?.message || t("cms.newsroom.hero.messages.error"));
    }
  };

  if (isLoading) return <div>{t("common.loading")}</div>;

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
                  label={t("cms.newsroom.hero.form.title")}
                  placeholder={t("cms.newsroom.hero.form.titlePlaceholder")}
                  required
                />
                <I18nFormTextareaField
                  name="subtitle"
                  control={form.control}
                  label={t("cms.newsroom.hero.form.subtitle")}
                  placeholder={t("cms.newsroom.hero.form.subtitlePlaceholder")}
                  required
                />
              </div>
            </I18nTabContent>
            <I18nTabContent language="ar">
              <div className="grid gap-4">
                <I18nFormTextField
                  name="title"
                  control={form.control}
                  label={t("cms.newsroom.hero.form.title")}
                  placeholder={t("cms.newsroom.hero.form.titlePlaceholder")}
                  required
                />
                <I18nFormTextareaField
                  name="subtitle"
                  control={form.control}
                  label={t("cms.newsroom.hero.form.subtitle")}
                  placeholder={t("cms.newsroom.hero.form.subtitlePlaceholder")}
                  required
                />
              </div>
            </I18nTabContent>
          </I18nFormProvider>
        </I18nTabs>

        <div className="flex justify-end">
          <Button type="submit" loading={createMutation.isPending || updateMutation.isPending}>
            {existing ? t("common.update") : t("common.create")}
          </Button>
        </div>
      </form>
    </Form>
  );
}


