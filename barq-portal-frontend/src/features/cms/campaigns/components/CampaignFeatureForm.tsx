import { useState } from "react";
import { Button } from "@/shared/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/shared/components/ui/form";
import { Input } from "@/shared/components/ui/input";
import { DocumentUploader } from "@/shared/components/custom/DocumentUploader";
import {
  I18nFormTextField,
  I18nTabs,
  I18nTabContent,
  I18nFormProvider,
} from "@/shared/components/custom/i18n";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { campaignFeatureSchema, type CampaignFeatureFormData } from "../schemas/campaigns.schema";
import { type LanguageCode } from "@/shared/constants";
import { toast } from "sonner";

interface CampaignFeatureFormProps {
  feature?: any;
  onClose: () => void;
}

export default function CampaignFeatureForm({ feature, onClose }: CampaignFeatureFormProps) {
  const [currentLanguage, setCurrentLanguage] = useState<LanguageCode>("en");

  const form = useForm<CampaignFeatureFormData>({
    resolver: zodResolver(campaignFeatureSchema),
    defaultValues: {
      title: { en: feature?.title_en || "", ar: feature?.title_ar || "" },
      icon: [],
      displayOrder: feature?.display_order ?? 0,
    },
    mode: "onChange",
  });

  const onSubmit = async (values: CampaignFeatureFormData) => {
    try {
      console.log("Campaign Feature data:", values);
      toast.success(feature ? "Feature updated successfully" : "Feature created successfully");
      onClose();
    } catch (error: any) {
      toast.error(error.message || "Failed to save feature");
    }
  };

  return (
    <Form {...form}>
      <form className="grid gap-4" onSubmit={form.handleSubmit(onSubmit)}>
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

        <FormField
          control={form.control}
          name="icon"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Icon (Optional)</FormLabel>
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
              <I18nFormTextField
                name="title"
                control={form.control}
                label="Feature Title"
                required
              />
            </I18nFormProvider>
          </I18nTabContent>
          <I18nTabContent language="ar">
            <I18nFormProvider currentLanguage="ar">
              <I18nFormTextField
                name="title"
                control={form.control}
                label="عنوان الميزة"
                required
              />
            </I18nFormProvider>
          </I18nTabContent>
        </I18nTabs>

        <div className="flex justify-end gap-2">
          <Button type="button" variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit">
            {feature ? "Update Feature" : "Add Feature"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
