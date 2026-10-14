import { useMemo, useState } from "react";
import { Copy, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { RelatedTools } from "@/components/related-tools";
import { ToolFaq } from "@/components/tool-faq";
import { toast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { formatDuration, textStats } from "@/lib/text-stats";

const LIMITS = [
  { label: "Post no X (Twitter)", max: 280 },
  { label: "Title (SEO)", max: 60 },
  { label: "Meta description (SEO)", max: 160 },
  { label: "Bio do Instagram", max: 150 },
  { label: "Legenda do Instagram", max: 2200 },
] as const;

export default function CharacterCounter() {
  const [text, setText] = useState("");
  const stats = useMemo(() => textStats(text), [text]);

  const metrics = [
    { label: "Caracteres", value: stats.characters },
    { label: "Sem espaços", value: stats.charactersWithoutSpaces },
    { label: "Palavras", value: stats.words },
    { label: "Linhas", value: stats.lines },
    { label: "Parágrafos", value: stats.paragraphs },
    { label: "Frases", value: stats.sentences },
    { label: "Tempo de leitura", value: formatDuration(stats.readingSeconds) },
    { label: "Tempo de fala", value: formatDuration(stats.speakingSeconds) },
  ];

  const copyText = async () => {
    if (!text) return;
    await navigator.clipboard.writeText(text);
    toast({ title: "Texto copiado!" });
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">Contador de Caracteres</h1>
        <p className="mt-3 max-w-prose text-base leading-7 text-muted-foreground">
          Conte caracteres, palavras, linhas e parágrafos em tempo real. Cole ou digite seu texto e veja também o total
          sem espaços, o tempo de leitura e se ele cabe nos limites do X (Twitter), do Instagram e das tags de SEO.
        </p>
      </div>

      <div className="rounded-lg border border-border bg-card p-5 sm:p-6 space-y-5 shadow-xs">
        <Textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Digite ou cole seu texto aqui..."
          aria-label="Texto para contar caracteres"
          className="min-h-[200px] text-base"
        />
        <div className="flex flex-wrap gap-3">
          <Button variant="secondary" onClick={copyText} className="gap-2">
            <Copy className="h-4 w-4" /> Copiar
          </Button>
          <Button variant="outline" onClick={() => setText("")} className="gap-2">
            <Trash2 className="h-4 w-4" /> Limpar
          </Button>
        </div>
      </div>

      <dl className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {metrics.map(({ label, value }) => (
          <div key={label} className="rounded-lg border border-primary/20 bg-primary/5 p-4">
            <dt className="text-xs font-medium text-muted-foreground">{label}</dt>
            <dd className="mt-1 font-mono text-xl font-semibold text-foreground">{value}</dd>
          </div>
        ))}
      </dl>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold text-foreground">Limites de caracteres</h2>
        {LIMITS.map(({ label, max }) => {
          const ratio = Math.min(stats.characters / max, 1);
          const exceeded = stats.characters > max;
          return (
            <div key={label} className="space-y-1">
              <div className="flex justify-between text-sm">
                <span className="text-foreground">{label}</span>
                <span className={cn("font-mono", exceeded ? "text-destructive" : "text-muted-foreground")}>
                  {stats.characters}/{max}
                </span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-muted">
                <div
                  className={cn("h-full rounded-full transition-all", exceeded ? "bg-destructive" : "bg-primary")}
                  style={{ width: `${ratio * 100}%` }}
                />
              </div>
            </div>
          );
        })}
      </section>

      <div className="space-y-8 border-t border-border pt-10">
        <section>
          <h2 className="text-lg font-semibold text-foreground mb-2">O que é um contador de caracteres?</h2>
          <p className="text-[15px] leading-7 text-muted-foreground">
            Um contador de caracteres mostra quantas letras, números, espaços e símbolos existem em um texto. Ele é
            essencial para quem escreve com limite de tamanho: posts em redes sociais, títulos e descrições para o
            Google, redações de vestibular, mensagens de SMS e campos de formulário.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground mb-2">Como contar caracteres de um texto</h2>
          <ol className="text-[15px] leading-7 text-muted-foreground list-decimal list-inside space-y-1">
            <li>Digite ou cole o texto na caixa acima.</li>
            <li>Veja a contagem de caracteres, palavras e linhas atualizar na hora.</li>
            <li>Confira nas barras se o texto cabe no limite da rede social ou da tag de SEO.</li>
          </ol>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground mb-2">Para que serve contar palavras e caracteres?</h2>
          <ul className="text-[15px] leading-7 text-muted-foreground list-disc list-inside space-y-1">
            <li>Escrever posts e legendas dentro do limite das redes sociais</li>
            <li>Ajustar title e meta description para SEO</li>
            <li>Respeitar o mínimo e o máximo de palavras em trabalhos e redações</li>
            <li>Estimar o tempo de leitura de artigos e o tempo de fala de apresentações</li>
          </ul>
        </section>

        <ToolFaq segment="contador-de-caracteres" />

        <RelatedTools segments={["editar-texto", "cortar-texto", "remover-acentos", "editar-palavras", "gerar-lorem"]} />
      </div>
    </div>
  );
}
