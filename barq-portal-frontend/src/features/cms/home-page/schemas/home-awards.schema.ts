import { z } from "zod";
import { createI18nFieldSchema } from "@/shared/schemas/i18n.schema";

export const createHomeAwardsSchema = z.object({
  description: createI18nFieldSchema(
    z
      .string()
      .refine(
        (v) => v.length >= 80 && v.length <= 600,
        "cms.homePage.homeAwards.validation.descriptionLength"
      )
  ),
});

export const updateHomeAwardsSchema = z.object({
  description: createI18nFieldSchema(
    z
      .string()
      .refine(
        (v) => v.length >= 80 && v.length <= 600,
        "cms.homePage.homeAwards.validation.descriptionLength"
      )
  ).optional(),
});

export type CreateHomeAwardsFormData = z.infer<typeof createHomeAwardsSchema>;
export type UpdateHomeAwardsFormData = z.infer<typeof updateHomeAwardsSchema>;

