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
      .min(10, "Title must be at least 10 characters")
      .max(100, "Title must be at most 100 characters")
  ),
  sub_title: createI18nFieldSchema(
    z
      .string()
      .min(10, "Subtitle must be at least 10 characters")
      .max(200, "Subtitle must be at most 200 characters")
  ),
  image: z.array(mediaSchema).max(1, "Only one image is allowed").optional(),
  logos: z.array(mediaSchema).max(10, "Maximum 10 logos allowed").optional(),
});

export type CreateItInfrastructureHeroFormData = z.infer<
  typeof createItInfrastructureHeroSchema
>;
