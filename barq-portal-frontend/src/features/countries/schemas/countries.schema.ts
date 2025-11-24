import { z } from "zod";

export const createCountrySchema = z.object({
  name: z.string().min(1, "countries.validation.countryNameRequired"),
  country_id_country_translations: z
    .array(
      z.object({
        name: z.string().min(1, "countries.validation.translationNameRequired"),
        language: z.enum(["ar", "en"]),
      })
    )
    .optional(),
});

export const updateCountrySchema = z.object({
  name: z
    .string()
    .min(1, "countries.validation.countryNameRequired")
    .optional(),
  country_id_country_translations: z
    .array(
      z.object({
        id: z.number().positive().optional(),
        country_id: z.number().positive().optional(),
        name: z.string().min(1, "countries.validation.translationNameRequired"),
        language: z.enum(["ar", "en"]),
      })
    )
    .optional(),
});

export const countryFiltersSchema = z.object({
  name: z.string().optional(),
  created_at: z.string().optional(),
  updated_at: z.string().optional(),
});

export type CreateCountryFormData = z.infer<typeof createCountrySchema>;
export type UpdateCountryFormData = z.infer<typeof updateCountrySchema>;
export type CountryFilters = z.infer<typeof countryFiltersSchema>;
