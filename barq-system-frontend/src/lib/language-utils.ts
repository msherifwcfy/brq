/**
 * Get the current language from localStorage (client-side) or cookies (server-side)
 * @returns 'ar' if Arabic is selected, 'en' for English
 */
export const getLanguageHeader = async (): Promise<string> => {
  // Client-side: use localStorage
  if (typeof window !== 'undefined') {
    const language = localStorage.getItem('language');
    return language === 'ar' ? 'ar' : 'en';
  }

  // Server-side: use cookies from Next.js
  try {
    const { cookies } = await import('next/headers');
    const cookieStore = await cookies();
    const language = cookieStore.get('language')?.value;
    return language === 'ar' ? 'ar' : 'en';
  } catch {
    // If cookies() is not available or fails, return default
    return 'en';
  }
};

/**
 * Get headers object with Accept-Language if Arabic is selected
 * Returns an object that can be spread into headers
 * Works on both client and server side
 */
export const getLanguageHeaders = async (): Promise<Record<string, string>> => {
  // Client-side: use localStorage
  if (typeof window !== 'undefined') {
    const language = localStorage.getItem('language');
    if (language === 'ar') {
      return { 'Accept-Language': 'ar' };
    }
    return {};
  }

  // Server-side: use cookies from Next.js
  try {
    const { cookies } = await import('next/headers');
    const cookieStore = await cookies();
    const language = cookieStore.get('language')?.value;

    if (language === 'ar') {
      return { 'Accept-Language': 'ar' };
    }
  } catch {
    // If cookies() is not available or fails, return empty headers
  }

  return {};
};
