import { createContext, useContext } from "react";

export const LOCALES = ["pt", "en"] as const;

export type Locale = (typeof LOCALES)[number];

export type Localized<T> = Record<Locale, T>;

export const DEFAULT_LOCALE: Locale = "pt";

export const HTML_LANG: Localized<string> = { pt: "pt-BR", en: "en" };

export const OG_LOCALE: Localized<string> = { pt: "pt_BR", en: "en_US" };

export const INTL_LOCALE: Localized<string> = { pt: "pt-BR", en: "en-US" };

export const LOCALE_NAMES: Localized<string> = { pt: "Português", en: "English" };

export const LOCALE_STORAGE_KEY = "locale";

export const LocaleContext = createContext<Locale>(DEFAULT_LOCALE);

export function useLocale() {
  return useContext(LocaleContext);
}

export function useCopy<T>(copy: Localized<T>): T {
  return copy[useLocale()];
}

export function isLocale(value: string): value is Locale {
  return (LOCALES as readonly string[]).includes(value);
}

export function localePrefix(locale: Locale) {
  return locale === DEFAULT_LOCALE ? "" : `/${locale}`;
}

export function homePath(locale: Locale) {
  return `${localePrefix(locale)}/`;
}

export function rememberLocale(locale: Locale) {
  try {
    localStorage.setItem(LOCALE_STORAGE_KEY, locale);
    return true;
  } catch {
    return false;
  }
}
