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
      .min(3, "Title must be at least 3 characters")
      .max(100, "Title must be at most 100 characters")
  ),
  sub_title: createI18nFieldSchema(
    z
      .string()
      .min(3, "Subtitle must be at least 3 characters")
      .max(200, "Subtitle must be at most 200 characters")
  ),
  icon: z.array(mediaSchema).max(1, "Only one icon is allowed").optional(),
});

export const createMobilitySchema = z.object({
  text: createI18nFieldSchema(
    z
      .string()
      .min(10, "Text must be at least 10 characters")
      .max(500, "Text must be at most 500 characters")
  ),
  logo: z.array(mediaSchema).max(1, "Only one logo is allowed").optional(),
  mobility_cards: z.array(mobilityCardSchema).optional(),
});

export type CreateMobilityFormData = z.infer<typeof createMobilitySchema>;
