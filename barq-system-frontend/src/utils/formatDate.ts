'use client';

export function formatDate(dateInput: Date | string | number, locale?: "en-US" | "ar-EG"): string {
  const date = new Date(dateInput);
  // e.g. Aug 14, 2025
  return date.toLocaleDateString(locale, {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}
