import { z } from "zod";
import { createI18nFieldSchema } from "@/shared/schemas/i18n.schema";

export const createLeadershipSchema = z.object({
  quote: createI18nFieldSchema(
    z.string().min(100, "Quote must be at least 100 characters").max(250, "Quote must not exceed 250 characters")
  ),
  name: createI18nFieldSchema(
    z.string().min(5, "Name must be at least 5 characters").max(30, "Name must not exceed 30 characters")
  ),
  position: createI18nFieldSchema(
    z.string().min(10, "Role must be at least 10 characters").max(50, "Role must not exceed 50 characters")
  ),
  media: z
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
    .optional(),
});

export const updateLeadershipSchema = z.object({
  quote: createI18nFieldSchema(
    z.string().min(100, "Quote must be at least 100 characters").max(250, "Quote must not exceed 250 characters")
  ).optional(),
  name: createI18nFieldSchema(
    z.string().min(5, "Name must be at least 5 characters").max(30, "Name must not exceed 30 characters")
  ).optional(),
  position: createI18nFieldSchema(
    z.string().min(10, "Role must be at least 10 characters").max(50, "Role must not exceed 50 characters")
  ).optional(),
  media: z
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
    .optional(),
});

export type CreateLeadershipFormData = z.infer<typeof createLeadershipSchema>;
export type UpdateLeadershipFormData = z.infer<typeof updateLeadershipSchema>;
