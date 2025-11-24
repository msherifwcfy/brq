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

const cardSchema = z.object({
  title: createI18nFieldSchema(
    z
      .string()
      .min(10, "Title must be at least 10 characters")
      .max(50, "Title must not exceed 50 characters")
  ),
  icon: z.array(mediaSchema).min(1, "Icon is required"),
});

export const createCybersecurityDataCenterSchema = z.object({
  text: createI18nFieldSchema(
    z
      .string()
      .min(90, "Subtext must be at least 90 characters")
      .max(150, "Subtext must not exceed 150 characters")
  ),
  logo: z.array(mediaSchema).min(1, "Logo is required"),
  cards: z.array(cardSchema),
});

export type CreateCybersecurityDataCenterFormData = z.infer<
  typeof createCybersecurityDataCenterSchema
>;
