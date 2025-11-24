import { z } from "zod";
import { createI18nFieldSchema } from "@/shared/schemas/i18n.schema";
import { documentSchema } from "@/shared/schemas/file.schema";

const bulletSchema = z.object({
  text: createI18nFieldSchema(
    z
      .string()
      .min(10, "Bullet text must be at least 10 characters")
      .max(100, "Bullet text must be at most 100 characters")
  ),
  icon: z.array(documentSchema).min(1, "Icon is required"),
});

export const createAutomationCloudDevOpsSchema = z.object({
  subHeadline: createI18nFieldSchema(
    z
      .string()
      .min(90, "Subheading must be at least 90 characters")
      .max(150, "Subheading must be at most 150 characters")
  ),
  image: z.array(documentSchema).optional(),
  logo: z.array(documentSchema).min(1, "Logo is required"),
  bullets: z
    .array(bulletSchema)
    .min(4, "At least 4 bullet points are required")
    .max(10, "Maximum 10 bullet points allowed"),
});

export const updateAutomationCloudDevOpsSchema = z.object({
  subHeadline: createI18nFieldSchema(
    z
      .string()
      .min(90, "Subheading must be at least 90 characters")
      .max(150, "Subheading must be at most 150 characters")
  ).optional(),
  image: z.array(documentSchema).optional(),
  logo: z.array(documentSchema).min(1, "Logo is required").optional(),
  bullets: z
    .array(bulletSchema.extend({ id: z.number().optional() }))
    .min(4, "At least 4 bullet points are required")
    .max(10, "Maximum 10 bullet points allowed")
    .optional(),
});

export type CreateAutomationCloudDevOpsFormData = z.infer<
  typeof createAutomationCloudDevOpsSchema
>;
export type UpdateAutomationCloudDevOpsFormData = z.infer<
  typeof updateAutomationCloudDevOpsSchema
>;
