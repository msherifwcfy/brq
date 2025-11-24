import { useEffect, useState } from "react";
import { Button } from "@/shared/components/ui/button";
import { useLang } from "@/shared/hooks/use-lang";
import { type LanguageCode } from "@/shared/constants";
import {
  useAdditionalManagedServicesOneControllerCreate,
  useAdditionalManagedServicesOneControllerUpdate,
} from "@/sdk/modules/additionalmanagedservicesone.gen";
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
  additionalManagedServicesOneSchema,
  type AdditionalManagedServicesOneFormData,
} from "../schemas/additional-managed-services-one.schema";

interface AdditionalManagedServicesOneFormProps {
  service?: any;
  onClose: () => void;
}

export default function AdditionalManagedServicesOneForm({
  service,
  onClose,
}: AdditionalManagedServicesOneFormProps) {
  const { t } = useLang();
  const [currentLanguage, setCurrentLanguage] = useState<LanguageCode>("en");

  const createMutation = useAdditionalManagedServicesOneControllerCreate();
  const updateMutation = useAdditionalManagedServicesOneControllerUpdate();

  const form = useForm<AdditionalManagedServicesOneFormData>({
    resolver: zodResolver(additionalManagedServicesOneSchema),
    defaultValues: {
      description: { en: "", ar: "" },
      cta_label: { en: "", ar: "" },
      logo: [],
      file: [],
    },
  });

  useEffect(() => {
    if (!service) return;

    const enTranslation =
      service?.additional_managed_services_one_id_additional_managed_services_one_translations?.find(
        (t: any) => t.language === "en"
      );
    const arTranslation =
      service?.additional_managed_services_one_id_additional_managed_services_one_translations?.find(
        (t: any) => t.language === "ar"
      );

    form.reset({
      description: {
        en: enTranslation?.description || "",
        ar: service?.description || arTranslation?.description || "",
      },
      cta_label: {
        en: enTranslation?.cta_label || "",
        ar: service?.cta_label || arTranslation?.cta_label || "",
      },
      logo: service.logo?.id
        ? [
            {
              id: service.logo.id,
              url: service.logo.url,
              key: service.logo.key,
              format: service.logo.format,
              mime_type: service.logo.mime_type,
              size: service.logo.size,
            },
          ]
        : [],
      file: service.file?.id
        ? [
            {
              id: service.file.id,
              url: service.file.url,
              key: service.file.key,
              format: service.file.format,
              mime_type: service.file.mime_type,
              size: service.file.size,
            },
          ]
        : [],
    });
  }, [service, form]);

  const onSubmit = async (values: AdditionalManagedServicesOneFormData) => {
    try {
      const logoId = values.logo?.[0]?.id;
      const fileId = values.file?.[0]?.id;

      if (service) {
        await updateMutation.mutateAsync({
          path: { id: String(service.id) },
          body: {
            description: values.description.ar,
            cta_label: values.cta_label.ar,
            logo_id: logoId,
            file_id: fileId,
            additional_managed_services_one_id_additional_managed_services_one_translations: [
              {
                language: "en",
                description: values.description.en,
                cta_label: values.cta_label.en,
              },
            ],
          },
        });
        toast.success(t("cms.managedServices.additionalOne.messages.updated"));
      } else {
        await createMutation.mutateAsync({
          body: {
            description: values.description.ar,
            cta_label: values.cta_label.ar,
            logo_id: logoId,
            file_id: fileId,
            additional_managed_services_one_id_additional_managed_services_one_translations: [
              {
                language: "en",
                description: values.description.en,
                cta_label: values.cta_label.en,
              },
            ],
          },
        });
        toast.success(t("cms.managedServices.additionalOne.messages.created"));
      }
      onClose();
    } catch (error: any) {
      toast.error(error?.message || t("cms.managedServices.additionalOne.messages.error"));
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
                <I18nFormTextareaField
                  name="description"
                  control={form.control}
                  label={t("cms.managedServices.additionalOne.form.description")}
                  placeholder={t("cms.managedServices.additionalOne.form.descriptionPlaceholder")}
                  required
                />
                <I18nFormTextField
                  name="cta_label"
                  control={form.control}
                  label={t("cms.managedServices.additionalOne.form.ctaLabel")}
                  placeholder={t("cms.managedServices.additionalOne.form.ctaLabelPlaceholder")}
                  required
                />
              </div>
            </I18nTabContent>
            <I18nTabContent language="ar">
              <div className="grid gap-4">
                <I18nFormTextareaField
                  name="description"
                  control={form.control}
                  label={t("cms.managedServices.additionalOne.form.description")}
                  placeholder={t("cms.managedServices.additionalOne.form.descriptionPlaceholder")}
                  required
                />
                <I18nFormTextField
                  name="cta_label"
                  control={form.control}
                  label={t("cms.managedServices.additionalOne.form.ctaLabel")}
                  placeholder={t("cms.managedServices.additionalOne.form.ctaLabelPlaceholder")}
                  required
                />
              </div>
            </I18nTabContent>
          </I18nFormProvider>
        </I18nTabs>

        <FormField
          control={form.control}
          name="logo"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("cms.managedServices.additionalOne.form.logo")}</FormLabel>
              <FormControl>
                <DocumentUploader
                  value={(field.value as any) || []}
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
          name="file"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("cms.managedServices.additionalOne.form.file")}</FormLabel>
              <FormControl>
                <DocumentUploader
                  value={(field.value as any) || []}
                  maxDocuments={1}
                  maxSize={10 * 1024 * 1024}
                  acceptedFileTypes={["*/*"]}
                  onChange={field.onChange}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end w-full gap-2">
          <Button type="button" variant="outline" onClick={onClose}>
            {t("cms.managedServices.additionalOne.form.cancel")}
          </Button>
          <Button
            type="submit"
            loading={createMutation.isPending || updateMutation.isPending}
          >
            {service ? t("cms.managedServices.additionalOne.form.update") : t("cms.managedServices.additionalOne.form.create")}
          </Button>
        </div>
      </form>
    </Form>
  );
}

