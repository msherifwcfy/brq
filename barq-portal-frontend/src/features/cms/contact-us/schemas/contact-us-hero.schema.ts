import { z } from "zod";
import { createI18nFieldSchema } from "@/shared/schemas/i18n.schema";
import { documentSchema } from "@/shared/schemas/file.schema";

export const contactUsHeroSchema = z.object({
  title: createI18nFieldSchema(
    z
      .string()
      .min(10, "cms.contactUs.validation.heroTitleMin")
      .max(60, "cms.contactUs.validation.heroTitleMax")
  ),
  description: createI18nFieldSchema(
    z
      .string()
      .min(100, "cms.contactUs.validation.heroSubtextMin")
      .max(250, "cms.contactUs.validation.heroSubtextMax")
  ),
  backgroundMedia: z
    .array(documentSchema)
    .min(1, "cms.contactUs.validation.backgroundImageRequired"),
});

export type ContactUsHeroFormData = z.infer<typeof contactUsHeroSchema>;

