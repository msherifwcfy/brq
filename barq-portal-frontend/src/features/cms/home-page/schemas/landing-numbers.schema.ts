import { z } from "zod";
import { createI18nFieldSchema } from "@/shared/schemas/i18n.schema";

export const createLandingNumbersSchema = z.object({
  number: z
    .number({ message: "cms.homePage.landingNumbers.validation.numberInvalid" })
    .int("cms.homePage.landingNumbers.validation.numberInvalid")
    .refine(
      (v) => v > 0 && v <= 9999,
      "cms.homePage.landingNumbers.validation.numberDigits"
    ),
  label: createI18nFieldSchema(
    z
      .string()
      .min(1, "cms.homePage.landingNumbers.validation.labelRequired")
      .max(100, "cms.homePage.landingNumbers.validation.labelMax")
      .refine((val) => {
        const words = val.trim().split(/\s+/);
        return words.length >= 1 && words.length <= 3;
      }, "cms.homePage.landingNumbers.validation.labelWords")
  ),
});

export const updateLandingNumbersSchema = z.object({
  number: z
    .number({ message: "cms.homePage.landingNumbers.validation.numberInvalid" })
    .int("cms.homePage.landingNumbers.validation.numberInvalid")
    .refine(
      (v) => v >= 0 && v <= 9999,
      "cms.homePage.landingNumbers.validation.numberDigits"
    )
    .optional(),
  label: createI18nFieldSchema(
    z
      .string()
      .min(1, "cms.homePage.landingNumbers.validation.labelRequired")
      .max(100, "cms.homePage.landingNumbers.validation.labelMax")
      .refine((val) => {
        const words = val.trim().split(/\s+/);
        return words.length >= 1 && words.length <= 3;
      }, "cms.homePage.landingNumbers.validation.labelWords")
  ).optional(),
});

export type CreateLandingNumbersFormData = z.infer<
  typeof createLandingNumbersSchema
>;
export type UpdateLandingNumbersFormData = z.infer<
  typeof updateLandingNumbersSchema
>;
