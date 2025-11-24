import { z } from "zod";
import { createI18nFieldSchema } from "@/shared/schemas/i18n.schema";

// Icon validation schema for card icons
const cardIconSchema = z.object({
  id: z.number().optional(),
  url: z.string().url(),
  key: z.string(),
  name: z.string(),
  format: z.string(),
  mime_type: z
    .string()
    .refine(
      (type) =>
        ["image/svg+xml", "image/png", "image/jpeg", "image/webp"].includes(
          type
        ),
      "Only SVG, PNG, JPG, and WebP icons are allowed"
    ),
  size: z.number().refine(
    (size) => size <= 2 * 1024 * 1024, // 2MB in bytes
    "Icon size must be less than 2MB"
  ),
});

export const createCardSocialSchema = z.object({
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
  icon: z
    .array(cardIconSchema)
    .max(1, "Only one icon per card is allowed")
    .optional(),
});

export const updateCardSocialSchema = z.object({
  title: createI18nFieldSchema(
    z
      .string()
      .min(15, "Card title must be at least 15 characters")
      .max(40, "Card title must be at most 40 characters")
  ).optional(),
  description: createI18nFieldSchema(
    z
      .string()
      .min(60, "Card description must be at least 60 characters")
      .max(180, "Card description must be at most 180 characters")
  ).optional(),
  icon: z
    .array(cardIconSchema)
    .max(1, "Only one icon per card is allowed")
    .optional(),
});

export type CreateCardSocialFormData = z.infer<typeof createCardSocialSchema>;
export type UpdateCardSocialFormData = z.infer<typeof updateCardSocialSchema>;
