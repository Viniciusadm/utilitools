"use client";

import { useCallback, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import Link from "next/link";
import { Copy } from "lucide-react";

export default function GenerateRandomNumbers() {
  const [minVal, setMinVal] = useState(1);
  const [maxVal, setMaxVal] = useState(100);
  const [quantity, setQuantity] = useState(1);
  const [results, setResults] = useState<number[]>([]);

  useEffect(() => {
    setResults([Math.floor(Math.random() * 100) + 1]);
  }, []);

  const handleGenerate = useCallback(() => {
    const min = Math.min(minVal, maxVal);
    const max = Math.max(minVal, maxVal);
    const qty = Math.max(1, Math.min(quantity, 1000));
    const nums: number[] = [];
    for (let i = 0; i < qty; i++) {
      nums.push(Math.floor(Math.random() * (max - min + 1)) + min);
    }
    setResults(nums);
  }, [minVal, maxVal, quantity]);

  const handleCopy = () => {
    if (results.length === 0) return;
    navigator.clipboard.writeText(results.join(", "));
    toast({ title: "Copiado para a área de transferência" });
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Gerador de Números Aleatórios</h1>
        <p className="mt-2 text-muted-foreground text-sm leading-relaxed">
          Gere números aleatórios de forma rápida e personalizada. Defina o valor mínimo, o valor máximo e a quantidade
          de números que deseja gerar. Ideal para sorteios, testes, decisões rápidas e uso em projetos.
        </p>
      </div>

      <div className="grid gap-5 sm:grid-cols-3">
        <div className="space-y-2">
          <Label className="text-muted-foreground text-xs uppercase tracking-wider">Mínimo</Label>
          <Input
            type="number"
            value={minVal}
            onChange={(e) => setMinVal(Number(e.target.value))}
            className="bg-muted border-border"
          />
        </div>
        <div className="space-y-2">
          <Label className="text-muted-foreground text-xs uppercase tracking-wider">Máximo</Label>
          <Input
            type="number"
            value={maxVal}
            onChange={(e) => setMaxVal(Number(e.target.value))}
            className="bg-muted border-border"
          />
        </div>
        <div className="space-y-2">
          <Label className="text-muted-foreground text-xs uppercase tracking-wider">Quantidade</Label>
          <Input
            type="number"
            min={1}
            max={1000}
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            className="bg-muted border-border"
          />
        </div>
      </div>

      <div className="flex gap-3">
        <Button onClick={handleGenerate} className="px-8">Gerar</Button>
        <Button variant="secondary" onClick={handleCopy} className="gap-2">
          <Copy className="h-4 w-4" /> Copiar
        </Button>
      </div>

      <AnimatePresence mode="wait">
        {results.length > 0 && (
          <motion.div
            key={results.join(",")}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="rounded-md border border-border bg-muted p-5"
          >
            <p className="text-xs text-muted-foreground mb-2 uppercase tracking-wider">Números gerados</p>
            <div className="font-mono text-lg text-foreground flex flex-wrap gap-3">
              {results.map((num, i) => (
                <span key={i} className="font-semibold">{num}</span>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="space-y-6 border-t border-border pt-8">
        <section>
          <h2 className="text-lg font-semibold text-foreground mb-2">O que são números aleatórios?</h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Números aleatórios são valores gerados sem um padrão previsível, utilizados em diversas áreas como
            estatística, programação, jogos e sorteios. Eles garantem imparcialidade e variabilidade nos resultados.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground mb-2">Como gerar números aleatórios</h2>
          <ol className="text-sm text-muted-foreground leading-relaxed list-decimal list-inside space-y-1">
            <li>Defina o valor mínimo permitido.</li>
            <li>Defina o valor máximo permitido.</li>
            <li>Escolha a quantidade de números desejada.</li>
            <li>Clique em <strong className="text-foreground">Gerar</strong>.</li>
            <li>Copie os números, se necessário.</li>
          </ol>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground mb-2">Para que usar um gerador de números aleatórios?</h2>
          <ul className="text-sm text-muted-foreground leading-relaxed list-disc list-inside space-y-1">
            <li>Realizar sorteios e rifas</li>
            <li>Escolher números de forma imparcial</li>
            <li>Testar sistemas e aplicações</li>
            <li>Criar dados fictícios para desenvolvimento</li>
            <li>Tomar decisões rápidas</li>
          </ul>
        </section>

        <div className="rounded-md border border-border bg-card p-4">
          <p className="text-xs text-muted-foreground leading-relaxed">
            <strong className="text-foreground">DICA:</strong> Para resultados mais variados, utilize intervalos
            maiores entre o valor mínimo e máximo.
          </p>
        </div>

        <section>
          <h2 className="text-lg font-semibold text-foreground mb-3">Veja também:</h2>
          <div className="flex flex-wrap gap-2">
            {[
              { label: "Gerar CPF", url: "/gerar-cpf" },
              { label: "Gerar CNPJ", url: "/gerar-cnpj" },
              { label: "Gerar Nomes", url: "/gerar-nomes" },
              { label: "Gerar Lorem", url: "/gerar-lorem" },
              { label: "Gerar RG", url: "/gerar-rg" },
              { label: "Gerar RJ", url: "/gerar-rj" },
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
