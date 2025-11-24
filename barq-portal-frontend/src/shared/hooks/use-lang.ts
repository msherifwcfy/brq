import { useMemo } from "react";
import { useParams, useRouteLoaderData } from "react-router";
import {
  DEFAULT_LANG,
  SUPPORTED_LANGUAGES,
  type SupportedLanguagesType,
} from "../config/lang";

import type { TypedTFunction } from "@/shared/types/typedTranslation";

export type TFunction = (
  key: string,
  replacements?: Record<string, string | number | undefined>
) => string;

type TranslationValue = string | Record<string, any>;

export interface EnhancedTFunction extends TypedTFunction {
  (
    key: string,
    replacements?: Record<string, string | number | undefined>
  ): string;
}

export function useLang() {
  const url = useParams();
  const translations = useRouteLoaderData("lang")?.t || {
    error: "No translation file found",
  };
  const lang = SUPPORTED_LANGUAGES.includes(url.lang as SupportedLanguagesType)
    ? (url.lang as SupportedLanguagesType)
    : DEFAULT_LANG;

  const flatMap = useMemo(() => {
    const out = new Map<string, string>();
    const walk = (obj: any, prefix: string) => {
      if (!obj || typeof obj !== "object") return;
      for (const [k, v] of Object.entries(obj)) {
        const p = prefix ? `${prefix}.${k}` : k;
        if (typeof v === "string") {
          out.set(p, v);
        } else if (v && typeof v === "object") {
          walk(v as Record<string, unknown>, p);
        }
      }
    };
    walk(translations, "");
    return out;
  }, [translations]);

  const getTranslation = (key: string): string => {
    if (flatMap.has(key)) return flatMap.get(key) as string;
    const keys = key.split(".");
    let value: TranslationValue = translations;
    for (const k of keys) {
      if (value && typeof value === "object" && k in value) {
        value = value[k];
      } else {
        return key;
      }
    }
    if (typeof value !== "string") return key;
    return value;
  };

  const tFunction = (
    key: string,
    replacements?: Record<string, string | number | undefined>
  ): string => {
    let text = getTranslation(key);

    if (replacements) {
      Object.entries(replacements).forEach(([placeholder, value]) => {
        text = text.replace(`{${placeholder}}`, String(value));
      });
    }

    return text;
  };

  const t = tFunction as EnhancedTFunction;

  return { lang, t };
}
