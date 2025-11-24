import { useEffect, useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/shared/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shared/components/ui/form";
import {
  I18nFormProvider,
  I18nFormTextField,
  I18nFormTextareaField,
  I18nTabContent,
  I18nTabs,
} from "@/shared/components/custom/i18n";
import {
  createEventsSpeakersSchema,
  type CreateEventsSpeakersFormValues,
} from "../schemas/events-speakers.schema";
import { type DocumentUploadValue, DocumentUploader } from "@/shared/components/custom/DocumentUploader";
import { useLang } from "@/shared/hooks/use-lang";
import { type LanguageCode } from "@/shared/constants";
import { toast } from "sonner";
import { XIcon } from "lucide-react";

type EventsSpeakersFormProps = {
  defaultValues?: Partial<CreateEventsSpeakersFormValues>;
  onSubmit: (values: CreateEventsSpeakersFormValues) => Promise<void> | void;
  isLoading?: boolean;
  submitLabel: string;
};

export function EventsSpeakersForm({
  defaultValues,
  onSubmit,
  isLoading,
  submitLabel,
}: EventsSpeakersFormProps) {
  const { t } = useLang();
  const [currentLanguage, setCurrentLanguage] = useState<LanguageCode>("en");

  const form = useForm<CreateEventsSpeakersFormValues>({
    resolver: zodResolver(createEventsSpeakersSchema),
    defaultValues: {
      title: { en: "", ar: "" },
      cards: [
        {
          name: { en: "", ar: "" },
          role: { en: "", ar: "" },
          image: [],
        },
      ],
    },
  });

  const { fields, append, remove, replace } = useFieldArray({
    control: form.control,
    name: "cards",
  });

  useEffect(() => {
    if (!defaultValues) {
      replace([
        {
          name: { en: "", ar: "" },
          role: { en: "", ar: "" },
          image: [],
        },
      ]);
      form.reset({
        title: { en: "", ar: "" },
        cards: [
          {
            name: { en: "", ar: "" },
            role: { en: "", ar: "" },
            image: [],
          },
        ],
      });
      return;
    }

    const mappedCards =
      defaultValues.cards?.map((card) => ({
        id: card.id,
        name: card.name || { en: "", ar: "" },
        role: card.role || { en: "", ar: "" },
        image:
          (card.image as DocumentUploadValue[] | undefined)?.map((image) => ({
            id: image.id,
            url: image.url,
            key: image.key,
            format: image.format,
            mime_type: image.mime_type,
            size: image.size,
            name: image.name,
          })) || [],
      })) || [];

    if (mappedCards.length) {
      replace(mappedCards);
    } else {
      replace([
        {
          name: { en: "", ar: "" },
          role: { en: "", ar: "" },
          image: [],
        },
      ]);
    }

    form.reset({
      title: defaultValues.title || { en: "", ar: "" },
      cards: mappedCards.length
        ? mappedCards
        : [
            {
              name: { en: "", ar: "" },
              role: { en: "", ar: "" },
              image: [],
            },
          ],
    });
  }, [defaultValues, form, replace]);

  const handleAddCard = () => {
    if (fields.length >= 8) {
      toast.error(t("cms.events.speakers.messages.maxCards"));
      return;
    }
    append({
      name: { en: "", ar: "" },
      role: { en: "", ar: "" },
      image: [],
    });
  };

  const handleRemoveCard = (index: number) => {
    if (fields.length <= 1) {
      toast.error(t("cms.events.speakers.messages.minCards"));
      return;
    }
    remove(index);
  };

  const handleSubmit = async (values: CreateEventsSpeakersFormValues) => {
    await onSubmit(values);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="space-y-6"
      >
        <I18nTabs
          value={currentLanguage}
          onValueChange={(value) => setCurrentLanguage(value as LanguageCode)}
          className="w-full"
        >
          <I18nFormProvider currentLanguage={currentLanguage}>
            <I18nTabContent language="en">
              <div className="grid gap-4">
                <I18nFormTextField
                  name="title"
                  control={form.control}
                  label={t("cms.events.speakers.form.title")}
                  placeholder={t("cms.events.speakers.form.titlePlaceholder")}
                  required
                />
              </div>
              <div className="space-y-4 mt-4">
                {fields.map((field, index) => (
                  <div
                    key={field.id}
                    className="border rounded-lg p-4 space-y-4"
                  >
                    <div className="flex justify-between items-center">
                      <h3 className="text-sm font-medium">
                        {t("cms.events.speakers.form.speakerLabel", {
                          index: index + 1,
                        })}
                      </h3>
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => handleRemoveCard(index)}
                        disabled={isLoading}
                      >
                        <XIcon className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="grid gap-4">
                      <I18nFormTextField
                        name={`cards.${index}.name`}
                        control={form.control}
                        label={t("cms.events.speakers.form.name")}
                        placeholder={t("cms.events.speakers.form.namePlaceholder")}
                        required
                      />
                      <I18nFormTextareaField
                        name={`cards.${index}.role`}
                        control={form.control}
                        label={t("cms.events.speakers.form.role")}
                        placeholder={t("cms.events.speakers.form.rolePlaceholder")}
                        required
                      />
                    </div>
                    <FormField
                      control={form.control}
                      name={`cards.${index}.image`}
                      render={({ field: imageField }) => (
                        <FormItem>
                          <FormLabel>{t("cms.events.speakers.form.image")}</FormLabel>
                          <FormControl>
                            <DocumentUploader
                              value={(imageField.value as DocumentUploadValue[]) || []}
                              onChange={imageField.onChange}
                              maxDocuments={1}
                              acceptedFileTypes={["image/*"]}
                              disabled={isLoading}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                ))}
              </div>
            </I18nTabContent>
            <I18nTabContent language="ar">
              <div className="grid gap-4">
                <I18nFormTextField
                  name="title"
                  control={form.control}
                  label={t("cms.events.speakers.form.title")}
                  placeholder={t("cms.events.speakers.form.titlePlaceholder")}
                  required
                />
              </div>
              <div className="space-y-4 mt-4">
                {fields.map((field, index) => (
                  <div
                    key={field.id}
                    className="border rounded-lg p-4 space-y-4"
                  >
                    <div className="flex justify-between items-center">
                      <h3 className="text-sm font-medium">
                        {t("cms.events.speakers.form.speakerLabel", {
                          index: index + 1,
                        })}
                      </h3>
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => handleRemoveCard(index)}
                        disabled={isLoading}
                      >
                        <XIcon className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="grid gap-4">
                      <I18nFormTextField
                        name={`cards.${index}.name`}
                        control={form.control}
                        label={t("cms.events.speakers.form.name")}
                        placeholder={t("cms.events.speakers.form.namePlaceholder")}
                        required
                      />
                      <I18nFormTextareaField
                        name={`cards.${index}.role`}
                        control={form.control}
                        label={t("cms.events.speakers.form.role")}
                        placeholder={t("cms.events.speakers.form.rolePlaceholder")}
                        required
                      />
                    </div>
                    <FormField
                      control={form.control}
                      name={`cards.${index}.image`}
                      render={({ field: imageField }) => (
                        <FormItem>
                          <FormLabel>{t("cms.events.speakers.form.image")}</FormLabel>
                          <FormControl>
                            <DocumentUploader
                              value={(imageField.value as DocumentUploadValue[]) || []}
                              onChange={imageField.onChange}
                              maxDocuments={1}
                              acceptedFileTypes={["image/*"]}
                              disabled={isLoading}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                ))}
              </div>
            </I18nTabContent>
          </I18nFormProvider>
        </I18nTabs>

        <div className="flex justify-between">
          <Button
            type="button"
            variant="outline"
            onClick={handleAddCard}
            disabled={isLoading}
          >
            {t("cms.events.speakers.actions.addSpeaker")}
          </Button>
          <Button type="submit" loading={isLoading}>
            {submitLabel}
          </Button>
        </div>
      </form>
    </Form>
  );
}

