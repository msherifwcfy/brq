import arModule from "@/i18n/ar/ar.json";
import enModule from "@/i18n/en/en.json";
import {
  DEFAULT_LANG,
  SUPPORTED_LANGUAGES,
  type SupportedLanguagesType,
} from "@/shared/config/lang";

type Lang = Record<string, string | Record<string, any>>;

// Access the default export properly
const en = (enModule as any).default || enModule;
const ar = (arModule as any).default || arModule;

const langs: Record<SupportedLanguagesType, Lang> = { en, ar };

export function extractLang(request: Request | Location) {
  let lang: SupportedLanguagesType | undefined;
  let pathname = "";

  if (request instanceof Request) {
    const url = new URL(request.url);
    pathname = url.pathname;
    lang = url.pathname.split("/")[1] as SupportedLanguagesType;
  } else if (request?.pathname) {
    pathname = request.pathname;
    lang = request.pathname.split("/")[1] as SupportedLanguagesType;
  }

  if (lang && SUPPORTED_LANGUAGES.includes(lang)) {
    return { lang, t: langs[lang] };
  } else if (!lang || !SUPPORTED_LANGUAGES.includes(lang)) {
    return {
      lang: DEFAULT_LANG,
      t: langs[DEFAULT_LANG],
      redirectTo: `/${DEFAULT_LANG}`,
    };
  }

  return {
    lang: DEFAULT_LANG,
    t: langs[DEFAULT_LANG],
    redirectTo: `/${DEFAULT_LANG}/not-found`,
  };
}
