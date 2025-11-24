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
  description: createOptionalI18nFieldSchema(z.string()),
  iconImage: mediaSchema.optional(),
  hasBundlesLink: z.boolean(),
  displayOrder: z.number(),
});

export const moreServiceItemSchema = z.object({
  itemText: createI18nFieldSchema(z.string().min(1, "Item text is required")),
  displayOrder: z.number().default(0),
});

export type MoreServiceFormData = z.infer<typeof moreServiceSchema>;
export type MoreServiceItemFormData = z.infer<typeof moreServiceItemSchema>;
