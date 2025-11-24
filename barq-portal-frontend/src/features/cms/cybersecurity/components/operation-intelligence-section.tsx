import { useEffect, useState } from "react";
import { Button } from "@/shared/components/ui/button";
import { useLang } from "@/shared/hooks/use-lang";
import { type LanguageCode } from "@/shared/constants";
import {
  useOperationIntelligenceControllerReadQuery,
  useOperationIntelligenceControllerCreate,
  useOperationIntelligenceControllerUpdate,
} from "@/sdk/modules/operationintelligence.gen";
import { useForm } from "react-hook-form";
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
  I18nFormTextField,
  I18nFormTextareaField,
  I18nTabs,
  I18nTabContent,
  I18nFormProvider,
} from "@/shared/components/custom/i18n";
import { DocumentUploader } from "@/shared/components/custom/DocumentUploader";
import { toast } from "sonner";
import {
  createOperationIntelligenceSchema,
  type CreateOperationIntelligenceFormData,
} from "../schemas/operation-intelligence.schema";

type FormData = CreateOperationIntelligenceFormData;

export default function OperationIntelligenceSection() {
  const { lang, t } = useLang();
  const [currentLanguage, setCurrentLanguage] = useState<LanguageCode>("en");

  const { data } = useOperationIntelligenceControllerReadQuery({
    query: {
      query: {
        relations: {
          logo: true,
          operation_intelligence_id_operation_intelligence_translations: true,
          operation_intelligence_cards_id_operation_intelligence_cards: {
            icon: true,
            operation_intelligence_cards_id_operation_intelligence_cards_translations:
              true,
          },
        },
        pagination: { skip: 0, take: 1 },
      },
    },
    headers: {
      "x-skip-translations": "true",
    },
  });

  const createMutation = useOperationIntelligenceControllerCreate();
  const updateMutation = useOperationIntelligenceControllerUpdate();

  const existing = data?.data?.[0];

  const form = useForm<FormData>({
    resolver: zodResolver(createOperationIntelligenceSchema),
    defaultValues: {
      text: { en: "", ar: "" },
      logo: [],
      cards: [],
    },
  });

  useEffect(() => {
    if (!existing) return;

    const enTranslation =
      existing?.operation_intelligence_id_operation_intelligence_translations?.find(
        (t) => t.language === "en"
      );
    const arTranslation =
      existing?.operation_intelligence_id_operation_intelligence_translations?.find(
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
        existing?.operation_intelligence_cards_id_operation_intelligence_cards?.map(
          (card) => {
            const enCardTranslation =
              card.operation_intelligence_cards_id_operation_intelligence_cards_translations?.find(
                (t) => t.language === "en"
              );
            const arCardTranslation =
              card.operation_intelligence_cards_id_operation_intelligence_cards_translations?.find(
                (t) => t.language === "ar"
              );

            return {
              text: {
                en: enCardTranslation?.title || "",
                ar: card.title || arCardTranslation?.title || "",
              },
              icon: card.icon
                ? [
                    {
                      id: card.icon.id,
                      url: card.icon.url,
                      key: card.icon.key || "",
                      format: card.icon.format,
                      mime_type: card.icon.mime_type,
                      size: card.icon.size,
                    },
                  ]
                : undefined,
            };
          }
        ) || [],
    });
  }, [existing, form]);

  const onSubmit = async (values: FormData) => {
    try {
      const logoId = values.logo?.[0]?.id;

      const cards = (values.cards || []).map((card) => ({
        icon_id: card.icon?.[0]?.id,
        title: card.text.ar,
        operation_intelligence_cards_id_operation_intelligence_cards_translations:
          [{ language: "en" as const, title: card.text.en }],
      }));

      if (existing) {
        await updateMutation.mutateAsync({
          path: { id: String(existing.id) },
          body: {
            text: values.text.ar,
            logo_id: logoId,
            operation_intelligence_cards_id_operation_intelligence_cards: cards,
            operation_intelligence_id_operation_intelligence_translations: [
              {
                language: "en",
                text: values.text.en,
              },
            ],
          } as any,
        });
        toast.success(
          t("cms.cybersecurity.operationIntelligence.messages.updated")
        );
      } else {
        await createMutation.mutateAsync({
          body: {
            text: values.text.ar,
            logo_id: logoId,
            operation_intelligence_cards_id_operation_intelligence_cards: cards,
            operation_intelligence_id_operation_intelligence_translations: [
              {
                language: "en",
                text: values.text.en,
              },
            ],
          },
        } as any);
        toast.success(
          t("cms.cybersecurity.operationIntelligence.messages.created")
        );
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
            name={"logo" as any}
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

          <FormField
            control={form.control}
            name="cards"
            render={({ field }) => {
              const error = form.formState.errors.cards;
              const errorMessage = error?.message || (error as any)?._root?.message || (error as any)?.root?.message;
              return (
                <FormItem>
                  <FormLabel>
                    {t("cms.cybersecurity.operationIntelligence.cards")}
                  </FormLabel>
                  <FormControl>
                    <div className="space-y-4">
                      {field.value?.map((card, idx) => (
                      <div
                        key={idx}
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
                                  value={field.value as any}
                                  onChange={field.onChange}
                                  multiple={false}
                                  maxDocuments={1}
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
                              const currentCards = field.value || [];
                              field.onChange(
                                currentCards.filter((_, i) => i !== idx)
                              );
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
                      onClick={() =>
                        field.onChange([
                          ...(field.value || []),
                          { text: { en: "", ar: "" }, icon: [] },
                        ])
                      }
                    >
                      {t("common.add")}
                    </Button>
                    </div>
                  </FormControl>
                  {errorMessage && (
                    <p className="text-sm font-medium text-destructive">
                      {errorMessage}
                    </p>
                  )}
                </FormItem>
              );
            }}
          />

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
