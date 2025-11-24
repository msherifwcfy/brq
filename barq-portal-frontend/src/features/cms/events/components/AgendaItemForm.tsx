import { useState } from "react";
import { Button } from "@/shared/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/shared/components/ui/form";
import { Input } from "@/shared/components/ui/input";
import {
  I18nFormTextField,
  I18nTabs,
  I18nTabContent,
  I18nFormProvider,
} from "@/shared/components/custom/i18n";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { agendaItemSchema, type AgendaItemFormData } from "../schemas/events.schema";
import { type LanguageCode } from "@/shared/constants";
import { toast } from "sonner";

interface AgendaItemFormProps {
  item?: any;
  onClose: () => void;
}

export default function AgendaItemForm({ item, onClose }: AgendaItemFormProps) {
  const [currentLanguage, setCurrentLanguage] = useState<LanguageCode>("en");

  const form = useForm<AgendaItemFormData>({
    resolver: zodResolver(agendaItemSchema),
    defaultValues: {
      timeSlot: item?.time_slot || "",
      description: { en: item?.description_en || "", ar: item?.description_ar || "" },
      displayOrder: item?.display_order ?? 0,
    },
    mode: "onChange",
  });

  const onSubmit = async (values: AgendaItemFormData) => {
    try {
      console.log("Agenda Item data:", values);
      toast.success(item ? "Item updated successfully" : "Item created successfully");
      onClose();
    } catch (error: any) {
      toast.error(error.message || "Failed to save item");
    }
  };

  return (
    <Form {...form}>
      <form className="grid gap-4" onSubmit={form.handleSubmit(onSubmit)}>
        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="timeSlot"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Time Slot (e.g., 09:00 - 10:00)</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="09:00 - 10:00" />
                </FormControl>
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
        </div>

        <I18nTabs
          value={currentLanguage}
          onValueChange={setCurrentLanguage}
          className="w-full"
        >
          <I18nTabContent language="en">
            <I18nFormProvider currentLanguage="en">
              <I18nFormTextField
                name="description"
                control={form.control}
                label="Description"
                required
              />
            </I18nFormProvider>
          </I18nTabContent>
          <I18nTabContent language="ar">
            <I18nFormProvider currentLanguage="ar">
              <I18nFormTextField
                name="description"
                control={form.control}
                label="الوصف"
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
            {item ? "Update" : "Add"} Item
          </Button>
        </div>
      </form>
    </Form>
  );
}
