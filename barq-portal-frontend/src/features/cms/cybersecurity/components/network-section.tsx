import { useEffect, useState } from "react";
import { Button } from "@/shared/components/ui/button";
import { useLang } from "@/shared/hooks/use-lang";
import { type LanguageCode } from "@/shared/constants";
import {
  useNetworkSectionControllerReadQuery,
  useNetworkSectionControllerCreate,
  useNetworkSectionControllerUpdate,
} from "@/sdk/modules/networksection.gen";
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
  I18nFormTextField,
  I18nTabs,
  I18nTabContent,
  I18nFormProvider,
} from "@/shared/components/custom/i18n";
import { DocumentUploader } from "@/shared/components/custom/DocumentUploader";
import { toast } from "sonner";
import {
  createNetworkSectionSchema,
  type CreateNetworkSectionFormData,
} from "../schemas/network-section.schema";

type FormData = CreateNetworkSectionFormData;

export default function NetworkSection() {
  const { lang, t } = useLang();
  const [currentLanguage, setCurrentLanguage] = useState<LanguageCode>("en");

  const { data } = useNetworkSectionControllerReadQuery({
    query: {
      query: {
        relations: {
          logo: true,
          network_section_id_network_section_translations: true,
          network_section_cards_id_network_section_cards: {
            icon: true,
            network_section_cards_id_network_section_cards_translations: true,
          },
        },
        pagination: { skip: 0, take: 1 },
      },
    },
    headers: {
      "x-skip-translations": "true",
    },
  });

  const createMutation = useNetworkSectionControllerCreate();
  const updateMutation = useNetworkSectionControllerUpdate();

  const existing = data?.data?.[0];

  const form = useForm<FormData>({
    resolver: zodResolver(createNetworkSectionSchema),
    defaultValues: {
      text: { en: "", ar: "" },
      logo: [],
      cards: [],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "cards",
  });

  useEffect(() => {
    if (!existing) return;

    const enTranslation =
      existing?.network_section_id_network_section_translations?.find(
        (t) => t.language === "en"
      );
    const arTranslation =
      existing?.network_section_id_network_section_translations?.find(
        (t) => t.language === "ar"
      );

    form.reset({
      text: {
        en: enTranslation?.text || "",
        ar: existing?.text || arTranslation?.text || "",
      },
      logo: existing.logo?.id
        ? [
            {
              id: existing.logo.id,
              url: existing.logo.url,
              key: existing.logo.key,
              format: existing.logo.format,
              mime_type: existing.logo.mime_type,
              size: existing.logo.size,
            },
          ]
        : [],
      cards:
        existing?.network_section_cards_id_network_section_cards?.map(
          (card) => {
            const enCardTranslation =
              card.network_section_cards_id_network_section_cards_translations?.find(
                (t) => t.language === "en"
              );
            const arCardTranslation =
              card.network_section_cards_id_network_section_cards_translations?.find(
                (t) => t.language === "ar"
              );

            return {
              text: {
                en: enCardTranslation?.text || "",
                ar: card.text || arCardTranslation?.text || "",
              },
              icon: card.icon
                ? [
                    {
                      id: card.icon.id,
                      url: card.icon.url,
                      key: card.icon.key ?? "",
                      format: card.icon.format ?? "",
                      mime_type: card.icon.mime_type ?? "",
                      size: card.icon.size ?? 0,
                    },
                  ]
                : [],
            };
          }
        ) || [],
    });
  }, [existing, form]);

  const onSubmit = async (values: FormData) => {
    try {
      const logoId = values.logo?.[0]?.id;

      const cards = values.cards.map((card) => ({
        text: card.text.ar,
        icon_id: card.icon[0].id,
        network_section_cards_id_network_section_cards_translations: [
          {
            language: "en" as const,
            text: card.text.en,
          },
        ],
      }));

      if (existing) {
        await updateMutation.mutateAsync({
          path: { id: String(existing.id) },
          body: {
            text: values.text.ar,
            logo_id: logoId,
            network_section_cards_id_network_section_cards: cards,
            network_section_id_network_section_translations: [
              {
                language: "en",
                text: values.text.en,
              },
            ],
          },
        });
        toast.success(t("cms.cybersecurity.networkSection.messages.updated"));
      } else {
        await createMutation.mutateAsync({
          body: {
            text: values.text.ar,
            logo_id: logoId,
            network_section_cards_id_network_section_cards: cards,
            network_section_id_network_section_translations: [
              {
                language: "en",
                text: values.text.en,
              },
            ],
          },
        } as any);
        toast.success(t("cms.cybersecurity.networkSection.messages.created"));
      }
    } catch (error: any) {
      toast.error(error?.message || "Error");
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <I18nFormProvider currentLanguage={currentLanguage}>
          <I18nTabs
            value={currentLanguage}
            onValueChange={setCurrentLanguage}
            className="w-full"
          >
            <I18nTabContent language="en">
              <div className="grid gap-4">
                <I18nFormTextareaField
                  name="text"
                  control={form.control}
                  label={t("common.text")}
                  placeholder={t("common.text")}
                  required
                />
              </div>
            </I18nTabContent>
            <I18nTabContent language="ar">
              <div className="grid gap-4">
                <I18nFormTextareaField
                  name="text"
                  control={form.control}
                  label={t("common.text")}
                  placeholder={t("common.text")}
                  required
                />
              </div>
            </I18nTabContent>
          </I18nTabs>

          <FormField
            control={form.control}
            name="logo"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("common.logo")}</FormLabel>
                <FormControl>
                  <DocumentUploader
                    value={(field.value as any) || []}
                    maxDocuments={1}
                    maxSize={10 * 1024 * 1024}
                    acceptedFileTypes={["image/*"]}
                    onChange={field.onChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="space-y-4">
            <FormField
              control={form.control}
              name="cards"
              render={({ field }) => {
                const error = form.formState.errors.cards;
                const errorMessage = error?.message || (error as any)?._root?.message || (error as any)?.root?.message;
                return (
                  <FormItem>
                    <FormLabel>
                      {t("cms.cybersecurity.networkSection.cards.title")}
                    </FormLabel>
                    {errorMessage && (
                      <p className="text-sm font-medium text-destructive">
                        {errorMessage}
                      </p>
                    )}
                  </FormItem>
                );
              }}
            />
            {fields.map((field, idx) => (
              <div
                key={field.id}
                className="grid grid-cols-1 gap-2 border p-3 rounded-md"
              >
                <I18nFormProvider currentLanguage={currentLanguage}>
                  <I18nTabs
                    value={currentLanguage}
                    onValueChange={setCurrentLanguage}
                    className="w-full"
                  >
                <I18nTabContent language="en">
                  <I18nFormTextField
                    name={`cards.${idx}.text`}
                    control={form.control}
                    label={t("common.text")}
                    placeholder={t("common.text")}
                    required
                  />
                </I18nTabContent>
                <I18nTabContent language="ar">
                  <I18nFormTextField
                    name={`cards.${idx}.text`}
                    control={form.control}
                    label={t("common.text")}
                    placeholder={t("common.text")}
                    required
                  />
                </I18nTabContent>
                </I18nTabs>
                </I18nFormProvider>

                <FormField
                  control={form.control}
                  name={`cards.${idx}.icon`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t("common.icon")}</FormLabel>
                      <FormControl>
                        <DocumentUploader
                          value={(field.value as any) || []}
                          onChange={field.onChange}
                          multiple={false}
                          maxDocuments={1}
                          acceptedFileTypes={["image/*"]}
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
                    onClick={() => remove(idx)}
                  >
                    {t("common.remove")}
                  </Button>
                </div>
              </div>
            ))}
            <Button
              type="button"
              variant="secondary"
              onClick={() =>
                append({
                  text: { en: "", ar: "" },
                  icon: [],
                })
              }
            >
              {t("common.add")}
            </Button>
          </div>

          <div className="flex justify-end gap-2">
            <Button
              type="submit"
              loading={createMutation.isPending || updateMutation.isPending}
            >
              {existing ? t("common.update") : t("common.create")}
            </Button>
          </div>
        </I18nFormProvider>
      </form>
    </Form>
  );
}
