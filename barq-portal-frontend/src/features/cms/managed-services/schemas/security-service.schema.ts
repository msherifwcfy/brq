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
  title: createI18nFieldSchema(z.string().min(1, "Title is required")),
  description: createOptionalI18nFieldSchema(z.string()),
  sectionIcon: mediaSchema.optional(),
  displayOrder: z.number().default(0),
});

export const securityServiceItemSchema = z.object({
  itemText: createI18nFieldSchema(z.string().min(1, "Item text is required")),
  displayOrder: z.number().default(0),
});

export const securityServiceCountrySchema = z.object({
  countryName: createI18nFieldSchema(z.string().min(1, "Country name is required")),
  regulator: createI18nFieldSchema(z.string().min(1, "Regulator is required")),
  displayOrder: z.number().default(0),
});

export type SecurityServiceFormData = z.infer<typeof securityServiceSchema>;
export type SecurityServiceSectionFormData = z.infer<typeof securityServiceSectionSchema>;
export type SecurityServiceItemFormData = z.infer<typeof securityServiceItemSchema>;
export type SecurityServiceCountryFormData = z.infer<typeof securityServiceCountrySchema>;
