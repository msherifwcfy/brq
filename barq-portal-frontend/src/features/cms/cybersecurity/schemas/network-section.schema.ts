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

const networkSectionCardSchema = z.object({
  text: createI18nFieldSchema(
    z
      .string()
      .min(10, "Text must be at least 10 characters")
      .max(50, "Text must not exceed 50 characters")
  ),
  icon: z
    .array(mediaSchema)
    .min(1, "Icon is required")
    .max(1, "Only one icon per card is allowed"),
});

export const createNetworkSectionSchema = z.object({
  text: createI18nFieldSchema(
    z
      .string()
      .min(90, "Subtext must be at least 90 characters")
      .max(150, "Subtext must not exceed 150 characters")
  ),
  logo: z.array(mediaSchema).min(1, "Logo is required"),
  cards: z
    .array(networkSectionCardSchema)
    .min(1, "At least 1 card is required")
    .max(10, "At most 10 cards are allowed"),
});

export type CreateNetworkSectionFormData = z.infer<
  typeof createNetworkSectionSchema
>;

export const createNetworkSectionCardSchema = z.object({
  text: createI18nFieldSchema(
    z
      .string()
      .min(10, "Text must be at least 10 characters")
      .max(50, "Text must not exceed 50 characters")
  ),
  icon: z.array(mediaSchema).min(1, "Icon is required"),
  row_number: z.number().min(1).max(2),
  position: z.number().min(1).max(5),
});

export type CreateNetworkSectionCardFormData = z.infer<
  typeof createNetworkSectionCardSchema
>;
