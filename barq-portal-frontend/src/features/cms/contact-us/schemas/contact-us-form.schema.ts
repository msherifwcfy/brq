import { z } from "zod";
import { createI18nFieldSchema } from "@/shared/schemas/i18n.schema";

export const contactUsFormSchema = z.object({
  title: createI18nFieldSchema(
    z
      .string()
      .min(10, "cms.contactUs.validation.heroTitleMin")
      .max(60, "cms.contactUs.validation.heroTitleMax")
  ),
  subtext: createI18nFieldSchema(
    z
      .string()
      .min(100, "cms.contactUs.validation.heroSubtextMin")
      .max(250, "cms.contactUs.validation.heroSubtextMax")
  ),
  formTitle: createI18nFieldSchema(
    z
      .string()
      .min(10, "cms.contactUs.validation.formTitleMin")
      .max(50, "cms.contactUs.validation.formTitleMax")
  ),
  formSubtext: createI18nFieldSchema(
    z
      .string()
      .min(50, "cms.contactUs.validation.formSubtextMin")
      .max(150, "cms.contactUs.validation.formSubtextMax")
  ),
  backgroundMedia: z
    .array(
      z.object({
        id: z.number(),
        url: z.string(),
        key: z.string(),
        format: z.string(),
        mime_type: z.string(),
        size: z.number(),
      })
    )
    .min(1, "cms.contactUs.validation.backgroundImageRequired"),
  selectedRequestTypes: z.array(z.number()).min(1, "cms.contactUs.validation.requestTypesRequired"),
  selectedHearAboutOptions: z.array(z.number()).min(1, "cms.contactUs.validation.hearAboutOptionsRequired"),
});

export type ContactUsFormData = z.infer<typeof contactUsFormSchema>;

