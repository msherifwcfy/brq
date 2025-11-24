import { useEffect, useState } from "react";
import { Button } from "@/shared/components/ui/button";
import { useLang } from "@/shared/hooks/use-lang";
import { type LanguageCode } from "@/shared/constants";
import {
  useMobilityControllerReadQuery,
  useMobilityControllerCreate,
  useMobilityControllerUpdate,
} from "@/sdk/modules/mobility.gen";
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
  I18nFormTextField,
  I18nFormTextareaField,
  I18nTabs,
  I18nTabContent,
  I18nFormProvider,
} from "@/shared/components/custom/i18n";
import { DocumentUploader } from "@/shared/components/custom/DocumentUploader";
import { toast } from "sonner";
import {
  createMobilitySchema,
  type CreateMobilityFormData,
} from "../schemas/mobility.schema";

type FormData = CreateMobilityFormData;

export default function MobilitySection() {
  const { lang, t } = useLang();
  const [currentLanguage, setCurrentLanguage] = useState<LanguageCode>("en");

  const { data } = useMobilityControllerReadQuery({
    query: {
      query: {
        relations: {
          logo: true,
          mobility_id_mobility_translations: true,
          mobility_cards_id_mobility_cards: {
            icon: true,
            mobility_cards_id_mobility_cards_translations: true,
          },
        },
        pagination: { skip: 0, take: 1 },
      },
    },
    headers: {
      "x-skip-translations": "true",
    },
  });

  const createMutation = useMobilityControllerCreate();
  const updateMutation = useMobilityControllerUpdate();

  const existing = data?.data?.[0];

  const form = useForm<FormData>({
    resolver: zodResolver(createMobilitySchema),
    defaultValues: {
      text: { en: "", ar: "" },
      logo: [],
      mobility_cards: [],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "mobility_cards",
  });

  useEffect(() => {
    if (!existing) return;

    const enTranslation = existing?.mobility_id_mobility_translations?.find(
      (t) => t.language === "en"
    );
    const arTranslation = existing?.mobility_id_mobility_translations?.find(
      (t) => t.language === "ar"
    );

    const mobilityCards =
      existing?.mobility_cards_id_mobility_cards?.map((card) => {
        const enCardTranslation =
          card.mobility_cards_id_mobility_cards_translations?.find(
            (t) => t.language === "en"
          );
        const arCardTranslation =
          card.mobility_cards_id_mobility_cards_translations?.find(
            (t) => t.language === "ar"
          );

        return {
          id: card.id,
          title: {
            en: enCardTranslation?.title || "",
            ar: card.title || arCardTranslation?.title || "",
          },
          sub_title: {
            en: enCardTranslation?.sub_title || "",
            ar: card.sub_title || arCardTranslation?.sub_title || "",
          },
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
      mobility_cards: mobilityCards,
    });
  }, [existing, form]);

  const onSubmit = async (values: FormData) => {
    try {
      const logoId = values.logo?.[0]?.id;

      const mobilityCards = values.mobility_cards?.map((card) => ({
        ...(card.id ? { id: card.id } : {}),
        title: card.title.ar,
        sub_title: card.sub_title.ar,
        icon_id: card.icon?.[0]?.id || 0,
        mobility_cards_id_mobility_cards_translations: [
          {
            language: "en",
            title: card.title.en,
            sub_title: card.sub_title.en,
          },
        ],
      }));

      if (existing) {
        await updateMutation.mutateAsync({
          path: { id: String(existing.id) },
          body: {
            text: values.text.ar,
            logo_id: logoId,
            mobility_id_mobility_translations: [
              {
                language: "en",
                text: values.text.en,
              },
            ],
            mobility_cards_id_mobility_cards: mobilityCards as any,
          },
        });
        toast.success(t("cms.itInfrastructure.mobility.messages.updated"));
      } else {
        await createMutation.mutateAsync({
          body: {
            text: values.text.ar,
            logo_id: logoId,
            mobility_id_mobility_translations: [
              {
                language: "en",
                text: values.text.en,
              },
            ],
            mobility_cards_id_mobility_cards: mobilityCards,
          },
        } as any);
        toast.success(t("cms.itInfrastructure.mobility.messages.created"));
      }
    } catch (error: any) {
      toast.error(error?.message || "Error");
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <I18nTabs
          value={currentLanguage}
          onValueChange={setCurrentLanguage}
          className="w-full"
        >
          <I18nFormProvider currentLanguage={currentLanguage}>
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
          </I18nFormProvider>
        </I18nTabs>

        <FormField
          control={form.control}
          name={"logo" as any}
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                {t("cms.itInfrastructure.mobility.form.logo")}
              </FormLabel>
              <FormControl>
                <DocumentUploader
                  value={(field.value as any) || []}
                  maxDocuments={1}
                  maxSize={50 * 1024 * 1024}
                  acceptedFileTypes={["image/*", "video/*"]}
                  onChange={field.onChange}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="space-y-4">
          <FormLabel>
            {t("cms.itInfrastructure.mobility.form.cards")}
          </FormLabel>
          {(form.formState.errors.mobility_cards?.root?.message ||
            form.formState.errors.mobility_cards?.message) && (
            <p className="text-[0.8rem] font-medium text-destructive">
              {form.formState.errors.mobility_cards?.root?.message ||
                form.formState.errors.mobility_cards?.message}
            </p>
          )}

          {fields.map((field, index) => (
            <div
              key={field.id}
              className="grid grid-cols-1 gap-2 border p-3 rounded-md"
            >
              <I18nTabs
                value={currentLanguage}
                onValueChange={setCurrentLanguage}
                className="w-full"
              >
                <I18nFormProvider currentLanguage={currentLanguage}>
                  <I18nTabContent language="en">
                    <div className="grid gap-4">
                      <I18nFormTextField
                        name={`mobility_cards.${index}.title`}
                        control={form.control}
                        label={t("common.title")}
                        placeholder={t("common.title")}
                        required
                      />
                      <I18nFormTextareaField
                        name={`mobility_cards.${index}.sub_title`}
                        control={form.control}
                        label={t("common.subtitle")}
                        placeholder={t("common.subtitle")}
                        required
                      />
                    </div>
                  </I18nTabContent>
                  <I18nTabContent language="ar">
                    <div className="grid gap-4">
                      <I18nFormTextField
                        name={`mobility_cards.${index}.title`}
                        control={form.control}
                        label={t("common.title")}
                        placeholder={t("common.title")}
                        required
                      />
                      <I18nFormTextareaField
                        name={`mobility_cards.${index}.sub_title`}
                        control={form.control}
                        label={t("common.subtitle")}
                        placeholder={t("common.subtitle")}
                        required
                      />
                    </div>
                  </I18nTabContent>
                </I18nFormProvider>
              </I18nTabs>

              <FormLabel>{t("cms.itInfrastructure.mobility.form.icon")}</FormLabel>
              <FormField
                control={form.control}
                name={`mobility_cards.${index}.icon` as any}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <DocumentUploader
                        value={(field.value as any) || []}
                        maxDocuments={1}
                        maxSize={50 * 1024 * 1024}
                        acceptedFileTypes={["image/*"]}
                        onChange={field.onChange}
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
                    form.trigger("mobility_cards");
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
            onClick={() => {
              append({
                title: { en: "", ar: "" },
                sub_title: { en: "", ar: "" },
                icon: [],
              });
              form.trigger("mobility_cards");
            }}
          >
            {t("common.add")}
          </Button>
        </div>

        <div className="flex justify-end w-full gap-2">
          <Button
            type="submit"
            loading={createMutation.isPending || updateMutation.isPending}
          >
            {existing ? t("common.update") : t("common.create")}
          </Button>
        </div>
      </form>
    </Form>
  );
}
