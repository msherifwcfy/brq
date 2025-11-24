import { useEffect, useState, useMemo } from "react";
import { Button } from "@/shared/components/ui/button";
import { useLang } from "@/shared/hooks/use-lang";
import { type LanguageCode } from "@/shared/constants";
import {
  Form,
} from "@/shared/components/ui/form";
import {
  I18nFormTextareaField,
  I18nTabs,
  I18nTabContent,
  I18nFormProvider,
} from "@/shared/components/custom/i18n";
import { DocumentUploader } from "@/shared/components/custom/DocumentUploader";
import {
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormControl,
} from "@/shared/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useFieldArray } from "react-hook-form";
import {
  createAboutUsMissionVisionSchema,
  type CreateAboutUsMissionVisionFormData,
} from "../schemas/about-us-mission-vision.schema";
import { toast } from "sonner";
import {
  useAboutBarqMissionVisionControllerReadQuery,
  useAboutBarqMissionVisionControllerCreate,
  useAboutBarqMissionVisionControllerUpdate,
} from "@/sdk/modules/aboutbarqmissionvision.gen";
import { Card, CardContent, CardHeader } from "@/shared/components/ui/card";
import { Badge } from "@/shared/components/ui/badge";

export default function AboutUsMissionVisionSectionForm() {
  const { lang, t } = useLang();
  const [currentLanguage, setCurrentLanguage] = useState<LanguageCode>("en");
  const [submittingCardIndex, setSubmittingCardIndex] = useState<number | null>(null);

  const { data, isLoading } = useAboutBarqMissionVisionControllerReadQuery({
    query: {
      query: {
        relations: {
          about_barq_mission_vision_id_about_barq_mission_vision_translations: true,
          icon: true,
        },
        pagination: { take: 100, skip: 0 },
      },
    },
    headers: {
      "x-skip-translations": "true",
    },
  });

  const missionVisionRecords = useMemo(
    () => data?.data || [],
    [data?.data]
  );
  
  const missionRecord = useMemo(
    () => missionVisionRecords.find((record) => record.title === "المهمة"),
    [missionVisionRecords]
  );
  
  const visionRecord = useMemo(
    () => missionVisionRecords.find((record) => record.title === "الرؤية"),
    [missionVisionRecords]
  );

  const form = useForm<CreateAboutUsMissionVisionFormData>({
    resolver: zodResolver(createAboutUsMissionVisionSchema),
    defaultValues: {
      cards: [
        {
          title: { en: "Mission", ar: "المهمة" },
          description: { en: "", ar: "" },
          icon_media: [],
        },
        {
          title: { en: "Vision", ar: "الرؤية" },
          description: { en: "", ar: "" },
          icon_media: [],
        },
      ],
    },
    mode: "onChange",
  });

  const { fields } = useFieldArray({
    control: form.control,
    name: "cards",
  });

  useEffect(() => {
    form.setValue("cards.0.title", { en: "Mission", ar: "المهمة" });
    form.setValue("cards.1.title", { en: "Vision", ar: "الرؤية" });
  }, [form]);

  useEffect(() => {
    const missionEnTranslation = missionRecord?.about_barq_mission_vision_id_about_barq_mission_vision_translations?.find(
      (t) => t.language === "en"
    );
    const missionArTranslation = missionRecord?.about_barq_mission_vision_id_about_barq_mission_vision_translations?.find(
      (t) => t.language === "ar"
    );

    const visionEnTranslation = visionRecord?.about_barq_mission_vision_id_about_barq_mission_vision_translations?.find(
      (t) => t.language === "en"
    );
    const visionArTranslation = visionRecord?.about_barq_mission_vision_id_about_barq_mission_vision_translations?.find(
      (t) => t.language === "ar"
    );

    form.reset({
      cards: [
        {
          title: { en: "Mission", ar: "المهمة" },
          description: {
            en: missionEnTranslation?.description || "",
            ar: missionRecord?.description || missionArTranslation?.description || "",
          },
          icon_media: missionRecord?.icon ? [{
            id: missionRecord.icon.id,
            url: missionRecord.icon.url,
            key: missionRecord.icon.key || "",
            format: missionRecord.icon.format,
            mime_type: missionRecord.icon.mime_type,
            size: missionRecord.icon.size,
          }] : [],
        },
        {
          title: { en: "Vision", ar: "الرؤية" },
          description: {
            en: visionEnTranslation?.description || "",
            ar: visionRecord?.description || visionArTranslation?.description || "",
          },
          icon_media: visionRecord?.icon ? [{
            id: visionRecord.icon.id,
            url: visionRecord.icon.url,
            key: visionRecord.icon.key || "",
            format: visionRecord.icon.format,
            mime_type: visionRecord.icon.mime_type,
            size: visionRecord.icon.size,
          }] : [],
        },
      ],
    });
    
    form.setValue("cards.0.title", { en: "Mission", ar: "المهمة" });
    form.setValue("cards.1.title", { en: "Vision", ar: "الرؤية" });
  }, [missionRecord, visionRecord, form]);

  const createMutation = useAboutBarqMissionVisionControllerCreate();
  const updateMutation = useAboutBarqMissionVisionControllerUpdate();

  const handleCardSubmit = async (cardIndex: number) => {
    const res = await form.trigger([`cards.${cardIndex}.title`, `cards.${cardIndex}.description`, `cards.${cardIndex}.icon_media`]);
    if (!res) return;
    setSubmittingCardIndex(cardIndex);
    
    const card = form.getValues(`cards.${cardIndex}` as any);
    const cardTitles = [
      { en: "Mission", ar: "المهمة" },
      { en: "Vision", ar: "الرؤية" },
    ];
    const currentTitle = cardTitles[cardIndex];
    const existingRecord = cardIndex === 0 ? missionRecord : visionRecord;

    try {
      if (!existingRecord) {
        await createMutation.mutateAsync(
          {
            body: {
              title: currentTitle.ar,
              description: card.description?.ar || "",
              icon_id: card.icon_media?.[0]?.id || 1,
              about_barq_mission_vision_id_about_barq_mission_vision_translations: [
                {
                  title: currentTitle.en,
                  description: card.description?.en || "",
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
            path: { id: String(existingRecord.id) },
            body: {
              title: currentTitle.ar,
              description: card.description?.ar || "",
              icon_id: card.icon_media?.[0]?.id,
              about_barq_mission_vision_id_about_barq_mission_vision_translations: [
                {
                  title: currentTitle.en,
                  description: card.description?.en || "",
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
    } finally {
      setSubmittingCardIndex(null);
    }
  };

  if (isLoading) return <div />;

  return (
    <div>
      <Form {...form}>
        <I18nTabs
          value={currentLanguage}
          onValueChange={setCurrentLanguage}
          className="w-full"
        >
          <I18nFormProvider currentLanguage={currentLanguage}>
            <I18nTabContent language="en">
              <div className="grid gap-6">
                <div className="grid gap-4">
                  {fields.map((field, index) => {
                    const cardTitles = [
                      { en: "Mission", ar: "المهمة" },
                      { en: "Vision", ar: "الرؤية" },
                    ];
                    const currentTitle = cardTitles[index];
                    const existingRecord = index === 0 ? missionRecord : visionRecord;
                    
                    return (
                      <Card key={field.id} className="relative">
                        <CardHeader className="pb-3">
                          <div className="flex items-center justify-between">
                            <Badge variant="secondary">
                              {currentTitle.en}
                            </Badge>
                          </div>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div className="space-y-2">
                            <label className="text-sm font-medium">
                              {t("aboutUs.missionVisionSection.form.cardTitle")}
                            </label>
                            <div className="p-3 bg-muted rounded-md">
                              <p className="text-sm font-medium">{currentTitle.en}</p>
                            </div>
                          </div>
                          <I18nFormTextareaField
                            name={`cards.${index}.description`}
                            control={form.control}
                            label={t("aboutUs.missionVisionSection.form.cardDescription")}
                            required
                          />
                          <FormField
                            control={form.control}
                            name={`cards.${index}.icon_media` as any}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>{t("common.icon")}</FormLabel>
                                <FormControl>
                                  <DocumentUploader
                                    value={field.value?.map((item: any) => ({
                                      ...item,
                                      key: item.key || "",
                                      size: item.size || 0,
                                      mime_type: item.mime_type || "",
                                      format: item.format || "",
                                    })) || []}
                                    onChange={(val) => {
                                      field.onChange(val?.map((item: any) => ({
                                        ...item,
                                        key: item.key || "",
                                        size: item.size || 0,
                                        mime_type: item.mime_type || "",
                                        format: item.format || "",
                                      })) || []);
                                    }}
                                    multiple={false}
                                    maxDocuments={1}
                                    maxSize={5 * 1024 * 1024}
                                    acceptedFileTypes={["image/*"]}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <div className="flex justify-end">
                            <Button
                              type="button"
                              onClick={() => handleCardSubmit(index)}
                              loading={submittingCardIndex === index}
                            >
                              {existingRecord ? t("aboutUs.missionVisionSection.form.update") : t("aboutUs.missionVisionSection.form.create")}
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              </div>
            </I18nTabContent>
            <I18nTabContent language="ar">
              <div className="grid gap-6">
                <div className="grid gap-4">
                  {fields.map((field, index) => {
                    const cardTitles = [
                      { en: "Mission", ar: "المهمة" },
                      { en: "Vision", ar: "الرؤية" },
                    ];
                    const currentTitle = cardTitles[index];
                    const existingRecord = index === 0 ? missionRecord : visionRecord;
                    
                    return (
                      <Card key={field.id} className="relative">
                        <CardHeader className="pb-3">
                          <div className="flex items-center justify-between">
                            <Badge variant="secondary">
                              {currentTitle.ar}
                            </Badge>
                          </div>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div className="space-y-2">
                            <label className="text-sm font-medium">
                              {t("aboutUs.missionVisionSection.form.cardTitle")}
                            </label>
                            <div className="p-3 bg-muted rounded-md">
                              <p className="text-sm font-medium">{currentTitle.ar}</p>
                            </div>
                          </div>
                          <I18nFormTextareaField
                            name={`cards.${index}.description`}
                            control={form.control}
                            label={t("aboutUs.missionVisionSection.form.cardDescription")}
                            required
                          />
                          <FormField
                            control={form.control}
                            name={`cards.${index}.icon_media` as any}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>{t("common.icon")}</FormLabel>
                                <FormControl>
                                  <DocumentUploader
                                    value={field.value?.map((item: any) => ({
                                      ...item,
                                      key: item.key || "",
                                      size: item.size || 0,
                                      mime_type: item.mime_type || "",
                                      format: item.format || "",
                                    })) || []}
                                    onChange={(val) => {
                                      field.onChange(val?.map((item: any) => ({
                                        ...item,
                                        key: item.key || "",
                                        size: item.size || 0,
                                        mime_type: item.mime_type || "",
                                        format: item.format || "",
                                      })) || []);
                                    }}
                                    multiple={false}
                                    maxDocuments={1}
                                    maxSize={5 * 1024 * 1024}
                                    acceptedFileTypes={["image/*"]}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <div className="flex justify-end">
                            <Button
                              type="button"
                              onClick={() => handleCardSubmit(index)}
                              loading={submittingCardIndex === index}
                            >
                              {existingRecord ? t("aboutUs.missionVisionSection.form.update") : t("aboutUs.missionVisionSection.form.create")}
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              </div>
            </I18nTabContent>
          </I18nFormProvider>
        </I18nTabs>
      </Form>
    </div>
  );
}
