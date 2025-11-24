import { z } from "zod";

export const createCitySchema = z.object({
  name: z.string().min(1, "cities.validation.cityNameRequired"),
  country_id: z.number().positive("cities.validation.countryRequired"),
  city_id_city_translations: z
    .array(
      z.object({
        name: z.string().min(1, "cities.validation.translationNameRequired"),
        language: z.enum(["ar", "en"]),
      })
    )
    .optional(),
});

export const updateCitySchema = z.object({
  name: z
    .string()
    .min(1, "cities.validation.cityNameRequired")
    .optional(),
  country_id: z.number().positive("cities.validation.countryRequired").optional(),
  city_id_city_translations: z
    .array(
      z.object({
        id: z.number().positive().optional(),
        city_id: z.number().positive().optional(),
        name: z.string().min(1, "cities.validation.translationNameRequired"),
        language: z.enum(["ar", "en"]),
      })
    )
    .optional(),
});

export const cityFiltersSchema = z.object({
  name: z.string().optional(),
  country_id: z.string().optional(),
  created_at: z.string().optional(),
  updated_at: z.string().optional(),
});

export type CreateCityFormData = z.infer<typeof createCitySchema>;
export type UpdateCityFormData = z.infer<typeof updateCitySchema>;
export type CityFilters = z.infer<typeof cityFiltersSchema>;

