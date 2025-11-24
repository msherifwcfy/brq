import { z } from "zod";
import { createI18nFieldSchema } from "@/shared/schemas/i18n.schema";

const mediaSchema = z
  .array(
    z.object({
      id: z.number(),
      url: z.string(),
      key: z.string(),
      format: z.string(),
      mime_type: z.string(),
      size: z.number(),
    })
  )
  .min(1, "Image is required")
  .max(1, "Only one image is allowed");

const thumbnailMediaSchema = z
  .array(
    z.object({
      id: z.number(),
      url: z.string(),
      key: z.string(),
      format: z.string(),
      mime_type: z.string(),
      size: z.number(),
    })
  )
  .max(1, "Only one image is allowed")
  .default([]);

export const newsroomArticleSchema = z.object({
  title: createI18nFieldSchema(
    z.string().min(20, "Title must be at least 20 characters").max(110, "Title must not exceed 110 characters")
  ),
  description: createI18nFieldSchema(
    z
      .string()
      .min(80, "Description must be at least 80 characters")
      .max(140, "Description must not exceed 140 characters")
  ),
  is_featured: z.boolean().optional(),
  is_vertical: z.boolean(),
  long_description: createI18nFieldSchema(
    z
      .string()
      .min(1, "Long Description must be at least 1 character")
  ),
  date: z.string().min(1, { message: "Date is required" }),
  categoryId: z.number(),
  image: mediaSchema,
  home_image: z.array(z.any()).min(1, "caseStudies.validation.thumbnailImageRequired"),
});


export type NewsroomArticleFormData = z.infer<typeof newsroomArticleSchema>;


