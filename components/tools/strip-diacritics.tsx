"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import Link from "next/link";
import { Copy } from "lucide-react";

function stripDiacritics(text: string): string {
  return text.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

export default function StripDiacritics() {
  const [text, setText] = useState("");
  const [output, setOutput] = useState("");

  const handleStrip = () => {
    if (!text.trim()) return;
    setOutput(stripDiacritics(text));
  };

  const handleCopy = () => {
    if (!output) return;
    navigator.clipboard.writeText(output);
    toast({ title: "Copiado para a área de transferência" });
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Remover Acentos</h1>
        <p className="mt-2 text-muted-foreground text-sm leading-relaxed">
          Remova acentos de textos de forma rápida e automática. Basta colar ou digitar o conteúdo e obter uma versão
          sem acentuação, ideal para sistemas, programação, URLs, bancos de dados e padronização de textos.
        </p>
      </div>

      <div className="space-y-2">
        <Label className="text-muted-foreground text-xs uppercase tracking-wider">Texto</Label>
        <Textarea
          placeholder="Cole ou digite o texto com acentos aqui..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="bg-muted border-border min-h-[120px]"
        />
      </div>

      <div className="flex gap-3">
        <Button onClick={handleStrip} className="px-8">Remover</Button>
        <Button variant="secondary" onClick={handleCopy} className="gap-2">
          <Copy className="h-4 w-4" /> Copiar
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
            className="rounded-md border border-border bg-muted p-5"
          >
            <p className="text-xs text-muted-foreground mb-2 uppercase tracking-wider">Resultado</p>
            <p className="text-sm text-foreground whitespace-pre-wrap">{output}</p>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="space-y-6 border-t border-border pt-8">
        <section>
          <h2 className="text-lg font-semibold text-foreground mb-2">O que é remover acentos?</h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Remover acentos significa transformar palavras com acentuação gráfica em versões sem esses sinais.
            Por exemplo, "ação" se torna "acao" e "café" se torna "cafe".
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground mb-2">Como remover acentos de um texto</h2>
          <ol className="text-sm text-muted-foreground leading-relaxed list-decimal list-inside space-y-1">
            <li>Cole ou digite o texto.</li>
            <li>Clique em <strong className="text-foreground">Remover</strong>.</li>
            <li>Visualize o resultado sem acentos.</li>
            <li>Copie, se necessário.</li>
          </ol>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground mb-2">Para que remover acentos?</h2>
          <ul className="text-sm text-muted-foreground leading-relaxed list-disc list-inside space-y-1">
            <li>Padronização de dados em sistemas</li>
            <li>Criação de URLs amigáveis</li>
            <li>Processamento de textos em programação</li>
            <li>Evitar erros em buscas e filtros</li>
            <li>Compatibilidade com sistemas antigos</li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground mb-2">A importância da acentuação</h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            A acentuação na língua portuguesa é essencial para indicar a pronúncia correta e diferenciar significados
            entre palavras. Mesmo assim, em alguns contextos técnicos, remover acentos é necessário para garantir compatibilidade.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground mb-2">Sobre o uso moderno da língua</h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Com o Acordo Ortográfico, algumas mudanças simplificaram a escrita, como o fim do trema. Ainda assim,
            os acentos continuam sendo fundamentais na comunicação formal.
          </p>
        </section>

        <div className="rounded-md border border-border bg-card p-4">
          <p className="text-xs text-muted-foreground leading-relaxed">
            <strong className="text-foreground">DICA:</strong> Use textos sem acento apenas em contextos técnicos.
            Para comunicação com pessoas, prefira manter a acentuação correta para evitar ambiguidades.
          </p>
        </div>

        <section>
          <h2 className="text-lg font-semibold text-foreground mb-3">Veja também:</h2>
          <div className="flex flex-wrap gap-2">
            {[
              { label: "Editar Texto", url: "/editar-texto" },
              { label: "Dividir Texto", url: "/dividir-texto" },
              { label: "Cortar Texto", url: "/cortar-texto" },
              { label: "Editar Palavras", url: "/editar-palavras" },
            ].map((link) => (
              <Link key={link.url} href={link.url} className="text-sm text-primary hover:underline">
                {link.label}
              </Link>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
