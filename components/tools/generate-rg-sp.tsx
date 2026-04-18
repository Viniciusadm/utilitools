"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { toast } from "@/hooks/use-toast";
import { generateRGSP } from "@/lib/rg-sp";
import Link from "next/link";
import { Copy, RefreshCw } from "lucide-react";

export default function GenerateRGSP() {
  const [punctuation, setPunctuation] = useState(true);
  const [outputSeparator, setOutputSeparator] = useState<"newline" | "comma">("newline");
  const [quantity, setQuantity] = useState(1);
  const [results, setResults] = useState<string[]>(() => [generateRGSP(true)]);

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
    <div className="max-w-3xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Gerador de RG – SSP SP</h1>
        <p className="mt-2 text-muted-foreground">
          Gere números de RG válidos no padrão SSP SP de forma rápida e prática. Escolha com ou sem
          pontuação e gere múltiplos registros para testes, cadastros e validações.
        </p>
        <Link href="/validar-rg" className="text-primary hover:underline text-sm mt-2 inline-block">
          Deseja validar em vez de gerar?
        </Link>
      </div>

      <div className="space-y-4 rounded-lg border border-border bg-card p-6">
        <div className="space-y-3">
          <Label className="text-sm font-medium text-foreground">Pontuação?</Label>
          <RadioGroup
            value={punctuation ? "yes" : "no"}
            onValueChange={(v) => setPunctuation(v === "yes")}
            className="flex gap-4"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="yes" id="pont-yes" />
              <Label htmlFor="pont-yes" className="cursor-pointer">Sim</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="no" id="pont-no" />
              <Label htmlFor="pont-no" className="cursor-pointer">Não</Label>
            </div>
          </RadioGroup>
        </div>

        <div className="space-y-3">
          <Label className="text-sm font-medium text-foreground">Separador?</Label>
          <RadioGroup
            value={outputSeparator}
            onValueChange={(v) => setOutputSeparator(v as "newline" | "comma")}
            className="flex gap-4"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="newline" id="sep-newline" />
              <Label htmlFor="sep-newline" className="cursor-pointer">Quebra de linha</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="comma" id="sep-comma" />
              <Label htmlFor="sep-comma" className="cursor-pointer">Vírgula</Label>
            </div>
          </RadioGroup>
        </div>

        <div className="space-y-2">
          <Label htmlFor="qty-rg-sp">Quantidade</Label>
          <Input
            id="qty-rg-sp"
            type="number"
            min={1}
            max={100}
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            className="max-w-[120px]"
          />
        </div>

        <div className="flex gap-3">
          <Button onClick={handleGenerate} className="flex-1">
            <RefreshCw className="mr-2 h-4 w-4" />
            Gerar
          </Button>
          <Button variant="outline" onClick={handleCopy} disabled={results.length === 0}>
            <Copy className="mr-2 h-4 w-4" />
            Copiar
          </Button>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {results.length > 0 && (
          <motion.div
            key={results.join(",")}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="rounded-lg border border-border bg-card p-6"
          >
            <Label className="text-sm text-muted-foreground">Resultado</Label>
            <div className="mt-2 space-y-1">
              {results.map((rg, i) => (
                <p key={i} className="font-mono text-lg text-foreground">{rg}</p>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="space-y-6 text-muted-foreground">
        <section>
          <h2 className="text-xl font-semibold text-foreground mb-2">O que é RG?</h2>
          <p>
            O RG (Registro Geral) é um documento de identificação civil utilizado no Brasil. Ele é
            emitido pelas Secretarias de Segurança Pública de cada estado e serve como principal
            identificação do cidadão em diversas situações.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground mb-2">RG SSP SP</h2>
          <p>
            O RG emitido em São Paulo segue o padrão da Secretaria de Segurança Pública (SSP SP).
            Esse modelo utiliza uma estrutura numérica específica com dígito verificador para garantir
            autenticidade e consistência dos dados.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground mb-2">Como é formado o RG SSP SP</h2>
          <p>
            O número do RG é composto por 9 dígitos. Os primeiros números são gerados de forma
            sequencial ou aleatória, enquanto o último dígito é um verificador calculado a partir dos
            anteriores, utilizando uma regra matemática que garante a validade do número.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground mb-2">Para que usar um gerador de RG?</h2>
          <ul className="list-disc list-inside space-y-1">
            <li>Testes de sistemas</li>
            <li>Desenvolvimento de software</li>
            <li>Preenchimento de dados fictícios</li>
            <li>Simulações e validações</li>
          </ul>
        </section>

        <p className="text-sm italic">
          <strong>Nota:</strong> Os RGs gerados são fictícios e destinados exclusivamente para fins
          educacionais, testes e desenvolvimento.
        </p>
      </div>

      <section>
        <h2 className="text-lg font-semibold text-foreground mb-3">Veja também</h2>
        <ul className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {[
            { label: "Gerar CPF", to: "/gerar-cpf" },
            { label: "Gerar CNPJ", to: "/gerar-cnpj" },
            { label: "Gerar Números", to: "/gerar-numeros" },
            { label: "Gerar Nomes", to: "/gerar-nomes" },
            { label: "Gerar Lorem Ipsum", to: "/gerar-lorem" },
            { label: "Gerar RG – IFP RJ", to: "/gerar-rj" },
          ].map((link) => (
            <li key={link.to}>
              <Link href={link.to} className="text-primary hover:underline text-sm">{link.label}</Link>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
