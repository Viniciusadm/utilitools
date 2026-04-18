"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { toast } from "@/hooks/use-toast";
import { Copy } from "lucide-react";

type Base = "bin" | "oct" | "dec" | "hex";

const labels: Record<Base, string> = {
  bin: "Binário (base 2)",
  oct: "Octal (base 8)",
  dec: "Decimal (base 10)",
  hex: "Hexadecimal (base 16)",
};

const patterns: Record<Base, RegExp> = {
  bin: /^[01]*$/,
  oct: /^[0-7]*$/,
  dec: /^[0-9]*$/,
  hex: /^[0-9a-fA-F]*$/,
};

const radixes: Record<Base, number> = { bin: 2, oct: 8, dec: 10, hex: 16 };

export default function RadixConverter() {
  const [values, setValues] = useState<Record<Base, string>>({ bin: "", oct: "", dec: "", hex: "" });
  const [activeBase, setActiveBase] = useState<Base | null>(null);

  const handleChange = (base: Base, raw: string) => {
    if (raw === "") {
      setValues({ bin: "", oct: "", dec: "", hex: "" });
      setActiveBase(null);
      return;
    }
    if (!patterns[base].test(raw)) return;

    const parsed = parseInt(raw, radixes[base]);
    if (isNaN(parsed) || parsed < 0) return;

    setActiveBase(base);
    setValues({
      bin: parsed.toString(2),
      oct: parsed.toString(8),
      dec: parsed.toString(10),
      hex: parsed.toString(16).toUpperCase(),
      [base]: raw.toUpperCase(),
    } as Record<Base, string>);
  };

  const handleCopy = (base: Base) => {
    if (values[base]) {
      navigator.clipboard.writeText(values[base]);
      toast({ title: "Copiado para a área de transferência" });
    }
  };

  const hasResult = Object.values(values).some(Boolean);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Conversor de Bases Numéricas</h1>
        <p className="mt-2 text-muted-foreground text-sm leading-relaxed">
          Conversor de bases numéricas online. Você pode digitar um número em qualquer base (binário, octal, decimal ou hexadecimal) e ver a conversão automática para as demais.
          Basta inserir o valor em um dos campos e os outros serão preenchidos automaticamente com os resultados convertidos.
        </p>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        {(["bin", "oct", "dec", "hex"] as Base[]).map((base) => (
          <div key={base} className="space-y-2">
            <Label className="text-muted-foreground text-xs uppercase tracking-wider">{labels[base]}</Label>
            <div className="flex gap-2">
              <Input
                value={values[base]}
                onChange={(e) => handleChange(base, e.target.value)}
                className="bg-muted border-border font-mono"
                placeholder={base === "hex" ? "Ex: FF" : base === "bin" ? "Ex: 1010" : base === "oct" ? "Ex: 12" : "Ex: 255"}
              />
              <Button variant="outline" size="icon" onClick={() => handleCopy(base)} disabled={!values[base]}>
                <Copy className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {hasResult && (
          <motion.div
            key={values.dec}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="rounded-md border border-border bg-muted p-5 space-y-3"
          >
            <p className="text-xs text-muted-foreground uppercase tracking-wider">Resultado da conversão</p>
            <div className="grid gap-2 sm:grid-cols-2">
              {(["bin", "oct", "dec", "hex"] as Base[]).map((base) => (
                <div key={base}>
                  <p className="text-xs text-muted-foreground">{labels[base]}</p>
                  <p className="text-lg font-semibold font-mono text-foreground">{values[base]}</p>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="space-y-6 border-t border-border pt-8">
        <section>
          <h2 className="text-lg font-semibold text-foreground mb-2">O que são bases numéricas?</h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            As bases numéricas são sistemas usados para representar números utilizando diferentes conjuntos de símbolos. A base mais comum é a base 10 (decimal), que usamos no dia a dia. Já na computação, outras bases são muito utilizadas, como base 2 (binário), base 8 (octal) e base 16 (hexadecimal). Cada base define quantos símbolos podem ser usados para formar os números.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground mb-2">Como funciona a conversão de bases numéricas?</h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            A conversão de bases numéricas consiste em transformar um número de uma base para outra equivalente. Por exemplo, um número em binário pode ser convertido para decimal, hexadecimal ou octal mantendo o mesmo valor, apenas mudando sua representação.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground mb-2">Como converter bases numéricas</h2>
          <ol className="text-sm text-muted-foreground leading-relaxed list-decimal list-inside space-y-2">
            <li><strong className="text-foreground">Converter para decimal (base 10)</strong> — Multiplique cada dígito pela potência da base correspondente e some os resultados.</li>
            <li><strong className="text-foreground">Converter de decimal para outra base</strong> — Divida o número pela base desejada e utilize os restos da divisão para formar o resultado.</li>
            <li><strong className="text-foreground">Conversões diretas</strong> — Algumas conversões podem ser feitas agrupando bits (especialmente entre base 2, 8 e 16).</li>
          </ol>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground mb-2">Exemplos de conversão</h2>
          <ul className="text-sm text-muted-foreground leading-relaxed list-disc list-inside space-y-1">
            <li>Binário para decimal: <strong className="text-foreground font-mono">1010</strong> (base 2) = <strong className="text-foreground font-mono">10</strong> (base 10)</li>
            <li>Decimal para hexadecimal: <strong className="text-foreground font-mono">255</strong> (base 10) = <strong className="text-foreground font-mono">FF</strong> (base 16)</li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground mb-2">Principais bases numéricas</h2>
          <ul className="text-sm text-muted-foreground leading-relaxed list-disc list-inside space-y-1">
            <li><strong className="text-foreground">Base 2 (Binário)</strong>: usa apenas 0 e 1</li>
            <li><strong className="text-foreground">Base 8 (Octal)</strong>: usa números de 0 a 7</li>
            <li><strong className="text-foreground">Base 10 (Decimal)</strong>: usa números de 0 a 9</li>
            <li><strong className="text-foreground">Base 16 (Hexadecimal)</strong>: usa 0 a 9 e letras A a F</li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground mb-2">Onde as bases numéricas são usadas?</h2>
          <ul className="text-sm text-muted-foreground leading-relaxed list-disc list-inside space-y-1">
            <li><strong className="text-foreground">Binário (base 2)</strong>: usado em computadores e eletrônica</li>
            <li><strong className="text-foreground">Octal (base 8)</strong>: usado em sistemas antigos e algumas aplicações específicas</li>
            <li><strong className="text-foreground">Decimal (base 10)</strong>: usado no dia a dia</li>
            <li><strong className="text-foreground">Hexadecimal (base 16)</strong>: usado em programação, cores e memória</li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground mb-3">Veja também:</h2>
          <div className="flex flex-wrap gap-2">
            <Link href="/gerar-numeros" className="text-sm text-primary hover:underline">Gerar Números</Link>
            <Link href="/converter-temperaturas" className="text-sm text-primary hover:underline">Converter Temperaturas</Link>
          </div>
        </section>
      </div>
    </div>
  );
}
