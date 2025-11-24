'use client';

import React, { useEffect, useState } from 'react';
import { I18nextProvider } from 'react-i18next';
import i18n from '@/lib/i18n';
import { LanguageProvider } from '@/contexts/LanguageContext';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

export default function ClientProvider({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000,
        refetchOnWindowFocus: false,
      },
    },
  }));

  useEffect(() => {
    if (typeof window !== 'undefined' && i18n.isInitialized) {
      const savedLanguage = localStorage.getItem('language');
      if (savedLanguage === 'ar' || savedLanguage === 'en') {
        i18n.changeLanguage(savedLanguage);
      }
    }
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <I18nextProvider i18n={i18n}>
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </I18nextProvider>
    </QueryClientProvider>
  );
}

