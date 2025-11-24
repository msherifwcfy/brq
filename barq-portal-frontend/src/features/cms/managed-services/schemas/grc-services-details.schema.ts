import { z } from "zod";
import { createI18nFieldSchema } from "@/shared/schemas/i18n.schema";

export const grcServicesDetailsSchema = z.object({
  description: createI18nFieldSchema(
    z
      .string()
      .min(150, "Description must be at least 150 characters")
      .max(400, "Description must not exceed 400 characters")
  ),
  title: createI18nFieldSchema(
    z
      .string()
      .min(15, "Title must be at least 15 characters")
      .max(50, "Title must not exceed 50 characters")
  ),
});

export type GrcServicesDetailsFormData = z.infer<typeof grcServicesDetailsSchema>;

