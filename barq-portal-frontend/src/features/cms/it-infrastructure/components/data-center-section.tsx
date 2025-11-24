import { useEffect, useState } from "react";
import { Button } from "@/shared/components/ui/button";
import { useLang } from "@/shared/hooks/use-lang";
import { type LanguageCode } from "@/shared/constants";
import {
  useDataCenterControllerReadQuery,
  useDataCenterControllerCreate,
  useDataCenterControllerUpdate,
} from "@/sdk/modules/datacenter.gen";
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
  createDataCenterSchema,
  type CreateDataCenterFormData,
} from "../schemas/data-center.schema";

type FormData = CreateDataCenterFormData;

export default function DataCenterSection() {
  const { lang, t } = useLang();
  const [currentLanguage, setCurrentLanguage] = useState<LanguageCode>("en");

  const { data } = useDataCenterControllerReadQuery({
    query: {
      query: {
        relations: {
          image: true,
          data_center_id_data_center_translations: true,
          data_center_bullets_id_data_center_bullets: {
            icon: true,
            data_center_bullets_id_data_center_bullets_translations: true,
          },
        },
        pagination: { skip: 0, take: 1 },
      },
    },
    headers: {
      "x-skip-translations": "true",
    },
  });

  const createMutation = useDataCenterControllerCreate();
  const updateMutation = useDataCenterControllerUpdate();

  const existing = data?.data?.[0];

  const form = useForm<FormData>({
    resolver: zodResolver(createDataCenterSchema),
    defaultValues: {
      title: { en: "", ar: "" },
      image: [],
      bulletPoints: [],
    },
  });

  useEffect(() => {
    if (!existing) return;

    const enTranslation =
      existing?.data_center_id_data_center_translations?.find(
        (t) => t.language === "en"
      );
    const arTranslation =
      existing?.data_center_id_data_center_translations?.find(
        (t) => t.language === "ar"
      );

    form.reset({
      title: {
        en: enTranslation?.sub_headline || "",
        ar: existing?.sub_headline || arTranslation?.sub_headline || "",
      },
      image: existing.image?.id
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
      bulletPoints:
        existing?.data_center_bullets_id_data_center_bullets?.map((bullet) => {
          const enBulletTranslation =
            bullet.data_center_bullets_id_data_center_bullets_translations?.find(
              (t) => t.language === "en"
            );
          const arBulletTranslation =
            bullet.data_center_bullets_id_data_center_bullets_translations?.find(
              (t) => t.language === "ar"
            );

          return {
            title: {
              en: enBulletTranslation?.text || "",
              ar: bullet?.text || arBulletTranslation?.text || "",
            },
            icon:
              bullet.icon?.id && bullet.icon.url
                ? [
                    {
                      id: bullet.icon.id,
                      url: bullet.icon.url,
                      key: bullet.icon.key,
                      format: bullet.icon.format,
                      mime_type: bullet.icon.mime_type,
                      size: bullet.icon.size,
                    },
                  ]
                : undefined,
          };
        }) || [],
    });
  }, [existing, form]);

  const onSubmit = async (values: FormData) => {
    try {
      const imageId = values.image?.[0]?.id;

      const bulletPoints = values.bulletPoints
        ?.filter((bullet) => bullet.icon?.[0]?.id)
        ?.map((bullet) => ({
          icon_id: bullet.icon![0].id!,
          text: bullet.title.ar,
          data_center_bullets_id_data_center_bullets_translations: [
            {
              language: "en" as const,
              text: bullet.title.en,
            },
          ],
        }));

      if (existing) {
        await updateMutation.mutateAsync({
          path: { id: String(existing.id) },
          body: {
            sub_headline: values.title.ar,
            image_id: imageId,
            data_center_bullets_id_data_center_bullets: bulletPoints,
            data_center_id_data_center_translations: [
              {
                language: "en",
                sub_headline: values.title.en,
              },
            ],
          },
        });
        toast.success(t("cms.itInfrastructure.dataCenter.messages.updated"));
      } else {
        await createMutation.mutateAsync({
          body: {
            sub_headline: values.title.ar,
            image_id: imageId,
            data_center_bullets_id_data_center_bullets: bulletPoints,
            data_center_id_data_center_translations: [
              {
                language: "en",
                sub_headline: values.title.en,
              },
            ],
          },
        } as any);
        toast.success(t("cms.itInfrastructure.dataCenter.messages.created"));
      }
    } catch (error: any) {
      toast.error(error?.message || "Error");
    }
  };

  console.log(form.formState.errors, "errors");

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
              </div>
            </I18nTabContent>
          </I18nFormProvider>
        </I18nTabs>

        <FormField
          control={form.control}
          name={"image" as any}
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                {t("cms.itInfrastructure.dataCenter.form.image")}
              </FormLabel>
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

        <I18nFormProvider currentLanguage={currentLanguage}>
          <div className="space-y-4">
            <FormLabel>
              {t("cms.itInfrastructure.dataCenter.form.bulletPoints")}
            </FormLabel>
            {form.formState.errors.bulletPoints?.root?.message ? (
              <p className="text-[0.8rem] font-medium text-destructive">
                {form.formState.errors.bulletPoints.root.message}
              </p>
            ) : null}
            {form.watch("bulletPoints")?.map((point, idx) => (
              <div
                key={idx}
                className="grid grid-cols-1 gap-2 border p-3 rounded-md"
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
                          name={`bulletPoints.${idx}.title`}
                          control={form.control}
                          label={t("common.title")}
                          placeholder={t("common.title")}
                          required
                        />
                      </div>
                    </I18nTabContent>
                    <I18nTabContent language="ar">
                      <div className="grid gap-4">
                        <I18nFormTextField
                          name={`bulletPoints.${idx}.title`}
                          control={form.control}
                          label={t("common.title")}
                          placeholder={t("common.title")}
                          required
                        />
                      </div>
                    </I18nTabContent>
                  </I18nFormProvider>
                </I18nTabs>
                <FormLabel>{t("common.icon")}</FormLabel>
                <FormField
                  control={form.control}
                  name={`bulletPoints.${idx}.icon`}
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <DocumentUploader
                          value={field.value as any}
                          onChange={field.onChange}
                          multiple={false}
                          maxDocuments={1}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="flex justify-end gap-2">
                  <Button
                    type="button"
                    variant="destructive"
                    onClick={() => {
                      const currentBulletPoints =
                        form.watch("bulletPoints") || [];
                      form.setValue(
                        "bulletPoints",
                        currentBulletPoints.filter((_, i) => i !== idx),
                        { shouldValidate: true }
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
              onClick={() =>
                form.setValue("bulletPoints", [
                  ...(form.watch("bulletPoints") || []),
                  { title: { en: "", ar: "" }, icon: [] },
                ], { shouldValidate: true })
              }
            >
              {t("common.add")}
            </Button>
          </div>
        </I18nFormProvider>

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
