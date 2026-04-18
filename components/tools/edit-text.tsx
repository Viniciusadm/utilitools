"use client";

import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";
import { motion, AnimatePresence } from "framer-motion";
import { Copy, Undo2, Trash2, Shuffle, ArrowDownUp, CaseSensitive, CaseUpper, CaseLower, Type } from "lucide-react";
import Link from "next/link";

export default function EditText() {
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
    toast({ title: "Texto copiado!" });
  };

  return (
    <div className="w-full max-w-3xl mx-auto space-y-8">
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Editor de Texto Online</h1>
        <p className="mt-2 text-muted-foreground leading-relaxed max-w-prose">
          Inverta, embaralhe, remova duplicados, altere maiúsculas/minúsculas e capitalize palavras.
          Ferramenta prática para edição rápida de textos com contagem em tempo real.
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

            <AnimatePresence mode="wait">
              <motion.div
                key={`${chars}-${wordCount}-${lineCount}`}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex gap-4 text-sm text-muted-foreground tabular-nums"
              >
                <span>{chars} caracteres</span>
                <span>{wordCount} {wordCount === 1 ? "palavra" : "palavras"}</span>
                <span>{lineCount} {lineCount === 1 ? "linha" : "linhas"}</span>
              </motion.div>
            </AnimatePresence>

            <div className="flex flex-wrap gap-2">
              <Button onClick={reverseChars} variant="secondary" size="sm" disabled={!text.trim()}>
                <ArrowDownUp className="h-4 w-4" /> Inverter
              </Button>
              <Button onClick={toUpper} variant="secondary" size="sm" disabled={!text.trim()}>
                <CaseUpper className="h-4 w-4" /> Maiúsculas
              </Button>
              <Button onClick={toLower} variant="secondary" size="sm" disabled={!text.trim()}>
                <CaseLower className="h-4 w-4" /> Minúsculas
              </Button>
              <Button onClick={capitalizeWords} variant="secondary" size="sm" disabled={!text.trim()}>
                <Type className="h-4 w-4" /> Capitalizar
              </Button>
              <Button onClick={toggleCase} variant="secondary" size="sm" disabled={!text.trim()}>
                <CaseSensitive className="h-4 w-4" /> Alternar caixa
              </Button>
              <Button onClick={shuffleWords} variant="secondary" size="sm" disabled={!text.trim()}>
                <Shuffle className="h-4 w-4" /> Embaralhar
              </Button>
              <Button onClick={dedupeWords} variant="secondary" size="sm" disabled={!text.trim()}>
                <Trash2 className="h-4 w-4" /> Remover duplicados
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

        <div>
          <h2 className="text-xl font-semibold text-foreground mb-2">Veja também</h2>
          <ul className="list-disc list-inside space-y-1">
            <li><Link href="/editar-palavras" className="text-primary hover:underline">Editar Palavras</Link></li>
            <li><Link href="/dividir-texto" className="text-primary hover:underline">Dividir Texto</Link></li>
            <li><Link href="/cortar-texto" className="text-primary hover:underline">Cortar Texto</Link></li>
          </ul>
        </div>
      </motion.div>
    </div>
  );
}
