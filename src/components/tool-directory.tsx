
import { useMemo, useState } from "react";
import { Search } from "lucide-react";

import { useUiCopy } from "@/i18n/ui";
import { useLocale } from "@/lib/i18n";
import { CATEGORY_LABELS, groupToolsByCategory, NAV_TOOLS, toolPath } from "@/lib/nav-tools";

function normalize(value: string) {
  return value
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .trim();
}

export function ToolDirectory() {
  const locale = useLocale();
  const copy = useUiCopy();
  const [query, setQuery] = useState("");

  const groups = useMemo(() => {
    const term = normalize(query);
    const matches = term
      ? NAV_TOOLS.filter((t) => normalize(`${t.title[locale]} ${t.desc[locale]} ${CATEGORY_LABELS[t.category][locale]}`).includes(term))
      : NAV_TOOLS;
    return groupToolsByCategory(matches);
  }, [query, locale]);

  return (
    <div className="space-y-12">
      <div className="relative max-w-md">
        <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={copy.directory.search}
          aria-label={copy.directory.search}
          className="h-11 w-full rounded-lg border border-input bg-card pl-10 pr-4 text-base shadow-xs placeholder:text-muted-foreground transition-colors focus-visible:border-primary focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/15 md:text-sm"
        />
      </div>

      {groups.length === 0 ? (
        <p className="text-sm text-muted-foreground">{copy.directory.empty}</p>
      ) : (
        groups.map(({ category, tools }) => (
          <section key={category} aria-labelledby={`category-${category}`}>
            <div className="mb-4 flex items-baseline justify-between gap-4 border-b border-border pb-2">
              <h2 id={`category-${category}`} className="text-lg font-semibold text-foreground">
                {CATEGORY_LABELS[category][locale]}
              </h2>
              <span className="text-xs text-muted-foreground tabular-nums">
                {copy.directory.count(tools.length)}
              </span>
            </div>
            <ul className="grid gap-2 sm:grid-cols-2">
              {tools.map((tool) => (
                <li key={tool.id}>
                  <a
                    href={toolPath(tool.id, locale)}
                    className="group flex items-center gap-3 rounded-lg border border-transparent p-3 transition-colors hover:border-border hover:bg-card focus-visible:border-primary focus-visible:outline-none"
                  >
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-primary/10 text-primary">
                      <tool.icon className="h-[18px] w-[18px]" aria-hidden />
                    </span>
                    <span className="min-w-0">
                      <span className="block text-sm font-semibold text-foreground group-hover:text-primary">
                        {tool.title[locale]}
                      </span>
                      <span className="block truncate text-sm text-muted-foreground">{tool.desc[locale]}</span>
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </section>
        ))
      )}
    </div>
  );
}
