import { Button } from "@/shared/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shared/components/ui/form";
import { Input } from "@/shared/components/ui/input";
import { Textarea } from "@/shared/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { type LanguageCode } from "@/shared/constants";
import {
  I18nFormTextField,
  I18nFormTextareaField,
  I18nTabs,
  I18nTabContent,
  I18nFormProvider,
} from "@/shared/components/custom/i18n";
import {
  createAlliancesHeadSchema,
  updateAlliancesHeadSchema,
} from "../schemas/alliances-head.schema";
import type {
  CreateAlliancesHeadFormData,
  UpdateAlliancesHeadFormData,
} from "../schemas/alliances-head.schema";
import { useLang } from "@/shared/hooks/use-lang";
import { z } from "zod";

export type AlliancesHeadFormProps = {
  defaultValues?: Partial<
    CreateAlliancesHeadFormData | UpdateAlliancesHeadFormData
  >;
  onSubmit: (
    values: CreateAlliancesHeadFormData | UpdateAlliancesHeadFormData
  ) => void;
  isLoading?: boolean;
  submitLabel?: string;
  isUpdate?: boolean;
};

export function AlliancesHeadForm({
  defaultValues,
  onSubmit,
  isLoading,
  submitLabel,
  isUpdate = false,
}: AlliancesHeadFormProps) {
  const { t } = useLang();
  const [currentLanguage, setCurrentLanguage] = useState<LanguageCode>("en");

  // Create localized schemas
  const localizedCreateSchema = z.object({
    title: z
      .string()
      .min(10, t("alliancesHead.validation.titleMin"))
      .max(60, t("alliancesHead.validation.titleMax")),
    sub_title: z
      .string()
      .min(100, t("alliancesHead.validation.subTitleMin"))
      .max(250, t("alliancesHead.validation.subTitleMax")),
    alliances_head_id_alliances_head_translations: z
      .array(
        z.object({
          title: z
            .string()
            .min(10, t("alliancesHead.validation.translationTitleMin"))
            .max(60, t("alliancesHead.validation.translationTitleMax")),
          sub_title: z
            .string()
            .min(100, t("alliancesHead.validation.translationSubTitleMin"))
            .max(250, t("alliancesHead.validation.translationSubTitleMax")),
          language: z.enum(["ar", "en"]),
        })
      )
      .optional(),
  });

  const localizedUpdateSchema = z.object({
    title: z
      .string()
      .min(10, t("alliancesHead.validation.titleMin"))
      .max(60, t("alliancesHead.validation.titleMax"))
      .optional(),
    sub_title: z
      .string()
      .min(100, t("alliancesHead.validation.subTitleMin"))
      .max(250, t("alliancesHead.validation.subTitleMax"))
      .optional(),
    alliances_head_id_alliances_head_translations: z
      .array(
        z.object({
          id: z.number().positive().optional(),
          alliances_head_id: z.number().positive().optional(),
          title: z
            .string()
            .min(10, t("alliancesHead.validation.translationTitleMin"))
            .max(60, t("alliancesHead.validation.translationTitleMax")),
          sub_title: z
            .string()
            .min(100, t("alliancesHead.validation.translationSubTitleMin"))
            .max(250, t("alliancesHead.validation.translationSubTitleMax")),
          language: z.enum(["ar", "en"]),
        })
      )
      .optional(),
  });

  const schema = isUpdate ? localizedUpdateSchema : localizedCreateSchema;
  type FormData = CreateAlliancesHeadFormData | UpdateAlliancesHeadFormData;

  const methods = useForm<FormData>({
    resolver: zodResolver(schema) as any,
    defaultValues: {
      title: { en: "", ar: "" },
      sub_title: { en: "", ar: "" },
      ...defaultValues,
    },
    mode: "onChange",
  });

  const { handleSubmit, control } = methods;

  return (
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
                <I18nFormTextField
                  name="title"
                  control={control}
                  label={t("alliancesHead.form.title")}
                  placeholder={t("alliancesHead.form.titlePlaceholder")}
                  disabled={isLoading}
                  required
                />
                <I18nFormTextareaField
                  name="sub_title"
                  control={control}
                  label={t("alliancesHead.form.subTitle")}
                  placeholder={t("alliancesHead.form.subTitlePlaceholder")}
                  disabled={isLoading}
                  required
                />
              </div>
            </I18nTabContent>
            <I18nTabContent language="ar">
              <div className="grid gap-4">
                <I18nFormTextField
                  name="title"
                  control={control}
                  label={t("alliancesHead.form.title")}
                  placeholder={t("alliancesHead.form.titlePlaceholder")}
                  disabled={isLoading}
                  required
                />
                <I18nFormTextareaField
                  name="sub_title"
                  control={control}
                  label={t("alliancesHead.form.subTitle")}
                  placeholder={t("alliancesHead.form.subTitlePlaceholder")}
                  disabled={isLoading}
                  required
                />
              </div>
            </I18nTabContent>
          </I18nFormProvider>
        </I18nTabs>

        <Button type="submit" disabled={isLoading} className="w-full">
          {isLoading
            ? t("alliancesHead.form.loading")
            : submitLabel || t("alliancesHead.form.save")}
        </Button>
      </form>
    </Form>
  );
}
