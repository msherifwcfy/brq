import { z } from "zod";
import { createI18nFieldSchema } from "@/shared/schemas/i18n.schema";

const mediaSchema = z.object({
  id: z.number().optional(),
  url: z.string().url(),
  key: z.string(),
  name: z.string().optional(),
  format: z.string(),
  mime_type: z.string(),
  size: z.number(),
});

const cardSchema = z.object({
  id: z.number().optional(),
  text: createI18nFieldSchema(
    z.string().min(10, "Card text must be at least 10 characters").max(50, "Card text must be at most 50 characters")
  ),
  icon: z
    .array(mediaSchema)
    .min(1, "Icon is required")
    .max(1, "Only one icon is allowed")
    .optional(),
});

export const createNetworkSectionSchema = z.object({
  text: createI18nFieldSchema(
    z.string().min(90, "Text must be at least 90 characters").max(150, "Text must be at most 150 characters")
  ),
  logo: z.array(mediaSchema).min(1, "Logo is required").max(1, "Only one logo is allowed"),
  cards: z.array(cardSchema).min(1, "At least 1 card is required").max(5, "At most 5 cards are allowed"),
});

export type CreateNetworkSectionFormData = z.infer<typeof createNetworkSectionSchema>;


