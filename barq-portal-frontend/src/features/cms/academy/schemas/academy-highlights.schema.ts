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

const highlightCardTitleSchema = z.string()
  .min(5, "Card title must be at least 5 characters")
  .max(40, "Card title must not exceed 40 characters");

const highlightCardStatLabelSchema = z.string()
  .min(5, "Stat label must be at least 5 characters")
  .max(60, "Stat label must not exceed 60 characters");

const highlightCardSchema = z.object({
  title: createI18nFieldSchema(highlightCardTitleSchema),
  state_title_one: createI18nFieldSchema(highlightCardStatLabelSchema),
  state_number_one: z.number().min(0, "Stat number must be positive"),
  state_title_two: createI18nFieldSchema(highlightCardStatLabelSchema),
  state_number_two: z.number().min(0, "Stat number must be positive"),
  state_title_three: createI18nFieldSchema(highlightCardStatLabelSchema),
  state_number_three: z.number().min(0, "Stat number must be positive"),
  state_title_four: createI18nFieldSchema(highlightCardStatLabelSchema),
  state_number_four: z.number().min(0, "Stat number must be positive"),
  icon: z.array(mediaSchema).min(1, "Icon is required"),
});

export const createAcademyHighlightsSchema = z.object({
  title: createI18nFieldSchema(
    z.string()
      .min(5, "Title must be at least 5 characters")
      .max(40, "Title must not exceed 40 characters")
  ),
  sub_title: createI18nFieldSchema(
    z.string()
      .min(50, "Subtext must be at least 50 characters")
      .max(250, "Subtext must not exceed 250 characters")
  ),
  cards: z.array(highlightCardSchema)
    .min(1, "At least 1 card is required")
    .max(4, "Maximum 4 cards allowed"),
});

export const updateAcademyHighlightsSchema = z.object({
  title: createI18nFieldSchema(
    z.string()
      .min(5, "Title must be at least 5 characters")
      .max(40, "Title must not exceed 40 characters")
  ).optional(),
  sub_title: createI18nFieldSchema(
    z.string()
      .min(50, "Subtext must be at least 50 characters")
      .max(250, "Subtext must not exceed 250 characters")
  ).optional(),
  cards: z.array(highlightCardSchema)
    .min(1, "At least 1 card is required")
    .max(4, "Maximum 4 cards allowed")
    .optional(),
});

export type HighlightCardFormData = z.infer<typeof highlightCardSchema>;
export type CreateAcademyHighlightsFormData = z.infer<typeof createAcademyHighlightsSchema>;
export type UpdateAcademyHighlightsFormData = z.infer<typeof updateAcademyHighlightsSchema>;
