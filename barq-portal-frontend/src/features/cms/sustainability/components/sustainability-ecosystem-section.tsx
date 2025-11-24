import { useEffect, useMemo, useState } from "react";
import { Button } from "@/shared/components/ui/button";
import { useLang } from "@/shared/hooks/use-lang";
import { type LanguageCode } from "@/shared/constants";
import {
  useEcosystemSustainabilityControllerReadQuery,
  useEcosystemSustainabilityControllerCreate,
  useEcosystemSustainabilityControllerUpdate,
} from "@/sdk/modules/ecosystemsustainability.gen";
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
import {
  DocumentUploader,
  type DocumentUploadValue,
} from "@/shared/components/custom/DocumentUploader";
import { toast } from "sonner";
import {
  createEcosystemSustainabilitySchema,
  type CreateEcosystemSustainabilityFormData,
} from "../schemas/sustainability-ecosystem.schema";

type FormData = CreateEcosystemSustainabilityFormData;

export default function SustainabilityEcosystemSection() {
  const { lang, t } = useLang();
  const [currentLanguage, setCurrentLanguage] = useState<LanguageCode>("en");

  const { data } = useEcosystemSustainabilityControllerReadQuery({
    query: {
      query: {
        relations: {
          media: true,
          ecosystem_sustainability_id_ecosystem_sustainability_translations:
            true,
        },
        pagination: { skip: 0, take: 1 },
      },
    },
    headers: {
      "x-skip-translations": "true",
    },
  });

  const createMutation = useEcosystemSustainabilityControllerCreate();
  const updateMutation = useEcosystemSustainabilityControllerUpdate();

  const existing = data?.data?.[0];
  const currentTranslation = useMemo(
    () =>
      existing?.ecosystem_sustainability_id_ecosystem_sustainability_translations?.find(
        (tr: any) => tr.language === lang
      ),
    [existing, lang]
  );

  const [mediaValue, setMediaValue] = useState<
    DocumentUploadValue[] | undefined
  >(
    existing?.media
      ? [
          {
            id: existing.media.id,
            url: existing.media.url,
            key: existing.media.key,
            name: existing.media.key,
            format: existing.media.format,
            mime_type: existing.media.mime_type,
            size: existing.media.size,
          },
        ]
      : undefined
  );

  const form = useForm<FormData>({
    resolver: zodResolver(createEcosystemSustainabilitySchema),
    defaultValues: {
      title: { en: "", ar: "" },
      description: { en: "", ar: "" },
      media: mediaValue,
    },
  });

  useEffect(() => {
    const initialMedia: DocumentUploadValue[] | undefined = existing?.media
      ? [
          {
            id: existing.media.id,
            url: existing.media.url,
            key: existing.media.key,
            name: existing.media.key,
            format: existing.media.format,
            mime_type: existing.media.mime_type,
            size: existing.media.size,
          },
        ]
      : undefined;
    setMediaValue(initialMedia);
    // Transform API data to i18n format
    const enTranslation =
      existing?.ecosystem_sustainability_id_ecosystem_sustainability_translations?.find(
        (t) => t.language === "en"
      );
    const arTranslation =
      existing?.ecosystem_sustainability_id_ecosystem_sustainability_translations?.find(
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
      media: initialMedia,
    });
  }, [existing, currentTranslation, form]);

  const onSubmit = async (values: FormData) => {
    try {
      const mediaId = (mediaValue && mediaValue[0]?.id) as unknown as
        | number
        | undefined;
      if (existing) {
        await updateMutation.mutateAsync({
          path: {
            id: existing.id.toString(),
          },
          body: {
            title: values.title.ar,
            description: values.description.ar,
            media_id: mediaId ?? existing.media_id,
            ecosystem_sustainability_id_ecosystem_sustainability_translations: [
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
            media_id: mediaId as any,
            ecosystem_sustainability_id_ecosystem_sustainability_translations: [
              {
                language: "en",
                title: values.title.en,
                description: values.description.en,
              },
            ] as any,
          },
        } as any);
        toast.success(t("cms.homePage.hero.messages.heroCreated"));
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

        <FormItem>
          <FormLabel>{t("components.documentUploader.placeholder")}</FormLabel>
          <FormControl>
            <DocumentUploader
              value={mediaValue}
              onChange={setMediaValue}
              multiple={false}
              maxDocuments={1}
            />
          </FormControl>
        </FormItem>

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
