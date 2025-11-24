import { z } from "zod";
import { createI18nFieldSchema } from "@/shared/schemas/i18n.schema";

export const createAboutUsGroupSchema = z.object({
  title: createI18nFieldSchema(
    z.string()
      .min(15, "Title must be at least 15 characters")
      .max(50, "Title must not exceed 50 characters")
  ),
  description: createI18nFieldSchema(
    z.string()
      .min(100, "Description must be at least 100 characters")
      .max(300, "Description must not exceed 300 characters")
  ),
  group_logo: z.array(
    z.object({
      id: z.number(),
      url: z.string(),
      key: z.string().optional(),
      name: z.string().optional(),
      format: z.string().optional(),
      mime_type: z.string().optional(),
      size: z.number().optional(),
    })
  ).min(1, "Group logo is required"),
  stat_1_value: z.string()
    .min(1, "Stat 1 value is required")
    .regex(/^\d{1,5}(\.\d+)?$/, "Stat 1 value must be 1-5 digits (decimals accepted)"),
  stat_1_label: createI18nFieldSchema(
    z.string()
      .min(5, "Stat 1 label must be at least 5 characters")
      .max(35, "Stat 1 label must not exceed 35 characters")
  ),
  stat_2_value: z.string()
    .min(1, "Stat 2 value is required")
    .regex(/^\d{1,5}(\.\d+)?$/, "Stat 2 value must be 1-5 digits (decimals accepted)"),
  stat_2_label: createI18nFieldSchema(
    z.string()
      .min(5, "Stat 2 label must be at least 5 characters")
      .max(35, "Stat 2 label must not exceed 35 characters")
  ),
  stat_3_value: z.string()
    .min(1, "Stat 3 value is required")
    .regex(/^\d{1,5}(\.\d+)?$/, "Stat 3 value must be 1-5 digits (decimals accepted)"),
  stat_3_label: createI18nFieldSchema(
    z.string()
      .min(5, "Stat 3 label must be at least 5 characters")
      .max(35, "Stat 3 label must not exceed 35 characters")
  ),
});

export const updateAboutUsGroupSchema = z.object({
  title: createI18nFieldSchema(
    z.string()
      .min(15, "Title must be at least 15 characters")
      .max(50, "Title must not exceed 50 characters")
  ).optional(),
  description: createI18nFieldSchema(
    z.string()
      .min(100, "Description must be at least 100 characters")
      .max(300, "Description must not exceed 300 characters")
  ).optional(),
  group_logo: z.array(
    z.object({
      id: z.number(),
      url: z.string(),
      key: z.string().optional(),
      name: z.string().optional(),
      format: z.string().optional(),
      mime_type: z.string().optional(),
      size: z.number().optional(),
    })
  ).min(1, "Group logo is required").optional(),
  stat_1_value: z.string()
    .min(1, "Stat 1 value is required")
    .regex(/^\d{1,5}(\.\d+)?$/, "Stat 1 value must be 1-5 digits (decimals accepted)")
    .optional(),
  stat_1_label: createI18nFieldSchema(
    z.string()
      .min(5, "Stat 1 label must be at least 5 characters")
      .max(35, "Stat 1 label must not exceed 35 characters")
  ).optional(),
  stat_2_value: z.string()
    .min(1, "Stat 2 value is required")
    .regex(/^\d{1,5}(\.\d+)?$/, "Stat 2 value must be 1-5 digits (decimals accepted)")
    .optional(),
  stat_2_label: createI18nFieldSchema(
    z.string()
      .min(5, "Stat 2 label must be at least 5 characters")
      .max(35, "Stat 2 label must not exceed 35 characters")
  ).optional(),
  stat_3_value: z.string()
    .min(1, "Stat 3 value is required")
    .regex(/^\d{1,5}(\.\d+)?$/, "Stat 3 value must be 1-5 digits (decimals accepted)")
    .optional(),
  stat_3_label: createI18nFieldSchema(
    z.string()
      .min(5, "Stat 3 label must be at least 5 characters")
      .max(35, "Stat 3 label must not exceed 35 characters")
  ).optional(),
});

export type CreateAboutUsGroupFormData = z.infer<typeof createAboutUsGroupSchema>;
export type UpdateAboutUsGroupFormData = z.infer<typeof updateAboutUsGroupSchema>;
