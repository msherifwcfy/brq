import { z } from "zod";
import { createI18nFieldSchema } from "@/shared/schemas/i18n.schema";

export const createAwardsCardsSchema = z.object({
  media: z.array(z.any()).min(1, "awardsCards.validation.mediaIdRequired"),
  name: createI18nFieldSchema(
    z
      .string()
      .min(3, "awardsCards.validation.nameMin")
      .max(100, "awardsCards.validation.nameMax")
  ),
  description: createI18nFieldSchema(
    z
      .string()
      .min(10, "awardsCards.validation.descriptionMin")
      .max(500, "awardsCards.validation.descriptionMax")
  ),
});

export const updateAwardsCardsSchema = z.object({
  media: z.array(z.any()).optional(),
  name: createI18nFieldSchema(
    z
      .string()
      .min(3, "awardsCards.validation.nameMin")
      .max(100, "awardsCards.validation.nameMax")
  ).optional(),
  description: createI18nFieldSchema(
    z
      .string()
      .min(10, "awardsCards.validation.descriptionMin")
      .max(500, "awardsCards.validation.descriptionMax")
  ).optional(),
});

export const awardsCardsFiltersSchema = z.object({
  media_id: z.string().optional(),
  name: z.string().optional(),
  description: z.string().optional(),
  created_at: z.string().optional(),
  updated_at: z.string().optional(),
});

export type CreateAwardsCardsFormData = z.infer<typeof createAwardsCardsSchema>;
export type UpdateAwardsCardsFormData = z.infer<typeof updateAwardsCardsSchema>;
export type AwardsCardsFilters = z.infer<typeof awardsCardsFiltersSchema>;
