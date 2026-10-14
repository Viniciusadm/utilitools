import { getNavToolBySegment } from "@/lib/nav-tools";

export function RelatedTools({ segments }: { segments: readonly string[] }) {
  const tools = segments.map(getNavToolBySegment).filter((tool) => tool !== undefined);

  return (
    <section>
      <h2 className="text-lg font-semibold text-foreground mb-3">Veja também:</h2>
      <div className="flex flex-wrap gap-2">
        {tools.map((tool) => (
          <a
            key={tool.url}
            href={tool.url}
            className="rounded-full border border-border bg-card px-3 py-1 text-sm text-foreground transition-colors hover:border-primary/40 hover:text-primary"
          >
            {tool.title}
          </a>
        ))}
      </div>
    </section>
  );
}
