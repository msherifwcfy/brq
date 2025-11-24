import { z } from "zod";
import { createI18nFieldSchema } from "@/shared/schemas/i18n.schema";

export const createAutomationHeroSchema = z.object({
  title: createI18nFieldSchema(
    z
      .string()
      .min(30, "Title must be at least 30 characters")
      .max(80, "Title must be at most 80 characters")
  ),
  description: createI18nFieldSchema(
    z
      .string()
      .min(150, "Subheading must be at least 150 characters")
      .max(350, "Subheading must be at most 350 characters")
  ),
  hero: z
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
    .min(1, "Hero image is required"),
  logos: z
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
    .length(4, "Exactly 4 logos are required"),
});

export const updateAutomationHeroSchema = z.object({
  title: createI18nFieldSchema(
    z
      .string()
      .min(30, "Title must be at least 30 characters")
      .max(80, "Title must be at most 80 characters")
  ).optional(),
  description: createI18nFieldSchema(
    z
      .string()
      .min(150, "Subheading must be at least 150 characters")
      .max(350, "Subheading must be at most 350 characters")
  ).optional(),
  hero: z
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
    .min(1, "Hero image is required")
    .optional(),
  logos: z
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
    .length(4, "Exactly 4 logos are required")
    .optional(),
});

export type CreateAutomationHeroFormData = z.infer<
  typeof createAutomationHeroSchema
>;
export type UpdateAutomationHeroFormData = z.infer<
  typeof updateAutomationHeroSchema
>;
