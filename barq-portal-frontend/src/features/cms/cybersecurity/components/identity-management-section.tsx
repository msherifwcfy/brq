import { useEffect, useState } from "react";
import { Button } from "@/shared/components/ui/button";
import { useLang } from "@/shared/hooks/use-lang";
import { type LanguageCode } from "@/shared/constants";
import {
  useIdentityManagementControllerReadQuery,
  useIdentityManagementControllerCreate,
  useIdentityManagementControllerUpdate,
} from "@/sdk/modules/identitymanagement.gen";
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
  createIdentityManagementSchema,
  type CreateIdentityManagementFormData,
} from "../schemas/identity-management.schema";

type FormData = CreateIdentityManagementFormData;

export default function IdentityManagementSection() {
  const { lang, t } = useLang();
  const [currentLanguage, setCurrentLanguage] = useState<LanguageCode>("en");

  const { data } = useIdentityManagementControllerReadQuery({
    query: {
      query: {
        relations: {
          logo: true,
          identity_management_id_identity_management_translations: true,
          identity_management_cards_id_identity_management_cards: {
            icon: true,
            identity_management_cards_id_identity_management_cards_translations:
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

  const createMutation = useIdentityManagementControllerCreate();
  const updateMutation = useIdentityManagementControllerUpdate();

  const existing = data?.data?.[0];

  const form = useForm<FormData>({
    resolver: zodResolver(createIdentityManagementSchema),
    defaultValues: {
      text: { en: "", ar: "" },
      logo: [],
      cards: [],
    },
  });

  useEffect(() => {
    if (!existing) return;

    const enTranslation =
      existing?.identity_management_id_identity_management_translations?.find(
        (t) => t.language === "en"
      );
    const arTranslation =
      existing?.identity_management_id_identity_management_translations?.find(
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
        existing?.identity_management_cards_id_identity_management_cards?.map(
          (card) => {
            const enCardTranslation =
              card.identity_management_cards_id_identity_management_cards_translations?.find(
                (t) => t.language === "en"
              );
            const arCardTranslation =
              card.identity_management_cards_id_identity_management_cards_translations?.find(
                (t) => t.language === "ar"
              );

            return {
              title: {
                en: enCardTranslation?.title || "",
                ar: card.title || arCardTranslation?.title || "",
              },
              description: {
                en: enCardTranslation?.description || "",
                ar: card.description || arCardTranslation?.description || "",
              },
              icon: card.icon ? [card.icon] : undefined,
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
          description: card.description.ar,
          identity_management_cards_id_identity_management_cards_translations: [
            {
              language: "en" as const,
              title: card.title.en,
              description: card.description.en,
            },
          ],
        }));

      if (existing) {
        await updateMutation.mutateAsync({
          path: { id: String(existing.id) },
          body: {
            text: values.text.ar,
            logo_id: logoId,
            identity_management_cards_id_identity_management_cards: cards,
            identity_management_id_identity_management_translations: [
              {
                language: "en",
                text: values.text.en,
              },
            ],
          },
        });
        toast.success(
          t("cms.cybersecurity.identityManagement.messages.updated")
        );
      } else {
        await createMutation.mutateAsync({
          body: {
            text: values.text.ar,
            logo_id: logoId,
            identity_management_cards_id_identity_management_cards: cards,
            identity_management_id_identity_management_translations: [
              {
                language: "en",
                text: values.text.en,
              },
            ],
          },
        } as any);
        toast.success(
          t("cms.cybersecurity.identityManagement.messages.created")
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

          <div className="space-y-4">
            <FormLabel>
              {t("cms.cybersecurity.identityManagement.cards.title")}
            </FormLabel>
            {form.watch("cards")?.map((card, idx) => (
              <div
                key={idx}
                className="grid grid-cols-1 gap-4 border p-4 rounded-md"
              >
                <I18nFormTextField
                  name={`cards.${idx}.title`}
                  control={form.control}
                  label={t("common.title")}
                  placeholder={t("common.title")}
                  required
                />
                <I18nFormTextareaField
                  name={`cards.${idx}.description`}
                  control={form.control}
                  label={t("common.description")}
                  placeholder={t("common.description")}
                  required
                />
                <div>
                  <FormLabel>{t("common.icon")}</FormLabel>
                  <DocumentUploader
                    value={card.icon || []}
                    onChange={(val) => {
                      form.setValue(`cards.${idx}.icon`, val);
                    }}
                    multiple={false}
                    maxDocuments={1}
                    acceptedFileTypes={["image/*"]}
                  />
                </div>
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
                    description: { en: "", ar: "" },
                    icon: undefined,
                  },
                ])
              }
            >
              {t("common.add")}
            </Button>
          </div>

          <div className="flex gap-2">
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
