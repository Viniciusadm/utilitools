"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import { generateRGSP } from "@/lib/rg-sp";
import Link from "next/link";
import { Copy } from "lucide-react";

export default function GenerateRGSP() {
  const [punctuation, setPunctuation] = useState(true);
  const [outputSeparator, setOutputSeparator] = useState<"newline" | "comma">("newline");
  const [quantity, setQuantity] = useState(1);
  const [results, setResults] = useState<string[]>([]);

  useEffect(() => {
    setResults([generateRGSP(true)]);
  }, []);

  const handleGenerate = () => {
    const qty = Math.max(1, Math.min(quantity, 100));
    const rgs: string[] = [];
    for (let i = 0; i < qty; i++) {
      rgs.push(generateRGSP(punctuation));
    }
    setResults(rgs);
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
        <h1 className="text-2xl font-bold text-foreground">Gerador de RG – SSP SP</h1>
        <p className="mt-2 text-muted-foreground text-sm leading-relaxed">
          Gere números de RG válidos no padrão SSP SP de forma rápida e prática. Escolha com ou sem
          pontuação e gere múltiplos registros para testes, cadastros e validações.
        </p>
        <Link href="/validar-rg" className="text-primary text-sm hover:underline mt-1 inline-block">
          Deseja validar em vez de gerar?
        </Link>
      </div>

      <div className="rounded-lg border border-border bg-card p-5 sm:p-6 space-y-5">
        <div className="grid gap-5 sm:grid-cols-3">
          <div className="space-y-2">
            <Label className="text-muted-foreground text-xs uppercase tracking-wider">Pontuação?</Label>
            <div className="flex gap-2">
              <Button size="sm" variant={punctuation ? "default" : "secondary"} onClick={() => setPunctuation(true)} className="flex-1">
                Sim
              </Button>
              <Button size="sm" variant={!punctuation ? "default" : "secondary"} onClick={() => setPunctuation(false)} className="flex-1">
                Não
              </Button>
            </div>
          </div>

          <div className="space-y-2">
            <Label className="text-muted-foreground text-xs uppercase tracking-wider">Separador</Label>
            <div className="flex gap-2">
              <Button size="sm" variant={outputSeparator === "newline" ? "default" : "secondary"} onClick={() => setOutputSeparator("newline")} className="flex-1">
                Quebra de linha
              </Button>
              <Button size="sm" variant={outputSeparator === "comma" ? "default" : "secondary"} onClick={() => setOutputSeparator("comma")} className="flex-1">
                Vírgula
              </Button>
            </div>
          </div>

          <div className="space-y-2">
            <Label className="text-muted-foreground text-xs uppercase tracking-wider">Quantidade</Label>
            <Input
              id="qty-rg-sp"
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
            key={`${results.join(",")}-${outputSeparator}`}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="rounded-lg border border-border bg-muted p-5"
          >
            <p className="text-xs text-muted-foreground mb-2 uppercase tracking-wider">RG(s) gerado(s)</p>
            <div className="font-mono text-lg text-foreground">
              {outputSeparator === "comma" ? (
                <div className="font-semibold break-words">{results.join(", ")}</div>
              ) : (
                <div className="space-y-1">
                  {results.map((rg, i) => (
                    <div key={i} className="font-semibold">{rg}</div>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="space-y-6 border-t border-border pt-8">
        <section>
          <h2 className="text-lg font-semibold text-foreground mb-2">O que é RG?</h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            O RG (Registro Geral) é um documento de identificação civil utilizado no Brasil. Ele é
            emitido pelas Secretarias de Segurança Pública de cada estado e serve como principal
            identificação do cidadão em diversas situações.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground mb-2">RG SSP SP</h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            O RG emitido em São Paulo segue o padrão da Secretaria de Segurança Pública (SSP SP).
            Esse modelo utiliza uma estrutura numérica específica com dígito verificador para garantir
            autenticidade e consistência dos dados.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground mb-2">Como é formado o RG SSP SP</h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            O número do RG é composto por 9 dígitos. Os primeiros números são gerados de forma
            sequencial ou aleatória, enquanto o último dígito é um verificador calculado a partir dos
            anteriores, utilizando uma regra matemática que garante a validade do número.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground mb-2">Para que usar um gerador de RG?</h2>
          <ul className="text-sm text-muted-foreground leading-relaxed list-disc list-inside space-y-1">
            <li>Testes de sistemas</li>
            <li>Desenvolvimento de software</li>
            <li>Preenchimento de dados fictícios</li>
            <li>Simulações e validações</li>
          </ul>
        </section>

        <div className="rounded-md border border-border bg-card p-4">
          <p className="text-xs text-muted-foreground leading-relaxed">
            <strong className="text-foreground">NOTA:</strong> Os RGs gerados são fictícios e destinados exclusivamente para fins
            educacionais, testes e desenvolvimento.
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
              { label: "Gerar Lorem Ipsum", url: "/gerar-lorem" },
              { label: "Gerar RG – IFP RJ", url: "/gerar-rj" },
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
