import { z } from "zod";

export const createHearAboutUsOptionSchema = z.object({
  title: z.string().min(1, "hearAboutUsOptions.validation.titleRequired"),
  contact_us_hear_about_drop_id_contact_us_hear_about_drop_translations: z
    .array(
      z.object({
        title: z.string().min(1, "hearAboutUsOptions.validation.translationTitleRequired"),
        language: z.enum(["ar", "en"]),
      })
    )
    .optional(),
});

export const updateHearAboutUsOptionSchema = z.object({
  title: z
    .string()
    .min(1, "hearAboutUsOptions.validation.titleRequired")
    .optional(),
  contact_us_hear_about_drop_id_contact_us_hear_about_drop_translations: z
    .array(
      z.object({
        id: z.number().positive().optional(),
        contact_us_hear_about_drop_id: z.number().positive().optional(),
        title: z.string().min(1, "hearAboutUsOptions.validation.translationTitleRequired"),
        language: z.enum(["ar", "en"]),
      })
    )
    .optional(),
});

export const hearAboutUsOptionFiltersSchema = z.object({
  title: z.string().optional(),
  created_at: z.string().optional(),
  updated_at: z.string().optional(),
});

export type CreateHearAboutUsOptionFormData = z.infer<typeof createHearAboutUsOptionSchema>;
export type UpdateHearAboutUsOptionFormData = z.infer<typeof updateHearAboutUsOptionSchema>;
export type HearAboutUsOptionFilters = z.infer<typeof hearAboutUsOptionFiltersSchema>;

