import { useEffect, useState } from "react";
import { Button } from "@/shared/components/ui/button";
import { useLang } from "@/shared/hooks/use-lang";
import { type LanguageCode } from "@/shared/constants";
import {
  useLeadershipExecutiveTeamControllerReadQuery,
  useLeadershipExecutiveTeamControllerCreate,
  useLeadershipExecutiveTeamControllerUpdate,
} from "@/sdk/modules/leadershipexecutiveteam.gen";
import { DocumentUploader } from "@/shared/components/custom/DocumentUploader";
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
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  createLeadershipSchema,
  updateLeadershipSchema,
} from "../schemas/leadership.schema";
import type {
  CreateLeadershipFormData,
  UpdateLeadershipFormData,
} from "../schemas/leadership.schema";
import { toast } from "sonner";

export default function HomeLeadershipSection() {
  const { lang, t } = useLang();
  const [currentLanguage, setCurrentLanguage] = useState<LanguageCode>("en");

  const { data, isLoading } = useLeadershipExecutiveTeamControllerReadQuery({
    query: {
      query: {
        relations: {
          leadership_executive_team_id_leadership_executive_team_translations: true,
          leadership_executive_team_cards_id_leadership_executive_team_cards: {
            image: true,
            leadership_executive_team_cards_id_leadership_executive_team_cards_translations: true,
          },
        },
        pagination: { take: 1, skip: 0 },
      },
    },
    headers: {
      "x-skip-translations": "true",
    },
  });

  const existing = data?.data?.[0];
  const firstCard = existing?.leadership_executive_team_cards_id_leadership_executive_team_cards?.[0];

  const isUpdate = !!existing && !!firstCard;

  type FormData = CreateLeadershipFormData | UpdateLeadershipFormData;
  const form = useForm<FormData>({
    resolver: zodResolver(
      isUpdate ? updateLeadershipSchema : createLeadershipSchema
    ),
    defaultValues: {
      quote: { en: "", ar: "" },
      name: { en: "", ar: "" },
      position: { en: "", ar: "" },
      media: [],
    } as unknown as FormData,
    mode: "onChange",
  });

  useEffect(() => {
    if (!existing) return;

    if (!firstCard) {
      form.reset({
        quote: { en: "", ar: "" },
        name: { en: "", ar: "" },
        position: { en: "", ar: "" },
        media: [],
      } as unknown as FormData);
      return;
    }

    const enCardTranslation = firstCard.leadership_executive_team_cards_id_leadership_executive_team_cards_translations?.find(
      (t) => t.language === "en"
    );
    const arCardTranslation = firstCard.leadership_executive_team_cards_id_leadership_executive_team_cards_translations?.find(
      (t) => t.language === "ar"
    );

    form.reset({
      quote: {
        en: enCardTranslation?.bio || firstCard.bio || "",
        ar: arCardTranslation?.bio || firstCard.bio || "",
      },
      name: {
        en: enCardTranslation?.name || firstCard.name || "",
        ar: arCardTranslation?.name || firstCard.name || "",
      },
      position: {
        en: enCardTranslation?.role || firstCard.role || "",
        ar: arCardTranslation?.role || firstCard.role || "",
      },
      media: firstCard.image?.id
        ? [
          {
            id: firstCard.image.id,
            url: firstCard.image.url,
            key: firstCard.image.key,
            format: firstCard.image.format,
            mime_type: firstCard.image.mime_type,
            size: firstCard.image.size,
          },
        ]
        : [],
    } as unknown as FormData);
  }, [existing, firstCard, form]);

  const createMutation = useLeadershipExecutiveTeamControllerCreate();
  const updateMutation = useLeadershipExecutiveTeamControllerUpdate();

  const onSubmit = async (values: FormData) => {
    const mediaId = Array.isArray((values as any).media)
      ? (values as any).media?.[0]?.id
      : undefined;

    if (!existing) {
      await createMutation.mutateAsync(
        {
          body: {
            leadership_executive_team_cards_id_leadership_executive_team_cards: [
              {
                name: values.name?.ar || "",
                role: values.position?.ar || "",
                bio: values.quote?.ar || "",
                image_id: mediaId as number,
                leadership_executive_team_cards_id_leadership_executive_team_cards_translations: [
                  {
                    name: values.name?.en || "",
                    role: values.position?.en || "",
                    bio: values.quote?.en || "",
                    language: "en",
                  },
                ],
              },
            ],
          },
        },
        {
          onSuccess: () => {
            toast.success(t("cms.homePage.leadership.messages.created"));
          },
          onError: (error) => {
            toast.error(
              error.message ||
              t("cms.homePage.leadership.messages.errorCreating")
            );
          },
        }
      );
    } else {
      await updateMutation.mutateAsync(
        {
          path: { id: String(existing.id) },
          body: {
            leadership_executive_team_cards_id_leadership_executive_team_cards: [
              {
                name: values.name?.ar || "",
                role: values.position?.ar || "",
                bio: values.quote?.ar || "",
                image_id: mediaId,
                leadership_executive_team_cards_id_leadership_executive_team_cards_translations: [
                  {
                    name: values.name?.en || "",
                    role: values.position?.en || "",
                    bio: values.quote?.en || "",
                    language: "en",
                  },
                ],
              },
            ],
          },
        },
        {
          onSuccess: () => {
            toast.success(t("cms.homePage.leadership.messages.updated"));
          },
          onError: (error) => {
            toast.error(
              error.message ||
              t("cms.homePage.leadership.messages.errorUpdating")
            );
          },
        }
      );
    }
  };

  if (isLoading) return <div />;

  return (
    <div>
      <Form {...form}>
        <form className="grid gap-4" onSubmit={form.handleSubmit(onSubmit)}>
          <I18nTabs
            value={currentLanguage}
            onValueChange={setCurrentLanguage}
            className="w-full"
          >
            <I18nFormProvider currentLanguage={currentLanguage}>
              <I18nTabContent language="en">
                <div className="grid gap-4">
                  <div className="grid md:grid-cols-2 gap-4 items-start">
                    <I18nFormTextField
                      name="name"
                      control={form.control}
                      label={t("cms.homePage.leadership.form.name")}
                      required
                    />
                    <I18nFormTextField
                      name="position"
                      control={form.control}
                      label={t("cms.homePage.leadership.form.position")}
                      required
                    />
                  </div>
                  <I18nFormTextareaField
                    name="quote"
                    control={form.control}
                    label={t("cms.homePage.leadership.form.quote")}
                    required
                  />
                </div>
              </I18nTabContent>
              <I18nTabContent language="ar">
                <div className="grid gap-4">
                  <div className="grid md:grid-cols-2 gap-4 items-start">
                    <I18nFormTextField
                      name="name"
                      control={form.control}
                      label={t("cms.homePage.leadership.form.name")}
                      required
                    />
                    <I18nFormTextField
                      name="position"
                      control={form.control}
                      label={t("cms.homePage.leadership.form.position")}
                      required
                    />
                  </div>
                  <I18nFormTextareaField
                    name="quote"
                    control={form.control}
                    label={t("cms.homePage.leadership.form.quote")}
                    required
                  />
                </div>
              </I18nTabContent>
            </I18nFormProvider>
          </I18nTabs>
          <FormField
            control={form.control}
            name={"media" as any}
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("cms.homePage.leadership.form.image")}</FormLabel>
                <FormControl>
                  <DocumentUploader
                    value={(field.value as any) || []}
                    maxDocuments={1}
                    maxSize={5 * 1024 * 1024}
                    acceptedFileTypes={["image/*"]}
                    onChange={field.onChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex justify-end items-center gap-3">
            <Button type="submit" loading={form.formState.isSubmitting}>
              {existing
                ? t("cms.homePage.leadership.form.update")
                : t("cms.homePage.leadership.form.create")}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
