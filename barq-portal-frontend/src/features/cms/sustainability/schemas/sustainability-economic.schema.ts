import { z } from "zod";
import { createI18nFieldSchema } from "@/shared/schemas/i18n.schema";

// Image validation schema for JPG/PNG/WebP, max 2MB
const imageSchema = z.object({
  id: z.number().optional(),
  url: z.string().url(),
  key: z.string(),
  name: z.string(),
  format: z.string(),
  mime_type: z
    .string()
    .refine(
      (type) => ["image/jpeg", "image/png", "image/webp"].includes(type),
      "Only JPG, PNG, and WebP images are allowed"
    ),
  size: z.number().refine(
    (size) => size <= 5 * 1024 * 1024, // 2MB in bytes
    "Image size must be less than 2MB"
  ),
});

export const createEconomicSustainabilitySchema = z.object({
  title: createI18nFieldSchema(
    z
      .string()
      .min(15, "Title must be at least 15 characters")
      .max(50, "Title must be at most 50 characters")
  ),
  description: createI18nFieldSchema(
    z
      .string()
      .min(100, "Description must be at least 100 characters")
      .max(420, "Description must be at most 420 characters")
  ),
  media: z.array(imageSchema).max(1, "Only one image is allowed").optional(),
});

export const updateEconomicSustainabilitySchema = z.object({
  title: createI18nFieldSchema(
    z
      .string()
      .min(15, "Title must be at least 15 characters")
      .max(50, "Title must be at most 50 characters")
  ).optional(),
  description: createI18nFieldSchema(
    z
      .string()
      .min(100, "Description must be at least 100 characters")
      .max(420, "Description must be at most 420 characters")
  ).optional(),
  media: z.array(imageSchema).max(1, "Only one image is allowed").optional(),
});

export type CreateEconomicSustainabilityFormData = z.infer<
  typeof createEconomicSustainabilitySchema
>;
export type UpdateEconomicSustainabilityFormData = z.infer<
  typeof updateEconomicSustainabilitySchema
>;
