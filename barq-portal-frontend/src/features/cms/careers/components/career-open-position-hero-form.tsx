import { useEffect, useState } from "react";
import { Button } from "@/shared/components/ui/button";
import { useLang } from "@/shared/hooks/use-lang";
import { type LanguageCode } from "@/shared/constants";
import {
  useCareerOpenPositionHeroControllerReadQuery,
  useCareerOpenPositionHeroControllerCreate,
  useCareerOpenPositionHeroControllerUpdate,
} from "@/sdk/modules/careeropenpositionhero.gen";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  I18nFormTextField,
  I18nFormTextareaField,
  I18nTabs,
  I18nTabContent,
  I18nFormProvider,
} from "@/shared/components/custom/i18n";
import { toast } from "sonner";
import {
  careerOpenPositionHeroSchema,
  type CareerOpenPositionHeroFormData,
} from "../schemas/career-open-position-hero.schema";
import { Form } from "@/shared/components/ui/form";

export default function CareerOpenPositionHeroForm() {
  const { lang, t } = useLang();
  const [currentLanguage, setCurrentLanguage] = useState<LanguageCode>("en");

  const { data } = useCareerOpenPositionHeroControllerReadQuery({
    query: {
      query: {
        relations: {
          career_open_position_hero_id_career_open_position_hero_translations: true,
        },
        pagination: { skip: 0, take: 1 },
      },
    },
    headers: {
      "x-skip-translations": "true",
    },
  });

  const createMutation = useCareerOpenPositionHeroControllerCreate();
  const updateMutation = useCareerOpenPositionHeroControllerUpdate();

  const existing = data?.data?.[0];

  const form = useForm<CareerOpenPositionHeroFormData>({
    resolver: zodResolver(careerOpenPositionHeroSchema),
    defaultValues: {
      title: { en: "", ar: "" },
    },
  });

  useEffect(() => {
    if (!existing) return;

    const enTranslation =
      existing?.career_open_position_hero_id_career_open_position_hero_translations?.find(
        (t) => t.language === "en"
      );
    const arTranslation =
      existing?.career_open_position_hero_id_career_open_position_hero_translations?.find(
        (t) => t.language === "ar"
      );

    form.reset({
      title: {
        en: enTranslation?.title || existing?.title || "",
        ar: arTranslation?.title || "",
      },
    });
  }, [existing, form]);

  const onSubmit = async (values: CareerOpenPositionHeroFormData) => {
    try {
      if (existing) {
        await updateMutation.mutateAsync({
          path: { id: String(existing.id) },
          body: {
            title: values.title.en,
            career_open_position_hero_id_career_open_position_hero_translations: [
              {
                language: "en",
                title: values.title.en,
              },
              {
                language: "ar",
                title: values.title.ar,
              },
            ],
          },
        });
        toast.success(t("cms.careers.openPositionHero.messages.updated"));
      } else {
        await createMutation.mutateAsync({
          body: {
            title: values.title.en,
            career_open_position_hero_id_career_open_position_hero_translations: [
              {
                language: "en",
                title: values.title.en,
              },
              {
                language: "ar",
                title: values.title.ar,
              },
            ],
          },
        } as any);
        toast.success(t("cms.careers.openPositionHero.messages.created"));
      }
    } catch (error: any) {
      toast.error(error?.message || t("cms.careers.openPositionHero.messages.error"));
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
                  label={t("cms.careers.openPositionHero.form.title")}
                  placeholder={t("cms.careers.openPositionHero.form.titlePlaceholder")}
                  required
                />
                {/* <I18nFormTextareaField
                  name="description"
                  control={form.control}
                  label={t("cms.careers.openPositionHero.form.description")}
                  placeholder={t("cms.careers.openPositionHero.form.descriptionPlaceholder")}
                /> */}
              </div>
            </I18nTabContent>
            <I18nTabContent language="ar">
              <div className="grid gap-4">
                <I18nFormTextField
                  name="title"
                  control={form.control}
                  label={t("cms.careers.openPositionHero.form.title")}
                  placeholder={t("cms.careers.openPositionHero.form.titlePlaceholder")}
                  required
                />
                {/* <I18nFormTextareaField
                  name="description"
                  control={form.control}
                  label={t("cms.careers.openPositionHero.form.description")}
                  placeholder={t("cms.careers.openPositionHero.form.descriptionPlaceholder")}
                /> */}
              </div>
            </I18nTabContent>
          </I18nFormProvider>
        </I18nTabs>

        <div className="flex justify-end w-full gap-2">
          <Button
            type="submit"
            loading={createMutation.isPending || updateMutation.isPending}
          >
            {existing ? t("cms.careers.openPositionHero.form.update") : t("cms.careers.openPositionHero.form.create")}
          </Button>
        </div>
      </form>
    </Form>
  );
}

