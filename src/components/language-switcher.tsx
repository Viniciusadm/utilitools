import { Languages } from "lucide-react";

import { useUiCopy } from "@/i18n/ui";
import { HTML_LANG, LOCALE_NAMES, LOCALES, rememberLocale, useLocale, type Localized } from "@/lib/i18n";

export function LanguageSwitcher({ alternates }: { alternates: Localized<string> }) {
  const locale = useLocale();
  const copy = useUiCopy();
  const targets = LOCALES.filter((l) => l !== locale);

  return (
    <nav aria-label={copy.languageLabel} className="flex items-center gap-2">
      <Languages className="h-4 w-4 text-muted-foreground" aria-hidden />
      {targets.map((target) => (
        <a
          key={target}
          href={alternates[target]}
          hrefLang={HTML_LANG[target]}
          lang={HTML_LANG[target]}
          onClick={() => rememberLocale(target)}
          className="rounded-md px-2 py-1 text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          {LOCALE_NAMES[target]}
        </a>
      ))}
    </nav>
  );
}
