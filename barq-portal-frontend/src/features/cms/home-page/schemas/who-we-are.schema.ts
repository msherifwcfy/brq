import { z } from "zod";
import { createI18nFieldSchema } from "@/shared/schemas/i18n.schema";

export const createWhoWeAreSchema = z.object({
  description: createI18nFieldSchema(
    z
      .string()
      .refine(
        (v) => v.length >= 200 && v.length <= 400,
        "cms.homePage.whoWeAre.validation.descriptionLength"
      )
  ),
});

export const updateWhoWeAreSchema = z.object({
  description: createI18nFieldSchema(
    z
      .string()
      .refine(
        (v) => v.length >= 200 && v.length <= 400,
        "cms.homePage.whoWeAre.validation.descriptionLength"
      )
  ).optional(),
});

export type CreateWhoWeAreFormData = z.infer<typeof createWhoWeAreSchema>;
export type UpdateWhoWeAreFormData = z.infer<typeof updateWhoWeAreSchema>;
