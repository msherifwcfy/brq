import { useEffect, useState } from "react";
import { Button } from "@/shared/components/ui/button";
import { useLang } from "@/shared/hooks/use-lang";
import { type LanguageCode } from "@/shared/constants";
import {
  useSoftwareDefinedNetworkControllerReadQuery,
  useSoftwareDefinedNetworkControllerCreate,
  useSoftwareDefinedNetworkControllerUpdate,
} from "@/sdk/modules/softwaredefinednetwork.gen";
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
  createSoftwareDefinedNetworkSchema,
  type CreateSoftwareDefinedNetworkFormData,
} from "../schemas/software-defined-network.schema";

type FormData = CreateSoftwareDefinedNetworkFormData;

export default function SoftwareDefinedNetworkSection() {
  const { lang, t } = useLang();
  const [currentLanguage, setCurrentLanguage] = useState<LanguageCode>("en");

  const { data } = useSoftwareDefinedNetworkControllerReadQuery({
    query: {
      query: {
        relations: {
          image: true,
          software_defined_network_cards_id_software_defined_network_cards: {
            icon: true,
            software_defined_network_cards_id_software_defined_network_cards_translations:
              true,
          },
          logo: true,
          software_defined_network_id_software_defined_network_translations:
            true,
        },
        pagination: { skip: 0, take: 1 },
      },
    },
    headers: {
      "x-skip-translations": "true",
    },
  });

  const createMutation = useSoftwareDefinedNetworkControllerCreate();
  const updateMutation = useSoftwareDefinedNetworkControllerUpdate();

  const existing = data?.data?.[0];

  const form = useForm<FormData>({
    resolver: zodResolver(createSoftwareDefinedNetworkSchema),
    defaultValues: {
      text: { en: "", ar: "" },
      logo: [],
      image: [],
      cards: [],
    },
    mode: "onChange",
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "cards",
  });

  useEffect(() => {
    if (!existing) return;

    const enTranslation =
      existing?.software_defined_network_id_software_defined_network_translations?.find(
        (t) => t.language === "en"
      );
    const arTranslation =
      existing?.software_defined_network_id_software_defined_network_translations?.find(
        (t) => t.language === "ar"
      );

    const existingCards =
      existing?.software_defined_network_cards_id_software_defined_network_cards?.map(
        (card) => {
          const cardEnTranslation =
            card.software_defined_network_cards_id_software_defined_network_cards_translations?.find(
              (t) => t.language === "en"
            );
          const cardArTranslation =
            card.software_defined_network_cards_id_software_defined_network_cards_translations?.find(
              (t) => t.language === "ar"
            );

          return {
            id: card.id,
            text: {
              en: cardEnTranslation?.text || "",
              ar: card.text || cardArTranslation?.text || "",
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
        }
      ) || [];

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
      image: existing.image?.id
        ? [
            {
              id: existing.image.id,
              url: existing.image.url,
              key: existing.image.key,
              format: existing.image.format,
              mime_type: existing.image.mime_type,
              size: existing.image.size,
            },
          ]
        : [],
      cards: existingCards,
    });
  }, [existing, form]);

  const onSubmit = async (values: FormData) => {
    try {
      const logoId = values.logo?.[0]?.id;
      const imageId = values.image?.[0]?.id;

      const cards = (values.cards || [])
        .filter((card) => card.icon?.[0]?.id !== undefined)
        .map((card) => ({
          ...(card.id ? { id: card.id } : {}),
          text: card.text.ar,
          icon_id: card.icon[0].id as number,
          software_defined_network_cards_id_software_defined_network_cards_translations:
            [
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
            image_id: imageId,
            software_defined_network_id_software_defined_network_translations: [
              {
                language: "en",
                text: values.text.en,
              },
            ],
            software_defined_network_cards_id_software_defined_network_cards:
              cards,
          },
        });
        toast.success(
          t("cms.itInfrastructure.softwareDefinedNetwork.messages.updated")
        );
      } else {
        await createMutation.mutateAsync({
          body: {
            text: values.text.ar,
            logo_id: logoId,
            image_id: imageId,
            software_defined_network_id_software_defined_network_translations: [
              {
                language: "en",
                text: values.text.en,
              },
            ],
            software_defined_network_cards_id_software_defined_network_cards:
              cards,
          },
        } as any);
        toast.success(
          t("cms.itInfrastructure.softwareDefinedNetwork.messages.created")
        );
      }
    } catch (error: any) {
      toast.error(error?.message || "Error");
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
                {t("cms.itInfrastructure.softwareDefinedNetwork.form.logo")}
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

        <FormField
          control={form.control}
          name={"image" as any}
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                {t("cms.itInfrastructure.softwareDefinedNetwork.form.image")}
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
            {t("cms.itInfrastructure.softwareDefinedNetwork.form.cards")}
          </FormLabel>
          

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
                    <I18nFormTextareaField
                      name={`cards.${index}.text`}
                      control={form.control}
                      label={t("common.text")}
                      placeholder={t("common.text")}
                      required
                    />
                  </I18nTabContent>
                  <I18nTabContent language="ar">
                    <I18nFormTextareaField
                      name={`cards.${index}.text`}
                      control={form.control}
                      label={t("common.text")}
                      placeholder={t("common.text")}
                      required
                    />
                  </I18nTabContent>
                </I18nFormProvider>
              </I18nTabs>

              <FormLabel>
                {t(
                  "cms.itInfrastructure.softwareDefinedNetwork.form.icon"
                )}
              </FormLabel>
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
                          form.trigger(`cards.${index}.icon`);
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
                  onClick={async () => {
                    remove(index);
                    await form.trigger("cards");
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
            onClick={async () => {
              append({
                text: { en: "", ar: "" },
                icon: [],
              });
              await form.trigger("cards");
            }}
          >
            {t("common.add")}
          </Button>
        </div>
{(form.formState.errors.cards?.root?.message ||
            form.formState.errors.cards?.message) && (
            <p className="text-[0.8rem] font-medium text-destructive">
              {form.formState.errors.cards?.root?.message ||
                form.formState.errors.cards?.message}
            </p>
          )}

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
