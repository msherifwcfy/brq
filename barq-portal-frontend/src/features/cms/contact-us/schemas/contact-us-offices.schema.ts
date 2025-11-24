import { z } from "zod";
import {
  createI18nFieldSchema,
  createOptionalI18nFieldSchema,
} from "@/shared/schemas/i18n.schema";
import { documentSchema } from "@/shared/schemas/file.schema";

export const contactUsOfficeSchema = z.object({
  country: createI18nFieldSchema(
    z
      .string()
      .min(2, "Country must be at least 2 characters")
      .max(50, "Country must not exceed 50 characters")
  ),
  countryFlag: z.array(documentSchema).optional(),
  officeTitle: createI18nFieldSchema(
    z
      .string()
      .min(2, "Office title must be at least 2 characters")
      .max(100, "Office title must not exceed 100 characters")
  ),
  location: createOptionalI18nFieldSchema(
    z
      .string()
      .min(10, "Location must be at least 10 characters")
      .max(150, "Location must not exceed 150 characters")
      .or(z.literal("")) as any
  ),
  phone: z.string().max(15).optional().or(z.literal("")),
  fax: z.string().max(20).optional().or(z.literal("")),
  email: z.string().min(10).max(50).email().optional().or(z.literal("")),
});

export type ContactUsOfficeSchema = z.infer<typeof contactUsOfficeSchema>;
