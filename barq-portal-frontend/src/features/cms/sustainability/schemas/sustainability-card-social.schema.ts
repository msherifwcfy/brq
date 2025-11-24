import { z } from "zod";
import { createI18nFieldSchema } from "@/shared/schemas/i18n.schema";
import { documentSchema } from "@/shared/schemas/file.schema";

export const createCardSocialSchema = z.object({
  title: createI18nFieldSchema(
    z
      .string()
      .min(25, "Title must be at least 25 characters")
      .max(60, "Title must be at most 60 characters"),
  ),
  description: createI18nFieldSchema(
    z
      .string()
      .min(60, "Card description must be at least 60 characters")
      .max(180, "Card description must be at most 180 characters")
  ),
  icon: z
    .array(documentSchema)
    .max(1, "Only one icon per card is allowed")
    .optional(),
});

export const updateCardSocialSchema = z.object({
  title: createI18nFieldSchema(
    z
      .string()
      .min(25, "Title must be at least 25 characters")
      .max(60, "Title must be at most 60 characters")
  ).optional(),
  description: createI18nFieldSchema(
    z
      .string()
      .min(60, "Card description must be at least 60 characters")
      .max(180, "Card description must be at most 180 characters")
  ).optional(),
  icon: z
    .array(documentSchema)
    .max(1, "Only one icon per card is allowed")
    .optional(),
});

export type CreateCardSocialFormData = z.infer<typeof createCardSocialSchema>;
export type UpdateCardSocialFormData = z.infer<typeof updateCardSocialSchema>;
