import { createContext, useContext, type ReactNode } from "react";
import { type LanguageCode } from "../../../constants";

// Context for form-level language switching
interface I18nFormContextType {
  currentLanguage: LanguageCode;
}

const I18nFormContext = createContext<I18nFormContextType | null>(null);

export function useI18nForm() {
  const context = useContext(I18nFormContext);
  if (!context) {
    throw new Error("useI18nForm must be used within I18nFormProvider");
  }
  return context;
}

interface I18nFormProviderProps {
  children: ReactNode;
  currentLanguage: LanguageCode;
}

export function I18nFormProvider({
  children,
  currentLanguage,
}: I18nFormProviderProps) {
  return (
    <I18nFormContext.Provider value={{ currentLanguage }}>
      {children}
    </I18nFormContext.Provider>
  );
}
