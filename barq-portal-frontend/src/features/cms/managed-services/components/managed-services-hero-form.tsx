import { useEffect, useState } from "react";
import { Button } from "@/shared/components/ui/button";
import { useLang } from "@/shared/hooks/use-lang";
import { type LanguageCode } from "@/shared/constants";
import {
  useManagedServiceHeroControllerReadQuery,
  useManagedServiceHeroControllerCreate,
  useManagedServiceHeroControllerUpdate,
} from "@/sdk/modules/managedservicehero.gen";
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
  managedServicesHeroSchema,
  type ManagedServicesHeroFormData,
} from "../schemas/managed-services-hero.schema";

export default function ManagedServicesHeroForm() {
  const { lang, t } = useLang();
  const [currentLanguage, setCurrentLanguage] = useState<LanguageCode>("en");

  const { data } = useManagedServiceHeroControllerReadQuery({
    query: {
      query: {
        relations: {
          image: true,
          managed_service_hero_id_managed_service_hero_translations: true,
          logos: true,
        },
        pagination: { skip: 0, take: 1 },
      },
    },
    headers: {
      "x-skip-translations": "true",
    },
  });

  const createMutation = useManagedServiceHeroControllerCreate();
  const updateMutation = useManagedServiceHeroControllerUpdate();

  const existing = data?.data?.[0];

  const form = useForm<ManagedServicesHeroFormData>({
    resolver: zodResolver(managedServicesHeroSchema),
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
      existing?.managed_service_hero_id_managed_service_hero_translations?.find(
        (t) => t.language === "en"
      );
    const arTranslation =
      existing?.managed_service_hero_id_managed_service_hero_translations?.find(
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

  const onSubmit = async (values: ManagedServicesHeroFormData) => {
    try {
      const imageId = values.image?.[0]?.id;
      const logoIds = values.logos?.map((logo) => logo.id) || [];

      if (existing) {
        await updateMutation.mutateAsync({
          path: { id: String(existing.id) },
          body: {
            title: values.title.ar,
            sub_title: values.sub_title.ar,
            image_id: imageId,
            logos_ids: logoIds.length > 0 ? logoIds : undefined,
            managed_service_hero_id_managed_service_hero_translations: [
              {
                language: "en",
                title: values.title.en,
                sub_title: values.sub_title.en,
              },
            ],
          },
        });
        toast.success("Hero section updated successfully");
      } else {
        await createMutation.mutateAsync({
          body: {
            title: values.title.ar,
            sub_title: values.sub_title.ar,
            image_id: imageId,
            logos_ids: logoIds.length > 0 ? logoIds : undefined,
            managed_service_hero_id_managed_service_hero_translations: [
              {
                language: "en",
                title: values.title.en,
                sub_title: values.sub_title.en,
              },
            ],
          },
        } as any);
        toast.success("Hero section created successfully");
      }
    } catch (error: any) {
      toast.error(error?.message || "Failed to save hero section");
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
                  label="Title"
                  placeholder="Title (30-80 characters)"
                  required
                />
                <I18nFormTextareaField
                  name="sub_title"
                  control={form.control}
                  label="Subtext"
                  placeholder="Subtext (150-350 characters)"
                  required
                />
              </div>
            </I18nTabContent>
            <I18nTabContent language="ar">
              <div className="grid gap-4">
                <I18nFormTextField
                  name="title"
                  control={form.control}
                  label="العنوان"
                  placeholder="العنوان (30-80 حرف)"
                  required
                />
                <I18nFormTextareaField
                  name="sub_title"
                  control={form.control}
                  label="النص الفرعي"
                  placeholder="النص الفرعي (150-350 حرف)"
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
              <FormLabel>Hero Image</FormLabel>
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
          name="logos"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Logos (Exactly 2)</FormLabel>
              <FormControl>
                <DocumentUploader
                  value={(field.value as any) || []}
                  maxDocuments={2}
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
            {existing ? "Update" : "Create"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
