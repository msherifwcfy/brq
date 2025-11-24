import { useState } from "react";
import { Button } from "@/shared/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/shared/components/ui/form";
import { Input } from "@/shared/components/ui/input";
import { DocumentUploader } from "@/shared/components/custom/DocumentUploader";
import { Checkbox } from "@/shared/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/shared/components/ui/select";
import {
  I18nFormTextField,
  I18nFormTextareaField,
  I18nTabs,
  I18nTabContent,
  I18nFormProvider,
} from "@/shared/components/custom/i18n";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { campaignSchema, type CampaignFormData } from "../schemas/campaigns.schema";
import { type LanguageCode } from "@/shared/constants";
import { toast } from "sonner";

interface CampaignFormProps {
  campaign?: any;
  onClose: () => void;
}

export default function CampaignForm({ campaign, onClose }: CampaignFormProps) {
  const [currentLanguage, setCurrentLanguage] = useState<LanguageCode>("en");

  const form = useForm<CampaignFormData>({
    resolver: zodResolver(campaignSchema),
    defaultValues: {
      campaignType: campaign?.campaign_type || "campaign1",
      title: { en: campaign?.title_en || "", ar: campaign?.title_ar || "" },
      subtitle: { en: campaign?.subtitle_en, ar: campaign?.subtitle_ar },
      description: { en: campaign?.description_en, ar: campaign?.description_ar },
      heroImage: [],
      heroVideo: campaign?.hero_video || "",
      contentImage: [],
      ctaText: { en: campaign?.cta_text_en, ar: campaign?.cta_text_ar },
      isPublished: campaign?.is_published ?? false,
      displayOrder: campaign?.display_order ?? 0,
    },
    mode: "onChange",
  });

  const onSubmit = async (values: CampaignFormData) => {
    try {
      console.log("Campaign data:", values);
      toast.success(campaign ? "Campaign updated successfully" : "Campaign created successfully");
      onClose();
    } catch (error: any) {
      toast.error(error.message || "Failed to save campaign");
    }
  };

  return (
    <Form {...form}>
      <form className="grid gap-4" onSubmit={form.handleSubmit(onSubmit)}>
        <div className="grid grid-cols-3 gap-4">
          <FormField
            control={form.control}
            name="campaignType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Campaign Type</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="campaign1">Campaign 1 - HSE Policy</SelectItem>
                    <SelectItem value="campaign2">Campaign 2 - Managed Services</SelectItem>
                    <SelectItem value="campaign3">Campaign 3 - Agentic AI</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

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
            name="isPublished"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>Published</FormLabel>
                </div>
              </FormItem>
            )}
          />
        </div>

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

        <FormField
          control={form.control}
          name="heroVideo"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Hero Video URL (Optional)</FormLabel>
              <FormControl>
                <Input {...field} placeholder="https://..." />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="contentImage"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Content Image</FormLabel>
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
                  label="Campaign Title"
                  required
                />
                <I18nFormTextField
                  name="subtitle"
                  control={form.control}
                  label="Subtitle"
                />
                <I18nFormTextareaField
                  name="description"
                  control={form.control}
                  label="Description"
                />
                <I18nFormTextField
                  name="ctaText"
                  control={form.control}
                  label="CTA Button Text"
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
                  label="عنوان الحملة"
                  required
                />
                <I18nFormTextField
                  name="subtitle"
                  control={form.control}
                  label="العنوان الفرعي"
                />
                <I18nFormTextareaField
                  name="description"
                  control={form.control}
                  label="الوصف"
                />
                <I18nFormTextField
                  name="ctaText"
                  control={form.control}
                  label="نص زر الدعوة"
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
            {campaign ? "Update Campaign" : "Create Campaign"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
