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

export const createEcosystemSustainabilitySchema = z.object({
  title: createI18nFieldSchema(
    z
      .string()
      .min(20, "Title must be at least 20 characters")
      .max(50, "Title must be at most 50 characters")
  ),
  description: createI18nFieldSchema(
    z
      .string()
      .min(250, "Description must be at least 250 characters")
      .max(750, "Description must be at most 750 characters")
  ),
  media: z.array(imageSchema).max(1, "Only one image is allowed").optional(),
});

export const updateEcosystemSustainabilitySchema = z.object({
  title: createI18nFieldSchema(
    z
      .string()
      .min(20, "Title must be at least 20 characters")
      .max(50, "Title must be at most 50 characters")
  ).optional(),
  description: createI18nFieldSchema(
    z
      .string()
      .min(250, "Description must be at least 250 characters")
      .max(750, "Description must be at most 750 characters")
  ).optional(),
  media: z.array(imageSchema).max(1, "Only one image is allowed").optional(),
});

export type CreateEcosystemSustainabilityFormData = z.infer<
  typeof createEcosystemSustainabilitySchema
>;
export type UpdateEcosystemSustainabilityFormData = z.infer<
  typeof updateEcosystemSustainabilitySchema
>;
