import { z } from "zod";
import { createI18nFieldSchema } from "@/shared/schemas/i18n.schema";

export const createHeroSchema = z.object({
  headline: createI18nFieldSchema(
    z
      .string()
      .refine(
        (v) => v.trimEnd().length >= 30 && v.trimEnd().length <= 70,
        "cms.homePage.hero.validation.headlineLength"
      )
  ),
  sub_headline: createI18nFieldSchema(
    z
      .string()
      .refine(
        (v) => v.trimEnd().length >= 80 && v.trimEnd().length <= 200,
        "cms.homePage.hero.validation.subHeadlineLength"
      )
  ),
  cta_label: createI18nFieldSchema(
    z
      .string()
      .refine(
        (v) => v.trimEnd().length >= 15 && v.trimEnd().length <= 25,
        "cms.homePage.hero.validation.ctaLabelLength"
      )
  ),
  media: z.array(
    z.object({
      id: z.number(),
      url: z.string(),
      key: z.string().optional(),
      name: z.string().optional(),
      format: z.string().optional(),
      mime_type: z.string().optional(),
      size: z
        .number()
        .max(70 * 1024 * 1024, "cms.homePage.hero.validation.mediaSize")
        .optional(),
    })
  ).min(1, "Media is required"),
});

export const updateHeroSchema = z.object({
  headline: createI18nFieldSchema(
    z
      .string()
      .refine(
        (v) => v.length >= 30 && v.length <= 70,
        "cms.homePage.hero.validation.headlineLength"
      )
  ).optional(),
  sub_headline: createI18nFieldSchema(
    z
      .string()
      .refine(
        (v) => v.length >= 80 && v.length <= 200,
        "cms.homePage.hero.validation.subHeadlineLength"
      )
  ).optional(),
  cta_label: createI18nFieldSchema(
    z
      .string()
      .refine(
        (v) => v.length >= 15 && v.length <= 25,
        "cms.homePage.hero.validation.ctaLabelLength"
      )
  ).optional(),
  media: z
    .array(
      z.object({
        id: z.number(),
        url: z.string(),
        key: z.string().optional(),
        name: z.string().optional(),
        format: z.string().optional(),
        mime_type: z.string().optional(),
        size: z
          .number()
          .max(70 * 1024 * 1024, "cms.homePage.hero.validation.mediaSize")
          .optional(),
      })
    )
    .min(1, "Media is required")
    ,
});

export type CreateHeroFormData = z.infer<typeof createHeroSchema>;
export type UpdateHeroFormData = z.infer<typeof updateHeroSchema>;
