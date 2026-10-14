import { getToolSeo } from "@/lib/tool-seo";

export function ToolFaq({ segment }: { segment: string }) {
  const faq = getToolSeo(segment)?.faq;
  if (!faq?.length) return null;

  return (
    <section>
      <h2 className="text-lg font-semibold text-foreground mb-4">Perguntas frequentes</h2>
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
