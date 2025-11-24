import { createI18nFieldSchema } from "@/shared/schemas/i18n.schema";
import { z } from "zod";

export const createCaseStudySchema = z.object({
  title: createI18nFieldSchema(
    z
      .string()
      .min(10, "caseStudies.validation.titleMinLength")
      .max(120, "caseStudies.validation.titleMaxLength")
  ),
  description: createI18nFieldSchema(
    z
      .string()
      .min(30, "caseStudies.validation.descriptionMinLength")
      .max(400, "caseStudies.validation.descriptionMaxLength")
  ),
  long_description: createI18nFieldSchema(
    z
      .string()
      .min(1, "caseStudies.validation.longDescriptionMinLength")
  ),
  featured: z.boolean().optional(),
  is_featured: z.boolean().optional(),
  date: z.string().min(1, "caseStudies.validation.dateRequired"),
  image: z.array(z.any()).min(1, "caseStudies.validation.imageRequired"),
  home_image: z.array(z.any()).min(1, "caseStudies.validation.thumbnailImageRequired"),
  read_time: z.number().positive("caseStudies.validation.readTimeRequired"),
  industries_id: z
    .number()
    .positive("caseStudies.validation.industriesIdRequired"),
  country_id: z.number().positive("caseStudies.validation.countryIdRequired"),
});

export const updateCaseStudySchema = createCaseStudySchema;

export const caseStudyFiltersSchema = z.object({
  title: z.string().optional(),
  featured: z.string().optional(),
  image_id: z.string().optional(),
  industries_id: z.string().optional(),
  country_id: z.string().optional(),
  read_time: z.string().optional(),
  date: z.string().optional(),
  created_at: z.string().optional(),
  updated_at: z.string().optional(),
});

export type CreateCaseStudyFormData = z.infer<typeof createCaseStudySchema>;
export type UpdateCaseStudyFormData = z.infer<typeof updateCaseStudySchema>;
export type CaseStudyFilters = z.infer<typeof caseStudyFiltersSchema>;
