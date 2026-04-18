"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { toast } from "@/hooks/use-toast";
import { Copy } from "lucide-react";

type Scale = "celsius" | "fahrenheit" | "kelvin";

const labels: Record<Scale, string> = {
  celsius: "Celsius (°C)",
  fahrenheit: "Fahrenheit (°F)",
  kelvin: "Kelvin (K)",
};

function convert(from: Scale, value: number): Record<Scale, string> {
  let c: number;
  if (from === "celsius") c = value;
  else if (from === "fahrenheit") c = (value - 32) * 5 / 9;
  else c = value - 273.15;

  const fmt = (n: number) => parseFloat(n.toFixed(6)).toLocaleString("pt-BR", { maximumFractionDigits: 6 });

  return {
    celsius: fmt(c),
    fahrenheit: fmt(c * 9 / 5 + 32),
    kelvin: fmt(c + 273.15),
  };
}

export default function TemperatureConverter() {
  const [values, setValues] = useState<Record<Scale, string>>({ celsius: "", fahrenheit: "", kelvin: "" });
  const [hasResult, setHasResult] = useState(false);

  const handleChange = (scale: Scale, raw: string) => {
    if (raw === "" || raw === "-") {
      setValues({ celsius: raw === "-" ? (scale === "celsius" ? "-" : "") : "", fahrenheit: raw === "-" ? (scale === "fahrenheit" ? "-" : "") : "", kelvin: raw === "-" ? (scale === "kelvin" ? "-" : "") : "" });
      setHasResult(false);
      return;
    }
    const num = parseFloat(raw.replace(",", "."));
    if (isNaN(num)) return;

    const converted = convert(scale, num);
    converted[scale] = raw;
    setValues(converted);
    setHasResult(true);
  };

  const handleCopy = (scale: Scale) => {
    if (values[scale]) {
      navigator.clipboard.writeText(values[scale]);
      toast({ title: "Copiado para a área de transferência" });
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Conversor de Temperaturas</h1>
        <p className="mt-2 text-muted-foreground text-sm leading-relaxed">
          Conversor de temperaturas online. Você pode digitar um valor em Celsius, Fahrenheit ou Kelvin e ver a conversão automática para as outras unidades.
          Basta inserir o valor em um dos campos e os demais serão preenchidos automaticamente com os resultados convertidos.
        </p>
      </div>

      <div className="grid gap-5 sm:grid-cols-3">
        {(["celsius", "fahrenheit", "kelvin"] as Scale[]).map((scale) => (
          <div key={scale} className="space-y-2">
            <Label className="text-muted-foreground text-xs uppercase tracking-wider">{labels[scale]}</Label>
            <div className="flex gap-2">
              <Input
                type="text"
                inputMode="decimal"
                value={values[scale]}
                onChange={(e) => handleChange(scale, e.target.value)}
                className="bg-muted border-border font-mono"
                placeholder={scale === "celsius" ? "Ex: 100" : scale === "fahrenheit" ? "Ex: 212" : "Ex: 373,15"}
              />
              <Button variant="outline" size="icon" onClick={() => handleCopy(scale)} disabled={!values[scale]}>
                <Copy className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {hasResult && (
          <motion.div
            key={values.celsius}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="rounded-md border border-border bg-muted p-5 space-y-3"
          >
            <p className="text-xs text-muted-foreground uppercase tracking-wider">Resultado da conversão</p>
            <div className="grid gap-2 sm:grid-cols-3">
              {(["celsius", "fahrenheit", "kelvin"] as Scale[]).map((scale) => (
                <div key={scale}>
                  <p className="text-xs text-muted-foreground">{labels[scale]}</p>
                  <p className="text-lg font-semibold font-mono text-foreground">{values[scale]}</p>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="space-y-6 border-t border-border pt-8">
        <section>
          <h2 className="text-lg font-semibold text-foreground mb-2">O que é temperatura?</h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            A temperatura é uma medida que indica o grau de calor ou frio de um objeto, ambiente ou substância. Ela está relacionada ao movimento das partículas: quanto maior a temperatura, maior a agitação dessas partículas.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground mb-2">Principais escalas de temperatura</h2>
          <ul className="text-sm text-muted-foreground leading-relaxed list-disc list-inside space-y-1">
            <li><strong className="text-foreground">Celsius (°C)</strong>: usada no dia a dia na maioria dos países</li>
            <li><strong className="text-foreground">Fahrenheit (°F)</strong>: comum nos Estados Unidos</li>
            <li><strong className="text-foreground">Kelvin (K)</strong>: usada em ciência e cálculos físicos</li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground mb-2">Como converter temperaturas</h2>
          <ol className="text-sm text-muted-foreground leading-relaxed list-decimal list-inside space-y-2">
            <li><strong className="text-foreground">Celsius para Fahrenheit</strong> — Multiplique por 9, divida por 5 e some 32</li>
            <li><strong className="text-foreground">Fahrenheit para Celsius</strong> — Subtraia 32 e multiplique por 5/9</li>
            <li><strong className="text-foreground">Celsius para Kelvin</strong> — Some 273,15</li>
            <li><strong className="text-foreground">Kelvin para Celsius</strong> — Subtraia 273,15</li>
          </ol>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground mb-2">Exemplos de conversão</h2>
          <ul className="text-sm text-muted-foreground leading-relaxed list-disc list-inside space-y-1">
            <li>0°C = 32°F</li>
            <li>100°C = 212°F</li>
            <li>0°C = 273,15 K</li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground mb-2">Celsius</h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            A escala Celsius é baseada nos pontos de congelamento (0°C) e ebulição (100°C) da água. É a mais usada no cotidiano.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground mb-2">Kelvin</h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            O Kelvin é uma escala absoluta, usada principalmente na ciência. Começa no zero absoluto (0 K), onde não há movimento térmico.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground mb-2">Fahrenheit</h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            A escala Fahrenheit é utilizada principalmente nos Estados Unidos. Nela, a água congela a 32°F e ferve a 212°F.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground mb-3">Veja também:</h2>
          <div className="flex flex-wrap gap-2">
            <Link href="/converter-numeros" className="text-sm text-primary hover:underline">Converter Números</Link>
          </div>
        </section>
      </div>
    </div>
  );
}
