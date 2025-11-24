import { z } from "zod";

export const createRequestTypeSchema = z.object({
  title: z.string().min(1, "requestTypes.validation.titleRequired"),
  contact_us_request_type_id_contact_us_request_type_translations: z
    .array(
      z.object({
        title: z.string().min(1, "requestTypes.validation.translationTitleRequired"),
        language: z.enum(["ar", "en"]),
      })
    )
    .optional(),
});

export const updateRequestTypeSchema = z.object({
  title: z
    .string()
    .min(1, "requestTypes.validation.titleRequired")
    .optional(),
  contact_us_request_type_id_contact_us_request_type_translations: z
    .array(
      z.object({
        id: z.number().positive().optional(),
        contact_us_request_type_id: z.number().positive().optional(),
        title: z.string().min(1, "requestTypes.validation.translationTitleRequired"),
        language: z.enum(["ar", "en"]),
      })
    )
    .optional(),
});

export const requestTypeFiltersSchema = z.object({
  title: z.string().optional(),
  created_at: z.string().optional(),
  updated_at: z.string().optional(),
});

export type CreateRequestTypeFormData = z.infer<typeof createRequestTypeSchema>;
export type UpdateRequestTypeFormData = z.infer<typeof updateRequestTypeSchema>;
export type RequestTypeFilters = z.infer<typeof requestTypeFiltersSchema>;
