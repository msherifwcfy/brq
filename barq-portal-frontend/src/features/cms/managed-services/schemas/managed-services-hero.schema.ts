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

export const managedServicesHeroSchema = z.object({
  title: createI18nFieldSchema(
    z
      .string()
      .min(30, "Title must be at least 30 characters")
      .max(80, "Title must not exceed 80 characters")
  ),
  sub_title: createI18nFieldSchema(
    z
      .string()
      .min(150, "Subtext must be at least 150 characters")
      .max(350, "Subtext must not exceed 350 characters")
  ),
  image: z.array(mediaSchema).min(1, "Hero image is required"),
  logos: z.array(mediaSchema).length(2, "Exactly 2 logos are required"),
});

export type ManagedServicesHeroFormData = z.infer<typeof managedServicesHeroSchema>;
