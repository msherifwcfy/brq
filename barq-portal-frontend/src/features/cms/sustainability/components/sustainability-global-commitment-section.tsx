import { useEffect, useMemo, useState } from "react";
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
  useGlobalCommitmentControllerReadQuery,
  useGlobalCommitmentControllerCreate,
  useGlobalCommitmentControllerUpdate,
} from "@/sdk/modules/globalcommitment.gen";
import { Input } from "@/shared/components/ui/input";
import { Textarea } from "@/shared/components/ui/textarea";
import { toast } from "sonner";
import {
  DocumentUploader,
  type DocumentUploadValue,
} from "@/shared/components/custom/DocumentUploader";
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
  createGlobalCommitmentSchema,
  type CreateGlobalCommitmentFormData,
} from "../schemas/sustainability-global-commitment.schema";

type FormData = CreateGlobalCommitmentFormData;

export default function SustainabilityGlobalCommitmentSection() {
  const { lang, t } = useLang();
  const [currentLanguage, setCurrentLanguage] = useState<LanguageCode>("en");

  const { data } = useGlobalCommitmentControllerReadQuery({
    query: {
      query: {
        relations: {
          global_commitment_id_global_commitment_translations: true,
          icons: true,
        },
        pagination: { skip: 0, take: 1 },
      },
    },
    headers: {
      "x-skip-translations": "true",
    },
  });

  const createMutation = useGlobalCommitmentControllerCreate();
  const updateMutation = useGlobalCommitmentControllerUpdate();

  const existing = data?.data?.[0];

  const [iconsValue, setIconsValue] = useState<
    DocumentUploadValue[] | undefined
  >(
    existing?.icons?.map((m: any) => ({
      id: m.id,
      url: m.url,
      key: m.key,
      name: m.key,
      format: m.format,
      mime_type: m.mime_type,
      size: m.size,
    }))
  );

  const form = useForm<FormData>({
    resolver: zodResolver(createGlobalCommitmentSchema),
    defaultValues: {
      title: { en: "", ar: "" },
      description: { en: "", ar: "" },
      icons: iconsValue,
    },
  });

  useEffect(() => {
    if (existing) {
      // Transform API data to i18n format
      const enTranslation =
        existing?.global_commitment_id_global_commitment_translations?.find(
          (t) => t.language === "en"
        );
      const arTranslation =
        existing?.global_commitment_id_global_commitment_translations?.find(
          (t) => t.language === "ar"
        );

      const initialIcons = existing?.icons?.map((m: any) => ({
        id: m.id,
        url: m.url,
        key: m.key,
        name: m.key,
        format: m.format,
        mime_type: m.mime_type,
        size: m.size,
      }));

      setIconsValue(initialIcons);

      form.reset({
        title: {
          en: enTranslation?.title || "",
          ar: existing?.title || arTranslation?.title || "",
        },
        description: {
          en: enTranslation?.description || "",
          ar: existing?.description || arTranslation?.description || "",
        },
        icons: initialIcons,
      });
    }
  }, [existing, form]);

  const onSubmit = async (values: FormData) => {
    try {
      const icons = (iconsValue || [])
        .filter((d) => d && d.id)
        .map((d) => ({ id: Number(d.id) }));

      if (existing) {
        await updateMutation.mutateAsync({
          path: {
            id: String(existing.id),
          },
          body: {
            title: values.title.ar,
            description: values.description.ar,
            icons,
            global_commitment_id_global_commitment_translations: [
              {
                language: "en",
                title: values.title.en,
                description: values.description.en,
              },
            ],
          },
        });
        toast.success(t("cms.homePage.hero.messages.heroUpdated"));
      } else {
        await createMutation.mutateAsync({
          body: {
            title: values.title.ar,
            description: values.description.ar,
            icons,
            global_commitment_id_global_commitment_translations: [
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
        <div className="space-y-2">
          <DocumentUploader
            value={iconsValue}
            onChange={setIconsValue}
            multiple
            maxDocuments={10}
            acceptedFileTypes={["image/*"]}
          />
        </div>
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
