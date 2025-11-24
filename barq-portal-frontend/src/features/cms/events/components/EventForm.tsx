import { useState } from "react";
import { Button } from "@/shared/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/shared/components/ui/form";
import { Input } from "@/shared/components/ui/input";
import { DocumentUploader } from "@/shared/components/custom/DocumentUploader";
import { Checkbox } from "@/shared/components/ui/checkbox";
import DatePicker from "@/shared/components/custom/DatePicker";
import {
  I18nFormTextField,
  I18nFormTextareaField,
  I18nTabs,
  I18nTabContent,
  I18nFormProvider,
} from "@/shared/components/custom/i18n";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { eventSchema, type EventFormData } from "../schemas/events.schema";
import { type LanguageCode } from "@/shared/constants";
import { toast } from "sonner";

interface EventFormProps {
  event?: any;
  onClose: () => void;
}

export default function EventForm({ event, onClose }: EventFormProps) {
  const [currentLanguage, setCurrentLanguage] = useState<LanguageCode>("en");

  const form = useForm<EventFormData>({
    resolver: zodResolver(eventSchema),
    defaultValues: {
      title: { en: event?.title_en || "", ar: event?.title_ar || "" },
      subtitle: { en: event?.subtitle_en, ar: event?.subtitle_ar },
      overview: { en: event?.overview_en, ar: event?.overview_ar },
      eventDate: event?.event_date ? new Date(event.event_date) : new Date(),
      venueName: { en: event?.venue_name_en, ar: event?.venue_name_ar },
      venueAddress: { en: event?.venue_address_en, ar: event?.venue_address_ar },
      googleMapsLink: event?.google_maps_link || "",
      heroImage: [],
      isPublished: event?.is_published ?? false,
      displayOrder: event?.display_order ?? 0,
    },
    mode: "onChange",
  });

  const onSubmit = async (values: EventFormData) => {
    try {
      console.log("Event data:", values);
      toast.success(event ? "Event updated successfully" : "Event created successfully");
      onClose();
    } catch (error: any) {
      toast.error(error.message || "Failed to save event");
    }
  };

  return (
    <Form {...form}>
      <form className="grid gap-4" onSubmit={form.handleSubmit(onSubmit)}>
        <div className="grid grid-cols-3 gap-4">
          <FormField
            control={form.control}
            name="eventDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Event Date</FormLabel>
                <DatePicker
                  date={field.value}
                  onSelect={field.onChange}
                />
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
          name="googleMapsLink"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Google Maps Link</FormLabel>
              <FormControl>
                <Input {...field} placeholder="https://maps.google.com/..." />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

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
                  name="title"
                  control={form.control}
                  label="Event Title"
                  required
                />
                <I18nFormTextField
                  name="subtitle"
                  control={form.control}
                  label="Subtitle"
                />
                <I18nFormTextareaField
                  name="overview"
                  control={form.control}
                  label="Overview"
                />
                <I18nFormTextField
                  name="venueName"
                  control={form.control}
                  label="Venue Name"
                />
                <I18nFormTextareaField
                  name="venueAddress"
                  control={form.control}
                  label="Venue Address"
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
                  label="عنوان الحدث"
                  required
                />
                <I18nFormTextField
                  name="subtitle"
                  control={form.control}
                  label="العنوان الفرعي"
                />
                <I18nFormTextareaField
                  name="overview"
                  control={form.control}
                  label="نظرة عامة"
                />
                <I18nFormTextField
                  name="venueName"
                  control={form.control}
                  label="اسم المكان"
                />
                <I18nFormTextareaField
                  name="venueAddress"
                  control={form.control}
                  label="عنوان المكان"
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
            {event ? "Update Event" : "Create Event"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
