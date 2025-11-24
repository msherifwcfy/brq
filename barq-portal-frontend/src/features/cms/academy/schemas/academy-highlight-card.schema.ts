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

export const createAcademyHighlightCardSchema = z.object({
  title: createI18nFieldSchema(z.string().min(1, "Title is required")),
  icon: mediaSchema.optional(),
  cardType: z.enum(["internships", "trainings", "seminars", "graduates"]),
  stat1Value: z.string().min(1, "Stat 1 value is required"),
  stat1Label: createI18nFieldSchema(z.string().min(1, "Stat 1 label is required")),
  stat2Value: z.string().optional(),
  stat2Label: createOptionalI18nFieldSchema(z.string()),
  stat3Value: z.string().optional(),
  stat3Label: createOptionalI18nFieldSchema(z.string()),
  displayOrder: z.number().int().min(0),
});

export const updateAcademyHighlightCardSchema = z.object({
  title: createI18nFieldSchema(z.string().min(1, "Title is required")).optional(),
  icon: mediaSchema.optional(),
  cardType: z.enum(["internships", "trainings", "seminars", "graduates"]).optional(),
  stat1Value: z.string().optional(),
  stat1Label: createI18nFieldSchema(z.string().min(1, "Stat 1 label is required")).optional(),
  stat2Value: z.string().optional(),
  stat2Label: createOptionalI18nFieldSchema(z.string()),
  stat3Value: z.string().optional(),
  stat3Label: createOptionalI18nFieldSchema(z.string()),
  displayOrder: z.number().int().min(0).optional(),
});

export type CreateAcademyHighlightCardFormData = z.infer<typeof createAcademyHighlightCardSchema>;
export type UpdateAcademyHighlightCardFormData = z.infer<typeof updateAcademyHighlightCardSchema>;
