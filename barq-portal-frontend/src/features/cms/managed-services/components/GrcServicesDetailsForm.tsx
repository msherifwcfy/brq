import { useEffect, useState } from "react";
import { Button } from "@/shared/components/ui/button";
import { useLang } from "@/shared/hooks/use-lang";
import { type LanguageCode } from "@/shared/constants";
import {
  useManagedGrcServicesDetailsControllerCreate,
  useManagedGrcServicesDetailsControllerUpdate,
} from "@/sdk/modules/managedgrcservicesdetail.gen";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
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
  grcServicesDetailsSchema,
  type GrcServicesDetailsFormData,
} from "../schemas/grc-services-details.schema";

interface GrcServicesDetailsFormProps {
  service?: any;
  onClose: () => void;
}

export default function GrcServicesDetailsForm({
  service,
  onClose,
}: GrcServicesDetailsFormProps) {
  const { t } = useLang();
  const [currentLanguage, setCurrentLanguage] = useState<LanguageCode>("en");

  const createMutation = useManagedGrcServicesDetailsControllerCreate();
  const updateMutation = useManagedGrcServicesDetailsControllerUpdate();

  const form = useForm<GrcServicesDetailsFormData>({
    resolver: zodResolver(grcServicesDetailsSchema),
    defaultValues: {
      description: { en: "", ar: "" },
      title: { en: "", ar: "" },
    },
  });

  useEffect(() => {
    if (!service) return;

    const enTranslation =
      service?.managed_grc_services_details_id_managed_grc_services_details_translations?.find(
        (t: any) => t.language === "en"
      );
    const arTranslation =
      service?.managed_grc_services_details_id_managed_grc_services_details_translations?.find(
        (t: any) => t.language === "ar"
      );

    form.reset({
      description: {
        en: enTranslation?.description || "",
        ar: service?.description || arTranslation?.description || "",
      },
      title: {
        en: enTranslation?.title || "",
        ar: service?.title || arTranslation?.title || "",
      },
    });
  }, [service, form]);

  const onSubmit = async (values: GrcServicesDetailsFormData) => {
    try {
      if (service) {
        await updateMutation.mutateAsync({
          path: { id: service.id },
          body: {
            description: values.description.ar,
            title: values.title.ar,
            managed_grc_services_details_id_managed_grc_services_details_translations: [
              {
                description: values.description.en,
                title: values.title.en,
                language: "en",
              },
            ],
          },
        });
        toast.success("GRC Services Details updated successfully");
      } else {
        await createMutation.mutateAsync({
          body: {
            description: values.description.ar,
            title: values.title.ar,
            managed_grc_services_details_id_managed_grc_services_details_translations: [
              {
                description: values.description.en,
                title: values.title.en,
                language: "en",
              },
            ],
          },
        });
        toast.success("GRC Services Details created successfully");
      }
      onClose();
    } catch (error: any) {
      toast.error(error?.message || "Failed to save GRC Services Details");
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
                  placeholder="Enter title"
                  required
                />
                <I18nFormTextareaField
                  name="description"
                  control={form.control}
                  label="Description"
                  placeholder="Enter description"
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
                  placeholder="أدخل العنوان"
                  required
                />
                <I18nFormTextareaField
                  name="description"
                  control={form.control}
                  label="الوصف"
                  placeholder="أدخل الوصف"
                  required
                />
              </div>
            </I18nTabContent>
          </I18nFormProvider>
        </I18nTabs>

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

