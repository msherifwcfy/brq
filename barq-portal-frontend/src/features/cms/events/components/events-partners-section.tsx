import { useEffect, useState, useRef } from "react";
import { Button } from "@/shared/components/ui/button";
import { useLang } from "@/shared/hooks/use-lang";
import { type LanguageCode } from "@/shared/constants";
import {
  useEventsPartnerControllerReadQuery,
  useEventsPartnerControllerCreate,
  useEventsPartnerControllerUpdate,
} from "@/sdk/modules/eventspartner.gen";
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
  createEventsPartnerSchema,
  updateEventsPartnerSchema,
  type CreateEventsPartnerFormValues,
  type UpdateEventsPartnerFormValues,
} from "../schemas/events-partner.schema";

export default function EventsPartnersSection() {
  const { t } = useLang();
  const [currentLanguage, setCurrentLanguage] = useState<LanguageCode>("en");

  const { data, isLoading, refetch } = useEventsPartnerControllerReadQuery({
    query: {
      query: {
        relations: {
          events_partner_id_events_partner_translations: true,
          logos: true,
        },
        pagination: { take: 1, skip: 0 },
      },
    },
    headers: {
      "x-skip-translations": "true",
    },
  });

  const existing = data?.data?.[0];
  const logos = existing?.logos || [];

  const createMutation = useEventsPartnerControllerCreate();
  const updateMutation = useEventsPartnerControllerUpdate();

  const isUpdate = !!existing;
  const form = useForm<CreateEventsPartnerFormValues | UpdateEventsPartnerFormValues>({
    resolver: zodResolver(
      isUpdate ? updateEventsPartnerSchema : createEventsPartnerSchema
    ),
    defaultValues: {
      title: { en: "", ar: "" },
      subTitle: { en: "", ar: "" },
      logos: [],
    } as any,
  });

  const existingIdRef = useRef<number | undefined>(undefined);
  const logosIdsRef = useRef<string>("");

  useEffect(() => {
    const currentExistingId = existing?.id;
    const currentLogosIds = logos.map((l) => l.id).join(",");

    if (existingIdRef.current === currentExistingId && logosIdsRef.current === currentLogosIds) {
      return;
    }

    existingIdRef.current = currentExistingId;
    logosIdsRef.current = currentLogosIds;

    if (!existing) {
      form.reset({
        title: { en: "", ar: "" },
        subTitle: { en: "", ar: "" },
        logos: [],
      } as any);
      return;
    }

    const enTranslation = existing.events_partner_id_events_partner_translations?.find(
      (t) => t.language === "en"
    );
    const arTranslation = existing.events_partner_id_events_partner_translations?.find(
      (t) => t.language === "ar"
    );

    const logosData = logos.map((logo) => ({
      id: logo.id,
      url: logo.url,
      key: logo.key,
      format: logo.format,
      mime_type: logo.mime_type,
      size: logo.size,
    }));

    form.reset({
      title: {
        en: enTranslation?.title || existing.title || "",
        ar: arTranslation?.title || existing.title || "",
      },
      subTitle: {
        en: enTranslation?.sub_title || existing.sub_title || "",
        ar: arTranslation?.sub_title || existing.sub_title || "",
      },
      logos: logosData,
    } as any);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [existing?.id, logos.length]);

  const onSubmit = async (values: CreateEventsPartnerFormValues | UpdateEventsPartnerFormValues) => {
    try {
      const logosData = (values.logos || []).map((logo: any) => logo.id);

      if (existing) {
        await updateMutation.mutateAsync({
          path: { id: String(existing.id) },
          body: {
            title: values.title?.ar || "",
            sub_title: values.subTitle?.ar || "",
            events_partner_id_events_partner_translations: [
              {
                title: values.title?.en || "",
                sub_title: values.subTitle?.en || "",
                language: "en" as const,
              },
            ],
            logos_ids: logosData,
          },
        });
        toast.success(t("cms.events.partners.messages.updated"));
      } else {
        await createMutation.mutateAsync({
          body: {
            title: values.title?.ar || "",
            sub_title: values.subTitle?.ar || "",
            logos_ids: logosData,
            events_partner_id_events_partner_translations: [
              {
                title: values.title?.en || "",
                sub_title: values.subTitle?.en || "",
                language: "en" as const,
              },
            ],
          },
        });
        toast.success(t("cms.events.partners.messages.created"));
      }
      await refetch();
    } catch (error: any) {
      toast.error(error?.message || t("cms.events.partners.messages.error"));
    }
  };

  if (isLoading) return <div>{t("cms.events.partners.messages.loading")}</div>;

  return (
    <div className="space-y-6">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">{t("cms.events.partners.hero.title")}</h3>
            <I18nTabs
              value={currentLanguage}
              onValueChange={setCurrentLanguage}
              className="w-full"
            >
              <I18nFormProvider currentLanguage={currentLanguage}>
                <I18nTabContent language="en">
                  <div className="grid gap-4">
                    <I18nFormTextField
                      name="title"
                      control={form.control}
                      label={t("cms.events.partners.hero.form.title")}
                      required
                    />
                    <I18nFormTextareaField
                      name="subTitle"
                      control={form.control}
                      label={t("cms.events.partners.hero.form.subTitle")}
                      required
                    />
                  </div>
                </I18nTabContent>
                <I18nTabContent language="ar">
                  <div className="grid gap-4">
                    <I18nFormTextField
                      name="title"
                      control={form.control}
                      label={t("cms.events.partners.hero.form.title")}
                      required
                    />
                    <I18nFormTextareaField
                      name="subTitle"
                      control={form.control}
                      label={t("cms.events.partners.hero.form.subTitle")}
                      required
                    />
                  </div>
                </I18nTabContent>
              </I18nFormProvider>
            </I18nTabs>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">{t("cms.events.partners.logos.title")}</h3>
            <FormField
              control={form.control}
              name="logos"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("cms.events.partners.logos.form.logos")}</FormLabel>
                  <FormControl>
                    <DocumentUploader
                      value={(field.value as any) || []}
                      maxDocuments={12}
                      multiple
                      maxSize={5 * 1024 * 1024}
                      acceptedFileTypes={["image/*"]}
                      onChange={field.onChange}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="flex justify-end">
            <Button
              type="submit"
              loading={createMutation.isPending || updateMutation.isPending}
            >
              {existing ? t("cms.events.partners.buttons.update") : t("cms.events.partners.buttons.create")}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}

