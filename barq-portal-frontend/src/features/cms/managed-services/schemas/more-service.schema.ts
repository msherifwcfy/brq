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

export const moreServiceSchema = z.object({
  serviceKey: z.string().min(1, "Service key is required"),
  title: createI18nFieldSchema(z.string().min(1, "Title is required")),
  description: createOptionalI18nFieldSchema(
    z
      .string()
      .min(30, "Description must be at least 30 characters")
      .max(350, "Description must not exceed 350 characters")
  ),
  iconImage: mediaSchema.optional(),
  hasBundlesLink: z.boolean(),
  displayOrder: z.number(),
});

export const moreServiceItemSchema = z.object({
  itemText: createI18nFieldSchema(
    z
      .string()
      .min(5, "Item text must be at least 5 characters")
      .max(50, "Item text must not exceed 50 characters")
  ),
  displayOrder: z.number().default(0),
});

export type MoreServiceFormData = z.infer<typeof moreServiceSchema>;
export type MoreServiceItemFormData = z.infer<typeof moreServiceItemSchema>;
