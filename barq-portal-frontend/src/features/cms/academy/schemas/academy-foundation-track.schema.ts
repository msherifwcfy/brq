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

const foundationTrackCardSchema = z.object({
  id: z.number().optional(),
  image: z.array(mediaSchema).min(1, "Image is required"),
  translations: z.object({
    en: z.object({
      title: z.string()
        .min(10, "Card title must be at least 10 characters")
        .max(120, "Card title must not exceed 120 characters"),
      description: z.string()
        .min(50, "Description must be at least 50 characters")
        .max(150, "Description must not exceed 150 characters"),
    }),
    ar: z.object({
      title: z.string()
        .min(10, "Card title must be at least 10 characters")
        .max(120, "Card title must not exceed 120 characters"),
      description: z.string()
        .min(50, "Description must be at least 50 characters")
        .max(150, "Description must not exceed 150 characters"),
    }),
  }),
});

export const createAcademyProgramsOpportunitiesSchema = z.object({
  title: createI18nFieldSchema(
    z.string()
      .min(5, "Title must be at least 5 characters")
      .max(40, "Title must not exceed 40 characters")
  ),
  cards: z.array(foundationTrackCardSchema)
    .min(3, "At least 3 cards are required")
    .max(12, "Maximum 12 cards allowed"),
});

export const updateAcademyProgramsOpportunitiesSchema = z.object({
  title: createI18nFieldSchema(
    z.string()
      .min(5, "Title must be at least 5 characters")
      .max(40, "Title must not exceed 40 characters")
  ).optional(),
  cards: z.array(foundationTrackCardSchema)
    .min(3, "At least 3 cards are required")
    .max(12, "Maximum 12 cards allowed")
    .optional(),
});

export type FoundationTrackCardFormData = z.infer<typeof foundationTrackCardSchema>;
export type CreateAcademyProgramsOpportunitiesFormData = z.infer<typeof createAcademyProgramsOpportunitiesSchema>;
export type UpdateAcademyProgramsOpportunitiesFormData = z.infer<typeof updateAcademyProgramsOpportunitiesSchema>;
