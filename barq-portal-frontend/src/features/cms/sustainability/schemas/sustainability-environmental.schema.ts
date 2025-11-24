import { z } from "zod";
import { createI18nFieldSchema } from "@/shared/schemas/i18n.schema";

// Bullet point schema
const bulletPointSchema = z.object({
  title: createI18nFieldSchema(
    z
      .string()
      .min(30, "Bullet point must be at least 30 characters")
      .max(90, "Bullet point must be at most 90 characters")
  ),
  icon: z
    .array(z.any())
    .max(1, "Only one icon per bullet point is allowed")
    .optional(),
});

export const createEnvironmentalSustainabilitySchema = z.object({
  title: createI18nFieldSchema(
    z
      .string()
      .min(15, "Title must be at least 15 characters")
      .max(50, "Title must be at most 50 characters")
  ),
  intro: createI18nFieldSchema(
    z
      .string()
      .min(50, "Intro paragraph must be at least 50 characters")
      .max(250, "Intro paragraph must be at most 250 characters")
  ),
  bulletPoints: z
    .array(bulletPointSchema)
    .min(1, "At least 1 bullet point is required")
    .max(3, "At most 3 bullet points are allowed"),
  media: z.array(z.any()).max(1, "Only one image is allowed").optional(),
});

export const updateEnvironmentalSustainabilitySchema = z.object({
  title: createI18nFieldSchema(
    z
      .string()
      .min(15, "Title must be at least 15 characters")
      .max(50, "Title must be at most 50 characters")
  ).optional(),
  intro: createI18nFieldSchema(
    z
      .string()
      .min(50, "Intro paragraph must be at least 50 characters")
      .max(250, "Intro paragraph must be at most 250 characters")
  ).optional(),
  bulletPoints: z
    .array(bulletPointSchema)
    .min(1, "At least 1 bullet point is required")
    .max(3, "At most 3 bullet points are allowed")
    .optional(),
  media: z.array(z.any()).max(1, "Only one image is allowed").optional(),
});

export type CreateEnvironmentalSustainabilityFormData = z.infer<
  typeof createEnvironmentalSustainabilitySchema
>;
export type UpdateEnvironmentalSustainabilityFormData = z.infer<
  typeof updateEnvironmentalSustainabilitySchema
>;
