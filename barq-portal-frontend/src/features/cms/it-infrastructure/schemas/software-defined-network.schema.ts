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
    z
      .string()
      .min(3, "Card text must be at least 3 characters")
      .max(200, "Card text must be at most 200 characters")
  ),
  icon: z
    .array(mediaSchema)
    .min(1, "Icon is required")
    .max(1, "Only one icon is allowed"),
});

export const createSoftwareDefinedNetworkSchema = z.object({
  text: createI18nFieldSchema(
    z
      .string()
      .min(10, "Text must be at least 10 characters")
      .max(500, "Text must be at most 500 characters")
  ),
  logo: z.array(mediaSchema).max(1, "Only one logo is allowed").optional(),
  image: z.array(mediaSchema).max(1, "Only one image is allowed").optional(),
  cards: z.array(cardSchema).optional(),
});

export type CreateSoftwareDefinedNetworkFormData = z.infer<
  typeof createSoftwareDefinedNetworkSchema
>;
