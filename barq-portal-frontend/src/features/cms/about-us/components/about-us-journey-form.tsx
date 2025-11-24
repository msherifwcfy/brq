import { useEffect, useState } from "react";
import { Button } from "@/shared/components/ui/button";
import { useLang } from "@/shared/hooks/use-lang";
import { type LanguageCode } from "@/shared/constants";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
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
  createAboutUsJourneyMilestoneSchema,
  updateAboutUsJourneyMilestoneSchema,
  type CreateAboutUsJourneyMilestoneFormData,
  type UpdateAboutUsJourneyMilestoneFormData,
} from "../schemas/about-us-journey.schema";
import { toast } from "sonner";
import {
  useAboutBarqMilestonesControllerReadQuery,
  useAboutBarqMilestonesControllerCreate,
  useAboutBarqMilestonesControllerUpdate,
  useAboutBarqMilestonesControllerDelete,
  aboutBarqMilestonesControllerReadQueryKey,
} from "@/sdk/modules/aboutbarqmilestone.gen";
import { useQueryClient } from "@tanstack/react-query";
import {
  DocumentUploader,
} from "@/shared/components/custom/DocumentUploader";
import { Input } from "@/shared/components/ui/input";

const queryOptions = {
  query: {
    query: {
      relations: {
        about_barq_milestones_id_about_barq_milestones_translations: true,
        image: true,
      },
      pagination: { take: 100, skip: 0 },
    },
  },
  headers: {
    "x-skip-translations": "true",
  },
};

type MilestoneCardFormData = CreateAboutUsJourneyMilestoneFormData | UpdateAboutUsJourneyMilestoneFormData;

interface MilestoneCardProps {
  milestone?: {
    id: number;
    title: string;
    description: string;
    year: number;
    image_id: number;
    image?: { id: number; url: string; key?: string };
    about_barq_milestones_id_about_barq_milestones_translations?: Array<{
      id: number;
      title: string;
      description: string;
      language: "ar" | "en";
    }>;
  };
  onSave: (data: any) => Promise<void>;
  onDelete?: () => Promise<void>;
  isLoading?: boolean;
  isDeleting?: boolean;
}

function MilestoneCard({ milestone, onSave, onDelete, isLoading, isDeleting }: MilestoneCardProps) {
  const { t } = useLang();
  const [currentLanguage, setCurrentLanguage] = useState<LanguageCode>("en");

  const isUpdate = !!milestone;

  const form = useForm<MilestoneCardFormData>({
    resolver: zodResolver(
      isUpdate ? updateAboutUsJourneyMilestoneSchema : createAboutUsJourneyMilestoneSchema
    ),
    defaultValues: {
      year: milestone ? String(milestone.year) : "",
      title: { en: "", ar: "" },
      description: { en: "", ar: "" },
      image: milestone?.image ? [{
        id: milestone.image.id,
        url: milestone.image.url,
        key: milestone.image.key || "",
        name: "",
        format: "",
        mime_type: "",
        size: 0,
      }] : [],
      order_index: 0,
    },
    mode: "onChange",
  });

  useEffect(() => {
    if (!milestone) {
      form.reset({
        year: "",
        title: { en: "", ar: "" },
        description: { en: "", ar: "" },
        image: [],
        order_index: 0,
      });
      return;
    }

    const enTranslation = milestone.about_barq_milestones_id_about_barq_milestones_translations?.find(
      (t) => t.language === "en"
    );
    const arTranslation = milestone.about_barq_milestones_id_about_barq_milestones_translations?.find(
      (t) => t.language === "ar"
    );

    form.reset({
      year: String(milestone.year),
      title: {
        en: enTranslation?.title || "",
        ar: milestone.title || arTranslation?.title || "",
      },
      description: {
        en: enTranslation?.description || "",
        ar: milestone.description || arTranslation?.description || "",
      },
      image: milestone.image ? [{
        id: milestone.image.id,
        url: milestone.image.url,
        key: milestone.image.key || "",
        name: "",
        format: "",
        mime_type: "",
        size: 0,
      }] : [],
      order_index: 0,
    });
  }, [milestone, form]);

  const onSubmit = async (values: MilestoneCardFormData) => {
    try {
      await onSave(values);
    } catch (error) {
      console.error("Error submitting milestone:", error);
    }
  };

  return (
    <div className="grid grid-cols-1 gap-2 border p-3 rounded-md">
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
                  <FormField
                    control={form.control}
                    name="year"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          {t("common.year")} <span className="text-destructive">*</span>
                        </FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="2024"
                            maxLength={4}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <I18nFormTextField
                    name="title"
                    control={form.control}
                    label={t("common.title")}
                    required
                  />
                  <I18nFormTextareaField
                    name="description"
                    control={form.control}
                    label={t("common.description")}
                    required
                  />
                </div>
              </I18nTabContent>
              <I18nTabContent language="ar">
                <div className="grid gap-4">
                  <FormField
                    control={form.control}
                    name="year"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          {t("common.year")} <span className="text-destructive">*</span>
                        </FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="2024"
                            maxLength={4}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <I18nFormTextField
                    name="title"
                    control={form.control}
                    label={t("common.title")}
                    required
                  />
                  <I18nFormTextareaField
                    name="description"
                    control={form.control}
                    label={t("common.description")}
                    required
                  />
                </div>
              </I18nTabContent>
            </I18nFormProvider>
          </I18nTabs>

          <FormField
            control={form.control}
            name="image"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("common.image")}</FormLabel>
                <FormControl>
                  <DocumentUploader
                    value={field.value?.map((item) => ({
                      ...item,
                      key: item.key || "",
                      name: item.name || "",
                      format: item.format || "",
                      mime_type: item.mime_type || "",
                      size: item.size || 0,
                    })) || []}
                    onChange={(val) => {
                      field.onChange(val?.map((item) => ({
                        ...item,
                        key: item.key || "",
                        name: item.name || "",
                        format: item.format || "",
                        mime_type: item.mime_type || "",
                        size: item.size || 0,
                      })) || []);
                    }}
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
            {onDelete && (
              <Button
                type="button"
                variant="destructive"
                onClick={onDelete}
                loading={isDeleting}
              >
                {t("common.remove")}
              </Button>
            )}
            <Button type="submit" loading={isLoading}>
              {isUpdate ? t("common.update") : t("common.create")}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}

export default function AboutUsJourneySectionForm() {
  const { t } = useLang();
  const queryClient = useQueryClient();
  const [newCardIndex, setNewCardIndex] = useState<number | null>(null);

  const { data, isLoading, isError, error } = useAboutBarqMilestonesControllerReadQuery(
    queryOptions
  );

  const milestones = data?.data || [];

  const createMutation = useAboutBarqMilestonesControllerCreate();
  const updateMutation = useAboutBarqMilestonesControllerUpdate();
  const deleteMutation = useAboutBarqMilestonesControllerDelete();

  const handleSaveMilestone = async (milestoneData: MilestoneCardFormData, milestoneId?: number, tempIndex?: number) => {
    try {
      const imageId = milestoneData.image?.[0]?.id;
      if (!imageId) {
        toast.error(t("common.imageRequired") || "Image is required");
        return;
      }

      if (milestoneId) {
        await updateMutation.mutateAsync({
          path: { id: String(milestoneId) },
          body: {
            title: milestoneData.title?.ar || "",
            description: milestoneData.description?.ar || "",
            year: Number(milestoneData.year),
            image_id: imageId,
            about_barq_milestones_id_about_barq_milestones_translations: [
              {
                title: milestoneData.title?.en || "",
                description: milestoneData.description?.en || "",
                language: "en",
              },
            ],
          },
        });
        toast.success(t("aboutUs.journeySection.messages.updated"));
      } else {
        await createMutation.mutateAsync({
          body: {
            title: milestoneData.title?.ar || "",
            description: milestoneData.description?.ar || "",
            year: Number(milestoneData.year),
            image_id: imageId,
            about_barq_milestones_id_about_barq_milestones_translations: [
              {
                title: milestoneData.title?.en || "",
                description: milestoneData.description?.en || "",
                language: "en",
              },
            ],
          },
        });
        toast.success(t("aboutUs.journeySection.messages.created"));
        if (tempIndex !== undefined) {
          setNewCardIndex(null);
        }
      }

      queryClient.invalidateQueries({
        queryKey: aboutBarqMilestonesControllerReadQueryKey(queryOptions),
      });
    } catch (error: any) {
      toast.error(error?.message || t("aboutUs.journeySection.messages.errorCreating"));
    }
  };

  const handleDeleteMilestone = async (milestoneId: number) => {
    try {
      await deleteMutation.mutateAsync({
        path: { id: String(milestoneId) },
      });
      toast.success(t("common.deleted") || "Deleted successfully");
      queryClient.invalidateQueries({
        queryKey: aboutBarqMilestonesControllerReadQueryKey(queryOptions),
      });
    } catch (error: any) {
      toast.error(error?.message || t("common.errorDeleting") || "Error deleting");
    }
  };

  const handleAddNew = () => {
    setNewCardIndex(Date.now());
  };

  const handleCancelNew = async () => {
    setNewCardIndex(null);
  };

  if (isLoading) return <div />;
  
  if (isError) {
    return (
      <div className="text-center py-8">
        <p className="text-destructive">
          {error instanceof Error ? error.message : t("aboutUs.journeySection.messages.errorLoading")}
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">{t("aboutUs.journeySection.title")}</h3>
      {milestones.map((milestone) => (
        <MilestoneCard
          key={milestone.id}
          milestone={milestone}
          onSave={(data) => handleSaveMilestone(data, milestone.id)}
          onDelete={() => handleDeleteMilestone(milestone.id)}
          isLoading={updateMutation.isPending}
          isDeleting={deleteMutation.isPending}
        />
      ))}
      {newCardIndex !== null && (
        <MilestoneCard
          key={newCardIndex}
          onSave={(data) => handleSaveMilestone(data, undefined, newCardIndex)}
          onDelete={handleCancelNew}
          isLoading={createMutation.isPending}
        />
      )}
      <Button
        type="button"
        variant="secondary"
        onClick={handleAddNew}
        disabled={newCardIndex !== null}
      >
        {t("common.add")}
            </Button>
    </div>
  );
}
