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

export const additionalManagedServicesTwoSchema = z.object({
  description: createI18nFieldSchema(
    z
      .string()
      .min(10, "Description must be at least 10 characters")
      .max(400, "Description must not exceed 400 characters")
  ),
  logo: z.array(mediaSchema).min(1, "Logo is required"),
  images: z.array(mediaSchema).optional(),
});

export type AdditionalManagedServicesTwoFormData = z.infer<typeof additionalManagedServicesTwoSchema>;

