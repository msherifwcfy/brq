import { z } from "zod";
import { createI18nFieldSchema, createOptionalI18nFieldSchema } from "@/shared/schemas/i18n.schema";

const mediaSchema = z.array(
  z.object({
    id: z.number(),
    url: z.string(),
    key: z.string(),
    name: z.string().optional(),
    format: z.string(),
    mime_type: z.string(),
    size: z.number(),
  })
);

export const createAcademyFoundationTrackSchema = z.object({
  title: createI18nFieldSchema(z.string().min(1, "Title is required")),
  subtitle: createOptionalI18nFieldSchema(z.string()),
  description: createI18nFieldSchema(z.string().min(1, "Description is required")),
  image: mediaSchema.optional(),
  displayOrder: z.number().int().min(0),
});

export const updateAcademyFoundationTrackSchema = z.object({
  title: createI18nFieldSchema(z.string().min(1, "Title is required")).optional(),
  subtitle: createOptionalI18nFieldSchema(z.string()),
  description: createI18nFieldSchema(z.string().min(1, "Description is required")).optional(),
  image: mediaSchema.optional(),
  displayOrder: z.number().int().min(0).optional(),
});

export type CreateAcademyFoundationTrackFormData = z.infer<typeof createAcademyFoundationTrackSchema>;
export type UpdateAcademyFoundationTrackFormData = z.infer<typeof updateAcademyFoundationTrackSchema>;
