'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

type Language = 'en' | 'ar';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  isRTL: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { i18n } = useTranslation();
  const [language, setLanguageState] = useState<Language>('en');
  const [isRTL, setIsRTL] = useState(false);

  useEffect(() => {
    // Load language from localStorage and cookies on mount
    if (typeof window !== 'undefined') {
      const savedLanguage = localStorage.getItem('language') as Language;
      if (savedLanguage && (savedLanguage === 'en' || savedLanguage === 'ar')) {
        setLanguageState(savedLanguage);
        i18n.changeLanguage(savedLanguage);
        setIsRTL(savedLanguage === 'ar');
        document.documentElement.dir = savedLanguage === 'ar' ? 'rtl' : 'ltr';
        document.documentElement.lang = savedLanguage;
        // Also set cookie for SSR
        document.cookie = `language=${savedLanguage}; path=/; max-age=31536000; SameSite=Lax`;
      } else {
        // Set default language
        localStorage.setItem('language', 'en');
        document.cookie = `language=en; path=/; max-age=31536000; SameSite=Lax`;
        setLanguageState('en');
        i18n.changeLanguage('en');
        setIsRTL(false);
        document.documentElement.dir = 'ltr';
        document.documentElement.lang = 'en';
      }
    }
  }, [i18n]);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    // Store in both localStorage and cookie
    localStorage.setItem('language', lang);
    document.cookie = `language=${lang}; path=/; max-age=31536000; SameSite=Lax`;
    i18n.changeLanguage(lang);
    setIsRTL(lang === 'ar');
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, isRTL }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

