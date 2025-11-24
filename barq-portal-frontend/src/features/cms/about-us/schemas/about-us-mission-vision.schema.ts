import { z } from "zod";
import { createI18nFieldSchema } from "@/shared/schemas/i18n.schema";

const mediaSchema = z.object({
  id: z.number(),
  url: z.string(),
  key: z.string().optional(),
  name: z.string().optional(),
  format: z.string().optional(),
  mime_type: z.string().optional(),
  size: z.number().optional(),
});

export const cardSchema = z.object({
  id: z.string().optional(),
  title: createI18nFieldSchema(
    z.string()
      .min(5, "Card title must be at least 5 characters")
      .max(30, "Card title must not exceed 30 characters")
  ),
  description: createI18nFieldSchema(
    z.string()
      .min(30, "Card description must be at least 30 characters")
      .max(350, "Card description must not exceed 350 characters")
  ),
  icon_media: z.array(mediaSchema).min(1, "Icon is required").max(1, "Only one icon is allowed"),
});

export const createAboutUsMissionVisionSchema = z.object({
  cards: z
    .array(cardSchema)
    .length(2, "Exactly 2 cards are required: Mission and Vision")
});

export const updateAboutUsMissionVisionSchema = z.object({
  cards: z
    .array(cardSchema)
    .length(2, "Exactly 2 cards are required: Mission and Vision")
});

export type CardFormData = z.infer<typeof cardSchema>;
export type CreateAboutUsMissionVisionFormData = z.infer<typeof createAboutUsMissionVisionSchema>;
export type UpdateAboutUsMissionVisionFormData = z.infer<typeof updateAboutUsMissionVisionSchema>;
