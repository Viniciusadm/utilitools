"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { toast } from "@/hooks/use-toast";
import { Copy } from "lucide-react";

export default function RuleOfThree() {
  const [a, setA] = useState("");
  const [b, setB] = useState("");
  const [c, setC] = useState("");
  const [output, setOutput] = useState<string | null>(null);

  useEffect(() => {
    const va = Number(a);
    const vb = Number(b);
    const vc = Number(c);
    if (a && b && c && vb !== 0) {
      const x = (va * vc) / vb;
      setOutput(x.toLocaleString("pt-BR", { maximumFractionDigits: 6 }));
    } else {
      setOutput(null);
    }
  }, [a, b, c]);

  const handleCopy = () => {
    if (output) {
      navigator.clipboard.writeText(output);
      toast({ title: "Copiado para a área de transferência" });
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Calculadora de Regra de Três</h1>
        <p className="mt-2 text-muted-foreground text-sm leading-relaxed">
          Calculadora de regra de três simples online. Você pode informar três valores para descobrir o quarto valor proporcional de forma rápida.
          Basta preencher os campos e o cálculo será feito automaticamente, mostrando o resultado da regra de três.
        </p>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div className="space-y-2">
          <Label className="text-muted-foreground text-xs uppercase tracking-wider">Valor A</Label>
          <Input type="number" value={a} onChange={(e) => setA(e.target.value)} className="bg-muted border-border" placeholder="Ex: 10" />
        </div>
        <div className="space-y-2">
          <Label className="text-muted-foreground text-xs uppercase tracking-wider">Valor B</Label>
          <Input type="number" value={b} onChange={(e) => setB(e.target.value)} className="bg-muted border-border" placeholder="Ex: 20" />
        </div>
        <div className="space-y-2">
          <Label className="text-muted-foreground text-xs uppercase tracking-wider">Valor C</Label>
          <Input type="number" value={c} onChange={(e) => setC(e.target.value)} className="bg-muted border-border" placeholder="Ex: 30" />
        </div>
        <div className="space-y-2">
          <Label className="text-muted-foreground text-xs uppercase tracking-wider">Resultado (X)</Label>
          <div className="flex gap-2">
            <Input readOnly value={output ?? ""} className="bg-muted border-border font-mono" placeholder="—" />
            <Button variant="outline" size="icon" onClick={handleCopy} disabled={!output}>
              <Copy className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {output && (
          <motion.div
            key={output}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="rounded-md border border-border bg-muted p-5 space-y-1"
          >
            <p className="text-xs text-muted-foreground uppercase tracking-wider">Resultado da Regra de Três</p>
            <p className="text-2xl font-semibold font-mono text-foreground">{output}</p>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="space-y-6 border-t border-border pt-8">
        <section>
          <h2 className="text-lg font-semibold text-foreground mb-2">O que é regra de três?</h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            A regra de três simples é um método matemático utilizado para encontrar um valor desconhecido com base em uma relação de proporção entre outros valores. Ela é muito utilizada no dia a dia, em situações como cálculos de preços, porcentagens, medidas e tempo.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground mb-2">Como funciona a regra de três?</h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Quando duas grandezas são proporcionais, podemos montar uma relação entre elas para descobrir um valor desconhecido. Na prática, usamos três valores conhecidos para encontrar o quarto valor proporcional.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground mb-2">Como calcular regra de três</h2>
          <ol className="text-sm text-muted-foreground leading-relaxed list-decimal list-inside space-y-2">
            <li><strong className="text-foreground">Identifique os valores conhecidos</strong> — Você terá três valores (A, B e C) e um valor desconhecido (X).</li>
            <li><strong className="text-foreground">Monte a proporção</strong> — A está para B assim como C está para X.</li>
            <li><strong className="text-foreground">Multiplique em cruz</strong> — Multiplique A por C.</li>
            <li><strong className="text-foreground">Divida pelo valor restante</strong> — Divida o resultado por B para encontrar X.</li>
          </ol>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground mb-2">Exemplo de regra de três</h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Se temos a relação: A está para B assim como C está para X. Então: X = (A × C) ÷ B. Isso permite descobrir o valor proporcional de forma simples e rápida.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground mb-3">Veja também:</h2>
          <div className="flex flex-wrap gap-2">
            <Link href="/calcular-resto" className="text-sm text-primary hover:underline">Calcular Resto</Link>
          </div>
        </section>
      </div>
    </div>
  );
}
