import { z } from "zod";
import { createI18nFieldSchema } from "@/shared/schemas/i18n.schema";

// Card schema for social impact cards
const socialCardSchema = z.object({
  title: createI18nFieldSchema(
    z
      .string()
      .min(15, "Card title must be at least 15 characters")
      .max(40, "Card title must be at most 40 characters")
  ),
  description: createI18nFieldSchema(
    z
      .string()
      .min(60, "Card description must be at least 60 characters")
      .max(180, "Card description must be at most 180 characters")
  ),
  icon: z.array(z.any()).max(1, "Only one icon per card is allowed").optional(),
});

export const createSocialImpactSchema = z.object({
  title: createI18nFieldSchema(
    z
      .string()
      .min(25, "Title must be at least 25 characters")
      .max(60, "Title must be at most 60 characters")
  ),
  description: createI18nFieldSchema(
    z
      .string()
      .min(150, "Description must be at least 150 characters")
      .max(350, "Description must be at most 350 characters")
  ),
});

export const updateSocialImpactSchema = z.object({
  title: createI18nFieldSchema(
    z
      .string()
      .min(25, "Title must be at least 25 characters")
      .max(60, "Title must be at most 60 characters")
  ).optional(),
  description: createI18nFieldSchema(
    z
      .string()
      .min(150, "Description must be at least 150 characters")
      .max(350, "Description must be at most 350 characters")
  ).optional(),
});

export type CreateSocialImpactFormData = z.infer<
  typeof createSocialImpactSchema
>;
export type UpdateSocialImpactFormData = z.infer<
  typeof updateSocialImpactSchema
>;
