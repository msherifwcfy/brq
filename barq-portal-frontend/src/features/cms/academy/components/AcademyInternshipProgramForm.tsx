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
import { Input } from "@/shared/components/ui/input";
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
  createAcademyInternshipProgramSchema,
  type CreateAcademyInternshipProgramFormData,
} from "../schemas/academy-internship-program.schema";

interface AcademyInternshipProgramFormProps {
  onSubmit: (values: CreateAcademyInternshipProgramFormData) => Promise<void>;
  isLoading?: boolean;
  submitLabel?: string;
  defaultValues?: Partial<CreateAcademyInternshipProgramFormData>;
}

export default function AcademyInternshipProgramForm({
  onSubmit,
  isLoading,
  submitLabel = "Save",
  defaultValues,
}: AcademyInternshipProgramFormProps) {
  const [currentLanguage, setCurrentLanguage] = useState<LanguageCode>("en");

  const form = useForm<CreateAcademyInternshipProgramFormData>({
    resolver: zodResolver(createAcademyInternshipProgramSchema),
    defaultValues: defaultValues || {
      title: { en: "", ar: "" },
      description: { en: "", ar: "" },
      image: [],
      displayOrder: 0,
    },
    mode: "onChange",
  });

  return (
    <div>
      <Form {...form}>
        <form className="grid gap-4" onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="image"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Program Image</FormLabel>
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
                    label="Program Title"
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
                    label="عنوان البرنامج"
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
                    onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Saving..." : submitLabel}
          </Button>
        </form>
      </Form>
    </div>
  );
}
