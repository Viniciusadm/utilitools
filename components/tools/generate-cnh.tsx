"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import { generateCNH } from "@/lib/cnh";
import Link from "next/link";
import { Copy } from "lucide-react";

export default function GenerateCNH() {
  const [outputSeparator, setOutputSeparator] = useState<"newline" | "comma">("newline");
  const [quantity, setQuantity] = useState(1);
  const [results, setResults] = useState<string[]>([]);

  useEffect(() => {
    setResults([generateCNH()]);
  }, []);

  const handleGenerate = () => {
    const qty = Math.max(1, Math.min(quantity, 100));
    const cnhs: string[] = [];
    for (let i = 0; i < qty; i++) {
      cnhs.push(generateCNH());
    }
    setResults(cnhs);
  };

  const handleCopy = () => {
    if (results.length === 0) return;
    const sep = outputSeparator === "comma" ? ", " : "\n";
    navigator.clipboard.writeText(results.join(sep));
    toast({ title: "Copiado para a área de transferência" });
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Gerador de CNH</h1>
        <p className="mt-2 text-muted-foreground text-sm leading-relaxed">
          Gerador de CNH online gratuito. Crie números de CNH aleatórios para fins educacionais e teste de sistemas.
          Copie facilmente o número gerado com apenas um clique.
        </p>
        <Link href="/validar-cnh" className="text-primary text-sm hover:underline mt-1 inline-block">
          Deseja validar em vez de gerar?
        </Link>
      </div>

      <div className="rounded-lg border border-border bg-card p-5 sm:p-6 space-y-5">
        <div className="grid gap-5 sm:grid-cols-2">
          <div className="space-y-2">
            <Label className="text-muted-foreground text-xs uppercase tracking-wider">Separador</Label>
            <div className="flex gap-2">
              <Button
                size="sm"
                variant={outputSeparator === "newline" ? "default" : "secondary"}
                onClick={() => setOutputSeparator("newline")}
                className="flex-1"
              >
                Quebra de linha
              </Button>
              <Button
                size="sm"
                variant={outputSeparator === "comma" ? "default" : "secondary"}
                onClick={() => setOutputSeparator("comma")}
                className="flex-1"
              >
                Vírgula
              </Button>
            </div>
          </div>

          <div className="space-y-2">
            <Label className="text-muted-foreground text-xs uppercase tracking-wider">Quantidade</Label>
            <Input
              type="number"
              min={1}
              max={100}
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              className="bg-muted border-border"
            />
          </div>
        </div>

        <div className="flex flex-wrap gap-3">
          <Button onClick={handleGenerate} className="px-8">Gerar</Button>
          <Button variant="secondary" onClick={handleCopy} className="gap-2">
            <Copy className="h-4 w-4" /> Copiar
          </Button>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {results.length > 0 && (
          <motion.div
            key={`${results.join()}-${outputSeparator}`}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="rounded-lg border border-border bg-muted p-5"
          >
            <p className="text-xs text-muted-foreground mb-2 uppercase tracking-wider">CNH(s) gerada</p>
            <div className="font-mono text-lg text-foreground">
              {outputSeparator === "comma" ? (
                <div className="font-semibold break-words">{results.join(", ")}</div>
              ) : (
                <div className="space-y-1">
                  {results.map((cnh, i) => (
                    <div key={i} className="font-semibold">{cnh}</div>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="space-y-6 border-t border-border pt-8">
        <section>
          <h2 className="text-lg font-semibold text-foreground mb-2">O que é CNH?</h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            A CNH – Carteira Nacional de Habilitação é o documento oficial que autoriza o titular a conduzir
            veículos automotores, emitido pelo órgão de trânsito. Ela garante que o condutor possui conhecimento
            e capacidade para dirigir veículos de acordo com a legislação, e é dividida por categorias: automóveis,
            motocicletas e veículos pesados.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground mb-2">Como é formado o número da CNH?</h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            O número da CNH é composto por nove dígitos aleatórios e dois dígitos verificadores (DV1 e DV2).
            Os nove dígitos iniciais são escolhidos aleatoriamente. O DV1 é calculado com base na soma ponderada
            desses dígitos, garantindo que o resultado fique entre 0 e 9. O DV2 é calculado de forma semelhante,
            levando em conta o DV1. Os dígitos verificadores asseguram autenticidade e integridade,
            evitando falsificações.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground mb-2">Como usar</h2>
          <ol className="text-sm text-muted-foreground leading-relaxed list-decimal list-inside space-y-1">
            <li>Escolha o separador: quebra de linha ou vírgula.</li>
            <li>Defina a quantidade de CNHs a gerar (1–100).</li>
            <li>Clique em Gerar.</li>
            <li>Copie o(s) número(s) gerado(s) clicando em Copiar.</li>
          </ol>
        </section>

        <div className="rounded-md border border-border bg-card p-4">
          <p className="text-xs text-muted-foreground leading-relaxed">
            <strong className="text-foreground">NOTA:</strong> Este gerador é apenas para fins educacionais,
            avaliação de softwares e testes de sites. Os números gerados são aleatórios e seguem as regras
            matemáticas reais de validação da CNH, porém não correspondem a pessoas reais.
            Não nos responsabilizamos pelo uso indevido desta ferramenta.
          </p>
        </div>

        <section>
          <h2 className="text-lg font-semibold text-foreground mb-3">Veja também:</h2>
          <div className="flex flex-wrap gap-2">
            {[
              { label: "Gerar CPF", url: "/gerar-cpf" },
              { label: "Gerar CNPJ", url: "/gerar-cnpj" },
              { label: "Gerar Números", url: "/gerar-numeros" },
              { label: "Gerar Nomes", url: "/gerar-nomes" },
              { label: "Gerar Lorem", url: "/gerar-lorem" },
              { label: "Gerar RG", url: "/gerar-rg" },
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
