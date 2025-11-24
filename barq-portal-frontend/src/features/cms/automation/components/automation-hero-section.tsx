import { useEffect, useMemo, useState } from "react";
import { Button } from "@/shared/components/ui/button";
import { useLang } from "@/shared/hooks/use-lang";
import { type LanguageCode } from "@/shared/constants";
import {
  useAutomationHeroControllerReadQuery,
  useAutomationHeroControllerCreate,
  useAutomationHeroControllerUpdate,
} from "@/sdk/modules/automationhero.gen";
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
  createAutomationHeroSchema,
  type CreateAutomationHeroFormData,
} from "../schemas/automation-hero.schema";

type FormData = CreateAutomationHeroFormData;

export default function AutomationHeroSection() {
  const { lang, t } = useLang();
  const [currentLanguage, setCurrentLanguage] = useState<LanguageCode>("en");

  const { data } = useAutomationHeroControllerReadQuery({
    query: {
      query: {
        relations: {
          hero: true,
          automation_hero_id_automation_hero_translations: true,
          logos: true,
        },
        pagination: { skip: 0, take: 1 },
      },
    },
    headers: {
      "x-skip-translations": "true",
    },
  });

  const createMutation = useAutomationHeroControllerCreate();
  const updateMutation = useAutomationHeroControllerUpdate();

  const existing = data?.data?.[0];

  const form = useForm<FormData>({
    resolver: zodResolver(createAutomationHeroSchema),
    defaultValues: {
      title: { en: "", ar: "" },
      description: { en: "", ar: "" },
      hero: [],
      logos: [],
    },
  });

  useEffect(() => {
    if (!existing) return;

    const enTranslation =
      existing?.automation_hero_id_automation_hero_translations?.find(
        (t) => t.language === "en"
      );
    const arTranslation =
      existing?.automation_hero_id_automation_hero_translations?.find(
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
      hero: existing.hero?.id
        ? [
            {
              id: existing.hero.id,
              url: existing.hero.url,
              key: existing.hero.key,
              format: existing.hero.format,
              mime_type: existing.hero.mime_type,
              size: existing.hero.size,
            },
          ]
        : [],
      logos:
        existing.logos?.map((logo) => ({
          id: logo.id,
          url: logo.url,
          key: logo.key,
          format: logo.format,
          mime_type: logo.mime_type,
          size: logo.size,
        })) || [],
    });
  }, [existing, form]);

  const onSubmit = async (values: FormData) => {
    try {
      const heroId = values.hero?.[0]?.id;
      const logoIds = values.logos?.map((logo) => ({ id: logo.id })) || [];

      if (existing) {
        await updateMutation.mutateAsync({
          path: { id: String(existing.id) },
          body: {
            title: values.title.ar,
            description: values.description.ar,
            hero_id: heroId,
            logos: logoIds.length > 0 ? logoIds : undefined,
            automation_hero_id_automation_hero_translations: [
              {
                language: "en",
                title: values.title.en,
                description: values.description.en,
              },
            ],
          },
        });
        toast.success(t("cms.automation.hero.messages.updated"));
      } else {
        await createMutation.mutateAsync({
          body: {
            title: values.title.ar,
            description: values.description.ar,
            hero_id: heroId,
            logos: logoIds.length > 0 ? logoIds : undefined,
            automation_hero_id_automation_hero_translations: [
              {
                language: "en",
                title: values.title.en,
                description: values.description.en,
              },
            ],
          },
        } as any);
        toast.success(t("cms.automation.hero.messages.created"));
      }
    } catch (error: any) {
      toast.error(error?.message || "Error");
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
                  label={t("common.title")}
                  placeholder={t("common.title")}
                  required
                />
                <I18nFormTextareaField
                  name="description"
                  control={form.control}
                  label={t("common.description")}
                  placeholder={t("common.description")}
                  required
                />
              </div>
            </I18nTabContent>
            <I18nTabContent language="ar">
              <div className="grid gap-4">
                <I18nFormTextField
                  name="title"
                  control={form.control}
                  label={t("common.title")}
                  placeholder={t("common.title")}
                  required
                />
                <I18nFormTextareaField
                  name="description"
                  control={form.control}
                  label={t("common.description")}
                  placeholder={t("common.description")}
                  required
                />
              </div>
            </I18nTabContent>
          </I18nFormProvider>
        </I18nTabs>

        <FormField
          control={form.control}
          name={"hero" as any}
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("cms.automation.hero.form.heroImage")}</FormLabel>
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

        <FormField
          control={form.control}
          name={"logos"}
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("cms.automation.hero.form.logos")}</FormLabel>
              <FormControl>
                <DocumentUploader
                  value={(field.value as any) || []}
                  maxDocuments={10}
                  multiple
                  maxSize={10 * 1024 * 1024}
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
