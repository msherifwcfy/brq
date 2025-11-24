import { z } from "zod";
import { createI18nFieldSchema, createOptionalI18nFieldSchema } from "@/shared/schemas/i18n.schema";

const mediaSchema = z.array(
  z.object({
    id: z.number(),
    url: z.string(),
    key: z.string(),
    name: z.string().optional(),
    format: z.string(),
    mime_type: z.string(),
    size: z.number(),
  })
);

export const newsroomArticleSchema = z.object({
  categoryId: z.string().min(1, "Category is required"),
  title: createI18nFieldSchema(z.string().min(1, "Title is required")),
  description: createOptionalI18nFieldSchema(z.string()),
  slug: z.string().min(1, "Slug is required"),
  publishDate: z.date(),
  mediaType: z.enum(["image", "horizontal-video", "vertical-video"]),
  thumbnailImage: mediaSchema.optional(),
  mainImage: mediaSchema.optional(),
  videoUrl: z.string().url().optional().or(z.literal("")),
  isPublished: z.boolean(),
  displayOrder: z.number(),
});

export const newsroomContentBlockSchema = z.object({
  subtitle: createOptionalI18nFieldSchema(z.string()),
  paragraphs: z.array(
    z.object({
      text: createI18nFieldSchema(z.string().min(1, "Paragraph text is required")),
      displayOrder: z.number(),
    })
  ),
  displayOrder: z.number(),
});

export type NewsroomArticleFormData = z.infer<typeof newsroomArticleSchema>;
export type NewsroomContentBlockFormData = z.infer<typeof newsroomContentBlockSchema>;
