import { useState } from "react";
import { Button } from "@/shared/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/shared/components/ui/form";
import { DocumentUploader } from "@/shared/components/custom/DocumentUploader";
import {
  I18nFormTextField,
  I18nFormTextareaField,
  I18nTabs,
  I18nTabContent,
  I18nFormProvider,
} from "@/shared/components/custom/i18n";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { managedServicesHeroSchema, type ManagedServicesHeroFormData } from "../schemas/managed-services-hero.schema";
import { type LanguageCode } from "@/shared/constants";
import { toast } from "sonner";

export default function ManagedServicesHeroForm() {
  const [currentLanguage, setCurrentLanguage] = useState<LanguageCode>("en");

  const form = useForm<ManagedServicesHeroFormData>({
    resolver: zodResolver(managedServicesHeroSchema),
    defaultValues: {
      subtitle: { en: "", ar: "" },
      title: { en: "", ar: "" },
      description: { en: "", ar: "" },
      heroImage: [],
    },
    mode: "onChange",
  });

  const onSubmit = async (values: ManagedServicesHeroFormData) => {
    try {
      console.log("Managed Services Hero data:", values);
      toast.success("Hero section saved successfully");
    } catch (error: any) {
      toast.error(error.message || "Failed to save hero section");
    }
  };

  return (
    <div>
      <Form {...form}>
        <form className="grid gap-4" onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="heroImage"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Hero Image</FormLabel>
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

          <I18nTabs
            value={currentLanguage}
            onValueChange={setCurrentLanguage}
            className="w-full"
          >
            <I18nTabContent language="en">
              <I18nFormProvider currentLanguage="en">
                <div className="grid gap-4">
                  <I18nFormTextField
                    name="subtitle"
                    control={form.control}
                    label="Subtitle"
                    required
                  />
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
                    name="subtitle"
                    control={form.control}
                    label="عنوان فرعي"
                    required
                  />
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

          <Button type="submit">Save Hero Section</Button>
        </form>
      </Form>
    </div>
  );
}
