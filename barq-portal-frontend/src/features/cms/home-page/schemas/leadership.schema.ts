import { z } from "zod";
import { createI18nFieldSchema } from "@/shared/schemas/i18n.schema";

export const createLeadershipSchema = z.object({
  quote: createI18nFieldSchema(
    z
      .string()
      .refine(
        (v) => v.length >= 100 && v.length <= 250,
        "cms.homePage.leadership.validation.quoteLength"
      )
  ),
  name: createI18nFieldSchema(
    z.string().min(1, "cms.homePage.leadership.validation.nameRequired")
  ),
  position: createI18nFieldSchema(
    z.string().min(1, "cms.homePage.leadership.validation.positionRequired")
  ),
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

export const updateLeadershipSchema = z.object({
  quote: createI18nFieldSchema(
    z
      .string()
      .refine(
        (v) => v.length >= 100 && v.length <= 250,
        "cms.homePage.leadership.validation.quoteLength"
      )
  ).optional(),
  name: createI18nFieldSchema(
    z.string().min(1, "cms.homePage.leadership.validation.nameRequired")
  ).optional(),
  position: createI18nFieldSchema(
    z.string().min(1, "cms.homePage.leadership.validation.positionRequired")
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

export type CreateLeadershipFormData = z.infer<typeof createLeadershipSchema>;
export type UpdateLeadershipFormData = z.infer<typeof updateLeadershipSchema>;
