import { z } from "zod";
import { createI18nFieldSchema } from "@/shared/schemas/i18n.schema";

export const createAboutUsJourneyMilestoneSchema = z.object({
  year: z.string()
    .min(4, "Year must be exactly 4 digits")
    .max(4, "Year must be exactly 4 digits")
    .regex(/^\d{4}$/, "Year must be a 4-digit number"),
  title: createI18nFieldSchema(
    z.string()
      .min(10, "Title must be at least 10 characters")
      .max(120, "Title must not exceed 120 characters")
  ),
  description: createI18nFieldSchema(
    z.string()
      .min(30, "Description must be at least 30 characters")
      .max(400, "Description must not exceed 400 characters")
  ),
  image: z.array(
    z.object({
      id: z.number(),
      url: z.string(),
      key: z.string().optional(),
      name: z.string().optional(),
      format: z.string().optional(),
      mime_type: z.string().optional(),
      size: z.number().optional(),
    })
  ).min(1, "Image is required"),
  order_index: z.number().min(0),
});

export const updateAboutUsJourneyMilestoneSchema = z.object({
  year: z.string()
    .min(4, "Year must be exactly 4 digits")
    .max(4, "Year must be exactly 4 digits")
    .regex(/^\d{4}$/, "Year must be a 4-digit number")
    .optional(),
  title: createI18nFieldSchema(
    z.string()
      .min(10, "Title must be at least 10 characters")
      .max(120, "Title must not exceed 120 characters")
  ).optional(),
  description: createI18nFieldSchema(
    z.string()
      .min(30, "Description must be at least 30 characters")
      .max(400, "Description must not exceed 400 characters")
  ).optional(),
  image: z.array(
    z.object({
      id: z.number(),
      url: z.string(),
      key: z.string().optional(),
      name: z.string().optional(),
      format: z.string().optional(),
      mime_type: z.string().optional(),
      size: z.number().optional(),
    })
  ).min(1, "Image is required").optional(),
  order_index: z.number().min(0).optional(),
});

export const createAboutUsJourneySchema = z.object({
  section_title: createI18nFieldSchema(
    z.string()
      .min(5, "Section title must be at least 5 characters")
      .max(35, "Section title must not exceed 35 characters")
  ),
  milestones: z.array(createAboutUsJourneyMilestoneSchema)
    .min(1, "At least 1 milestone is required"),
});

export const updateAboutUsJourneySchema = z.object({
  section_title: createI18nFieldSchema(
    z.string()
      .min(5, "Section title must be at least 5 characters")
      .max(35, "Section title must not exceed 35 characters")
  ).optional(),
  milestones: z.array(createAboutUsJourneyMilestoneSchema)
    .min(1, "At least 1 milestone is required")
    .optional(),
});

export type CreateAboutUsJourneyMilestoneFormData = z.infer<typeof createAboutUsJourneyMilestoneSchema>;
export type UpdateAboutUsJourneyMilestoneFormData = z.infer<typeof updateAboutUsJourneyMilestoneSchema>;
export type CreateAboutUsJourneyFormData = z.infer<typeof createAboutUsJourneySchema>;
export type UpdateAboutUsJourneyFormData = z.infer<typeof updateAboutUsJourneySchema>;
