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

const mobilityCardSchema = z.object({
  id: z.number().optional(),
  title: createI18nFieldSchema(
    z
      .string()
      .min(10, "Title must be at least 10 characters")
      .max(50, "Title must be at most 50 characters")
  ),
  sub_title: createI18nFieldSchema(
    z
      .string()
      .min(40, "Subtitle must be at least 40 characters")
      .max(150, "Subtitle must be at most 150 characters")
  ),
  icon: z
    .array(mediaSchema)
    .min(1, "Icon is required")
    .max(1, "Only one icon is allowed"),
});

export const createMobilitySchema = z.object({
  text: createI18nFieldSchema(
    z
      .string()
      .min(90, "Text must be at least 90 characters")
      .max(150, "Text must be at most 150 characters")
  ),
  logo: z.array(mediaSchema).min(1, "Logo is required").max(1, "Only one logo is allowed"),
  mobility_cards: z.array(mobilityCardSchema).min(2, "At least 2 cards are required").max(6, "At most 6 cards are allowed"),
});

export type CreateMobilityFormData = z.infer<typeof createMobilitySchema>;
