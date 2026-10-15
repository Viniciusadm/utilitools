import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";
import { motion, AnimatePresence } from "framer-motion";
import { Copy, Undo2, Trash2, Shuffle, ArrowDownUp, CaseSensitive, CaseUpper, CaseLower, Type } from "lucide-react";
import { ToolFaq } from "@/components/tool-faq";
import { RelatedTools } from "@/components/related-tools";
import { useCopy } from "@/lib/i18n";

const pt = {
  title: "Editor de Texto Online",
  intro:
    "Inverta, embaralhe, remova duplicados, altere maiúsculas/minúsculas e capitalize palavras. Ferramenta prática para edição rápida de textos com contagem em tempo real.",
  cardTitle: "Texto",
  cardDescription: "Cole ou digite o texto que deseja editar",
  placeholder: "Digite ou cole seu texto aqui...",
  characters: (n: number) => `${n} caracteres`,
  words: (n: number) => `${n} ${n === 1 ? "palavra" : "palavras"}`,
  lines: (n: number) => `${n} ${n === 1 ? "linha" : "linhas"}`,
  actions: {
    reverse: "Inverter",
    upper: "Maiúsculas",
    lower: "Minúsculas",
    capitalize: "Capitalizar",
    toggleCase: "Alternar caixa",
    shuffle: "Embaralhar",
    dedupe: "Remover duplicados",
    undo: "Desfazer",
    copy: "Copiar",
  },
  copied: "Texto copiado!",
  content: (
    <>
      <div>
        <h2 className="text-xl font-semibold text-foreground mb-2">O que é o editor de texto?</h2>
        <p>
          O editor de texto online é uma ferramenta gratuita que permite transformar textos de
          diversas formas: converter para maiúsculas ou minúsculas, capitalizar palavras, inverter,
          embaralhar e remover duplicados — tudo de maneira instantânea.
        </p>
      </div>

      <div>
        <h2 className="text-xl font-semibold text-foreground mb-2">Como usar</h2>
        <ol className="list-decimal list-inside space-y-1">
          <li>Cole ou digite o texto que deseja editar.</li>
          <li>Clique na ação desejada (inverter, maiúsculas, minúsculas, capitalizar, alternar caixa, embaralhar ou remover duplicados).</li>
          <li>Veja o resultado instantaneamente no editor.</li>
          <li>Use o botão "Desfazer" para reverter alterações.</li>
        </ol>
      </div>

      <div>
        <h2 className="text-xl font-semibold text-foreground mb-2">Funcionalidades</h2>
        <ul className="list-disc list-inside space-y-1">
          <li><strong>Inverter:</strong> inverte todos os caracteres do texto.</li>
          <li><strong>Maiúsculas:</strong> converte todo o texto para letras maiúsculas.</li>
          <li><strong>Minúsculas:</strong> converte todo o texto para letras minúsculas.</li>
          <li><strong>Capitalizar:</strong> deixa a primeira letra de cada palavra em maiúscula.</li>
          <li><strong>Alternar caixa:</strong> inverte maiúsculas e minúsculas de cada caractere.</li>
          <li><strong>Embaralhar:</strong> reorganiza as palavras de forma aleatória.</li>
          <li><strong>Remover duplicados:</strong> elimina palavras repetidas.</li>
        </ul>
      </div>
    </>
  ),
};

const en: typeof pt = {
  title: "Online Text Editor",
  intro:
    "Reverse, shuffle, remove duplicates, convert to uppercase or lowercase and capitalize words. A handy tool for quick text editing with live character, word and line counts.",
  cardTitle: "Text",
  cardDescription: "Paste or type the text you want to edit",
  placeholder: "Type or paste your text here...",
  characters: (n: number) => `${n} ${n === 1 ? "character" : "characters"}`,
  words: (n: number) => `${n} ${n === 1 ? "word" : "words"}`,
  lines: (n: number) => `${n} ${n === 1 ? "line" : "lines"}`,
  actions: {
    reverse: "Reverse",
    upper: "Uppercase",
    lower: "Lowercase",
    capitalize: "Capitalize",
    toggleCase: "Toggle case",
    shuffle: "Shuffle",
    dedupe: "Remove duplicates",
    undo: "Undo",
    copy: "Copy",
  },
  copied: "Text copied!",
  content: (
    <>
      <div>
        <h2 className="text-xl font-semibold text-foreground mb-2">What is this text editor?</h2>
        <p>
          This free online text editor lets you transform text in several ways: convert it to uppercase or
          lowercase, capitalize each word (title case), reverse it, shuffle words and remove duplicates, all
          instantly and right in your browser.
        </p>
      </div>

      <div>
        <h2 className="text-xl font-semibold text-foreground mb-2">How to use it</h2>
        <ol className="list-decimal list-inside space-y-1">
          <li>Paste or type the text you want to edit.</li>
          <li>Click the action you need (reverse, uppercase, lowercase, capitalize, toggle case, shuffle or remove duplicates).</li>
          <li>See the result instantly in the editor.</li>
          <li>Use the "Undo" button to revert changes.</li>
        </ol>
      </div>

      <div>
        <h2 className="text-xl font-semibold text-foreground mb-2">Features</h2>
        <ul className="list-disc list-inside space-y-1">
          <li><strong>Reverse:</strong> reverses every character in the text.</li>
          <li><strong>Uppercase:</strong> converts the whole text to capital letters.</li>
          <li><strong>Lowercase:</strong> converts the whole text to small letters.</li>
          <li><strong>Capitalize:</strong> makes the first letter of each word uppercase.</li>
          <li><strong>Toggle case:</strong> swaps uppercase and lowercase for each character.</li>
          <li><strong>Shuffle:</strong> rearranges the words in random order.</li>
          <li><strong>Remove duplicates:</strong> deletes repeated words.</li>
        </ul>
      </div>
    </>
  ),
};

export default function EditText() {
  const copy = useCopy({ pt, en });
  const [text, setText] = useState("");
  const [history, setHistory] = useState<string[]>([]);

  const chars = text.length;
  const wordCount = text.trim() ? text.trim().split(/\s+/).length : 0;
  const lineCount = text ? text.split("\n").length : 0;

  const apply = useCallback(
    (fn: (t: string) => string) => {
      if (!text.trim()) return;
      setHistory((h) => [...h, text]);
      setText(fn(text));
    },
    [text],
  );

  const reverseChars = () => apply((t) => t.split("").reverse().join(""));
  const toUpper = () => apply((t) => t.toUpperCase());
  const toLower = () => apply((t) => t.toLowerCase());
  const capitalizeWords = () =>
    apply((t) =>
      t.replace(/\b\w/g, (c) => c.toUpperCase()),
    );
  const toggleCase = () =>
    apply((t) =>
      t
        .split("")
        .map((c) => (c === c.toUpperCase() ? c.toLowerCase() : c.toUpperCase()))
        .join(""),
    );
  const shuffleWords = () =>
    apply((t) => {
      const words = t.split(/\s+/);
      for (let i = words.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [words[i], words[j]] = [words[j], words[i]];
      }
      return words.join(" ");
    });
  const dedupeWords = () =>
    apply((t) => {
      const words = t.split(/\s+/);
      return [...new Set(words)].join(" ");
    });

  const undo = () => {
    if (history.length === 0) return;
    setText(history[history.length - 1]);
    setHistory((h) => h.slice(0, -1));
  };

  const copyText = async () => {
    if (!text.trim()) return;
    await navigator.clipboard.writeText(text);
    toast({ title: copy.copied });
  };

  return (
    <div className="w-full max-w-3xl mx-auto space-y-8">
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}>
        <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">{copy.title}</h1>
        <p className="mt-2 text-muted-foreground leading-relaxed max-w-prose">{copy.intro}</p>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}>
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">{copy.cardTitle}</CardTitle>
            <CardDescription>{copy.cardDescription}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-5">
            <Textarea
              placeholder={copy.placeholder}
              value={text}
              onChange={(e) => setText(e.target.value)}
              rows={6}
              className="resize-y"
            />

            <AnimatePresence mode="wait">
              <motion.div
                key={`${chars}-${wordCount}-${lineCount}`}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex gap-4 text-sm text-muted-foreground tabular-nums"
              >
                <span>{copy.characters(chars)}</span>
                <span>{copy.words(wordCount)}</span>
                <span>{copy.lines(lineCount)}</span>
              </motion.div>
            </AnimatePresence>

            <div className="flex flex-wrap gap-2">
              <Button onClick={reverseChars} variant="secondary" size="sm" disabled={!text.trim()}>
                <ArrowDownUp className="h-4 w-4" /> {copy.actions.reverse}
              </Button>
              <Button onClick={toUpper} variant="secondary" size="sm" disabled={!text.trim()}>
                <CaseUpper className="h-4 w-4" /> {copy.actions.upper}
              </Button>
              <Button onClick={toLower} variant="secondary" size="sm" disabled={!text.trim()}>
                <CaseLower className="h-4 w-4" /> {copy.actions.lower}
              </Button>
              <Button onClick={capitalizeWords} variant="secondary" size="sm" disabled={!text.trim()}>
                <Type className="h-4 w-4" /> {copy.actions.capitalize}
              </Button>
              <Button onClick={toggleCase} variant="secondary" size="sm" disabled={!text.trim()}>
                <CaseSensitive className="h-4 w-4" /> {copy.actions.toggleCase}
              </Button>
              <Button onClick={shuffleWords} variant="secondary" size="sm" disabled={!text.trim()}>
                <Shuffle className="h-4 w-4" /> {copy.actions.shuffle}
              </Button>
              <Button onClick={dedupeWords} variant="secondary" size="sm" disabled={!text.trim()}>
                <Trash2 className="h-4 w-4" /> {copy.actions.dedupe}
              </Button>
              <Button onClick={undo} variant="outline" size="sm" disabled={history.length === 0}>
                <Undo2 className="h-4 w-4" /> {copy.actions.undo}
              </Button>
              <Button onClick={copyText} variant="outline" size="sm" disabled={!text.trim()}>
                <Copy className="h-4 w-4" /> {copy.actions.copy}
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div
        className="space-y-6 text-[15px] leading-7 text-muted-foreground"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.16, ease: [0.16, 1, 0.3, 1] }}
      >
        {copy.content}

        <ToolFaq toolId="editar-texto" />

        <RelatedTools ids={["contador-de-caracteres", "editar-palavras", "dividir-texto", "cortar-texto"]} />
      </motion.div>
    </div>
  );
}
