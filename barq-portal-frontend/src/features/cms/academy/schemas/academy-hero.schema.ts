import { z } from "zod";
import { createI18nFieldSchema } from "@/shared/schemas/i18n.schema";

const mediaSchema = z.array(
  z.object({
    id: z.number(),
    url: z.string(),
    key: z.string(),
    size: z.number(),
    mime_type: z.string(),
    format: z.string(),
    name: z.string().optional(),
  })
);

export const createAcademyHeroSchema = z.object({
  logo: mediaSchema.optional(),
  title: createI18nFieldSchema(z.string().min(1, "Title is required")),
  description: createI18nFieldSchema(z.string().min(1, "Description is required")),
  backgroundImage: mediaSchema.optional(),
});

export const updateAcademyHeroSchema = z.object({
  logo: mediaSchema.optional(),
  title: createI18nFieldSchema(z.string().min(1, "Title is required")).optional(),
  description: createI18nFieldSchema(z.string().min(1, "Description is required")).optional(),
  backgroundImage: mediaSchema.optional(),
});

export type CreateAcademyHeroFormData = z.infer<typeof createAcademyHeroSchema>;
export type UpdateAcademyHeroFormData = z.infer<typeof updateAcademyHeroSchema>;
