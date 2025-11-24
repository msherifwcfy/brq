import { z } from "zod";
import { createI18nFieldSchema } from "@/shared/schemas/i18n.schema";

const mediaSchema = z.object({
  id: z.number(),
  url: z.string(),
  key: z.string().optional(),
  name: z.string().optional(),
  format: z.string().optional(),
  mime_type: z.string().optional(),
  size: z.number().optional(),
});

export const createCybersecurityHeroSchema = z.object({
  title: createI18nFieldSchema(
    z
      .string()
      .min(1, "Title must be at least 1 characters")
      .max(80, "Title must not exceed 80 characters")
  ),
  sub_title: createI18nFieldSchema(
    z
      .string()
      .min(1, "Subtitle must be at least 1 characters")
      .max(350, "Subtitle must not exceed 350 characters")
  ),
  image: z.array(mediaSchema).min(1, "Image is required"),
  logos: z.array(mediaSchema).length(4, "Exactly 4 logos are required"),
});

export type CreateCybersecurityHeroFormData = z.infer<
  typeof createCybersecurityHeroSchema
>;
