import { z } from "zod";
import { createI18nFieldSchema } from "@/shared/schemas/i18n.schema";

export const createAboutUsCoreValueItemSchema = z.object({
  title: createI18nFieldSchema(
    z.string()
      .min(5, "Core value title must be at least 5 characters")
      .max(30, "Core value title must not exceed 30 characters")
  ),
  icon_media: z.array(
    z.object({
      id: z.number(),
      url: z.string(),
      key: z.string().optional(),
      name: z.string().optional(),
      format: z.string().optional(),
      mime_type: z.string().optional(),
      size: z.number().optional(),
    })
  ).min(1, "Icon media is required"),
  order_index: z.number().min(0),
});

export const updateAboutUsCoreValueItemSchema = z.object({
  title: createI18nFieldSchema(
    z.string()
      .min(5, "Core value title must be at least 5 characters")
      .max(30, "Core value title must not exceed 30 characters")
  ).optional(),
  icon_media: z
    .array(
      z.object({
        id: z.number(),
        url: z.string(),
        key: z.string().optional(),
        name: z.string().optional(),
        format: z.string().optional(),
        mime_type: z.string().optional(),
        size: z.number().optional(),
      })
    )
    .min(1, "Icon media is required")
    .optional(),
  order_index: z.number().min(0).optional(),
});

export const createAboutUsCoreValuesSchema = z.object({
  section_title: createI18nFieldSchema(
    z.string()
      .min(5, "Section title must be at least 5 characters")
      .max(35, "Section title must not exceed 35 characters")
  ),
  section_description: createI18nFieldSchema(
    z.string()
      .min(100, "Section description must be at least 100 characters")
      .max(300, "Section description must not exceed 300 characters")
  ),
  core_values: z.array(createAboutUsCoreValueItemSchema)
    .min(1, "At least 1 core value is required")
    .max(6, "Maximum 6 core values allowed"),
  supporting_image: z.array(
    z.object({
      id: z.number(),
      url: z.string(),
      key: z.string().optional(),
      name: z.string().optional(),
      format: z.string().optional(),
      mime_type: z.string().optional(),
      size: z.number().optional(),
    })
  ).min(1, "Supporting image is required"),
});

export const updateAboutUsCoreValuesSchema = z.object({
  section_title: createI18nFieldSchema(
    z.string()
      .min(5, "Section title must be at least 5 characters")
      .max(35, "Section title must not exceed 35 characters")
  ).optional(),
  section_description: createI18nFieldSchema(
    z.string()
      .min(100, "Section description must be at least 100 characters")
      .max(300, "Section description must not exceed 300 characters")
  ).optional(),
  core_values: z.array(createAboutUsCoreValueItemSchema)
    .min(1, "At least 1 core value is required")
    .max(6, "Maximum 6 core values allowed")
    .optional(),
  supporting_image: z.array(
    z.object({
      id: z.number(),
      url: z.string(),
      key: z.string().optional(),
      name: z.string().optional(),
      format: z.string().optional(),
      mime_type: z.string().optional(),
      size: z.number().optional(),
    })
  ).min(1, "Supporting image is required").optional(),
});

export type CreateAboutUsCoreValueItemFormData = z.infer<typeof createAboutUsCoreValueItemSchema>;
export type UpdateAboutUsCoreValueItemFormData = z.infer<typeof updateAboutUsCoreValueItemSchema>;
export type CreateAboutUsCoreValuesFormData = z.infer<typeof createAboutUsCoreValuesSchema>;
export type UpdateAboutUsCoreValuesFormData = z.infer<typeof updateAboutUsCoreValuesSchema>;
