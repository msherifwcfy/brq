import { useState } from "react";
import { Button } from "@/shared/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/shared/components/ui/form";
import { Input } from "@/shared/components/ui/input";
import { DocumentUploader } from "@/shared/components/custom/DocumentUploader";
import { Checkbox } from "@/shared/components/ui/checkbox";
import {
  I18nFormTextField,
  I18nFormTextareaField,
  I18nTabs,
  I18nTabContent,
  I18nFormProvider,
} from "@/shared/components/custom/i18n";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { securityServiceSchema, type SecurityServiceFormData } from "../schemas/security-service.schema";
import { type LanguageCode } from "@/shared/constants";
import { toast } from "sonner";

interface SecurityServiceFormProps {
  service?: any;
  onClose: () => void;
}

export default function SecurityServiceForm({ service, onClose }: SecurityServiceFormProps) {
  const [currentLanguage, setCurrentLanguage] = useState<LanguageCode>("en");

  const form = useForm<SecurityServiceFormData>({
    resolver: zodResolver(securityServiceSchema),
    defaultValues: {
      serviceKey: service?.service_key || "",
      title: { en: service?.title_en || "", ar: service?.title_ar || "" },
      description: { en: service?.description_en || "", ar: service?.description_ar || "" },
      iconImage: [],
      mainImage: [],
      displayOrder: service?.display_order || 0,
    },
    mode: "onChange",
  });

  const onSubmit = async (values: SecurityServiceFormData) => {
    try {
      console.log("Security Service data:", values);
      toast.success(service ? "Service updated successfully" : "Service created successfully");
      onClose();
    } catch (error: any) {
      toast.error(error.message || "Failed to save service");
    }
  };

  return (
    <Form {...form}>
      <form className="grid gap-4" onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="serviceKey"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Service Key (e.g., "soc", "cybersecurity", "grc")</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Enter service key" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="iconImage"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Icon Image</FormLabel>
                <FormControl>
                  <DocumentUploader
                    value={field.value}
                    onChange={field.onChange}
                    multiple={false}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="mainImage"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Main Image</FormLabel>
                <FormControl>
                  <DocumentUploader
                    value={field.value}
                    onChange={field.onChange}
                    multiple={false}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="displayOrder"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Display Order</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  {...field}
                  onChange={(e) => field.onChange(parseInt(e.target.value))}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <I18nTabs
          value={currentLanguage}
          onValueChange={setCurrentLanguage}
          className="w-full"
        >
          <I18nTabContent language="en">
            <I18nFormProvider currentLanguage="en">
              <div className="grid gap-4">
                <I18nFormTextField
                  name="title"
                  control={form.control}
                  label="Title"
                  required
                />
                <I18nFormTextareaField
                  name="description"
                  control={form.control}
                  label="Description"
                  required
                />
              </div>
            </I18nFormProvider>
          </I18nTabContent>
          <I18nTabContent language="ar">
            <I18nFormProvider currentLanguage="ar">
              <div className="grid gap-4">
                <I18nFormTextField
                  name="title"
                  control={form.control}
                  label="العنوان"
                  required
                />
                <I18nFormTextareaField
                  name="description"
                  control={form.control}
                  label="الوصف"
                  required
                />
              </div>
            </I18nFormProvider>
          </I18nTabContent>
        </I18nTabs>

        <div className="flex justify-end gap-2">
          <Button type="button" variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit">
            {service ? "Update Service" : "Create Service"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
