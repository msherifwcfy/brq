import { useEffect, useMemo, useState } from "react";
import { Textarea } from "@/shared/components/ui/textarea";
import { Button } from "@/shared/components/ui/button";
import { useLang } from "@/shared/hooks/use-lang";
import { type LanguageCode } from "@/shared/constants";
import {
  useAlliancesHeadControllerReadQuery,
  useAlliancesHeadControllerCreate,
  useAlliancesHeadControllerUpdate,
} from "@/sdk/modules/allianceshead.gen";
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
  createAlliancesHeadSchema,
  updateAlliancesHeadSchema,
} from "../../../alliances/head/schemas/alliances-head.schema";
import type {
  CreateAlliancesHeadFormData,
  UpdateAlliancesHeadFormData,
} from "../../../alliances/head/schemas/alliances-head.schema";
import { useLangNavigate } from "@/shared/hooks/use-lang-navigate";
import { toast } from "sonner";
import { z } from "zod";

export default function AlliancesHeadSection() {
  const { lang, t } = useLang();
  const navigate = useLangNavigate();
  const [currentLanguage, setCurrentLanguage] = useState<LanguageCode>("en");

  const {
    data: alliancesHeadData,
    isLoading,
    refetch,
  } = useAlliancesHeadControllerReadQuery({
    query: {
      query: {
        pagination: {
          take: 1,
        },
        relations: {
          alliances_head_id_alliances_head_translations: true,
        },
      },
    },
    headers: {
      "x-skip-translations": "true",
    },
  });

  const alliancesHead = alliancesHeadData?.data?.[0];
  const isUpdate = !!alliancesHead;

  const schema = isUpdate
    ? updateAlliancesHeadSchema
    : createAlliancesHeadSchema;
  type FormData = CreateAlliancesHeadFormData | UpdateAlliancesHeadFormData;

  const methods = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      title: { en: "", ar: "" },
      sub_title: { en: "", ar: "" },
    },
    mode: "onChange",
  });

  const { handleSubmit, control, reset } = methods;

  const createAlliancesHeadMutation = useAlliancesHeadControllerCreate();
  const updateAlliancesHeadMutation = useAlliancesHeadControllerUpdate();

  // Reset form when data changes
  useEffect(() => {
    if (alliancesHead) {
      // Transform API data to i18n format
      const enTranslation =
        alliancesHead.alliances_head_id_alliances_head_translations?.find(
          (t) => t.language === "en"
        );
      const arTranslation =
        alliancesHead.alliances_head_id_alliances_head_translations?.find(
          (t) => t.language === "ar"
        );

      reset({
        title: {
          en: enTranslation?.title || "",
          ar: alliancesHead.title || arTranslation?.title || "",
        },
        sub_title: {
          en: enTranslation?.sub_title || "",
          ar: alliancesHead.sub_title || arTranslation?.sub_title || "",
        },
      });
    } else {
      reset({
        title: { en: "", ar: "" },
        sub_title: { en: "", ar: "" },
      });
    }
  }, [alliancesHead, reset]);

  const onSubmit = async (data: FormData) => {
    try {
      if (isUpdate && alliancesHead) {
        await updateAlliancesHeadMutation.mutateAsync({
          body: {
            title: data.title?.ar || "",
            sub_title: data.sub_title?.ar || "",
            alliances_head_id_alliances_head_translations: [
              {
                title: data.title?.en || "",
                sub_title: data.sub_title?.en || "",
                language: "en",
              },
            ],
          },
          path: {
            id: alliancesHead.id.toString(),
          },
        });
        toast.success(t("alliancesHead.messages.alliancesHeadUpdated"));
      } else {
        await createAlliancesHeadMutation.mutateAsync({
          body: {
            title: data.title?.ar || "",
            sub_title: data.sub_title?.ar || "",
            alliances_head_id_alliances_head_translations: [
              {
                title: data.title?.en || "",
                sub_title: data.sub_title?.en || "",
                language: "en",
              },
            ],
          },
        });
        toast.success(t("alliancesHead.messages.alliancesHeadCreated"));
      }
      refetch();
    } catch (error: any) {
      toast.error(
        error?.message ||
          (isUpdate
            ? t("alliancesHead.messages.errorUpdatingAlliancesHead")
            : t("alliancesHead.messages.errorCreatingAlliancesHead"))
      );
      console.error("Error saving alliances head:", error);
    }
  };

  const isLoadingMutation =
    createAlliancesHeadMutation.isPending ||
    updateAlliancesHeadMutation.isPending;

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
                    label={t("alliancesHead.form.title")}
                    placeholder={t("alliancesHead.form.titlePlaceholder")}
                    disabled={isLoadingMutation}
                    required
                    className="min-h-[100px]"
                  />
                  <I18nFormTextareaField
                    name="sub_title"
                    control={control}
                    label={t("alliancesHead.form.subTitle")}
                    placeholder={t("alliancesHead.form.subTitlePlaceholder")}
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
                    label={t("alliancesHead.form.title")}
                    placeholder={t("alliancesHead.form.titlePlaceholder")}
                    disabled={isLoadingMutation}
                    required
                    className="min-h-[100px]"
                  />
                  <I18nFormTextareaField
                    name="sub_title"
                    control={control}
                    label={t("alliancesHead.form.subTitle")}
                    placeholder={t("alliancesHead.form.subTitlePlaceholder")}
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
                ? t("alliancesHead.updateAlliancesHead")
                : t("alliancesHead.createAlliancesHead")}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
