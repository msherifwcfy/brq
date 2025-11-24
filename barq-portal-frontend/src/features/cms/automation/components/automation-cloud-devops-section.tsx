import { useEffect, useState } from "react";
import { Button } from "@/shared/components/ui/button";
import { useLang } from "@/shared/hooks/use-lang";
import { type LanguageCode } from "@/shared/constants";
import {
  useCloudSectionControllerReadQuery,
  useCloudSectionControllerCreate,
  useCloudSectionControllerUpdate,
} from "@/sdk/modules/cloudsection.gen";
import { useForm, useFieldArray } from "react-hook-form";
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
  I18nTabs,
  I18nTabContent,
  I18nFormProvider,
} from "@/shared/components/custom/i18n";
import { DocumentUploader } from "@/shared/components/custom/DocumentUploader";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";
import { Trash2, Plus } from "lucide-react";
import { toast } from "sonner";
import {
  createAutomationCloudDevOpsSchema,
  type CreateAutomationCloudDevOpsFormData,
} from "../schemas/automation-cloud-devops.schema";

type FormData = CreateAutomationCloudDevOpsFormData;

export default function AutomationCloudDevOpsSection() {
  const { t } = useLang();
  const [currentLanguage, setCurrentLanguage] = useState<LanguageCode>("en");

  const { data } = useCloudSectionControllerReadQuery({
    query: {
      query: {
        relations: {
          image: true,
          logo: true,
          cloud_id_cloud_translations: true,
          cloud_bullets_id_cloud_bullets: {
            icon: true,
            cloud_bullets_id_cloud_bullets_translations: true,
          },
        },
        pagination: { skip: 0, take: 1 },
      },
    },
    headers: {
      "x-skip-translations": "true",
    },
  });

  const createMutation = useCloudSectionControllerCreate();
  const updateMutation = useCloudSectionControllerUpdate();

  const existing = data?.data?.[0];

  const form = useForm<FormData>({
    resolver: zodResolver(createAutomationCloudDevOpsSchema),
    defaultValues: {
      subHeadline: { en: "", ar: "" },
      image: [],
      logo: [],
      bullets: [],
    },
  });

  const {
    fields: bulletFields,
    append: appendBullet,
    remove: removeBullet,
  } = useFieldArray({
    control: form.control,
    name: "bullets",
  });

  useEffect(() => {
    if (!existing) return;

    const enTranslation = existing?.cloud_id_cloud_translations?.find(
      (t) => t.language === "en"
    );
    const arTranslation = existing?.cloud_id_cloud_translations?.find(
      (t) => t.language === "ar"
    );

    const bullets =
      existing.cloud_bullets_id_cloud_bullets?.map((bullet) => {
        const enBulletTranslation =
          bullet.cloud_bullets_id_cloud_bullets_translations?.find(
            (t) => t.language === "en"
          );
        const arBulletTranslation =
          bullet.cloud_bullets_id_cloud_bullets_translations?.find(
            (t) => t.language === "ar"
          );

        return {
          id: bullet.id,
          text: {
            en: enBulletTranslation?.text || "",
            ar: bullet.text || arBulletTranslation?.text || "",
          },
          icon: bullet.icon?.id
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
            : [],
        };
      }) || [];

    form.reset({
      subHeadline: {
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
      logo: existing.logo?.id
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
      bullets,
    });
  }, [existing, form]);

  const onSubmit = async (values: FormData) => {
    try {
      const imageId = values.image?.[0]?.id;
      const logoId = values.logo?.[0]?.id;

      const bullets = values.bullets?.map((bullet) => ({
        id: (bullet as any).id,
        text: bullet.text.ar,
        icon_id: bullet.icon?.[0]?.id || 0,
        cloud_bullets_id_cloud_bullets_translations: [
          {
            text: bullet.text.en,
            language: "en" as const,
          },
        ],
      }));

      if (existing) {
        await updateMutation.mutateAsync({
          path: { id: String(existing.id) },
          body: {
            sub_headline: values.subHeadline.ar,
            image_id: imageId,
            logo_id: logoId,
            cloud_id_cloud_translations: [
              {
                language: "en",
                sub_headline: values.subHeadline.en,
              },
            ],
            cloud_bullets_id_cloud_bullets: bullets,
          },
        });
        toast.success(t("cms.automation.cloudDevOps.messages.updated"));
      } else {
        await createMutation.mutateAsync({
          body: {
            sub_headline: values.subHeadline.ar,
            image_id: imageId,
            logo_id: logoId,
            cloud_id_cloud_translations: [
              {
                language: "en",
                sub_headline: values.subHeadline.en,
              },
            ],
            cloud_bullets_id_cloud_bullets: bullets,
          },
        });
        toast.success(t("cms.automation.cloudDevOps.messages.created"));
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
                  name="subHeadline"
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
                  name="subHeadline"
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
          name="image"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                {t("cms.automation.cloudDevOps.form.image")}
              </FormLabel>
              <FormControl>
                <DocumentUploader
                  value={field.value || []}
                  maxDocuments={1}
                  maxSize={10 * 1024 * 1024}
                  acceptedFileTypes={["image/*"]}
                  onChange={field.onChange}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="logo"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("cms.automation.cloudDevOps.form.logo")}</FormLabel>
              <FormControl>
                <DocumentUploader
                  value={field.value || []}
                  maxDocuments={1}
                  maxSize={5 * 1024 * 1024}
                  acceptedFileTypes={["image/*"]}
                  onChange={field.onChange}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">
              {t("cms.automation.cloudDevOps.form.bullets")}
            </h3>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() =>
                appendBullet({
                  text: { en: "", ar: "" },
                  icon: [],
                })
              }
            >
              <Plus className="w-4 h-4 mr-2" />
              {t("common.add")}
            </Button>
          </div>

          {bulletFields.map((field, index) => (
            <Card key={field.id}>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>
                    {t("cms.automation.cloudDevOps.form.bullet")} {index + 1}
                  </span>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => removeBullet(index)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <I18nTabs
                  value={currentLanguage}
                  onValueChange={setCurrentLanguage}
                  className="w-full"
                >
                  <I18nFormProvider currentLanguage={currentLanguage}>
                    <I18nTabContent language="en">
                      <I18nFormTextField
                        name={`bullets.${index}.text`}
                        control={form.control}
                        label={t("cms.automation.cloudDevOps.form.bulletText")}
                        placeholder={t(
                          "cms.automation.cloudDevOps.form.bulletText"
                        )}
                      />
                    </I18nTabContent>
                    <I18nTabContent language="ar">
                      <I18nFormTextField
                        name={`bullets.${index}.text`}
                        control={form.control}
                        label={t("cms.automation.cloudDevOps.form.bulletText")}
                        placeholder={t(
                          "cms.automation.cloudDevOps.form.bulletText"
                        )}
                      />
                    </I18nTabContent>
                  </I18nFormProvider>
                </I18nTabs>

                <FormField
                  control={form.control}
                  name={`bullets.${index}.icon`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        {t("cms.automation.cloudDevOps.form.bulletIcon")}
                      </FormLabel>
                      <FormControl>
                        <DocumentUploader
                          value={field.value || []}
                          maxDocuments={1}
                          maxSize={2 * 1024 * 1024}
                          acceptedFileTypes={["image/*"]}
                          onChange={field.onChange}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="flex gap-2">
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
