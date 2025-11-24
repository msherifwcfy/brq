import { z } from "zod";
import { createI18nFieldSchema } from "@/shared/schemas/i18n.schema";

const bulletSchema = z.object({
  text: createI18nFieldSchema(
    z
      .string()
      .min(5, "Bullet text must be at least 5 characters")
      .max(50, "Bullet text must be at most 50 characters")
  ),
  icon: z
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
    .min(1, "Icon is required"),
});

export const createAutomationDataManagementSchema = z.object({
  subHeadline: createI18nFieldSchema(
    z
      .string()
      .min(10, "Subtitle must be at least 10 characters")
      .max(150, "Subtitle must be at most 150 characters")
  ),
  image: z
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
    .min(1, "Image is required"),
  logo: z
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
    .min(1, "Logo is required"),
  bullets: z
    .array(bulletSchema)
    .min(4, "At least 4 bullet points are required")
    .max(10, "Maximum 10 bullet points allowed"),
});

export const updateAutomationDataManagementSchema = z.object({
  subHeadline: createI18nFieldSchema(
    z
      .string()
      .min(10, "Subtitle must be at least 10 characters")
      .max(150, "Subtitle must be at most 150 characters")
  ).optional(),
  image: z
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
    .min(1, "Image is required")
    .optional(),
  logo: z
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
    .min(1, "Logo is required")
    .optional(),
  bullets: z
    .array(bulletSchema.extend({ id: z.number().optional() }))
    .min(4, "At least 4 bullet points are required")
    .max(10, "Maximum 10 bullet points allowed")
    .optional(),
});

export type CreateAutomationDataManagementFormData = z.infer<
  typeof createAutomationDataManagementSchema
>;
export type UpdateAutomationDataManagementFormData = z.infer<
  typeof updateAutomationDataManagementSchema
>;
