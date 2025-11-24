import { useEffect, useState } from "react";
import { Button } from "@/shared/components/ui/button";
import { useLang } from "@/shared/hooks/use-lang";
import { type LanguageCode } from "@/shared/constants";
import {
  useAdditionalManagedServicesTwoControllerCreate,
  useAdditionalManagedServicesTwoControllerUpdate,
} from "@/sdk/modules/additionalmanagedservicestwo.gen";
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
  I18nFormTextareaField,
  I18nTabs,
  I18nTabContent,
  I18nFormProvider,
} from "@/shared/components/custom/i18n";
import { DocumentUploader } from "@/shared/components/custom/DocumentUploader";
import { toast } from "sonner";
import {
  additionalManagedServicesTwoSchema,
  type AdditionalManagedServicesTwoFormData,
} from "../schemas/additional-managed-services-two.schema";

interface AdditionalManagedServicesTwoFormProps {
  service?: any;
  onClose: () => void;
}

export default function AdditionalManagedServicesTwoForm({
  service,
  onClose,
}: AdditionalManagedServicesTwoFormProps) {
  const { lang, t } = useLang();
  const [currentLanguage, setCurrentLanguage] = useState<LanguageCode>("en");

  const createMutation = useAdditionalManagedServicesTwoControllerCreate();
  const updateMutation = useAdditionalManagedServicesTwoControllerUpdate();

  const form = useForm<AdditionalManagedServicesTwoFormData>({
    resolver: zodResolver(additionalManagedServicesTwoSchema),
    defaultValues: {
      description: { en: "", ar: "" },
      logo: [],
      images: [],
    },
  });

  useEffect(() => {
    if (!service) return;

    const enTranslation =
      service?.additional_managed_services_two_id_additional_managed_services_two_translations?.find(
        (t: any) => t.language === "en"
      );
    const arTranslation =
      service?.additional_managed_services_two_id_additional_managed_services_two_translations?.find(
        (t: any) => t.language === "ar"
      );

    form.reset({
      description: {
        en: enTranslation?.description || "",
        ar: service?.description || arTranslation?.description || "",
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
      images:
        service.additional_managed_services_two_images?.map((img: any) => ({
          id: img.id,
          url: img.url,
          key: img.key,
          format: img.format,
          mime_type: img.mime_type,
          size: img.size,
        })) || [],
    });
  }, [service, form]);

  const onSubmit = async (values: AdditionalManagedServicesTwoFormData) => {
    try {
      const logoId = values.logo?.[0]?.id;
      const imageId = values.images?.[0]?.id;

      if (service) {
        await updateMutation.mutateAsync({
          path: { id: String(service.id) },
          body: {
            description: values.description.ar,
            logo_id: logoId,
            images: imageId,
            additional_managed_services_two_id_additional_managed_services_two_translations: [
              {
                language: "en",
                description: values.description.en,
              },
            ],
          },
        });
        toast.success(t("cms.managedServices.additionalTwo.messages.updated"));
      } else {
        await createMutation.mutateAsync({
          body: {
            description: values.description.ar,
            logo_id: logoId,
            images: imageId,
            additional_managed_services_two_id_additional_managed_services_two_translations: [
              {
                language: "en",
                description: values.description.en,
              },
            ],
          },
        } );
        toast.success(t("cms.managedServices.additionalTwo.messages.created"));
      }
      onClose();
    } catch (error: any) {
      toast.error(error?.message || t("cms.managedServices.additionalTwo.messages.errorCreating"));
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
                  label={t("cms.managedServices.additionalTwo.form.description")}
                  placeholder={t("cms.managedServices.additionalTwo.form.descriptionPlaceholder")}
                  required
                />
              </div>
            </I18nTabContent>
            <I18nTabContent language="ar">
              <div className="grid gap-4">
                <I18nFormTextareaField
                  name="description"
                  control={form.control}
                  label={t("cms.managedServices.additionalTwo.form.description")}
                  placeholder={t("cms.managedServices.additionalTwo.form.descriptionPlaceholder")}
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
              <FormLabel>{t("cms.managedServices.additionalTwo.form.logo")}</FormLabel>
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
          name="images"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("cms.managedServices.additionalTwo.form.image")}</FormLabel>
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

        <div className="flex justify-end w-full gap-2">
          <Button type="button" variant="outline" onClick={onClose}>
            {t("cms.managedServices.additionalTwo.form.cancel")}
          </Button>
          <Button
            type="submit"
            loading={createMutation.isPending || updateMutation.isPending}
          >
            {service ? t("cms.managedServices.additionalTwo.form.update") : t("cms.managedServices.additionalTwo.form.create")}
          </Button>
        </div>
      </form>
    </Form>
  );
}

