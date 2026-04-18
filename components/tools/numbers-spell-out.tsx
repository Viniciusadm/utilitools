"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import { numberToPortugueseWords } from "@/lib/extenso";
import Link from "next/link";
import { Copy } from "lucide-react";

export default function NumbersSpellOut() {
  const [numberInput, setNumberInput] = useState("");
  const [output, setOutput] = useState("");

  const handleConvert = () => {
    if (!numberInput.trim()) return;
    setOutput(numberToPortugueseWords(numberInput.trim()));
  };

  const handleCopy = () => {
    if (!output) return;
    navigator.clipboard.writeText(output);
    toast({ title: "Copiado para a área de transferência" });
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Número por Extenso</h1>
        <p className="mt-2 text-muted-foreground text-sm leading-relaxed">
          Converta números em texto por extenso de forma rápida e precisa. Basta digitar qualquer número e obter sua
          escrita completa, ideal para cheques, documentos, contratos e uso acadêmico.
        </p>
      </div>

      <div className="space-y-2">
        <Label className="text-muted-foreground text-xs uppercase tracking-wider">Número a ser escrito por extenso</Label>
        <Input
          type="text"
          inputMode="numeric"
          placeholder="Ex: 1234"
          value={numberInput}
          onChange={(e) => setNumberInput(e.target.value.replace(/[^\d]/g, ""))}
          className="bg-muted border-border"
        />
      </div>

      <div className="flex gap-3">
        <Button onClick={handleConvert} className="px-8">Escrever por extenso</Button>
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
            <p className="text-lg text-foreground font-semibold">{output}</p>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="space-y-6 border-t border-border pt-8">
        <section>
          <h2 className="text-lg font-semibold text-foreground mb-2">O que é número por extenso?</h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Escrever um número por extenso significa representá-lo utilizando palavras em vez de algarismos.
            Por exemplo, o número 123 pode ser escrito como "cento e vinte e três".
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground mb-2">Como escrever números por extenso</h2>
          <ol className="text-sm text-muted-foreground leading-relaxed list-decimal list-inside space-y-1">
            <li>Digite o número desejado.</li>
            <li>Clique em <strong className="text-foreground">Escrever por extenso</strong>.</li>
            <li>Visualize o resultado completo.</li>
            <li>Copie, se necessário.</li>
          </ol>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground mb-2">Regras básicas de números por extenso</h2>
          <ul className="text-sm text-muted-foreground leading-relaxed list-disc list-inside space-y-1">
            <li><strong className="text-foreground">Números até dez:</strong> geralmente escritos por extenso, como "um", "dois", "três".</li>
            <li><strong className="text-foreground">Dezenas e centenas:</strong> utiliza-se "e" para ligar os termos, como "duzentos e cinquenta".</li>
            <li><strong className="text-foreground">Milhares e milhões:</strong> seguem estrutura organizada, como "dois mil", "um milhão".</li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground mb-2">Para que usar números por extenso?</h2>
          <ul className="text-sm text-muted-foreground leading-relaxed list-disc list-inside space-y-1">
            <li>Preenchimento de cheques</li>
            <li>Documentos oficiais</li>
            <li>Contratos</li>
            <li>Trabalhos acadêmicos</li>
            <li>Evitar erros ou fraudes em valores</li>
          </ul>
        </section>

        <div className="rounded-md border border-border bg-card p-4">
          <p className="text-xs text-muted-foreground leading-relaxed">
            <strong className="text-foreground">DICA:</strong> Sempre revise a escrita por extenso em documentos importantes,
            especialmente em valores financeiros, para evitar inconsistências.
          </p>
        </div>

        <section>
          <h2 className="text-lg font-semibold text-foreground mb-3">Veja também:</h2>
          <div className="flex flex-wrap gap-2">
            {[
              { label: "Gerar CPF", url: "/gerar-cpf" },
              { label: "Gerar CNPJ", url: "/gerar-cnpj" },
              { label: "Gerar Números", url: "/gerar-numeros" },
              { label: "Converter Números", url: "/converter-numeros" },
              { label: "Gerar Lorem", url: "/gerar-lorem" },
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
