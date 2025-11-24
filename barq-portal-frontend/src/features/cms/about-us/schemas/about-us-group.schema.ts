import { z } from "zod";
import { createI18nFieldSchema } from "@/shared/schemas/i18n.schema";

const cardSchema = z.object({
  id: z.string().optional(),
  number: z.string()
    .min(1, "Value is required")
    .regex(/^\d{1,5}(\.\d+)?$/, "Value must be 1-5 digits (decimals accepted)"),
  label: createI18nFieldSchema(
    z.string()
      .min(5, "Label must be at least 5 characters")
      .max(35, "Label must not exceed 35 characters")
  ),
});

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
  cards: z.array(cardSchema).min(1, "At least one card is required"),
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
  cards: z.array(cardSchema).min(1, "At least one card is required").optional(),
});

export type CreateAboutUsGroupFormData = z.infer<typeof createAboutUsGroupSchema>;
export type UpdateAboutUsGroupFormData = z.infer<typeof updateAboutUsGroupSchema>;
