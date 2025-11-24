import { useEffect, useState } from "react";
import { Button } from "@/shared/components/ui/button";
import { useLang } from "@/shared/hooks/use-lang";
import { type LanguageCode } from "@/shared/constants";
import {
  useItInfrastructureHeroControllerReadQuery,
  useItInfrastructureHeroControllerCreate,
  useItInfrastructureHeroControllerUpdate,
} from "@/sdk/modules/itinfrastructurehero.gen";
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
  I18nTabs,
  I18nTabContent,
  I18nFormProvider,
} from "@/shared/components/custom/i18n";
import { DocumentUploader } from "@/shared/components/custom/DocumentUploader";
import { toast } from "sonner";
import {
  createItInfrastructureHeroSchema,
  type CreateItInfrastructureHeroFormData,
} from "../schemas/it-infrastructure-hero.schema";

type FormData = CreateItInfrastructureHeroFormData;

export default function ItInfrastructureHeroSection() {
  const { lang, t } = useLang();
  const [currentLanguage, setCurrentLanguage] = useState<LanguageCode>("en");

  const { data } = useItInfrastructureHeroControllerReadQuery({
    query: {
      query: {
        relations: {
          image: true,
          it_infrastructure_hero_id_it_infrastructure_hero_translations: true,
          icons: true,
        },
        pagination: { skip: 0, take: 1 },
      },
    },
    headers: {
      "x-skip-translations": "true",
    },
  });

  const createMutation = useItInfrastructureHeroControllerCreate();
  const updateMutation = useItInfrastructureHeroControllerUpdate();

  const existing = data?.data?.[0];

  const form = useForm<FormData>({
    resolver: zodResolver(createItInfrastructureHeroSchema),
    defaultValues: {
      title: { en: "", ar: "" },
      sub_title: { en: "", ar: "" },
      image: [],
      logos: [],
    },
  });

  useEffect(() => {
    if (!existing) return;

    const enTranslation =
      existing?.it_infrastructure_hero_id_it_infrastructure_hero_translations?.find(
        (t) => t.language === "en"
      );
    const arTranslation =
      existing?.it_infrastructure_hero_id_it_infrastructure_hero_translations?.find(
        (t) => t.language === "ar"
      );

    form.reset({
      title: {
        en: enTranslation?.title || "",
        ar: existing?.title || arTranslation?.title || "",
      },
      sub_title: {
        en: enTranslation?.sub_title || "",
        ar: existing?.sub_title || arTranslation?.sub_title || "",
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
      logos:
        existing.icons?.map((logo) => ({
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
      const imageId = values.image?.[0]?.id;
      const logoIds = values.logos?.map((logo) => ({ id: logo.id })) || [];

      if (existing) {
        await updateMutation.mutateAsync({
          path: { id: String(existing.id) },
          body: {
            title: values.title.ar,
            sub_title: values.sub_title.ar,
            image_id: imageId,
            icons_ids:
              logoIds.length > 0
                ? logoIds.map((logo) => logo.id as number)
                : undefined,
            it_infrastructure_hero_id_it_infrastructure_hero_translations: [
              {
                language: "en",
                title: values.title.en,
                sub_title: values.sub_title.en,
              },
            ],
          },
        });
        toast.success(t("cms.itInfrastructure.hero.messages.updated"));
      } else {
        await createMutation.mutateAsync({
          body: {
            title: values.title.ar,
            sub_title: values.sub_title.ar,
            image_id: imageId,
            logos_ids:
              logoIds.length > 0 ? logoIds.map((logo) => logo.id) : undefined,
            it_infrastructure_hero_id_it_infrastructure_hero_translations: [
              {
                language: "en",
                title: values.title.en,
                sub_title: values.sub_title.en,
              },
            ],
          },
        } as any);
        toast.success(t("cms.itInfrastructure.hero.messages.created"));
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
                <I18nFormTextField
                  name="sub_title"
                  control={form.control}
                  label={t("common.subTitle")}
                  placeholder={t("common.subTitle")}
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
                <I18nFormTextField
                  name="sub_title"
                  control={form.control}
                  label={t("common.subTitle")}
                  placeholder={t("common.subTitle")}
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
              <FormLabel>{t("cms.itInfrastructure.hero.form.image")}</FormLabel>
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
              <FormLabel>{t("cms.itInfrastructure.hero.form.logos")}</FormLabel>
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
