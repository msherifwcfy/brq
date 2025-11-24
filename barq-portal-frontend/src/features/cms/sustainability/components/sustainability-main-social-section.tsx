import { useMemo, useState, useEffect } from "react";
import { Button } from "@/shared/components/ui/button";
import { useLang } from "@/shared/hooks/use-lang";
import { type LanguageCode } from "@/shared/constants";
import {
  I18nTabs,
  I18nTabContent,
  I18nFormProvider,
  I18nFormTextField,
  I18nFormTextareaField,
} from "@/shared/components/custom/i18n";
import {
  useMainSocialControllerReadQuery,
  useMainSocialControllerCreate,
  useMainSocialControllerUpdate,
} from "@/sdk/modules/mainsocial.gen";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/shared/components/ui/form";
import {
  createSocialImpactSchema,
  type CreateSocialImpactFormData,
} from "../schemas/sustainability-social-impact.schema";

type FormData = CreateSocialImpactFormData;

export default function SustainabilityMainSocialSection() {
  const { t } = useLang();
  const [currentLanguage, setCurrentLanguage] = useState<LanguageCode>("en");

  const { data } = useMainSocialControllerReadQuery({
    query: {
      query: {
        relations: { main_social_id_main_social_translations: true },
        pagination: { skip: 0, take: 1 },
      },
    },
    headers: {
      "x-skip-translations": "true",
    },
  });

  const createMutation = useMainSocialControllerCreate();
  const updateMutation = useMainSocialControllerUpdate();

  const existing = data?.data?.[0];

  const form = useForm<FormData>({
    resolver: zodResolver(createSocialImpactSchema),
    defaultValues: {
      title: { en: "", ar: "" },
      description: { en: "", ar: "" },
    },
  });

  useEffect(() => {
    if (existing) {
      // Transform API data to i18n format
      const enTranslation =
        existing?.main_social_id_main_social_translations?.find(
          (t) => t.language === "en"
        );
      const arTranslation =
        existing?.main_social_id_main_social_translations?.find(
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
      });
    }
  }, [existing, form]);

  const onSubmit = async (values: FormData) => {
    try {
      if (existing) {
        await updateMutation.mutateAsync({
          path: { id: existing.id.toString() },
          body: {
            title: values.title.ar,
            description: values.description.ar,
            main_social_id_main_social_translations: [
              {
                language: "en",
                title: values.title.en,
                description: values.description.en,
              },
            ] as any,
          },
        } as any);
        toast.success(t("cms.homePage.hero.messages.heroUpdated"));
      } else {
        await createMutation.mutateAsync({
          body: {
            title: values.title.ar,
            description: values.description.ar,
            main_social_id_main_social_translations: [
              {
                language: "en",
                title: values.title.en,
                description: values.description.en,
              },
            ],
          },
        });
        toast.success(t("cms.homePage.hero.messages.heroCreated"));
      }
    } catch (error: any) {
      toast.error(error?.message || "Error");
    }
  };

  console.log(form.formState.errors, "errrors");

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
        <div className="flex justify-end gap-2">
          <Button
            type="submit"
            disabled={createMutation.isPending || updateMutation.isPending}
          >
            {existing ? t("common.update") : t("common.create")}
          </Button>
        </div>
      </form>
    </Form>
  );
}
