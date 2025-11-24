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

export const careerHeroSchema = z.object({
  title: createI18nFieldSchema(
    z.string()
      .min(15, "Title must be at least 15 characters")
      .max(80, "Title must not exceed 80 characters")
  ),
  description: createI18nFieldSchema(
    z.string()
      .min(50, "Subtext must be at least 50 characters")
      .max(300, "Subtext must not exceed 300 characters")
  ),
  media: z.array(mediaSchema).min(1, "Background image is required"),
});

export type CareerHeroFormData = z.infer<typeof careerHeroSchema>;

