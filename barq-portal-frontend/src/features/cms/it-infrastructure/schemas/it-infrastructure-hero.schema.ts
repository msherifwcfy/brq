import { z } from "zod";
import { createI18nFieldSchema } from "@/shared/schemas/i18n.schema";

const mediaSchema = z.object({
  id: z.number().optional(),
  url: z.string().url(),
  key: z.string(),
  name: z.string().optional(),
  format: z.string(),
  mime_type: z.string(),
  size: z.number(),
});

export const createItInfrastructureHeroSchema = z.object({
  title: createI18nFieldSchema(
    z
      .string()
      .min(30, "Title must be at least 30 characters")
      .max(80, "Title must be at most 80 characters")
  ),
  sub_title: createI18nFieldSchema(
    z
      .string()
      .min(150, "Subtitle must be at least 150 characters")
      .max(350, "Subtitle must be at most 350 characters")
  ),
  image: z
    .array(mediaSchema)
    .min(1, "Image is required")
    .max(1, "Only one image is allowed"),
  logos: z
    .array(mediaSchema)
    .length(5, "Exactly 5 icons are required")
    .optional(),
});

export type CreateItInfrastructureHeroFormData = z.infer<
  typeof createItInfrastructureHeroSchema
>;
