import { z } from "zod";
import { createI18nFieldSchema } from "@/shared/schemas/i18n.schema";
import { documentSchema } from "@/shared/schemas/file.schema";

export const identityManagementCardItemSchema = z.object({
  title: createI18nFieldSchema(
    z
      .string()
      .min(5, "Title must be at least 5 characters")
      .max(50, "Title must not exceed 50 characters")
  ),
  description: createI18nFieldSchema(
    z
      .string()
      .min(50, "Description must be at least 50 characters")
      .max(150, "Description must not exceed 150 characters")
  ),
  icon: z.array(documentSchema).min(1, "Icon is required").optional(),
});

export const createIdentityManagementSchema = z.object({
  text: createI18nFieldSchema(
    z
      .string()
      .min(90, "Text must be at least 90 characters")
      .max(150, "Text must not exceed 150 characters")
  ),
  logo: z.array(documentSchema).min(1, "Logo is required"),
  cards: z.array(identityManagementCardItemSchema),
});

export type CreateIdentityManagementFormData = z.infer<
  typeof createIdentityManagementSchema
>;

export const createIdentityManagementCardSchema = z.object({
  title: createI18nFieldSchema(
    z
      .string()
      .min(5, "Title must be at least 5 characters")
      .max(50, "Title must not exceed 50 characters")
  ),
  description: createI18nFieldSchema(
    z
      .string()
      .min(50, "Description must be at least 50 characters")
      .max(150, "Description must not exceed 150 characters")
  ),
  icon: z.array(documentSchema).min(1, "Icon is required"),
});

export type CreateIdentityManagementCardFormData = z.infer<
  typeof createIdentityManagementCardSchema
>;
