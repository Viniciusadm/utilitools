import { useMemo, useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { CopyButton } from "@/components/copy-button";
import { Field } from "@/components/form-field";
import { OptionToggle } from "@/components/option-toggle";
import { RelatedTools } from "@/components/related-tools";
import { ToolFaq } from "@/components/tool-faq";
import { ToolSection } from "@/components/tool-section";
import { useCopy } from "@/lib/i18n";
import { slugify } from "@/lib/slug";

const pt = {
  title: "Gerador de Slug para URL",
  intro:
    "Transforme títulos em slugs amigáveis para URL: sem acentos, sem espaços e sem caracteres especiais. Cole vários títulos, um por linha, para gerar todos os slugs de uma vez.",
  defaultText: "Como Fazer Pão Caseiro: Receita Fácil em 5 Passos!\nAs 10 Melhores Praias do Nordeste em 2025",
  inputLabel: "Títulos (um por linha)",
  separatorLabel: "Separador",
  hyphen: "Hífen (-)",
  underscore: "Underline (_)",
  caseLabel: "Letras",
  lowercase: "Minúsculas",
  keepCase: "Manter",
  result: "Slugs gerados",
  content: (
    <>
      <ToolSection title="O que é slug?">
        <p>
          Slug é a parte da URL que identifica uma página de forma legível. Em{" "}
          <code>site.com/blog/como-fazer-pao-caseiro</code>, o slug é <code>como-fazer-pao-caseiro</code>. Ele usa só
          letras minúsculas, números e hífens, sem acentos nem espaços, para funcionar em qualquer navegador e servidor.
        </p>
      </ToolSection>

      <ToolSection title="Por que o slug importa para SEO">
        <ul>
          <li>O Google lê as palavras da URL e as usa como um dos sinais sobre o assunto da página.</li>
          <li>URLs curtas e descritivas recebem mais cliques nos resultados de busca.</li>
          <li>O Google recomenda separar palavras com hífen, e não com underline.</li>
          <li>Acentos viram códigos como %C3%A7 na URL, o que deixa o link feio quando compartilhado.</li>
        </ul>
      </ToolSection>

      <ToolSection title="Como o slug é gerado">
        <ol>
          <li>Remove acentos e cedilha: “ação” vira “acao”.</li>
          <li>Remove apóstrofos e troca qualquer outro símbolo ou espaço pelo separador.</li>
          <li>Junta separadores repetidos e tira os que sobram no começo e no fim.</li>
          <li>Converte tudo para minúsculas, se a opção estiver ativa.</li>
        </ol>
      </ToolSection>

      <div className="rounded-lg border border-border bg-muted/60 p-4 text-sm leading-6 text-muted-foreground">
        <strong className="text-foreground">Dica de SEO:</strong> tire palavras que não ajudam, como “de”, “para” e “o”,
        e mantenha a palavra-chave principal. “como-fazer-pao-caseiro” é melhor do que
        “como-fazer-um-pao-caseiro-facil-e-rapido-em-casa”.
      </div>
    </>
  ),
};

const en: typeof pt = {
  title: "URL Slug Generator",
  intro:
    "Turn titles into URL-friendly slugs: no accents, no spaces and no special characters. Paste several titles, one per line, to generate every slug at once.",
  defaultText: "How to Bake Sourdough Bread: 5 Easy Steps!\nThe 10 Best Beaches in Brazil for 2025",
  inputLabel: "Titles (one per line)",
  separatorLabel: "Separator",
  hyphen: "Hyphen (-)",
  underscore: "Underscore (_)",
  caseLabel: "Letter case",
  lowercase: "Lowercase",
  keepCase: "Keep",
  result: "Generated slugs",
  content: (
    <>
      <ToolSection title="What is a slug?">
        <p>
          A slug is the readable part of a URL that identifies a page. In{" "}
          <code>site.com/blog/how-to-bake-sourdough-bread</code>, the slug is <code>how-to-bake-sourdough-bread</code>. It
          uses only lowercase letters, digits and hyphens, with no accents or spaces, so it works in every browser and
          server.
        </p>
      </ToolSection>

      <ToolSection title="Why slugs matter for SEO">
        <ul>
          <li>Google reads the words in a URL as one of the signals about what the page is about.</li>
          <li>Short, descriptive URLs get more clicks in search results.</li>
          <li>Google recommends separating words with hyphens rather than underscores.</li>
          <li>Accented characters turn into codes such as %C3%A9, which makes shared links look messy.</li>
        </ul>
      </ToolSection>

      <ToolSection title="How the slug is built">
        <ol>
          <li>Accents are removed: “café” becomes “cafe”.</li>
          <li>Apostrophes are dropped and any other symbol or space becomes the separator.</li>
          <li>Repeated separators are merged and leading or trailing ones are trimmed.</li>
          <li>Everything is lowercased, if that option is on.</li>
        </ol>
      </ToolSection>

      <div className="rounded-lg border border-border bg-muted/60 p-4 text-sm leading-6 text-muted-foreground">
        <strong className="text-foreground">SEO tip:</strong> drop filler words such as “a”, “the” and “of” and keep the
        main keyword. “bake-sourdough-bread” beats “how-to-bake-a-really-easy-sourdough-bread-at-home”.
      </div>
    </>
  ),
};

export default function SlugGenerator() {
  const copy = useCopy({ pt, en });
  const [input, setInput] = useState(copy.defaultText);
  const [hyphen, setHyphen] = useState(true);
  const [lowercase, setLowercase] = useState(true);

  const slugs = useMemo(
    () =>
      input
        .split("\n")
        .map((line) => slugify(line, hyphen ? "-" : "_", lowercase))
        .filter(Boolean),
    [input, hyphen, lowercase],
  );

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">{copy.title}</h1>
        <p className="mt-3 max-w-prose text-base leading-7 text-muted-foreground">{copy.intro}</p>
      </div>

      <div className="rounded-lg border border-border bg-card p-5 sm:p-6 space-y-5 shadow-xs">
        <Field label={copy.inputLabel}>
          {(id) => (
            <Textarea id={id} value={input} onChange={(e) => setInput(e.target.value)} rows={5} className="resize-y" />
          )}
        </Field>
        <div className="grid gap-5 sm:grid-cols-2">
          <OptionToggle
            label={copy.separatorLabel}
            value={hyphen}
            onChange={setHyphen}
            trueLabel={copy.hyphen}
            falseLabel={copy.underscore}
          />
          <OptionToggle
            label={copy.caseLabel}
            value={lowercase}
            onChange={setLowercase}
            trueLabel={copy.lowercase}
            falseLabel={copy.keepCase}
          />
        </div>
      </div>

      {slugs.length > 0 && (
        <div className="rounded-lg border border-primary/20 bg-primary/5 p-5 space-y-3">
          <div className="flex items-center justify-between gap-3">
            <p className="text-sm font-medium text-muted-foreground">{copy.result}</p>
            <CopyButton value={slugs.join("\n")} />
          </div>
          <ul className="space-y-1 font-mono text-sm text-foreground">
            {slugs.map((slug, i) => (
              <li key={i} className="break-all">
                {slug}
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="space-y-8 border-t border-border pt-10">
        {copy.content}
        <ToolFaq toolId="gerador-de-slug" />
        <RelatedTools ids={["remover-acentos", "codificar-url", "contador-de-caracteres", "testar-regex"]} />
      </div>
    </div>
  );
}
