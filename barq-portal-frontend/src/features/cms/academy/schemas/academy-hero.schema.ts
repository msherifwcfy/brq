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

export const createAcademyHeroSchema = z.object({
  logo: z.array(mediaSchema).min(1, "Logo is required"),
  title: createI18nFieldSchema(
    z.string()
      .min(20, "Title must be at least 20 characters")
      .max(80, "Title must not exceed 80 characters")
  ),
  sub_title: createI18nFieldSchema(
    z.string()
      .min(80, "Subtext must be at least 80 characters")
      .max(350, "Subtext must not exceed 350 characters")
  ),
  image: z.array(mediaSchema).min(1, "Hero image is required"),
});

export const updateAcademyHeroSchema = z.object({
  logo: z.array(mediaSchema).min(1, "Logo is required"),
  title: createI18nFieldSchema(
    z.string()
      .min(20, "Title must be at least 20 characters")
      .max(80, "Title must not exceed 80 characters")
  ).optional(),
  sub_title: createI18nFieldSchema(
    z.string()
      .min(80, "Subtext must be at least 80 characters")
      .max(350, "Subtext must not exceed 350 characters")
  ).optional(),
  image: z.array(mediaSchema).min(1, "Hero image is required"),
});

export type CreateAcademyHeroFormData = z.infer<typeof createAcademyHeroSchema>;
export type UpdateAcademyHeroFormData = z.infer<typeof updateAcademyHeroSchema>;
