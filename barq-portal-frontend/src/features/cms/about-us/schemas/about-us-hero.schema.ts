import { z } from "zod";
import { createI18nFieldSchema } from "@/shared/schemas/i18n.schema";

export const createAboutUsHeroSchema = z.object({
  title: createI18nFieldSchema(
    z.string()
      .min(25, "Title must be at least 25 characters")
      .max(80, "Title must not exceed 80 characters")
  ),
  description: createI18nFieldSchema(
    z.string()
      .min(150, "Description must be at least 150 characters")
      .max(500, "Description must not exceed 500 characters")
  ),
  background_media: z.array(
    z.object({
      id: z.number(),
      url: z.string(),
      key: z.string().optional(),
      name: z.string().optional(),
      format: z.string().optional(),
      mime_type: z.string().optional(),
      size: z.number().optional(),
    })
  ).min(1, "Background media is required"),
});

export const updateAboutUsHeroSchema = z.object({
  title: createI18nFieldSchema(
    z.string()
      .min(25, "Title must be at least 25 characters")
      .max(80, "Title must not exceed 80 characters")
  ).optional(),
  description: createI18nFieldSchema(
    z.string()
      .min(150, "Description must be at least 150 characters")
      .max(500, "Description must not exceed 500 characters")
  ).optional(),
  background_media: z
    .array(
      z.object({
        id: z.number(),
        url: z.string(),
        key: z.string().optional(),
        name: z.string().optional(),
        format: z.string().optional(),
        mime_type: z.string().optional(),
        size: z.number().optional(),
      })
    )
    .min(1, "Background media is required")
    .optional(),
});

export type CreateAboutUsHeroFormData = z.infer<typeof createAboutUsHeroSchema>;
export type UpdateAboutUsHeroFormData = z.infer<typeof updateAboutUsHeroSchema>;
