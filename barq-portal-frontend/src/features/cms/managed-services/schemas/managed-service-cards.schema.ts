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

export const createManagedServiceCardsSchema = (usedTypes: string[] = []) => {
  return z.object({
    description: createI18nFieldSchema(
      z
        .string()
        .min(30, "Description must be at least 30 characters")
        .max(400, "Description must not exceed 400 characters")
    ),
    bullet_one: createI18nFieldSchema(z.string().min(5, "Bullet point must be at least 5 characters").max(100, "Bullet point must not exceed 100 characters")),
    bullet_two: createI18nFieldSchema(z.string().min(5, "Bullet point must be at least 5 characters").max(100, "Bullet point must not exceed 100 characters")),
    type: z
      .string()
      .min(1, "Type is required")
      .refine(
        (value) => !usedTypes.includes(value?.toLowerCase() || ""),
        {
          message: "This service type is already used in another card",
        }
      ),
    logo: z.array(mediaSchema).min(1, "Logo is required"),
    image: z.array(mediaSchema).min(1, "Image is required"),
  });
};

export const managedServiceCardsSchema = createManagedServiceCardsSchema();

export type ManagedServiceCardsFormData = z.infer<ReturnType<typeof createManagedServiceCardsSchema>>;

