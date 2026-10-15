import { HTML_LANG, LOCALE_STORAGE_KEY } from "@/lib/i18n";

type RedirectOptions = { storageKey: string; hreflang: Record<string, string> };

function redirectToPreferredLocale({ storageKey, hreflang }: RedirectOptions) {
  try {
    if (/bot|crawl|spider|slurp|lighthouse|headless|preview|facebookexternalhit|whatsapp/i.test(navigator.userAgent)) return;
    if (localStorage.getItem(storageKey)) return;
    const preferred = (navigator.languages && navigator.languages[0]) || navigator.language || "";
    const target = /^pt\b/i.test(preferred) ? "pt" : "en";
    if (document.documentElement.lang === hreflang[target]) return;
    const alternate = document.querySelector<HTMLLinkElement>(`link[rel="alternate"][hreflang="${hreflang[target]}"]`);
    if (alternate) location.replace(new URL(alternate.href).pathname + location.search + location.hash);
  } catch {
    return;
  }
}

export function localeRedirectScript() {
  const options: RedirectOptions = { storageKey: LOCALE_STORAGE_KEY, hreflang: HTML_LANG };
  return `(${redirectToPreferredLocale.toString()})(${JSON.stringify(options)});`;
}
