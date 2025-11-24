import { z } from "zod";
import { createI18nFieldSchema } from "@/shared/schemas/i18n.schema";

export const createLandingNumbersSchema = z.object({
  number: z
    .number({ message: "cms.homePage.whoWeAreStats.validation.numberInvalid" })
    .int("cms.homePage.whoWeAreStats.validation.numberInvalid")
    .refine(
      (v) => v > 0 && v <= 9999,
      "cms.homePage.whoWeAreStats.validation.numberDigits"
    ),
  label: createI18nFieldSchema(
    z
      .string()
      .min(4, "cms.homePage.whoWeAreStats.validation.labelMin")
      .max(80, "cms.homePage.whoWeAreStats.validation.labelMax")
  ),
});

export const updateLandingNumbersSchema = z.object({
  number: z
    .number({ message: "cms.homePage.whoWeAreStats.validation.numberInvalid" })
    .int("cms.homePage.whoWeAreStats.validation.numberInvalid")
    .refine(
      (v) => v > 0 && v <= 9999,
      "cms.homePage.whoWeAreStats.validation.numberDigits"
    )
    .optional(),
  label: createI18nFieldSchema(
    z
      .string()
      .min(4, "cms.homePage.whoWeAreStats.validation.labelMin")
      .max(80, "cms.homePage.whoWeAreStats.validation.labelMax")
  ).optional(),
});

export type CreateLandingNumbersFormData = z.infer<
  typeof createLandingNumbersSchema
>;
export type UpdateLandingNumbersFormData = z.infer<
  typeof updateLandingNumbersSchema
>;
