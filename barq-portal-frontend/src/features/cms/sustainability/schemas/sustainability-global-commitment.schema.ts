import { z } from "zod";
import { createI18nFieldSchema } from "@/shared/schemas/i18n.schema";

// Icon validation schema for SVG/PNG, <1MB each
const iconSchema = z.object({
  id: z.number().optional(),
  url: z.string().url(),
  key: z.string(),
  name: z.string(),
  format: z.string(),
  mime_type: z
    .string()
    .refine(
      (type) => ["image/svg+xml", "image/png"].includes(type),
      "Only SVG and PNG icons are allowed"
    ),
  size: z.number().refine(
    (size) => size < 1024 * 1024, // 1MB in bytes
    "Icon size must be less than 1MB"
  ),
});

export const createGlobalCommitmentSchema = z.object({
  title: createI18nFieldSchema(
    z
      .string()
      .min(15, "Title must be at least 15 characters")
      .max(50, "Title must be at most 50 characters")
  ),
  description: createI18nFieldSchema(
    z.string().min(1, "Description is required").max(500, "Description must be at most 500 characters")
  ),
  icons: z
    .array(iconSchema)
    .min(4, "At least 4 icons are required")
    .max(18, "At most 18 icons are allowed"),
});

export const updateGlobalCommitmentSchema = z.object({
  title: createI18nFieldSchema(
    z
      .string()
      .min(15, "Title must be at least 15 characters")
      .max(50, "Title must be at most 50 characters")
  ).optional(),
  description: createI18nFieldSchema(
    z.string().min(1, "Description is required").max(500, "Description must be at most 500 characters")
  ).optional(),
  icons: z
    .array(iconSchema)
    .min(4, "At least 4 icons are required")
    .max(18, "At most 18 icons are allowed")
    .optional(),
});

export type CreateGlobalCommitmentFormData = z.infer<
  typeof createGlobalCommitmentSchema
>;
export type UpdateGlobalCommitmentFormData = z.infer<
  typeof updateGlobalCommitmentSchema
>;
