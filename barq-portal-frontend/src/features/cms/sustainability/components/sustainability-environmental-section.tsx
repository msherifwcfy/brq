import { useEffect, useMemo, useState } from "react";
import { Button } from "@/shared/components/ui/button";
import { useLang } from "@/shared/hooks/use-lang";
import { type LanguageCode } from "@/shared/constants";
import {
  useEnvironmentalSustainabilityControllerReadQuery,
  useEnvironmentalSustainabilityControllerCreate,
  useEnvironmentalSustainabilityControllerUpdate,
} from "@/sdk/modules/environmentalsustainability.gen";
import { Input } from "@/shared/components/ui/input";
import { Textarea } from "@/shared/components/ui/textarea";
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
import { toast } from "sonner";
import {
  DocumentUploader,
  type DocumentUploadValue,
} from "@/shared/components/custom/DocumentUploader";
import { type UpdateEnvironmentalSustainability } from "@/sdk/types.gen";
import {
  createEnvironmentalSustainabilitySchema,
  type CreateEnvironmentalSustainabilityFormData,
} from "../schemas/sustainability-environmental.schema";

type FormData = CreateEnvironmentalSustainabilityFormData;

export default function SustainabilityEnvironmentalSection() {
  const { lang, t } = useLang();
  const [currentLanguage, setCurrentLanguage] = useState<LanguageCode>("en");

  const { data } = useEnvironmentalSustainabilityControllerReadQuery({
    query: {
      query: {
        relations: {
          environmental_sustainability_id_environmental_sustainability_translations:
            true,
          environmental_sustainability_points_id_environmental_sustainability_points:
            {
              environmental_sustainability_points_id_environmental_sustainability_points_translations:
                true,
              icon: true,
            },
        },
        pagination: { skip: 0, take: 1 },
      },
    },
    headers: {
      "x-skip-translations": "true",
    },
  });

  const createMutation = useEnvironmentalSustainabilityControllerCreate();
  const updateMutation = useEnvironmentalSustainabilityControllerUpdate();

  const existing = data?.data?.[0];
  const currentTranslation = useMemo(
    () =>
      existing?.environmental_sustainability_id_environmental_sustainability_translations?.find(
        (tr: any) => tr.language === lang
      ),
    [existing, lang]
  );

  const form = useForm<FormData>({
    resolver: zodResolver(createEnvironmentalSustainabilitySchema),
    defaultValues: {
      title: { en: "", ar: "" },
      intro: { en: "", ar: "" },
      bulletPoints: [],
      media: [],
    },
  });

  useEffect(() => {
    if (!existing) return;
    
    const enTranslation =
      existing?.environmental_sustainability_id_environmental_sustainability_translations?.find(
        (t) => t.language === "en"
      );
    const arTranslation =
      existing?.environmental_sustainability_id_environmental_sustainability_translations?.find(
        (t) => t.language === "ar"
      );

    const bulletPoints =
      existing?.environmental_sustainability_points_id_environmental_sustainability_points?.map(
        (p) => {
          const enPointTranslation =
            p.environmental_sustainability_points_id_environmental_sustainability_points_translations?.find(
              (t: any) => t.language === "en"
            );
          const arPointTranslation =
            p.environmental_sustainability_points_id_environmental_sustainability_points_translations?.find(
              (t: any) => t.language === "ar"
            );

          return {
            title: {
              en: enPointTranslation?.title ?? p.title ?? "",
              ar: arPointTranslation?.title ?? p.title ?? "",
            },
            icon: p.icon ? [p.icon] : undefined,
          };
        }
      ) || [];

    form.reset({
      title: {
        en: enTranslation?.title || "",
        ar: existing?.title || arTranslation?.title || "",
      },
      intro: {
        en: enTranslation?.description || "",
        ar: existing?.description || arTranslation?.description || "",
      },
      bulletPoints,
    });
  }, [existing, form]);

  const onSubmit = async (values: FormData) => {
    try {
      const bulletPoints = values.bulletPoints.map((p) => ({
        icon_id: p.icon?.[0]?.id,
        title: p.title.ar,
        environmental_sustainability_points_id_environmental_sustainability_points_translations:
          [{ language: "en" as const, title: p.title.en }],
      }));
      console.log(values.bulletPoints, "bulletPoints");
      if (existing) {
        await updateMutation.mutateAsync({
          path: { id: String(existing.id) },
          body: {
            title: values.title.ar,
            description: values.intro.ar,
            environmental_sustainability_points_id_environmental_sustainability_points:
              bulletPoints,
            environmental_sustainability_id_environmental_sustainability_translations:
              [
                {
                  language: "en",
                  title: values.title.en,
                  description: values.intro.en,
                },
              ],
          },
        });
        toast.success(t("cms.homePage.hero.messages.heroUpdated"));
      } else {
        await createMutation.mutateAsync({
          body: {
            title: values.title.ar,
            description: values.intro.ar,
            environmental_sustainability_points_id_environmental_sustainability_points:
              bulletPoints,
            environmental_sustainability_id_environmental_sustainability_translations:
              [
                {
                  language: "en",
                  title: values.title.en,
                  description: values.intro.en,
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

  console.log(form.formState.errors, "errors");

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <I18nFormProvider currentLanguage={currentLanguage}>
          <I18nTabs
            value={currentLanguage}
            onValueChange={setCurrentLanguage}
            className="w-full"
          >
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
                  name="intro"
                  control={form.control}
                  label={t("common.description")}
                  placeholder={t("common.description")}
                  required
                />
                <FormField
                  control={form.control}
                  name="bulletPoints"
                  render={() => (
                    <FormItem className="space-y-4">
                      <FormLabel>{t("common.icons")}</FormLabel>
                      {form.watch("bulletPoints")?.map((point, idx) => (
                        <div
                          key={idx}
                          className="grid grid-cols-1 gap-2 border p-3 rounded-md"
                        >
                          <I18nFormTextField
                            name={`bulletPoints.${idx}.title`}
                            control={form.control}
                            label={t("common.title")}
                            placeholder={t("common.title")}
                            required
                          />
                          <DocumentUploader
                            value={point.icon}
                            onChange={(val) => {
                              form.setValue(`bulletPoints.${idx}.icon`, val);
                            }}
                            multiple={false}
                            maxDocuments={1}
                          />
                          <div className="flex justify-end gap-2">
                            <Button
                              type="button"
                              variant="destructive"
                              onClick={() => {
                                const currentPoints = form.getValues("bulletPoints");
                                form.setValue(
                                  "bulletPoints",
                                  currentPoints.filter((_, i) => i !== idx)
                                );
                              }}
                            >
                              {t("common.remove")}
                            </Button>
                          </div>
                        </div>
                      ))}
                      <Button
                        type="button"
                        variant="secondary"
                        className="w-fit"
                        onClick={() => {
                          const currentPoints = form.getValues("bulletPoints") || [];
                          if (currentPoints.length >= 3) {
                            form.setError("bulletPoints", {
                              type: "manual",
                              message: "At most 3 bullet points are allowed",
                            });
                            return;
                          }
                          form.setValue("bulletPoints", [
                            ...currentPoints,
                            { title: { en: "", ar: "" }, icon: undefined },
                          ]);
                          form.clearErrors("bulletPoints");
                        }}
                      >
                        {t("common.add")}
                      </Button>
                      <FormMessage />
                    </FormItem>
                  )}
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
                  name="intro"
                  control={form.control}
                  label={t("common.description")}
                  placeholder={t("common.description")}
                  required
                />
                <FormField
                  control={form.control}
                  name="bulletPoints"
                  render={() => (
                    <FormItem className="space-y-4">
                      <FormLabel>{t("common.icons")}</FormLabel>
                      {form.watch("bulletPoints")?.map((point, idx) => (
                        <div
                          key={idx}
                          className="grid grid-cols-1 gap-2 border p-3 rounded-md"
                        >
                          <I18nFormTextField
                            name={`bulletPoints.${idx}.title`}
                            control={form.control}
                            label={t("common.title")}
                            placeholder={t("common.title")}
                            required
                          />
                          <DocumentUploader
                            value={point.icon}
                            onChange={(val) => {
                              form.setValue(`bulletPoints.${idx}.icon`, val);
                            }}
                            multiple={false}
                            maxDocuments={1}
                          />
                          <div className="flex justify-end gap-2">
                            <Button
                              type="button"
                              variant="destructive"
                              onClick={() => {
                                const currentPoints = form.getValues("bulletPoints");
                                form.setValue(
                                  "bulletPoints",
                                  currentPoints.filter((_, i) => i !== idx)
                                );
                              }}
                            >
                              {t("common.remove")}
                            </Button>
                          </div>
                        </div>
                      ))}
                      <Button
                        type="button"
                        variant="secondary"
                        className="w-fit"
                        onClick={() => {
                          const currentPoints = form.getValues("bulletPoints") || [];
                          if (currentPoints.length >= 3) {
                            form.setError("bulletPoints", {
                              type: "manual",
                              message: "At most 3 bullet points are allowed",
                            });
                            return;
                          }
                          form.setValue("bulletPoints", [
                            ...currentPoints,
                            { title: { en: "", ar: "" }, icon: undefined },
                          ]);
                          form.clearErrors("bulletPoints");
                        }}
                      >
                        {t("common.add")}
                      </Button>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </I18nTabContent>
          </I18nTabs>

          <div className="flex justify-end gap-2">
            <Button
              type="submit"
              loading={createMutation.isPending || updateMutation.isPending}
            >
              {existing ? t("common.update") : t("common.create")}
            </Button>
          </div>
        </I18nFormProvider>
      </form>
    </Form>
  );
}
