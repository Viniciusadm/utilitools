"use client";

import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { toast } from "@/hooks/use-toast";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpDown, Shuffle, Copy, Undo2, Trash2, ArrowDownUp } from "lucide-react";
import Link from "next/link";

type WordDelimiter = "space" | "newline" | "comma" | "semicolon";

const delimiterOptions: { value: WordDelimiter; label: string; char: string }[] = [
  { value: "space", label: "Espaço", char: " " },
  { value: "newline", label: "Quebra de linha", char: "\n" },
  { value: "comma", label: "Vírgula", char: "," },
  { value: "semicolon", label: "Ponto e vírgula", char: ";" },
];

function getDelimiterChar(sep: WordDelimiter) {
  return delimiterOptions.find((s) => s.value === sep)!.char;
}

function splitWords(text: string, sep: WordDelimiter): string[] {
  const char = getDelimiterChar(sep);
  return text.split(char).map((w) => w.trim()).filter(Boolean);
}

function joinWords(words: string[], sep: WordDelimiter): string {
  const char = getDelimiterChar(sep);
  const join = char === "\n" ? "\n" : char + " ";
  return words.join(char === " " ? " " : join);
}

export default function EditWords() {
  const [text, setText] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [delimiter, setDelimiter] = useState<WordDelimiter>("space");

  const words = splitWords(text, delimiter);
  const wordCount = words.length;

  const apply = useCallback(
    (transform: (words: string[]) => string[]) => {
      if (!text.trim()) return;
      setHistory((h) => [...h, text]);
      const result = transform(splitWords(text, delimiter));
      setText(joinWords(result, delimiter));
    },
    [text, delimiter],
  );

  const sortWords = () => apply((w) => [...w].sort((a, b) => a.localeCompare(b, "pt-BR")));
  const reverseWords = () => apply((w) => [...w].reverse());
  const dedupeWords = () => apply((w) => [...new Set(w)]);
  const shuffleWords = () =>
    apply((w) => {
      const arr = [...w];
      for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
      }
      return arr;
    });

  const undo = () => {
    if (history.length === 0) return;
    setText(history[history.length - 1]);
    setHistory((h) => h.slice(0, -1));
  };

  const copyText = async () => {
    if (!text.trim()) return;
    await navigator.clipboard.writeText(text);
    toast({ title: "Texto copiado!" });
  };

  return (
    <div className="w-full max-w-3xl mx-auto space-y-8">
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Editor de Palavras Online</h1>
        <p className="mt-2 text-muted-foreground leading-relaxed max-w-prose">
          Organize, embaralhe, remova duplicados e altere a ordem das palavras de forma prática.
          Escolha o separador desejado e edite seu texto rapidamente.
        </p>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}>
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Texto</CardTitle>
            <CardDescription>Cole ou digite o texto que deseja editar</CardDescription>
          </CardHeader>
          <CardContent className="space-y-5">
            <Textarea
              placeholder="Digite ou cole seu texto aqui..."
              value={text}
              onChange={(e) => setText(e.target.value)}
              rows={6}
              className="resize-y"
            />

            <div className="flex items-center justify-between flex-wrap gap-2">
              <AnimatePresence mode="wait">
                <motion.span
                  key={wordCount}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-sm text-muted-foreground tabular-nums"
                >
                  {wordCount} {wordCount === 1 ? "palavra" : "palavras"}
                </motion.span>
              </AnimatePresence>
            </div>

            <div className="space-y-2">
              <span className="text-sm font-medium text-foreground">Separador</span>
              <ToggleGroup
                type="single"
                value={delimiter}
                onValueChange={(v) => v && setDelimiter(v as WordDelimiter)}
                className="justify-start flex-wrap"
              >
                {delimiterOptions.map((s) => (
                  <ToggleGroupItem key={s.value} value={s.value} className="text-xs px-3">
                    {s.label}
                  </ToggleGroupItem>
                ))}
              </ToggleGroup>
            </div>

            <div className="flex flex-wrap gap-2">
              <Button onClick={sortWords} variant="secondary" size="sm" disabled={!text.trim()}>
                <ArrowUpDown className="h-4 w-4" /> Ordenar
              </Button>
              <Button onClick={reverseWords} variant="secondary" size="sm" disabled={!text.trim()}>
                <ArrowDownUp className="h-4 w-4" /> Inverter
              </Button>
              <Button onClick={dedupeWords} variant="secondary" size="sm" disabled={!text.trim()}>
                <Trash2 className="h-4 w-4" /> Remover duplicados
              </Button>
              <Button onClick={shuffleWords} variant="secondary" size="sm" disabled={!text.trim()}>
                <Shuffle className="h-4 w-4" /> Embaralhar
              </Button>
              <Button onClick={undo} variant="outline" size="sm" disabled={history.length === 0}>
                <Undo2 className="h-4 w-4" /> Desfazer
              </Button>
              <Button onClick={copyText} variant="outline" size="sm" disabled={!text.trim()}>
                <Copy className="h-4 w-4" /> Copiar
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div
        className="space-y-6 text-sm text-muted-foreground leading-relaxed"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.16, ease: [0.16, 1, 0.3, 1] }}
      >
        <div>
          <h2 className="text-xl font-semibold text-foreground mb-2">O que é o editor de palavras?</h2>
          <p>
            O editor de palavras é uma ferramenta online que permite manipular textos de forma
            rápida e prática. Com ele, você pode ordenar, inverter, remover duplicados e embaralhar
            palavras em segundos.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-foreground mb-2">Como funciona?</h2>
          <ol className="list-decimal list-inside space-y-1">
            <li>Cole ou digite o texto que deseja editar.</li>
            <li>Escolha a ação desejada (ordenar, inverter, remover duplicados ou embaralhar).</li>
            <li>Selecione o separador correto do seu texto.</li>
            <li>Veja o resultado instantaneamente.</li>
            <li>Use "Desfazer" para reverter alterações.</li>
          </ol>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-foreground mb-2">Funcionalidades</h2>
          <ul className="list-disc list-inside space-y-1">
            <li><strong>Ordenar:</strong> organiza as palavras em ordem alfabética.</li>
            <li><strong>Inverter:</strong> inverte a ordem das palavras no texto.</li>
            <li><strong>Remover duplicados:</strong> elimina palavras repetidas, mantendo apenas uma ocorrência.</li>
            <li><strong>Embaralhar:</strong> reorganiza as palavras de forma aleatória.</li>
            <li><strong>Desfazer:</strong> reverte a última alteração feita no texto.</li>
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-foreground mb-2">Veja também</h2>
          <ul className="list-disc list-inside space-y-1">
            <li>
              <Link href="/editar-texto" className="text-primary hover:underline">Editar Texto</Link>
            </li>
          </ul>
        </div>
      </motion.div>
    </div>
  );
}
