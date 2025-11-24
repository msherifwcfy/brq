import { useEffect, useMemo, useState } from "react";
import { Textarea } from "@/shared/components/ui/textarea";
import { Button } from "@/shared/components/ui/button";
import { useLang } from "@/shared/hooks/use-lang";
import { type LanguageCode } from "@/shared/constants";
import {
  useAwardsHeadControllerReadQuery,
  useAwardsHeadControllerCreate,
  useAwardsHeadControllerUpdate,
} from "@/sdk/modules/awardshead.gen";
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
  createAwardsHeadSchema,
  updateAwardsHeadSchema,
} from "../../../awards/head/schemas/awards-head.schema";
import type {
  CreateAwardsHeadFormData,
  UpdateAwardsHeadFormData,
} from "../../../awards/head/schemas/awards-head.schema";
import { useLangNavigate } from "@/shared/hooks/use-lang-navigate";
import { toast } from "sonner";
import { z } from "zod";

export default function AwardsHeadSection() {
  const { lang, t } = useLang();
  const navigate = useLangNavigate();
  const [currentLanguage, setCurrentLanguage] = useState<LanguageCode>("en");

  const {
    data: awardsHeadData,
    isLoading,
    refetch,
  } = useAwardsHeadControllerReadQuery({
    query: {
      query: {
        pagination: {
          take: 1,
        },
        relations: {
          awards_head_id_awards_head_translations: true,
        },
      },
    },
    headers: {
      "x-skip-translations": "true",
    },
  });

  const awardsHead = awardsHeadData?.data?.[0];
  const isUpdate = !!awardsHead;

  const schema = isUpdate ? updateAwardsHeadSchema : createAwardsHeadSchema;
  type FormData = CreateAwardsHeadFormData | UpdateAwardsHeadFormData;

  const methods = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      title: { en: "", ar: "" },
      sub_title: { en: "", ar: "" },
    },
    mode: "onChange",
  });

  const { handleSubmit, control, reset } = methods;

  const createAwardsHeadMutation = useAwardsHeadControllerCreate();
  const updateAwardsHeadMutation = useAwardsHeadControllerUpdate();

  // Reset form when data changes
  useEffect(() => {
    if (awardsHead) {
      // Transform API data to i18n format
      const enTranslation =
        awardsHead.awards_head_id_awards_head_translations?.find(
          (t) => t.language === "en"
        );
      const arTranslation =
        awardsHead.awards_head_id_awards_head_translations?.find(
          (t) => t.language === "ar"
        );

      reset({
        title: {
          en: enTranslation?.title || "",
          ar: awardsHead.title || arTranslation?.title || "",
        },
        sub_title: {
          en: enTranslation?.sub_title || "",
          ar: awardsHead.sub_title || arTranslation?.sub_title || "",
        },
      });
    } else {
      reset({
        title: { en: "", ar: "" },
        sub_title: { en: "", ar: "" },
      });
    }
  }, [awardsHead, reset]);

  const onSubmit = async (data: FormData) => {
    try {
      if (isUpdate && awardsHead) {
        await updateAwardsHeadMutation.mutateAsync({
          body: {
            title: data.title?.ar || "",
            sub_title: data.sub_title?.ar || "",
            awards_head_id_awards_head_translations: [
              {
                title: data.title?.en || "",
                sub_title: data.sub_title?.en || "",
                language: "en",
              },
            ],
          },
          path: {
            id: awardsHead.id.toString(),
          },
        });
        toast.success(t("awardsHead.messages.awardsHeadUpdated"));
      } else {
        await createAwardsHeadMutation.mutateAsync({
          body: {
            title: data.title?.ar || "",
            sub_title: data.sub_title?.ar || "",
            awards_head_id_awards_head_translations: [
              {
                title: data.title?.en || "",
                sub_title: data.sub_title?.en || "",
                language: "en",
              },
            ],
          },
        });
        toast.success(t("awardsHead.messages.awardsHeadCreated"));
      }
      refetch();
    } catch (error: any) {
      toast.error(
        error?.message ||
          (isUpdate
            ? t("awardsHead.messages.errorUpdatingAwardsHead")
            : t("awardsHead.messages.errorCreatingAwardsHead"))
      );
      console.error("Error saving awards head:", error);
    }
  };

  const isLoadingMutation =
    createAwardsHeadMutation.isPending || updateAwardsHeadMutation.isPending;

  return (
    <div className="space-y-6">
      <Form {...methods}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <I18nTabs
            value={currentLanguage}
            onValueChange={setCurrentLanguage}
            className="w-full"
          >
            <I18nFormProvider currentLanguage={currentLanguage}>
              <I18nTabContent language="en">
                <div className="grid gap-4">
                  <I18nFormTextareaField
                    name="title"
                    control={control}
                    label={t("awardsHead.form.title")}
                    placeholder={t("awardsHead.form.titlePlaceholder")}
                    disabled={isLoadingMutation}
                    required
                    className="min-h-[100px]"
                  />
                  <I18nFormTextareaField
                    name="sub_title"
                    control={control}
                    label={t("awardsHead.form.subTitle")}
                    placeholder={t("awardsHead.form.subTitlePlaceholder")}
                    disabled={isLoadingMutation}
                    required
                    className="min-h-[100px]"
                  />
                </div>
              </I18nTabContent>
              <I18nTabContent language="ar">
                <div className="grid gap-4">
                  <I18nFormTextareaField
                    name="title"
                    control={control}
                    label={t("awardsHead.form.title")}
                    placeholder={t("awardsHead.form.titlePlaceholder")}
                    disabled={isLoadingMutation}
                    required
                    className="min-h-[100px]"
                  />
                  <I18nFormTextareaField
                    name="sub_title"
                    control={control}
                    label={t("awardsHead.form.subTitle")}
                    placeholder={t("awardsHead.form.subTitlePlaceholder")}
                    disabled={isLoadingMutation}
                    required
                    className="min-h-[100px]"
                  />
                </div>
              </I18nTabContent>
            </I18nFormProvider>
          </I18nTabs>

          <div className="flex justify-end">
            <Button
              type="submit"
              disabled={isLoadingMutation}
              loading={isLoadingMutation}
              className="min-w-[120px]"
            >
              {isUpdate
                ? t("awardsHead.updateAwardsHead")
                : t("awardsHead.createAwardsHead")}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
