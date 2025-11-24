import { useEffect, useState, useMemo } from "react";
import { Button } from "@/shared/components/ui/button";
import { useLang } from "@/shared/hooks/use-lang";
import { type LanguageCode } from "@/shared/constants";
import {
  Form,
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
  createAboutUsMissionVisionSchema,
  updateAboutUsMissionVisionSchema,
  type CreateAboutUsMissionVisionFormData,
  type UpdateAboutUsMissionVisionFormData,
} from "../schemas/about-us-mission-vision.schema";
import { toast } from "sonner";
import {
  useAboutBarqMissionVisionControllerReadQuery,
  useAboutBarqMissionVisionControllerCreate,
  useAboutBarqMissionVisionControllerUpdate,
} from "@/sdk/modules/aboutbarqmissionvision.gen";

export default function AboutUsMissionVisionSectionForm() {
  const { lang, t } = useLang();
  const [currentLanguage, setCurrentLanguage] = useState<LanguageCode>("en");

  const { data, isLoading } = useAboutBarqMissionVisionControllerReadQuery({
    query: {
      query: {
        relations: {
          about_barq_mission_vision_id_about_barq_mission_vision_translations: true,
        },
        pagination: { take: 1, skip: 0 },
      },
    },
    headers: {
      "x-skip-translations": "true",
    },
  });

  const existingMissionVision = data?.data?.[0];
  const currentTranslation = useMemo(
    () =>
      existingMissionVision?.about_barq_mission_vision_id_about_barq_mission_vision_translations?.find((t) => t.language === lang),
    [existingMissionVision, lang]
  );

  const isUpdate = !!existingMissionVision;

  type FormData = CreateAboutUsMissionVisionFormData | UpdateAboutUsMissionVisionFormData;
  const form = useForm<FormData>({
    resolver: zodResolver(
      isUpdate ? updateAboutUsMissionVisionSchema : createAboutUsMissionVisionSchema
    ),
    defaultValues: {
      section_title: { en: "", ar: "" },
      mission_title: { en: "Mission", ar: "المهمة" },
      mission_description: { en: "", ar: "" },
      vision_title: { en: "Vision", ar: "الرؤية" },
      vision_description: { en: "", ar: "" },
    } as unknown as FormData,
    mode: "onChange",
  });

  useEffect(() => {
    if (!existingMissionVision) return;

    // Transform API data to i18n format
    const enTranslation = existingMissionVision.about_barq_mission_vision_id_about_barq_mission_vision_translations?.find(
      (t) => t.language === "en"
    );
    const arTranslation = existingMissionVision.about_barq_mission_vision_id_about_barq_mission_vision_translations?.find(
      (t) => t.language === "ar"
    );

    form.reset({
      section_title: {
        en: enTranslation?.title || "",
        ar: existingMissionVision.title || arTranslation?.title || "",
      },
      mission_title: {
        en: "Mission",
        ar: "المهمة",
      },
      mission_description: {
        en: enTranslation?.description || "",
        ar: existingMissionVision.description || arTranslation?.description || "",
      },
      vision_title: {
        en: "Vision",
        ar: "الرؤية",
      },
      vision_description: {
        en: "",
        ar: "",
      },
    } as unknown as FormData);
  }, [existingMissionVision, form]);

  const createMutation = useAboutBarqMissionVisionControllerCreate();
  const updateMutation = useAboutBarqMissionVisionControllerUpdate();

  const onSubmit = async (values: FormData) => {
    if (!existingMissionVision) {
      await createMutation.mutateAsync(
        {
          body: {
            title: values.section_title?.ar || "",
            description: values.mission_description?.ar || "",
            icon_id: 1, // Default icon ID - should be handled by media upload
            about_barq_mission_vision_id_about_barq_mission_vision_translations: [
              {
                title: values.section_title?.en || "",
                description: values.mission_description?.en || "",
                language: "en",
              },
            ],
          },
        },
        {
          onSuccess: () => {
            toast.success(t("aboutUs.missionVisionSection.messages.created"));
          },
          onError: (error) => {
            toast.error(error.message || t("aboutUs.missionVisionSection.messages.errorCreating"));
          },
        }
      );
    } else {
      await updateMutation.mutateAsync(
        {
          path: { id: String(existingMissionVision.id) },
          body: {
            title: values.section_title?.ar || "",
            description: values.mission_description?.ar || "",
            about_barq_mission_vision_id_about_barq_mission_vision_translations: [
              {
                title: values.section_title?.en || "",
                description: values.mission_description?.en || "",
                language: "en",
              },
            ],
          },
        },
        {
          onSuccess: () => {
            toast.success(t("aboutUs.missionVisionSection.messages.updated"));
          },
          onError: (error) => {
            toast.error(error.message || t("aboutUs.missionVisionSection.messages.errorUpdating"));
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
                    label={t("aboutUs.missionVisionSection.form.sectionTitle")}
                    required
                  />
                  
                  <div className="border-t pt-4">
                    <h3 className="text-lg font-semibold mb-4">{t("aboutUs.missionVisionSection.form.missionCard")}</h3>
                    <div className="grid gap-4">
                      <div className="bg-muted/50 p-3 rounded-lg">
                        <label className="text-sm font-medium text-muted-foreground">{t("aboutUs.missionVisionSection.form.missionTitle")}</label>
                        <p className="text-sm">Mission</p>
                      </div>
                      <I18nFormTextareaField
                        name="mission_description"
                        control={form.control}
                        label={t("aboutUs.missionVisionSection.form.missionDescription")}
                        required
                      />
                    </div>
                  </div>

                  <div className="border-t pt-4">
                    <h3 className="text-lg font-semibold mb-4">{t("aboutUs.missionVisionSection.form.visionCard")}</h3>
                    <div className="grid gap-4">
                      <div className="bg-muted/50 p-3 rounded-lg">
                        <label className="text-sm font-medium text-muted-foreground">{t("aboutUs.missionVisionSection.form.visionTitle")}</label>
                        <p className="text-sm">Vision</p>
                      </div>
                      <I18nFormTextareaField
                        name="vision_description"
                        control={form.control}
                        label={t("aboutUs.missionVisionSection.form.visionDescription")}
                        required
                      />
                    </div>
                  </div>
                </div>
              </I18nTabContent>
              <I18nTabContent language="ar">
                <div className="grid gap-6">
                  <I18nFormTextField
                    name="section_title"
                    control={form.control}
                    label={t("aboutUs.missionVisionSection.form.sectionTitle")}
                    required
                  />
                  
                  <div className="border-t pt-4">
                    <h3 className="text-lg font-semibold mb-4">{t("aboutUs.missionVisionSection.form.missionCard")}</h3>
                    <div className="grid gap-4">
                      <div className="bg-muted/50 p-3 rounded-lg">
                        <label className="text-sm font-medium text-muted-foreground">{t("aboutUs.missionVisionSection.form.missionTitle")}</label>
                        <p className="text-sm">المهمة</p>
                      </div>
                      <I18nFormTextareaField
                        name="mission_description"
                        control={form.control}
                        label={t("aboutUs.missionVisionSection.form.missionDescription")}
                        required
                      />
                    </div>
                  </div>

                  <div className="border-t pt-4">
                    <h3 className="text-lg font-semibold mb-4">{t("aboutUs.missionVisionSection.form.visionCard")}</h3>
                    <div className="grid gap-4">
                      <div className="bg-muted/50 p-3 rounded-lg">
                        <label className="text-sm font-medium text-muted-foreground">{t("aboutUs.missionVisionSection.form.visionTitle")}</label>
                        <p className="text-sm">الرؤية</p>
                      </div>
                      <I18nFormTextareaField
                        name="vision_description"
                        control={form.control}
                        label={t("aboutUs.missionVisionSection.form.visionDescription")}
                        required
                      />
                    </div>
                  </div>
                </div>
              </I18nTabContent>
            </I18nFormProvider>
          </I18nTabs>

          <div className="border-t pt-4">
            <div className="bg-muted/50 p-4 rounded-lg">
              <p className="text-sm text-muted-foreground">
                <strong>{t("aboutUs.missionVisionSection.requirements.title")}</strong><br/>
                • {t("aboutUs.missionVisionSection.requirements.sectionTitle")}<br/>
                • {t("aboutUs.missionVisionSection.requirements.cards")}<br/>
                • {t("aboutUs.missionVisionSection.requirements.cardTitles")}<br/>
                • {t("aboutUs.missionVisionSection.requirements.cardIcons")}<br/>
                • {t("aboutUs.missionVisionSection.requirements.descriptions")}
              </p>
            </div>
          </div>

          <div className="flex justify-end items-center gap-3">
            <Button type="submit" loading={form.formState.isSubmitting}>
              {existingMissionVision ? t("aboutUs.missionVisionSection.form.update") : t("aboutUs.missionVisionSection.form.create")}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
