import { useState } from "react";
import { Button } from "@/shared/components/ui/button";
import { type LanguageCode } from "@/shared/constants";
import { DocumentUploader } from "@/shared/components/custom/DocumentUploader";
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
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  updateAcademyHeroSchema,
  type UpdateAcademyHeroFormData,
} from "../schemas/academy-hero.schema";
import { toast } from "sonner";

export default function AcademyHeroForm() {
  const [currentLanguage, setCurrentLanguage] = useState<LanguageCode>("en");

  const form = useForm<UpdateAcademyHeroFormData>({
    resolver: zodResolver(updateAcademyHeroSchema),
    defaultValues: {
      logo: [],
      title: { en: "", ar: "" },
      description: { en: "", ar: "" },
      backgroundImage: [],
    },
    mode: "onChange",
  });

  const onSubmit = async (values: UpdateAcademyHeroFormData) => {
    try {
      console.log("Academy Hero data:", values);
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
            name="logo"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Academy Logo</FormLabel>
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
                    name="title"
                    control={form.control}
                    label="Hero Title"
                    required
                  />
                  <I18nFormTextareaField
                    name="description"
                    control={form.control}
                    label="Hero Description"
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
                    label="عنوان البطل"
                    required
                  />
                  <I18nFormTextareaField
                    name="description"
                    control={form.control}
                    label="وصف البطل"
                    required
                  />
                </div>
              </I18nFormProvider>
            </I18nTabContent>
          </I18nTabs>

          <FormField
            control={form.control}
            name="backgroundImage"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Background Image</FormLabel>
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

          <Button type="submit">Save Hero Section</Button>
        </form>
      </Form>
    </div>
  );
}
