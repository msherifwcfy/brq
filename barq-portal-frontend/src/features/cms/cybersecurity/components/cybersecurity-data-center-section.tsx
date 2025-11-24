import { useEffect, useState } from "react";
import { Button } from "@/shared/components/ui/button";
import { useLang } from "@/shared/hooks/use-lang";
import { type LanguageCode } from "@/shared/constants";
import {
  useCybersecurityDataCenterControllerReadQuery,
  useCybersecurityDataCenterControllerCreate,
  useCybersecurityDataCenterControllerUpdate,
} from "@/sdk/modules/cybersecuritydatacenter.gen";
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
  I18nFormTextareaField,
  I18nFormTextField,
  I18nTabs,
  I18nTabContent,
  I18nFormProvider,
} from "@/shared/components/custom/i18n";
import { DocumentUploader } from "@/shared/components/custom/DocumentUploader";
import { toast } from "sonner";
import {
  createCybersecurityDataCenterSchema,
  type CreateCybersecurityDataCenterFormData,
} from "../schemas/cybersecurity-data-center.schema";
import { Input } from "@/shared/components/ui/input";

type FormData = CreateCybersecurityDataCenterFormData;

export default function CybersecurityDataCenterSection() {
  const { lang, t } = useLang();
  const [currentLanguage, setCurrentLanguage] = useState<LanguageCode>("en");

  const { data } = useCybersecurityDataCenterControllerReadQuery({
    query: {
      query: {
        relations: {
          logo: true,
          cybersecurity_data_center_id_cybersecurity_data_center_translations:
            true,
          cybersecurity_data_center_cards_id_cybersecurity_data_center_cards: {
            icon: true,
            cybersecurity_data_center_cards_id_cybersecurity_data_center_cards_translations:
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

  const createMutation = useCybersecurityDataCenterControllerCreate();
  const updateMutation = useCybersecurityDataCenterControllerUpdate();

  const existing = data?.data?.[0];

  const form = useForm<FormData>({
    resolver: zodResolver(createCybersecurityDataCenterSchema),
    defaultValues: {
      text: { en: "", ar: "" },
      logo: [],
      cards: [],
    },
  });

  useEffect(() => {
    if (!existing) return;

    const enTranslation =
      existing?.cybersecurity_data_center_id_cybersecurity_data_center_translations?.find(
        (t) => t.language === "en"
      );
    const arTranslation =
      existing?.cybersecurity_data_center_id_cybersecurity_data_center_translations?.find(
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
        existing?.cybersecurity_data_center_cards_id_cybersecurity_data_center_cards?.map(
          (card) => {
            const cardEnTranslation =
              card.cybersecurity_data_center_cards_id_cybersecurity_data_center_cards_translations?.find(
                (t) => t.language === "en"
              );
            const cardArTranslation =
              card.cybersecurity_data_center_cards_id_cybersecurity_data_center_cards_translations?.find(
                (t) => t.language === "ar"
              );

            return {
              title: {
                en: cardEnTranslation?.title || "",
                ar: card.title || cardArTranslation?.title || "",
              },
              icon: card.icon ? [card.icon] : [],
            };
          }
        ) || [],
    });
  }, [existing, form]);

  const onSubmit = async (values: FormData) => {
    try {
      const logoId = values.logo?.[0]?.id;

      const cards = values.cards
        .filter((card) => card.icon?.[0]?.id)
        .map((card) => ({
          icon_id: card.icon![0].id,
          title: card.title.ar,
          cybersecurity_data_center_cards_id_cybersecurity_data_center_cards_translations:
            [{ language: "en" as const, title: card.title.en }],
        }));

      if (existing) {
        await updateMutation.mutateAsync({
          path: { id: String(existing.id) },
          body: {
            text: values.text.ar,
            logo_id: logoId,
            cybersecurity_data_center_cards_id_cybersecurity_data_center_cards:
              cards,
            cybersecurity_data_center_id_cybersecurity_data_center_translations:
              [
                {
                  language: "en",
                  text: values.text.en,
                },
              ],
          },
        });
        toast.success(t("cms.cybersecurity.dataCenter.messages.updated"));
      } else {
        await createMutation.mutateAsync({
          body: {
            text: values.text.ar,
            logo_id: logoId,
            cybersecurity_data_center_cards_id_cybersecurity_data_center_cards:
              cards,
            cybersecurity_data_center_id_cybersecurity_data_center_translations:
              [
                {
                  language: "en",
                  text: values.text.en,
                },
              ],
          },
        } as any);
        toast.success(t("cms.cybersecurity.dataCenter.messages.created"));
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

          <div className="space-y-4">
            <FormField
              control={form.control}
              name="cards"
              render={() => {
                const error = form.formState.errors.cards;
                const errorMessage = error?.message || (error as any)?._root?.message || (error as any)?.root?.message;
                return (
                  <FormItem>
                    <FormLabel>
                      {t("cms.cybersecurity.dataCenter.cards.title")}
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
            {form.watch("cards")?.map((card, idx) => (
              <div
                key={idx}
                className="grid grid-cols-1 gap-3 border p-4 rounded-md"
              >
                <I18nFormProvider currentLanguage={currentLanguage}>
                  <I18nTabs
                    value={currentLanguage}
                    onValueChange={setCurrentLanguage}
                    className="w-full"
                  >
                    <I18nTabContent language="en">
                      <I18nFormTextField
                        name={`cards.${idx}.title`}
                        control={form.control}
                        label={t("common.title")}
                        placeholder={t("common.title")}
                        required
                      />
                    </I18nTabContent>
                    <I18nTabContent language="ar">
                      <I18nFormTextField
                        name={`cards.${idx}.title`}
                        control={form.control}
                        label={t("common.title")}
                        placeholder={t("common.title")}
                        required
                      />
                    </I18nTabContent>
                  </I18nTabs>
                </I18nFormProvider>

                <FormField
                  control={form.control}
                  name={`cards.${idx}.icon` as any}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t("common.icon")}</FormLabel>
                      <FormControl>
                        <DocumentUploader
                          value={field.value || []}
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
                    onClick={() => {
                      const currentCards = form.watch("cards");
                      form.setValue(
                        "cards",
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
                form.setValue("cards", [
                  ...form.watch("cards"),
                  {
                    title: { en: "", ar: "" },
                    icon: [],
                    row_number: 0,
                    position: 0,
                  },
                ])
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
