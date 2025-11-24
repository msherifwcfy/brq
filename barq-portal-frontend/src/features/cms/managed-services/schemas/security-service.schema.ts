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

export const securityServiceSchema = z.object({
  serviceKey: z.string().min(1, "Service key is required"),
  title: createI18nFieldSchema(z.string().min(1, "Title is required")),
  description: createI18nFieldSchema(z.string().min(1, "Description is required")),
  iconImage: mediaSchema.optional(),
  mainImage: mediaSchema.optional(),
  displayOrder: z.number(),
});

export const securityServiceSectionSchema = z.object({
  title: createI18nFieldSchema(
    z
      .string()
      .min(15, "Title must be at least 15 characters")
      .max(50, "Title must not exceed 50 characters")
  ),
  description: createOptionalI18nFieldSchema(z.string()),
  sectionIcon: mediaSchema.optional(),
  displayOrder: z.number().default(0),
});

export const securityServiceItemSchema = z.object({
  itemText: createI18nFieldSchema(
    z
      .string()
      .min(5, "Item text must be at least 5 characters")
      .max(80, "Item text must not exceed 80 characters")
  ),
  displayOrder: z.number().default(0),
});

export const securityServiceCountrySchema = z.object({
  countryName: createI18nFieldSchema(z.string().min(1, "Country name is required")),
  regulator: createI18nFieldSchema(
    z
      .string()
      .min(3, "Regulator must be at least 3 characters")
      .max(50, "Regulator must not exceed 50 characters")
  ),
  displayOrder: z.number().default(0),
});

export type SecurityServiceFormData = z.infer<typeof securityServiceSchema>;
export type SecurityServiceSectionFormData = z.infer<typeof securityServiceSectionSchema>;
export type SecurityServiceItemFormData = z.infer<typeof securityServiceItemSchema>;
export type SecurityServiceCountryFormData = z.infer<typeof securityServiceCountrySchema>;
