import { useUiCopy } from "@/i18n/ui";
import { useLocale } from "@/lib/i18n";
import { getToolSeo } from "@/lib/tool-seo";

export function ToolFaq({ toolId }: { toolId: string }) {
  const locale = useLocale();
  const copy = useUiCopy();
  const faq = getToolSeo(toolId, locale)?.faq;
  if (!faq?.length) return null;

  return (
    <section>
      <h2 className="text-lg font-semibold text-foreground mb-4">{copy.faq}</h2>
      <div className="space-y-5">
        {faq.map(({ question, answer }) => (
          <div key={question}>
            <h3 className="text-[15px] font-semibold text-foreground">{question}</h3>
            <p className="mt-1 text-[15px] leading-7 text-muted-foreground">{answer}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
