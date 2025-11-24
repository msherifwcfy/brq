import { z } from "zod";
import { createI18nFieldSchema } from "@/shared/schemas/i18n.schema";

export const createHeroSchema = z.object({
  headline: createI18nFieldSchema(
    z
      .string()
      .refine(
        (v) => v.length >= 30 && v.length <= 70,
        "cms.homePage.hero.validation.headlineLength"
      )
  ),
  sub_headline: createI18nFieldSchema(
    z
      .string()
      .refine(
        (v) => v.length >= 80 && v.length <= 200,
        "cms.homePage.hero.validation.subHeadlineLength"
      )
  ),
  cta_label: createI18nFieldSchema(
    z
      .string()
      .refine(
        (v) => v.length >= 15 && v.length <= 25,
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
      size: z.number().optional(),
    })
  ),
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
        size: z.number().optional(),
      })
    )
    .optional(),
});

export type CreateHeroFormData = z.infer<typeof createHeroSchema>;
export type UpdateHeroFormData = z.infer<typeof updateHeroSchema>;
