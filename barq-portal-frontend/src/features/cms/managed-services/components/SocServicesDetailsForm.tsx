import { useEffect, useState } from "react";
import { Button } from "@/shared/components/ui/button";
import { useLang } from "@/shared/hooks/use-lang";
import { type LanguageCode } from "@/shared/constants";
import {
  useManagedSocServicesDetailsControllerCreate,
  useManagedSocServicesDetailsControllerUpdate,
} from "@/sdk/modules/managedsocservicesdetail.gen";
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
  socServicesDetailsSchema,
  type SocServicesDetailsFormData,
} from "../schemas/soc-services-details.schema";

interface SocServicesDetailsFormProps {
  service?: any;
  onClose: () => void;
}

export default function SocServicesDetailsForm({
  service,
  onClose,
}: SocServicesDetailsFormProps) {
  const { t } = useLang();
  const [currentLanguage, setCurrentLanguage] = useState<LanguageCode>("en");

  const createMutation = useManagedSocServicesDetailsControllerCreate();
  const updateMutation = useManagedSocServicesDetailsControllerUpdate();

  const form = useForm<SocServicesDetailsFormData>({
    resolver: zodResolver(socServicesDetailsSchema),
    defaultValues: {
      description: { en: "", ar: "" },
      cta_button_text: { en: "", ar: "" },
      logo: [],
      file: [],
    },
  });

  useEffect(() => {
    if (!service) return;

    const enTranslation =
      service?.managed_soc_services_details_id_managed_soc_services_details_translations?.find(
        (t: any) => t.language === "en"
      );
    const arTranslation =
      service?.managed_soc_services_details_id_managed_soc_services_details_translations?.find(
        (t: any) => t.language === "ar"
      );

    form.reset({
      description: {
        en: enTranslation?.description || "",
        ar: service?.description || arTranslation?.description || "",
      },
      cta_button_text: {
        en: enTranslation?.cta_button_text || "",
        ar: service?.cta_button_text || arTranslation?.cta_button_text || "",
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

  const onSubmit = async (values: SocServicesDetailsFormData) => {
    try {
      const logoId = values.logo?.[0]?.id;
      const fileId = values.file?.[0]?.id;

      if (service) {
        await updateMutation.mutateAsync({
          path: { id: String(service.id) },
          body: {
            description: values.description.ar,
            cta_button_text: values.cta_button_text.ar,
            logo_id: logoId,
            file_id: fileId,
            managed_soc_services_details_id_managed_soc_services_details_translations: [
              {
                description: values.description.en,
                cta_button_text: values.cta_button_text.en,
                language: "en",
              },
            ],
          },
        });
        toast.success("SOC Services Details updated successfully");
      } else {
        await createMutation.mutateAsync({
          body: {
            description: values.description.ar,
            cta_button_text: values.cta_button_text.ar,
            logo_id: logoId,
            file_id: fileId,
            managed_soc_services_details_id_managed_soc_services_details_translations: [
              {
                description: values.description.en,
                cta_button_text: values.cta_button_text.en,
                language: "en",
              },
            ],
          },
        });
        toast.success("SOC Services Details created successfully");
      }
      onClose();
    } catch (error: any) {
      toast.error(error?.message || "Failed to save SOC Services Details");
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
                  label="Description"
                  placeholder="Enter description"
                  required
                />
                <I18nFormTextField
                  name="cta_button_text"
                  control={form.control}
                  label="CTA Button Text"
                  placeholder="Enter CTA button text"
                  required
                />
              </div>
            </I18nTabContent>
            <I18nTabContent language="ar">
              <div className="grid gap-4">
                <I18nFormTextareaField
                  name="description"
                  control={form.control}
                  label="الوصف"
                  placeholder="أدخل الوصف"
                  required
                />
                <I18nFormTextField
                  name="cta_button_text"
                  control={form.control}
                  label="نص زر CTA"
                  placeholder="أدخل نص زر CTA"
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
              <FormLabel>Logo</FormLabel>
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
              <FormLabel>File</FormLabel>
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
            Cancel
          </Button>
          <Button
            type="submit"
            loading={createMutation.isPending || updateMutation.isPending}
          >
            {service ? "Update" : "Create"}
          </Button>
        </div>
      </form>
    </Form>
  );
}

