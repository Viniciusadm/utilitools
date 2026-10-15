import { useUiCopy } from "@/i18n/ui";
import { useLocale } from "@/lib/i18n";
import { getToolById, toolPath } from "@/lib/nav-tools";

export function RelatedTools({ ids }: { ids: readonly string[] }) {
  const locale = useLocale();
  const copy = useUiCopy();
  const tools = ids.map(getToolById).filter((tool) => tool !== undefined);

  return (
    <section>
      <h2 className="text-lg font-semibold text-foreground mb-3">{copy.related}</h2>
      <div className="flex flex-wrap gap-2">
        {tools.map((tool) => (
          <a
            key={tool.id}
            href={toolPath(tool.id, locale)}
            className="rounded-full border border-border bg-card px-3 py-1 text-sm text-foreground transition-colors hover:border-primary/40 hover:text-primary"
          >
            {tool.title[locale]}
          </a>
        ))}
      </div>
    </section>
  );
}
