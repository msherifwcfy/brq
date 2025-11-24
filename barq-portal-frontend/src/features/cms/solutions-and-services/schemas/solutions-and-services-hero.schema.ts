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

export const createSolutionsAndServicesHeroSchema = z.object({
  title: createI18nFieldSchema(
    z
      .string()
      .min(30, "Title must be at least 30 characters")
      .max(80, "Title must not exceed 80 characters")
  ),
  sub_title: createI18nFieldSchema(
    z
      .string()
      .min(100, "Subtitle must be at least 100 characters")
      .max(250, "Subtitle must not exceed 250 characters")
  ),
  background_media: z.array(mediaSchema).min(1, "Background media is required"),
});

export const updateSolutionsAndServicesHeroSchema = z.object({
  title: createI18nFieldSchema(
    z
      .string()
      .min(30, "Title must be at least 30 characters")
      .max(80, "Title must not exceed 80 characters")
  ).optional(),
  sub_title: createI18nFieldSchema(
    z
      .string()
      .min(100, "Subtitle must be at least 100 characters")
      .max(250, "Subtitle must not exceed 250 characters")
  ).optional(),
  background_media: z
    .array(mediaSchema)
    .min(1, "Background media is required")
    .optional(),
});

export type CreateSolutionsAndServicesHeroFormData = z.infer<
  typeof createSolutionsAndServicesHeroSchema
>;
export type UpdateSolutionsAndServicesHeroFormData = z.infer<
  typeof updateSolutionsAndServicesHeroSchema
>;

