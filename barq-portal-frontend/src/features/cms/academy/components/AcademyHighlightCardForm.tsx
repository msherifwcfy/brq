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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select";
import { Input } from "@/shared/components/ui/input";
import {
  I18nFormTextField,
  I18nTabs,
  I18nTabContent,
  I18nFormProvider,
} from "@/shared/components/custom/i18n";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  createAcademyHighlightCardSchema,
  type CreateAcademyHighlightCardFormData,
} from "../schemas/academy-highlight-card.schema";

interface AcademyHighlightCardFormProps {
  onSubmit: (values: CreateAcademyHighlightCardFormData) => Promise<void>;
  isLoading?: boolean;
  submitLabel?: string;
  defaultValues?: Partial<CreateAcademyHighlightCardFormData>;
}

export default function AcademyHighlightCardForm({
  onSubmit,
  isLoading,
  submitLabel = "Save",
  defaultValues,
}: AcademyHighlightCardFormProps) {
  const [currentLanguage, setCurrentLanguage] = useState<LanguageCode>("en");

  const form = useForm<CreateAcademyHighlightCardFormData>({
    resolver: zodResolver(createAcademyHighlightCardSchema),
    defaultValues: defaultValues || {
      title: { en: "", ar: "" },
      icon: [],
      cardType: "internships",
      stat1Value: "",
      stat1Label: { en: "", ar: "" },
      stat2Value: "",
      stat2Label: { en: "", ar: "" },
      stat3Value: "",
      stat3Label: { en: "", ar: "" },
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
            name="icon"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Icon</FormLabel>
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
                    label="Card Title"
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
                    label="عنوان البطاقة"
                    required
                  />
                </div>
              </I18nFormProvider>
            </I18nTabContent>
          </I18nTabs>

          <FormField
            control={form.control}
            name="cardType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Card Type</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select card type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="internships">Internships</SelectItem>
                    <SelectItem value="trainings">Trainings</SelectItem>
                    <SelectItem value="seminars">Seminars</SelectItem>
                    <SelectItem value="graduates">Graduates</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid gap-2">
            <FormLabel>Statistic 1 (Required)</FormLabel>
            <div className="grid grid-cols-3 gap-2">
              <FormField
                control={form.control}
                name="stat1Value"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input {...field} placeholder="Value (e.g., 11)" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name={`stat1Label.${currentLanguage}`}
                render={({ field }) => (
                  <FormItem className="col-span-2">
                    <FormControl>
                      <Input {...field} placeholder="Label" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          <div className="grid gap-2">
            <FormLabel>Statistic 2 (Optional)</FormLabel>
            <div className="grid grid-cols-3 gap-2">
              <FormField
                control={form.control}
                name="stat2Value"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input {...field} placeholder="Value" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name={`stat2Label.${currentLanguage}`}
                render={({ field }) => (
                  <FormItem className="col-span-2">
                    <FormControl>
                      <Input {...field} placeholder="Label" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          <div className="grid gap-2">
            <FormLabel>Statistic 3 (Optional)</FormLabel>
            <div className="grid grid-cols-3 gap-2">
              <FormField
                control={form.control}
                name="stat3Value"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input {...field} placeholder="Value" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name={`stat3Label.${currentLanguage}`}
                render={({ field }) => (
                  <FormItem className="col-span-2">
                    <FormControl>
                      <Input {...field} placeholder="Label" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
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
