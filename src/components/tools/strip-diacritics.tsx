import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import { Copy } from "lucide-react";
import { ToolFaq } from "@/components/tool-faq";
import { RelatedTools } from "@/components/related-tools";
import { useUiCopy } from "@/i18n/ui";
import { useCopy } from "@/lib/i18n";

function stripDiacritics(text: string): string {
  return text.normalize("NFD").replace(/[̀-ͯ]/g, "");
}

const pt = {
  title: "Remover Acentos",
  intro:
    "Remova acentos de textos de forma rápida e automática. Basta colar ou digitar o conteúdo e obter uma versão sem acentuação, ideal para sistemas, programação, URLs, bancos de dados e padronização de textos.",
  textLabel: "Texto",
  placeholder: "Cole ou digite o texto com acentos aqui...",
  strip: "Remover",
  copy: "Copiar",
  result: "Resultado",
  content: (
    <>
      <section>
        <h2 className="text-lg font-semibold text-foreground mb-2">O que é remover acentos?</h2>
        <p className="text-[15px] leading-7 text-muted-foreground">
          Remover acentos significa transformar palavras com acentuação gráfica em versões sem esses sinais.
          Por exemplo, "ação" se torna "acao" e "café" se torna "cafe".
        </p>
      </section>

      <section>
        <h2 className="text-lg font-semibold text-foreground mb-2">Como remover acentos de um texto</h2>
        <ol className="text-[15px] leading-7 text-muted-foreground list-decimal list-inside space-y-1">
          <li>Cole ou digite o texto.</li>
          <li>Clique em <strong className="text-foreground">Remover</strong>.</li>
          <li>Visualize o resultado sem acentos.</li>
          <li>Copie, se necessário.</li>
        </ol>
      </section>

      <section>
        <h2 className="text-lg font-semibold text-foreground mb-2">Para que remover acentos?</h2>
        <ul className="text-[15px] leading-7 text-muted-foreground list-disc list-inside space-y-1">
          <li>Padronização de dados em sistemas</li>
          <li>Criação de URLs amigáveis</li>
          <li>Processamento de textos em programação</li>
          <li>Evitar erros em buscas e filtros</li>
          <li>Compatibilidade com sistemas antigos</li>
        </ul>
      </section>

      <section>
        <h2 className="text-lg font-semibold text-foreground mb-2">A importância da acentuação</h2>
        <p className="text-[15px] leading-7 text-muted-foreground">
          A acentuação na língua portuguesa é essencial para indicar a pronúncia correta e diferenciar significados
          entre palavras. Mesmo assim, em alguns contextos técnicos, remover acentos é necessário para garantir compatibilidade.
        </p>
      </section>

      <section>
        <h2 className="text-lg font-semibold text-foreground mb-2">Sobre o uso moderno da língua</h2>
        <p className="text-[15px] leading-7 text-muted-foreground">
          Com o Acordo Ortográfico, algumas mudanças simplificaram a escrita, como o fim do trema. Ainda assim,
          os acentos continuam sendo fundamentais na comunicação formal.
        </p>
      </section>

      <div className="rounded-lg border border-border bg-muted/60 p-4">
        <p className="text-xs text-muted-foreground leading-relaxed">
          <strong className="text-foreground">DICA:</strong> Use textos sem acento apenas em contextos técnicos.
          Para comunicação com pessoas, prefira manter a acentuação correta para evitar ambiguidades.
        </p>
      </div>
    </>
  ),
};

const en: typeof pt = {
  title: "Remove Accents",
  intro:
    "Remove accents and diacritics from any text quickly and automatically. Paste or type your content and get a plain version without accent marks, ideal for systems, programming, URLs, databases and text normalization.",
  textLabel: "Text",
  placeholder: "Paste or type the accented text here...",
  strip: "Remove",
  copy: "Copy",
  result: "Result",
  content: (
    <>
      <section>
        <h2 className="text-lg font-semibold text-foreground mb-2">What does removing accents mean?</h2>
        <p className="text-[15px] leading-7 text-muted-foreground">
          Removing accents means turning letters with diacritical marks into their plain base letters. For example,
          "é" becomes "e", "ç" becomes "c", "ñ" becomes "n" and "ü" becomes "u", so "café" turns into "cafe" and
          "jalapeño" into "jalapeno".
        </p>
      </section>

      <section>
        <h2 className="text-lg font-semibold text-foreground mb-2">How to remove accents from text</h2>
        <ol className="text-[15px] leading-7 text-muted-foreground list-decimal list-inside space-y-1">
          <li>Paste or type the text.</li>
          <li>Click <strong className="text-foreground">Remove</strong>.</li>
          <li>See the result without accents.</li>
          <li>Copy it if you need to.</li>
        </ol>
      </section>

      <section>
        <h2 className="text-lg font-semibold text-foreground mb-2">Why remove accents?</h2>
        <ul className="text-[15px] leading-7 text-muted-foreground list-disc list-inside space-y-1">
          <li>Normalizing data in systems and databases</li>
          <li>Creating clean, SEO-friendly URLs and slugs</li>
          <li>Processing text in programming</li>
          <li>Avoiding mismatches in searches and filters</li>
          <li>Compatibility with legacy systems and plain ASCII</li>
        </ul>
      </section>

      <section>
        <h2 className="text-lg font-semibold text-foreground mb-2">Which characters are converted?</h2>
        <p className="text-[15px] leading-7 text-muted-foreground">
          The tool removes the marks that languages such as French, Spanish, Portuguese, German and Italian add to
          letters: acute (á, é), grave (à, è), circumflex (â, ê), tilde (ã, ñ), diaeresis or umlaut (ä, ü) and
          cedilla (ç). Characters that are separate letters rather than accented ones, such as ß, æ or ø, are kept as
          they are.
        </p>
      </section>

      <section>
        <h2 className="text-lg font-semibold text-foreground mb-2">How it works</h2>
        <p className="text-[15px] leading-7 text-muted-foreground">
          The text is converted to the Unicode NFD normalization form, which splits each accented letter into its base
          letter plus a combining mark. The combining marks are then removed, leaving only the base letters.
        </p>
      </section>

      <div className="rounded-lg border border-border bg-muted/60 p-4">
        <p className="text-xs text-muted-foreground leading-relaxed">
          <strong className="text-foreground">TIP:</strong> Use unaccented text only in technical contexts.
          When writing for people, keep the correct accents to avoid ambiguity and misspellings.
        </p>
      </div>
    </>
  ),
};

export default function StripDiacritics() {
  const copy = useCopy({ pt, en });
  const uiCopy = useUiCopy();
  const [text, setText] = useState("");
  const [output, setOutput] = useState("");

  const handleStrip = () => {
    if (!text.trim()) return;
    setOutput(stripDiacritics(text));
  };

  const handleCopy = () => {
    if (!output) return;
    navigator.clipboard.writeText(output);
    toast({ title: uiCopy.copied });
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">{copy.title}</h1>
        <p className="mt-3 max-w-prose text-base leading-7 text-muted-foreground">{copy.intro}</p>
      </div>

      <div className="space-y-2">
        <Label className="text-sm font-medium text-foreground">{copy.textLabel}</Label>
        <Textarea
          placeholder={copy.placeholder}
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="min-h-[120px]"
        />
      </div>

      <div className="flex gap-3">
        <Button onClick={handleStrip} className="px-8">{copy.strip}</Button>
        <Button variant="secondary" onClick={handleCopy} className="gap-2">
          <Copy className="h-4 w-4" /> {copy.copy}
        </Button>
      </div>

      <AnimatePresence mode="wait">
        {output && (
          <motion.div
            key={output}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="rounded-lg border border-primary/20 bg-primary/5 p-5"
          >
            <p className="text-sm font-medium text-muted-foreground mb-2">{copy.result}</p>
            <p className="text-sm text-foreground whitespace-pre-wrap">{output}</p>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="space-y-8 border-t border-border pt-10">
        {copy.content}

        <ToolFaq toolId="remover-acentos" />

        <RelatedTools ids={["editar-texto", "dividir-texto", "cortar-texto", "editar-palavras"]} />
      </div>
    </div>
  );
}
