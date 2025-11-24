import { z } from "zod";
import { LANGUAGE_CODES, type LanguageCode } from "../constants";

/**
 * Creates a schema for internationalized text fields
 * @param fieldValidation - The validation rules for the text field
 * @returns A schema object with en and ar properties
 */
export function createI18nFieldSchema(fieldValidation: z.ZodString) {
  return z.object({
    en: fieldValidation,
    ar: fieldValidation,
  });
}

/**
 * Creates a schema for optional internationalized text fields
 * @param fieldValidation - The validation rules for the text field
 * @returns A schema object with optional en and ar properties
 */
export function createOptionalI18nFieldSchema(fieldValidation: z.ZodString) {
  return z.object({
    en: fieldValidation.optional(),
    ar: fieldValidation.optional(),
  });
}

/**
 * Type for internationalized text fields
 */
export type I18nText = {
  en: string;
  ar: string;
};

/**
 * Type for optional internationalized text fields
 */
export type OptionalI18nText = {
  en?: string;
  ar?: string;
};

/**
 * Helper to transform i18n object to translation array format for API
 * @param i18nText - The i18n text object
 * @param fieldName - The field name (e.g., 'title', 'description')
 * @returns Array of translation objects
 */
export function transformI18nToTranslations(
  i18nText: I18nText | OptionalI18nText,
  fieldName: string
) {
  const translations: Array<{ [key: string]: string; language: LanguageCode }> =
    [];

  if (i18nText.en) {
    translations.push({
      [fieldName]: i18nText.en,
      language: "en" as LanguageCode,
    });
  }

  if (i18nText.ar) {
    translations.push({
      [fieldName]: i18nText.ar,
      language: "ar" as LanguageCode,
    });
  }

  return translations;
}

/**
 * Helper to transform API translation array to i18n object
 * @param translations - Array of translation objects from API
 * @param fieldName - The field name (e.g., 'title', 'description')
 * @returns I18n text object
 */
export function transformTranslationsToI18n(
  translations: Array<{ [key: string]: string; language: LanguageCode }>,
  fieldName: string
): I18nText {
  const enTranslation = translations.find((t) => t.language === "en");
  const arTranslation = translations.find((t) => t.language === "ar");

  return {
    en: enTranslation?.[fieldName] || "",
    ar: arTranslation?.[fieldName] || "",
  };
}
