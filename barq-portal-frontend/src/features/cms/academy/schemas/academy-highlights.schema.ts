import { z } from "zod";
import { createI18nFieldSchema } from "@/shared/schemas/i18n.schema";

export const createAcademyHighlightsSchema = z.object({
  sectionTitle: createI18nFieldSchema(z.string().min(1, "Section title is required")),
  sectionSubtitle: createI18nFieldSchema(z.string().min(1, "Section subtitle is required")),
  sectionDescription: createI18nFieldSchema(z.string().min(1, "Section description is required")),
});

export const updateAcademyHighlightsSchema = z.object({
  sectionTitle: createI18nFieldSchema(z.string().min(1, "Section title is required")).optional(),
  sectionSubtitle: createI18nFieldSchema(z.string().min(1, "Section subtitle is required")).optional(),
  sectionDescription: createI18nFieldSchema(z.string().min(1, "Section description is required")).optional(),
});

export type CreateAcademyHighlightsFormData = z.infer<typeof createAcademyHighlightsSchema>;
export type UpdateAcademyHighlightsFormData = z.infer<typeof updateAcademyHighlightsSchema>;
