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

export const socServicesDetailsSchema = z.object({
  description: createI18nFieldSchema(
    z
      .string()
      .min(150, "Description must be at least 150 characters")
      .max(400, "Description must not exceed 400 characters")
  ),
  cta_button_text: createI18nFieldSchema(
    z.string().min(1, "CTA button text is required")
  ),
  logo: z.array(mediaSchema).min(1, "Logo is required"),
  file: z.array(mediaSchema).optional(),
});

export type SocServicesDetailsFormData = z.infer<typeof socServicesDetailsSchema>;

