import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/shared/components/ui/form";
import { Button } from "@/shared/components/ui/button";
import {
  I18nFormProvider,
  I18nFormTextField,
  I18nFormTextareaField,
  I18nTabContent,
  I18nTabs,
} from "@/shared/components/custom/i18n";
import { type LanguageCode } from "@/shared/constants";
import { useLang } from "@/shared/hooks/use-lang";
import {
  useSuccessStoryHeroControllerCreate,
  useSuccessStoryHeroControllerReadQuery,
  useSuccessStoryHeroControllerUpdate,
} from "@/sdk/modules/successstoryhero.gen";
import {
  successStoryHeroSchema,
  type SuccessStoryHeroFormValues,
} from "../schemas/success-story-hero.schema";
import { transformTranslationsToI18n } from "@/shared/schemas/i18n.schema";
import { toast } from "sonner";

export default function SuccessStoryHeroSection() {
  const { t } = useLang();
  const [currentLanguage, setCurrentLanguage] = useState<LanguageCode>("en");

  const { data, refetch } = useSuccessStoryHeroControllerReadQuery({
    query: {
      query: {
        relations: {
          success_story_hero_id_success_story_hero_translations: true,
        },
        pagination: { skip: 0, take: 1 },
      },
    },
    headers: {
      "x-skip-translations": "true",
    },
  });

  const existing = data?.data?.[0];

  const createMutation = useSuccessStoryHeroControllerCreate();
  const updateMutation = useSuccessStoryHeroControllerUpdate();

  const form = useForm<SuccessStoryHeroFormValues>({
    resolver: zodResolver(successStoryHeroSchema),
    defaultValues: {
      title: { en: "", ar: "" },
      subTitle: { en: "", ar: "" },
    },
  });

  useEffect(() => {
    if (!existing) return;

    const translations =
      existing.success_story_hero_id_success_story_hero_translations?.map(
        ({ title, sub_title, language }) => ({
          title,
          sub_title,
          language,
        })
      ) || [];

    const title = transformTranslationsToI18n(translations, "title");
    const subTitle = transformTranslationsToI18n(translations, "sub_title");

    form.reset({
      title: {
        en: title.en  || "",
        ar: existing.title || "",
      },
      subTitle: {
        en: subTitle.en  || "",
        ar: existing.sub_title  || "",
      },
    });
  }, [existing, form]);

  const handleSubmit = async (values: SuccessStoryHeroFormValues) => {
    const payload = {
      title: values.title.ar,
      sub_title: values.subTitle.ar,
      success_story_hero_id_success_story_hero_translations: [
        {
          language: "en" as const,
          title: values.title.en,
          sub_title: values.subTitle.en,
        },
      
      ],
    };

    try {
      if (existing) {
        await updateMutation.mutateAsync({
          path: { id: String(existing.id) },
          body: payload,
        } as any);
        toast.success(t("cms.caseStudies.hero.messages.updated"));
      } else {
        await createMutation.mutateAsync({
          body: payload,
        } as any);
        toast.success(t("cms.caseStudies.hero.messages.created"));
      }
      await refetch();
    } catch (error: any) {
      toast.error(
        error?.message || t("cms.caseStudies.hero.messages.errorSavingHero")
      );
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="space-y-6"
      >
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
                  label={t("cms.caseStudies.hero.fields.title")}
                  placeholder={t("cms.caseStudies.hero.fields.title")}
                  required
                />
                <I18nFormTextareaField
                  name="subTitle"
                  control={form.control}
                  label={t("cms.caseStudies.hero.fields.subTitle")}
                  placeholder={t("cms.caseStudies.hero.fields.subTitle")}
                  required
                />
              </div>
            </I18nTabContent>
            <I18nTabContent language="ar">
              <div className="grid gap-4">
                <I18nFormTextField
                  name="title"
                  control={form.control}
                  label={t("cms.caseStudies.hero.fields.title")}
                  placeholder={t("cms.caseStudies.hero.fields.title")}
                  required
                />
                <I18nFormTextareaField
                  name="subTitle"
                  control={form.control}
                  label={t("cms.caseStudies.hero.fields.subTitle")}
                  placeholder={t("cms.caseStudies.hero.fields.subTitle")}
                  required
                />
              </div>
            </I18nTabContent>
          </I18nFormProvider>
        </I18nTabs>

        <div className="flex justify-end">
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


