import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/shared/components/ui/button";
import { Form } from "@/shared/components/ui/form";
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
  useEventJoinUsHeroControllerCreate,
  useEventJoinUsHeroControllerReadQuery,
  useEventJoinUsHeroControllerUpdate,
} from "@/sdk/modules/eventjoinushero.gen";
import {
  eventsHeroSchema,
  type EventsHeroFormValues,
} from "../schemas/events-hero.schema";
import { toast } from "sonner";

export default function EventsHeroSection() {
  const { t } = useLang();
  const [currentLanguage, setCurrentLanguage] = useState<LanguageCode>("en");

  const { data, refetch } = useEventJoinUsHeroControllerReadQuery({
    query: {
      query: {
        relations: {
          event_join_us_hero_id_event_join_us_hero_translations: true,
        },
        pagination: { skip: 0, take: 1 },
      },
    },
    headers: {
      "x-skip-translations": "true",
    },
  });

  const existing = data?.data?.[0];

  const createMutation = useEventJoinUsHeroControllerCreate();
  const updateMutation = useEventJoinUsHeroControllerUpdate();

  const form = useForm<EventsHeroFormValues>({
    resolver: zodResolver(eventsHeroSchema),
    defaultValues: {
      title: { en: "", ar: "" },
      subTitle: { en: "", ar: "" },
      quote: { en: "", ar: "" },
    },
  });

  useEffect(() => {
    if (!existing) return;

    const translations =
      existing.event_join_us_hero_id_event_join_us_hero_translations || [];
    const enTranslation = translations.find((translation) => translation.language === "en");

    const title = {
      en: enTranslation?.title || "",
      ar: existing?.title || "",
    }
    const subTitle = {
      en: enTranslation?.sub_title || "",
      ar: existing?.sub_title || "",
    }
    const quote = {
      en: (enTranslation as any)?.quote || "",
      ar: (existing as any)?.quote || "",
    }

    form.reset({
      title: {
        en: title.en || "",
        ar: existing.title || "",
      },
      subTitle: {
        en: subTitle.en || "",
        ar: existing.sub_title || "",
      },
      quote: {
        en: quote.en || "",
        ar: existing.quote || "",
      },
    });
  }, [existing, form]);

  const handleSubmit = async (values: EventsHeroFormValues) => {
    const payload = {
      title: values.title.ar,
      sub_title: values.subTitle.ar,
      quote: values.quote.ar,
      event_join_us_hero_id_event_join_us_hero_translations: [
        {
          language: "en" as const,
          title: values.title.en,
          sub_title: values.subTitle.en,
          quote: values.quote.en,
        },
      ],
    };

    try {
      if (existing) {
        await updateMutation.mutateAsync({
          path: { id: String(existing.id) },
          body: payload,
        } as any);
        toast.success(t("cms.events.hero.messages.updated"));
      } else {
        await createMutation.mutateAsync({
          body: payload,
        } as any);
        toast.success(t("cms.events.hero.messages.created"));
      }
      await refetch();
    } catch (error: any) {
      toast.error(
        error?.message || t("cms.events.hero.messages.errorSavingHero")
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
                  label={t("cms.events.hero.fields.title")}
                  placeholder={t("cms.events.hero.fields.title")}
                  required
                />
                <I18nFormTextareaField
                  name="subTitle"
                  control={form.control}
                  label={t("cms.events.hero.fields.subTitle")}
                  placeholder={t("cms.events.hero.fields.subTitle")}
                  required
                />
                <I18nFormTextareaField
                  name="quote"
                  control={form.control}
                  label={t("cms.events.hero.fields.quote")}
                  placeholder={t("cms.events.hero.fields.quote")}
                  required
                />
              </div>
            </I18nTabContent>
            <I18nTabContent language="ar">
              <div className="grid gap-4">
                <I18nFormTextField
                  name="title"
                  control={form.control}
                  label={t("cms.events.hero.fields.title")}
                  placeholder={t("cms.events.hero.fields.title")}
                  required
                />
                <I18nFormTextareaField
                  name="subTitle"
                  control={form.control}
                  label={t("cms.events.hero.fields.subTitle")}
                  placeholder={t("cms.events.hero.fields.subTitle")}
                  required
                />
                <I18nFormTextareaField
                  name="quote"
                  control={form.control}
                  label={t("cms.events.hero.fields.quote")}
                  placeholder={t("cms.events.hero.fields.quote")}
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

