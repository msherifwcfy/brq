// This type allows for recursive dot notation access to nested objects
export type DotPrefix<T extends string, K extends string> = `${T}${"" extends T
  ? ""
  : "."}${K}`;

// This type gets all nested keys from an object using dot notation
export type DotNestedKeys<T> = T extends object
  ? {
      [K in keyof T]: K extends string
        ? T[K] extends Record<string, any>
          ? DotPrefix<K, DotNestedKeys<T[K]>>
          : K
        : never;
    }[keyof T]
  : "";

import en from "@/i18n/en/en.json";

type Translations = typeof en;

// Create a specific type for all possible translation keys
export type TranslationKeys = DotNestedKeys<Translations>;

// Define function that accepts only valid translation keys
export type TypedTFunction = <
  TKey extends TranslationKeys,
  TInterpolations extends Record<string, string | number | undefined> = Record<
    string,
    string | number | undefined
  >
>(
  key: TKey,
  replacements?: TInterpolations
) => string;
