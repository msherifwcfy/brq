import { z } from "zod";

export const createIndustrySchema = z.object({
  name: z.string().min(1, "industries.validation.industryNameRequired"),
  industry_id_industry_translations: z
    .array(
      z.object({
        name: z
          .string()
          .min(1, "industries.validation.translationNameRequired"),
        language: z.enum(["ar", "en"]),
      })
    )
    .optional(),
});

export const updateIndustrySchema = z.object({
  name: z
    .string()
    .min(1, "industries.validation.industryNameRequired")
    .optional(),
  industry_id_industry_translations: z
    .array(
      z.object({
        id: z.number().positive().optional(),
        industry_id: z.number().positive().optional(),
        name: z
          .string()
          .min(1, "industries.validation.translationNameRequired"),
        language: z.enum(["ar", "en"]),
      })
    )
    .optional(),
});

export const industryFiltersSchema = z.object({
  name: z.string().optional(),
  created_at: z.string().optional(),
  updated_at: z.string().optional(),
});

export type CreateIndustryFormData = z.infer<typeof createIndustrySchema>;
export type UpdateIndustryFormData = z.infer<typeof updateIndustrySchema>;
export type IndustryFilters = z.infer<typeof industryFiltersSchema>;
