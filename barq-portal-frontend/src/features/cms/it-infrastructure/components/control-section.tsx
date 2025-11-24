import { useEffect, useState } from "react";
import { Button } from "@/shared/components/ui/button";
import { useLang } from "@/shared/hooks/use-lang";
import { type LanguageCode } from "@/shared/constants";
import {
  useControlSectionControllerReadQuery,
  useControlSectionControllerCreate,
  useControlSectionControllerUpdate,
} from "@/sdk/modules/controlsection.gen";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shared/components/ui/form";
import {
  I18nFormTextareaField,
  I18nTabs,
  I18nTabContent,
  I18nFormProvider,
} from "@/shared/components/custom/i18n";
import { DocumentUploader } from "@/shared/components/custom/DocumentUploader";
import { toast } from "sonner";
import { createControlSectionSchema, type CreateControlSectionFormData } from "../schemas";

type FormData = any;

export default function ControlSection() {
  const { t } = useLang();
  const [currentLanguage, setCurrentLanguage] = useState<LanguageCode>("en");

  const { data } = useControlSectionControllerReadQuery({
    query: {
      query: {
        relations: {
          logo: true,
          control_section_id_control_section_translations: true,
          control_section_cards_id_control_section_cards: {
            icon: true,
            control_section_cards_id_control_section_cards_translations: true,
          },
        },
        pagination: { skip: 0, take: 1 },
      },
    },
    headers: { "x-skip-translations": "true" },
  });

  const createMutation = useControlSectionControllerCreate();
  const updateMutation = useControlSectionControllerUpdate();

  const existing = data?.data?.[0];

  const form = useForm<FormData>({
    resolver: zodResolver(createControlSectionSchema),
    defaultValues: { text: { en: "", ar: "" }, logo: [],  cards: [] },
  });

  const { fields, append, remove } = useFieldArray({ control: form.control, name: "cards" });

  const cardsError =
    form.formState.errors.cards?.root?.message ||
    (form.formState.errors.cards?.message as string | undefined);

  useEffect(() => {
    if (!existing) return;

    const enTranslation = existing?.control_section_id_control_section_translations?.find((t: any) => t.language === "en");
    const arTranslation = existing?.control_section_id_control_section_translations?.find((t: any) => t.language === "ar");

    const existingCards =
      existing?.control_section_cards_id_control_section_cards?.map((card: any) => {
        const cardEn = card.control_section_cards_id_control_section_cards_translations?.find((t: any) => t.language === "en");
        const cardAr = card.control_section_cards_id_control_section_cards_translations?.find((t: any) => t.language === "ar");
        return {
          id: card.id,
          text: { en: cardEn?.text || "", ar: card.text || cardAr?.text || "" },
          sub_text: { en: cardEn?.sub_text || "", ar: card.sub_text || cardAr?.sub_text || "" },
          icon: card.icon?.id
            ? [
                {
                  id: card.icon.id,
                  url: card.icon.url,
                  key: card.icon.key,
                  format: card.icon.format,
                  mime_type: card.icon.mime_type,
                  size: card.icon.size,
                },
              ]
            : [],
        };
      }) || [];

    form.reset({
      text: { en: enTranslation?.text || "", ar: existing?.text || arTranslation?.text || "" },
      logo: existing.logo?.id
        ? [
            { id: existing.logo.id, url: existing.logo.url, key: existing.logo.key, format: existing.logo.format, mime_type: existing.logo.mime_type, size: existing.logo.size },
          ]
        : [],
      cards: existingCards,
    });
  }, [existing, form]);

  const onSubmit = async (values: FormData) => {
    try {
      const logoId = values.logo?.[0]?.id;

      const cards = values.cards
        ?.filter((c) => c.icon?.[0]?.id !== undefined)
        .map((c) => ({
          ...(c.id ? { id: c.id } : {}),
          text: c.text.ar,
          sub_text: c.sub_text.ar,
          icon_id: c?.icon?.[0]?.id ?? undefined,
          control_section_cards_id_control_section_cards_translations: [
            { language: "en" as const, text: c.text.en, sub_text: c.sub_text.en },
          ],
        }));

      if (existing) {
        await updateMutation.mutateAsync({
          path: { id: String(existing.id) },
          body: {
            text: values.text.ar,
            logo_id: logoId,
            control_section_id_control_section_translations: [
              { language: "en", text: values.text.en },
            ],
            control_section_cards_id_control_section_cards: cards,
          },
        } as any);
        toast.success(t("cms.itInfrastructure.policyControl.messages.updated"));
      } else {
        await createMutation.mutateAsync({
          body: {
            text: values.text.ar,
            logo_id: logoId,
            control_section_id_control_section_translations: [
              { language: "en", text: values.text.en },
            ],
            control_section_cards_id_control_section_cards: cards,
          },
        } as any);
        toast.success(t("cms.itInfrastructure.policyControl.messages.created"));
      }
    } catch (error: any) {
      toast.error(error?.message || "Error");
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <I18nTabs value={currentLanguage} onValueChange={setCurrentLanguage} className="w-full">
          <I18nFormProvider currentLanguage={currentLanguage}>
            <I18nTabContent language="en">
              <div className="grid gap-4">
                <I18nFormTextareaField name="text" control={form.control} label={t("common.text")} placeholder={t("common.text")} required />
              </div>
            </I18nTabContent>
            <I18nTabContent language="ar">
              <div className="grid gap-4">
                <I18nFormTextareaField name="text" control={form.control} label={t("common.text")} placeholder={t("common.text")} required />
              </div>
            </I18nTabContent>
          </I18nFormProvider>
        </I18nTabs>

        <FormField
          control={form.control}
          name={"logo" as any}
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("cms.itInfrastructure.policyControl.form.logo")}</FormLabel>
              <FormControl>
                <DocumentUploader
                  value={(field.value) || []}
                  maxDocuments={1}
                  maxSize={50 * 1024 * 1024}
                  acceptedFileTypes={["image/*"]}
                  onChange={(value) => {
                    field.onChange(value?.length ? value : []);
                    setTimeout(() => {
                      form.trigger("logo");
                    }, 0);
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="space-y-4">
          <FormLabel>{t("cms.itInfrastructure.policyControl.form.cards")}</FormLabel>
          {cardsError && (
            <p className="text-[0.8rem] font-medium text-destructive">
              {String(cardsError)}
            </p>
          )}
          {fields.map((field, index) => (
            <div
              key={field.id}
              className="grid grid-cols-1 gap-2 border p-3 rounded-md"
            >
              <I18nTabs value={currentLanguage} onValueChange={setCurrentLanguage} className="w-full">
                <I18nFormProvider currentLanguage={currentLanguage}>
                  <I18nTabContent className="space-y-4" language="en">
                    <I18nFormTextareaField name={`cards.${index}.text`} control={form.control} label={t("common.text")} placeholder={t("common.text")} required />
                    <I18nFormTextareaField name={`cards.${index}.sub_text`} control={form.control} label={t("common.subText")} placeholder={t("common.subText")} required />
                  </I18nTabContent>
                  <I18nTabContent className="space-y-4" language="ar">
                    <I18nFormTextareaField name={`cards.${index}.text`} control={form.control} label={t("common.text")} placeholder={t("common.text")} required />
                    <I18nFormTextareaField name={`cards.${index}.sub_text`} control={form.control} label={t("common.subText")} placeholder={t("common.subText")} required />
                  </I18nTabContent>
                </I18nFormProvider>
              </I18nTabs>

              <FormLabel>{t("cms.itInfrastructure.policyControl.form.icon")}</FormLabel>
              <FormField
                control={form.control}
                name={`cards.${index}.icon` as any}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <DocumentUploader
                        value={(field.value as any) || []}
                        maxDocuments={1}
                        maxSize={50 * 1024 * 1024}
                        acceptedFileTypes={["image/*"]}
                        onChange={(value) => {
                          field.onChange(value);
                          setTimeout(() => {
                            form.trigger(`cards.${index}.icon`);
                          }, 0);
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex justify-end gap-2">
                <Button
                  type="button"
                  variant="destructive"
                  onClick={() => {
                    remove(index);
                    form.trigger("cards");
                  }}
                >
                  {t("common.remove")}
                </Button>
              </div>
            </div>
          ))}
          <Button
            type="button"
            variant="secondary"
            disabled={fields.length >= 6}
            onClick={() => {
              append({ text: { en: "", ar: "" }, sub_text: { en: "", ar: "" }, icon: [] } as any);
              form.trigger("cards");
            }}
          >
            {t("common.add")}
          </Button>
        </div>

        <div className="flex justify-end w-full gap-2">
          <Button type="submit" loading={createMutation.isPending || updateMutation.isPending}>{existing ? t("common.update") : t("common.create")}</Button>
        </div>
      </form>
    </Form>
  );
}


