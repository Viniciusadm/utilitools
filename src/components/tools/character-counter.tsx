import { useMemo, useState } from "react";
import { Copy, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { RelatedTools } from "@/components/related-tools";
import { ToolFaq } from "@/components/tool-faq";
import { toast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { useCopy } from "@/lib/i18n";
import { formatDuration, textStats } from "@/lib/text-stats";

const LIMITS = [
  { id: "xPost", max: 280 },
  { id: "seoTitle", max: 60 },
  { id: "metaDescription", max: 160 },
  { id: "instagramBio", max: 150 },
  { id: "instagramCaption", max: 2200 },
] as const;

type LimitId = (typeof LIMITS)[number]["id"];

const pt = {
  title: "Contador de Caracteres",
  intro:
    "Conte caracteres, palavras, linhas e parágrafos em tempo real. Cole ou digite seu texto e veja também o total sem espaços, o tempo de leitura e se ele cabe nos limites do X (Twitter), do Instagram e das tags de SEO.",
  placeholder: "Digite ou cole seu texto aqui...",
  textareaLabel: "Texto para contar caracteres",
  copy: "Copiar",
  clear: "Limpar",
  copied: "Texto copiado!",
  metrics: {
    characters: "Caracteres",
    charactersWithoutSpaces: "Sem espaços",
    words: "Palavras",
    lines: "Linhas",
    paragraphs: "Parágrafos",
    sentences: "Frases",
    readingTime: "Tempo de leitura",
    speakingTime: "Tempo de fala",
  },
  limitsTitle: "Limites de caracteres",
  limits: {
    xPost: "Post no X (Twitter)",
    seoTitle: "Title (SEO)",
    metaDescription: "Meta description (SEO)",
    instagramBio: "Bio do Instagram",
    instagramCaption: "Legenda do Instagram",
  } as Record<LimitId, string>,
  content: (
    <>
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
    </>
  ),
};

const en: typeof pt = {
  title: "Character Counter",
  intro:
    "Count characters, words, lines and paragraphs in real time. Paste or type your text and also see the count without spaces, the reading time and whether it fits the limits of X (Twitter), Instagram and SEO tags.",
  placeholder: "Type or paste your text here...",
  textareaLabel: "Text to count characters",
  copy: "Copy",
  clear: "Clear",
  copied: "Text copied!",
  metrics: {
    characters: "Characters",
    charactersWithoutSpaces: "Without spaces",
    words: "Words",
    lines: "Lines",
    paragraphs: "Paragraphs",
    sentences: "Sentences",
    readingTime: "Reading time",
    speakingTime: "Speaking time",
  },
  limitsTitle: "Character limits",
  limits: {
    xPost: "X (Twitter) post",
    seoTitle: "Title tag (SEO)",
    metaDescription: "Meta description (SEO)",
    instagramBio: "Instagram bio",
    instagramCaption: "Instagram caption",
  },
  content: (
    <>
      <section>
        <h2 className="text-lg font-semibold text-foreground mb-2">What is a character counter?</h2>
        <p className="text-[15px] leading-7 text-muted-foreground">
          A character counter shows how many letters, numbers, spaces and symbols a text contains. It is essential
          whenever you write with a length limit: social media posts, page titles and meta descriptions for Google,
          essays and assignments, SMS messages and form fields.
        </p>
      </section>

      <section>
        <h2 className="text-lg font-semibold text-foreground mb-2">How to count the characters in a text</h2>
        <ol className="text-[15px] leading-7 text-muted-foreground list-decimal list-inside space-y-1">
          <li>Type or paste your text into the box above.</li>
          <li>Watch the character, word and line counts update instantly.</li>
          <li>Check the bars to see whether the text fits the social network or SEO tag limit.</li>
        </ol>
      </section>

      <section>
        <h2 className="text-lg font-semibold text-foreground mb-2">Why count words and characters?</h2>
        <ul className="text-[15px] leading-7 text-muted-foreground list-disc list-inside space-y-1">
          <li>Write posts and captions within social media limits</li>
          <li>Fine-tune title tags and meta descriptions for SEO</li>
          <li>Meet minimum and maximum word counts for essays and assignments</li>
          <li>Estimate the reading time of articles and the speaking time of presentations</li>
        </ul>
      </section>
    </>
  ),
};

export default function CharacterCounter() {
  const copy = useCopy({ pt, en });
  const [text, setText] = useState("");
  const stats = useMemo(() => textStats(text), [text]);

  const metrics = [
    { label: copy.metrics.characters, value: stats.characters },
    { label: copy.metrics.charactersWithoutSpaces, value: stats.charactersWithoutSpaces },
    { label: copy.metrics.words, value: stats.words },
    { label: copy.metrics.lines, value: stats.lines },
    { label: copy.metrics.paragraphs, value: stats.paragraphs },
    { label: copy.metrics.sentences, value: stats.sentences },
    { label: copy.metrics.readingTime, value: formatDuration(stats.readingSeconds) },
    { label: copy.metrics.speakingTime, value: formatDuration(stats.speakingSeconds) },
  ];

  const copyText = async () => {
    if (!text) return;
    await navigator.clipboard.writeText(text);
    toast({ title: copy.copied });
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">{copy.title}</h1>
        <p className="mt-3 max-w-prose text-base leading-7 text-muted-foreground">{copy.intro}</p>
      </div>

      <div className="rounded-lg border border-border bg-card p-5 sm:p-6 space-y-5 shadow-xs">
        <Textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder={copy.placeholder}
          aria-label={copy.textareaLabel}
          className="min-h-[200px] text-base"
        />
        <div className="flex flex-wrap gap-3">
          <Button variant="secondary" onClick={copyText} className="gap-2">
            <Copy className="h-4 w-4" /> {copy.copy}
          </Button>
          <Button variant="outline" onClick={() => setText("")} className="gap-2">
            <Trash2 className="h-4 w-4" /> {copy.clear}
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
        <h2 className="text-lg font-semibold text-foreground">{copy.limitsTitle}</h2>
        {LIMITS.map(({ id, max }) => {
          const ratio = Math.min(stats.characters / max, 1);
          const exceeded = stats.characters > max;
          return (
            <div key={id} className="space-y-1">
              <div className="flex justify-between text-sm">
                <span className="text-foreground">{copy.limits[id]}</span>
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
        {copy.content}

        <ToolFaq toolId="contador-de-caracteres" />

        <RelatedTools ids={["editar-texto", "cortar-texto", "remover-acentos", "editar-palavras", "gerar-lorem"]} />
      </div>
    </div>
  );
}
