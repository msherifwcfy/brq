import { useState } from "react";
import { Button } from "@/shared/components/ui/button";
import { Form } from "@/shared/components/ui/form";
import {
  I18nFormTextField,
  I18nFormTextareaField,
  I18nTabs,
  I18nTabContent,
  I18nFormProvider,
} from "@/shared/components/custom/i18n";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { updateAcademyHighlightsSchema } from "../schemas/academy-highlights.schema";
import { type LanguageCode } from "@/shared/constants";
import type { UpdateAcademyHighlightsFormData } from "../schemas/academy-highlights.schema";
import { toast } from "sonner";

export default function AcademyHighlightsForm() {
  const [currentLanguage, setCurrentLanguage] = useState<LanguageCode>("en");

  const form = useForm<UpdateAcademyHighlightsFormData>({
    resolver: zodResolver(updateAcademyHighlightsSchema),
    defaultValues: {
      sectionTitle: { en: "", ar: "" },
      sectionSubtitle: { en: "", ar: "" },
      sectionDescription: { en: "", ar: "" },
    },
    mode: "onChange",
  });

  const onSubmit = async (values: UpdateAcademyHighlightsFormData) => {
    try {
      console.log("Academy Highlights data:", values);
      toast.success("Highlights section saved successfully");
    } catch (error: any) {
      toast.error(error.message || "Failed to save highlights section");
    }
  };

  return (
    <div>
      <Form {...form}>
        <form className="grid gap-4" onSubmit={form.handleSubmit(onSubmit)}>
          <I18nTabs
            value={currentLanguage}
            onValueChange={setCurrentLanguage}
            className="w-full"
          >
            <I18nTabContent language="en">
              <I18nFormProvider currentLanguage="en">
                <div className="grid gap-4">
                  <I18nFormTextField
                    name="sectionTitle"
                    control={form.control}
                    label="Section Title"
                    required
                  />
                  <I18nFormTextField
                    name="sectionSubtitle"
                    control={form.control}
                    label="Section Subtitle"
                    required
                  />
                  <I18nFormTextareaField
                    name="sectionDescription"
                    control={form.control}
                    label="Section Description"
                    required
                  />
                </div>
              </I18nFormProvider>
            </I18nTabContent>
            <I18nTabContent language="ar">
              <I18nFormProvider currentLanguage="ar">
                <div className="grid gap-4">
                  <I18nFormTextField
                    name="sectionTitle"
                    control={form.control}
                    label="عنوان القسم"
                    required
                  />
                  <I18nFormTextField
                    name="sectionSubtitle"
                    control={form.control}
                    label="عنوان فرعي"
                    required
                  />
                  <I18nFormTextareaField
                    name="sectionDescription"
                    control={form.control}
                    label="وصف القسم"
                    required
                  />
                </div>
              </I18nFormProvider>
            </I18nTabContent>
          </I18nTabs>

          <Button type="submit">Save Highlights Section</Button>
        </form>
      </Form>
    </div>
  );
}
