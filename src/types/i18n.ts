export type Locale = 'fr' | 'en';

export const locales: Locale[] = ['fr', 'en'];
export const defaultLocale: Locale = 'fr';

export function isValidLocale(locale: string): locale is Locale {
  return locales.includes(locale as Locale);
}
