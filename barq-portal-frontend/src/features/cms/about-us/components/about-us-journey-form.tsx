import { useEffect, useState, useMemo } from "react";
import { Button } from "@/shared/components/ui/button";
import { useLang } from "@/shared/hooks/use-lang";
import { type LanguageCode } from "@/shared/constants";
import {
  Form,
} from "@/shared/components/ui/form";
import {
  I18nFormTextField,
  I18nTabs,
  I18nTabContent,
  I18nFormProvider,
} from "@/shared/components/custom/i18n";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  createAboutUsJourneySchema,
  updateAboutUsJourneySchema,
  type CreateAboutUsJourneyFormData,
  type UpdateAboutUsJourneyFormData,
} from "../schemas/about-us-journey.schema";
import { toast } from "sonner";
import {
  useAboutBarqMilestonesControllerReadQuery,
  useAboutBarqMilestonesControllerCreate,
  useAboutBarqMilestonesControllerUpdate,
} from "@/sdk/modules/aboutbarqmilestone.gen";

export default function AboutUsJourneySectionForm() {
  const { lang, t } = useLang();
  const [currentLanguage, setCurrentLanguage] = useState<LanguageCode>("en");

  const { data, isLoading } = useAboutBarqMilestonesControllerReadQuery({
    query: {
      query: {
        relations: {
          about_barq_milestones_id_about_barq_milestones_translations: true,
        },
        pagination: { take: 1, skip: 0 },
      },
    },
    headers: {
      "x-skip-translations": "true",
    },
  });

  const existingMilestones = data?.data?.[0];
  const currentTranslation = useMemo(
    () =>
      existingMilestones?.about_barq_milestones_id_about_barq_milestones_translations?.find((t) => t.language === lang),
    [existingMilestones, lang]
  );

  const isUpdate = !!existingMilestones;

  type FormData = CreateAboutUsJourneyFormData | UpdateAboutUsJourneyFormData;
  const form = useForm<FormData>({
    resolver: zodResolver(
      isUpdate ? updateAboutUsJourneySchema : createAboutUsJourneySchema
    ),
    defaultValues: {
      section_title: { en: "", ar: "" },
    } as unknown as FormData,
    mode: "onChange",
  });

  useEffect(() => {
    if (!existingMilestones) return;

    // Transform API data to i18n format
    const enTranslation = existingMilestones.about_barq_milestones_id_about_barq_milestones_translations?.find(
      (t) => t.language === "en"
    );
    const arTranslation = existingMilestones.about_barq_milestones_id_about_barq_milestones_translations?.find(
      (t) => t.language === "ar"
    );

    form.reset({
      section_title: {
        en: enTranslation?.title || "",
        ar: existingMilestones.title || arTranslation?.title || "",
      },
    } as unknown as FormData);
  }, [existingMilestones, form]);

  const createMutation = useAboutBarqMilestonesControllerCreate();
  const updateMutation = useAboutBarqMilestonesControllerUpdate();

  const onSubmit = async (values: FormData) => {
    if (!existingMilestones) {
      await createMutation.mutateAsync(
        {
          body: {
            title: values.section_title?.ar || "",
            description: "",
            year: 2024, // Default year
            image_id: 1, // Default image ID - should be handled by media upload
            about_barq_milestones_id_about_barq_milestones_translations: [
              {
                title: values.section_title?.en || "",
                description: "",
                language: "en",
              },
            ],
          },
        },
        {
          onSuccess: () => {
            toast.success(t("aboutUs.journeySection.messages.created"));
          },
          onError: (error) => {
            toast.error(error.message || t("aboutUs.journeySection.messages.errorCreating"));
          },
        }
      );
    } else {
      await updateMutation.mutateAsync(
        {
          path: { id: String(existingMilestones.id) },
          body: {
            title: values.section_title?.ar || "",
            description: "",
            about_barq_milestones_id_about_barq_milestones_translations: [
              {
                title: values.section_title?.en || "",
                description: "",
                language: "en",
              },
            ],
          },
        },
        {
          onSuccess: () => {
            toast.success(t("aboutUs.journeySection.messages.updated"));
          },
          onError: (error) => {
            toast.error(error.message || t("aboutUs.journeySection.messages.errorUpdating"));
          },
        }
      );
    }
  };

  if (isLoading) return <div />;

  return (
    <div>
      <Form {...form}>
        <form className="grid gap-6" onSubmit={form.handleSubmit(onSubmit)}>
          <I18nTabs
            value={currentLanguage}
            onValueChange={setCurrentLanguage}
            className="w-full"
          >
            <I18nFormProvider currentLanguage={currentLanguage}>
              <I18nTabContent language="en">
                <div className="grid gap-6">
                  <I18nFormTextField
                    name="section_title"
                    control={form.control}
                    label={t("aboutUs.journeySection.form.sectionTitle")}
                    required
                  />
                  <div className="border-t pt-4">
                    <p className="text-sm text-muted-foreground">
                      {t("aboutUs.journeySection.form.milestonesDescription")}
                    </p>
                  </div>
                </div>
              </I18nTabContent>
              <I18nTabContent language="ar">
                <div className="grid gap-6">
                  <I18nFormTextField
                    name="section_title"
                    control={form.control}
                    label={t("aboutUs.journeySection.form.sectionTitle")}
                    required
                  />
                  <div className="border-t pt-4">
                    <p className="text-sm text-muted-foreground">
                      {t("aboutUs.journeySection.form.milestonesDescription")}
                    </p>
                  </div>
                </div>
              </I18nTabContent>
            </I18nFormProvider>
          </I18nTabs>

          <div className="flex justify-end items-center gap-3">
            <Button type="submit" loading={form.formState.isSubmitting}>
              {existingMilestones ? t("aboutUs.journeySection.form.update") : t("aboutUs.journeySection.form.create")}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
