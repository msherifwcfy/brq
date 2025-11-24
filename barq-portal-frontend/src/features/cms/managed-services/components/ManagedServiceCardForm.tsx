import { useEffect, useState, useMemo } from "react";
import { Button } from "@/shared/components/ui/button";
import { useLang } from "@/shared/hooks/use-lang";
import { type LanguageCode } from "@/shared/constants";
import {
  useManagedServiceCardsControllerCreate,
  useManagedServiceCardsControllerUpdate,
  useManagedServiceCardsControllerFindAllQuery,
} from "@/sdk/modules/managedservicecard.gen";
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select";
import {
  I18nFormTextField,
  I18nFormTextareaField,
  I18nTabs,
  I18nTabContent,
  I18nFormProvider,
} from "@/shared/components/custom/i18n";
import { DocumentUploader } from "@/shared/components/custom/DocumentUploader";
import { Input } from "@/shared/components/ui/input";
import { toast } from "sonner";
import {
  createManagedServiceCardsSchema,
  type ManagedServiceCardsFormData,
} from "../schemas/managed-service-cards.schema";
import type { ManagedServiceCardsControllerFindOneResponse } from "@/sdk";

interface ManagedServiceCardFormProps {
  card?: ManagedServiceCardsControllerFindOneResponse['data'] | undefined;
  onClose: () => void;
}

export default function ManagedServiceCardForm({
  card,
  onClose,
}: ManagedServiceCardFormProps) {
  const { t } = useLang();
  const [currentLanguage, setCurrentLanguage] = useState<LanguageCode>("en");

  const createMutation = useManagedServiceCardsControllerCreate();
  const updateMutation = useManagedServiceCardsControllerUpdate();

  const { data: existingCardsData } = useManagedServiceCardsControllerFindAllQuery({
    query: {
      query: {},
    },
    headers: {
      'x-skip-translations': true,
    },
  });

  const usedTypes = useMemo(() => {
    const existingCards = existingCardsData?.data || [];
    return existingCards
      .filter((existingCard) => existingCard.id !== card?.id)
      .map((existingCard) => existingCard.type?.toLowerCase())
      .filter((type): type is string => !!type);
  }, [existingCardsData?.data, card?.id]);

  const availableTypes = useMemo(() => {
    const allTypes = ["soc", "cybersecurity", "grc"];
    const currentCardType = card?.type?.toLowerCase();
    return allTypes.filter(
      (type) => !usedTypes.includes(type) || type === currentCardType
    );
  }, [usedTypes, card?.type]);

  const managedServiceCardsSchema = useMemo(
    () => createManagedServiceCardsSchema(usedTypes),
    [usedTypes]
  );

  const enTranslation = card?.managed_service_cards_id_managed_service_cards_translations?.find(
    (t: any) => t.language === "en"
  );
  const arTranslation = card?.managed_service_cards_id_managed_service_cards_translations?.find(
    (t: any) => t.language === "ar"
  );

  const normalizedType = useMemo(() => {
    if (card?.type && ["soc", "cybersecurity", "grc"].includes(card.type.toLowerCase())) {
      return card.type.toLowerCase();
    }
    return availableTypes[0] || "";
  }, [card?.type, availableTypes]);

  const form = useForm<ManagedServiceCardsFormData>({
    resolver: zodResolver(managedServiceCardsSchema),
    defaultValues: {
      description: {
        en: enTranslation?.description || "",
        ar: card?.description || arTranslation?.description || "",
      },
      bullet_one: {
        en: enTranslation?.bullet_one || "",
        ar: card?.bullet_one || arTranslation?.bullet_one || "",
      },
      bullet_two: {
        en: enTranslation?.bullet_two || "",
        ar: card?.bullet_two || arTranslation?.bullet_two || "",
      },
      type: normalizedType,
      logo: card?.logo?.id
        ? [
          {
            id: card.logo.id,
            url: card.logo.url,
            key: card.logo.key,
            format: card.logo.format,
            mime_type: card.logo.mime_type,
            size: card.logo.size,
          },
        ]
        : [],
      image: card?.image?.id
        ? [
          {
            id: card.image.id,
            url: card.image.url,
            key: card.image.key,
            format: card.image.format,
            mime_type: card.image.mime_type,
            size: card.image.size,
          },
        ]
        : [],
    },
  });

  useEffect(() => {
    if (!card) return;

    const enTranslation =
      card?.managed_service_cards_id_managed_service_cards_translations?.find(
        (t: any) => t.language === "en"
      );
    const arTranslation =
      card?.managed_service_cards_id_managed_service_cards_translations?.find(
        (t: any) => t.language === "ar"
      );

    form.reset({
      description: {
        en: enTranslation?.description || "",
        ar: card?.description || arTranslation?.description || "",
      },
      bullet_one: {
        en: enTranslation?.bullet_one || "",
        ar: card?.bullet_one || arTranslation?.bullet_one || "",
      },
      bullet_two: {
        en: enTranslation?.bullet_two || "",
        ar: card?.bullet_two || arTranslation?.bullet_two || "",
      },
      type: normalizedType,
      logo: card.logo?.id
        ? [
          {
            id: card.logo.id,
            url: card.logo.url,
            key: card.logo.key,
            format: card.logo.format,
            mime_type: card.logo.mime_type,
            size: card.logo.size,
          },
        ]
        : [],
      image: card.image?.id
        ? [
          {
            id: card.image.id,
            url: card.image.url,
            key: card.image.key,
            format: card.image.format,
            mime_type: card.image.mime_type,
            size: card.image.size,
          },
        ]
        : [],
    });
  }, [card, form, normalizedType]);

  const onSubmit = async (values: ManagedServiceCardsFormData) => {
    try {
      const logoId = values.logo?.[0]?.id;
      const imageId = values.image?.[0]?.id;

      if (card) {
        await updateMutation.mutateAsync({
          path: { id: card.id },
          body: {
            description: values.description.ar,
            bullet_one: values.bullet_one.ar,
            bullet_two: values.bullet_two.ar,
            type: values.type as "soc" | "cybersecurity" | "grc",
            logo_id: logoId,
            image_id: imageId,
            managed_service_cards_id_managed_service_cards_translations: [
              {
                id: card.managed_service_cards_id_managed_service_cards_translations?.find(
                  (t: any) => t.language === "en"
                )?.id,
                language: "en",
                description: values.description.en,
                bullet_one: values.bullet_one.en,
                bullet_two: values.bullet_two.en,
              },
            ],
          },
        });
        toast.success(t("cms.managedServices.coreCards.messages.updated"));
      } else {
        await createMutation.mutateAsync({
          body: {
            description: values.description.ar,
            bullet_one: values.bullet_one.ar,
            bullet_two: values.bullet_two.ar,
            type: values.type as "soc" | "cybersecurity" | "grc",
            logo_id: logoId,
            image_id: imageId,
            managed_service_cards_id_managed_service_cards_translations: [
              {
                language: "en",
                description: values.description.en,
                bullet_one: values.bullet_one.en,
                bullet_two: values.bullet_two.en,
              },
            ],
          },
        } as any);
        toast.success(t("cms.managedServices.coreCards.messages.created"));
      }
      onClose();
    } catch (error: any) {
      toast.error(error?.message || t("cms.managedServices.coreCards.messages.error"));
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit, console.log)} className="space-y-4">
        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("cms.managedServices.coreCards.form.serviceType")}</FormLabel>
              {availableTypes.length === 0 ? (
                <div className="text-sm text-muted-foreground">
                  {t("cms.managedServices.coreCards.form.noAvailableTypes") || "All service types are already used"}
                </div>
              ) : (
                <Select
                  key={card?.id || "new"}
                  onValueChange={field.onChange}
                  value={field.value || normalizedType}
                  disabled={availableTypes.length === 0}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder={t("cms.managedServices.coreCards.form.serviceTypePlaceholder")} />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {availableTypes.includes("soc") && (
                      <SelectItem value="soc">{t("cms.managedServices.coreCards.form.serviceTypes.soc")}</SelectItem>
                    )}
                    {availableTypes.includes("cybersecurity") && (
                      <SelectItem value="cybersecurity">{t("cms.managedServices.coreCards.form.serviceTypes.cybersecurity")}</SelectItem>
                    )}
                    {availableTypes.includes("grc") && (
                      <SelectItem value="grc">{t("cms.managedServices.coreCards.form.serviceTypes.grc")}</SelectItem>
                    )}
                  </SelectContent>
                </Select>
              )}
              <FormMessage />
            </FormItem>
          )}
        />

        <I18nTabs
          value={currentLanguage}
          onValueChange={setCurrentLanguage}
          className="w-full"
        >
          <I18nFormProvider currentLanguage={currentLanguage}>
            <I18nTabContent language="en">
              <div className="grid gap-4">
                <I18nFormTextareaField
                  name="description"
                  control={form.control}
                  label={t("cms.managedServices.coreCards.form.description")}
                  placeholder={t("cms.managedServices.coreCards.form.descriptionPlaceholder")}
                  required
                />
                <I18nFormTextareaField
                  name="bullet_one"
                  control={form.control}
                  label={t("cms.managedServices.coreCards.form.bulletOne")}
                  placeholder={t("cms.managedServices.coreCards.form.bulletOnePlaceholder")}
                  required
                />
                <I18nFormTextareaField
                  name="bullet_two"
                  control={form.control}
                  label={t("cms.managedServices.coreCards.form.bulletTwo")}
                  placeholder={t("cms.managedServices.coreCards.form.bulletTwoPlaceholder")}
                  required
                />
              </div>
            </I18nTabContent>
            <I18nTabContent language="ar">
              <div className="grid gap-4">
                <I18nFormTextareaField
                  name="description"
                  control={form.control}
                  label={t("cms.managedServices.coreCards.form.description")}
                  placeholder={t("cms.managedServices.coreCards.form.descriptionPlaceholder")}
                  required
                />
                <I18nFormTextareaField
                  name="bullet_one"
                  control={form.control}
                  label={t("cms.managedServices.coreCards.form.bulletOne")}
                  placeholder={t("cms.managedServices.coreCards.form.bulletOnePlaceholder")}
                  required
                />
                <I18nFormTextareaField
                  name="bullet_two"
                  control={form.control}
                  label={t("cms.managedServices.coreCards.form.bulletTwo")}
                  placeholder={t("cms.managedServices.coreCards.form.bulletTwoPlaceholder")}
                  required
                />
              </div>
            </I18nTabContent>
          </I18nFormProvider>
        </I18nTabs>

        <FormField
          control={form.control}
          name="logo"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("cms.managedServices.coreCards.form.logo")}</FormLabel>
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
          name="image"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("cms.managedServices.coreCards.form.image")}</FormLabel>
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

        <div className="flex justify-end w-full gap-2">
          <Button type="button" variant="outline" onClick={onClose}>
            {t("cms.managedServices.coreCards.form.cancel")}
          </Button>
          <Button
            type="submit"
            loading={createMutation.isPending || updateMutation.isPending}
          >
            {card ? t("cms.managedServices.coreCards.form.update") : t("cms.managedServices.coreCards.form.create")}
          </Button>
        </div>
      </form>
    </Form>
  );
}

