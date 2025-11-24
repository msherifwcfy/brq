import { type FieldErrors, type FieldValues } from "react-hook-form";
import { type LanguageCode } from "../constants";

/**
 * Checks if there are any validation errors for the language opposite to the currently open one
 * @param errors - Form errors from react-hook-form
 * @param currentLanguage - The currently open language tab ('en' or 'ar')
 * @returns true if there are errors for the opposite language, false otherwise
 */
export function hasLanguageErrors<T extends FieldValues>(
  errors: FieldErrors<T>,
  currentLanguage: LanguageCode
): boolean {
  // Get the opposite language
  const oppositeLanguage: LanguageCode = currentLanguage === "en" ? "ar" : "en";
  if (!errors || typeof errors !== "object") return false;

  for (const [key, value] of Object.entries(errors)) {
    if (!value) continue;

    // Check if this is a language-specific error (en or ar)
    if (key === oppositeLanguage && value !== null) {
      return true;
    }

    // Recursively check nested objects (for arrays like cards[].translations.en)
    if (typeof value === "object" && value !== null) {
      if (hasLanguageErrors(value as any, currentLanguage)) {
        return true;
      }
    }
  }

  return false;
}

