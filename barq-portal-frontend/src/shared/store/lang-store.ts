import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface LangStore {
  lang: string;
  setLang: (lang: string) => void;
}

export const useLang = create<LangStore>()(
  persist(
    (set, get) => ({
      lang: sessionStorage.getItem("lang") || "en",
      setLang: (lang) => {
        sessionStorage.setItem("lang", lang);
        window.location.href = window.location.href.replace(
          `/${get().lang}`,
          `/${lang}`
        );
        set({ lang });
      },
    }),
    {
      name: "lang",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
