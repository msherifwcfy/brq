import { z } from "zod";
import { createI18nFieldSchema } from "@/shared/schemas/i18n.schema";

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

export const managedServicesHeroSchema = z.object({
  subtitle: createI18nFieldSchema(z.string().min(1, "Subtitle is required")),
  title: createI18nFieldSchema(z.string().min(1, "Title is required")),
  description: createI18nFieldSchema(z.string().min(1, "Description is required")),
  heroImage: mediaSchema.optional(),
});

export type ManagedServicesHeroFormData = z.infer<typeof managedServicesHeroSchema>;
