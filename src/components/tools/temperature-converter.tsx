import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { Copy } from "lucide-react";
import { RelatedTools } from "@/components/related-tools";
import { ToolFaq } from "@/components/tool-faq";
import { useUiCopy } from "@/i18n/ui";
import { INTL_LOCALE, useCopy, useLocale, type Locale } from "@/lib/i18n";
import { parseDecimal } from "@/lib/percentage";

type Scale = "celsius" | "fahrenheit" | "kelvin";

const SCALES: readonly Scale[] = ["celsius", "fahrenheit", "kelvin"];

const labels: Record<Scale, string> = {
  celsius: "Celsius (°C)",
  fahrenheit: "Fahrenheit (°F)",
  kelvin: "Kelvin (K)",
};

function convert(from: Scale, value: number, locale: Locale): Record<Scale, string> {
  let c: number;
  if (from === "celsius") c = value;
  else if (from === "fahrenheit") c = (value - 32) * 5 / 9;
  else c = value - 273.15;

  const fmt = (n: number) => parseFloat(n.toFixed(6)).toLocaleString(INTL_LOCALE[locale], { maximumFractionDigits: 6 });

  return {
    celsius: fmt(c),
    fahrenheit: fmt(c * 9 / 5 + 32),
    kelvin: fmt(c + 273.15),
  };
}

const pt = {
  title: "Conversor de Temperaturas",
  intro:
    "Conversor de temperaturas online. Você pode digitar um valor em Celsius, Fahrenheit ou Kelvin e ver a conversão automática para as outras unidades. Basta inserir o valor em um dos campos e os demais serão preenchidos automaticamente com os resultados convertidos.",
  placeholders: {
    celsius: "Ex: 100",
    fahrenheit: "Ex: 212",
    kelvin: "Ex: 373,15",
  } satisfies Record<Scale, string>,
  copyValue: (label: string) => `Copiar ${label}`,
  resultTitle: "Resultado da conversão",
  content: (
    <>
          <section>
            <h2 className="text-lg font-semibold text-foreground mb-2">O que é temperatura?</h2>
            <p className="text-[15px] leading-7 text-muted-foreground">
              A temperatura é uma medida que indica o grau de calor ou frio de um objeto, ambiente ou substância. Ela está relacionada ao movimento das partículas: quanto maior a temperatura, maior a agitação dessas partículas.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-2">Principais escalas de temperatura</h2>
            <ul className="text-[15px] leading-7 text-muted-foreground list-disc list-inside space-y-1">
              <li><strong className="text-foreground">Celsius (°C)</strong>: usada no dia a dia na maioria dos países</li>
              <li><strong className="text-foreground">Fahrenheit (°F)</strong>: comum nos Estados Unidos</li>
              <li><strong className="text-foreground">Kelvin (K)</strong>: usada em ciência e cálculos físicos</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-2">Como converter temperaturas</h2>
            <ol className="text-[15px] leading-7 text-muted-foreground list-decimal list-inside space-y-2">
              <li><strong className="text-foreground">Celsius para Fahrenheit</strong> — Multiplique por 9, divida por 5 e some 32</li>
              <li><strong className="text-foreground">Fahrenheit para Celsius</strong> — Subtraia 32 e multiplique por 5/9</li>
              <li><strong className="text-foreground">Celsius para Kelvin</strong> — Some 273,15</li>
              <li><strong className="text-foreground">Kelvin para Celsius</strong> — Subtraia 273,15</li>
            </ol>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-2">Exemplos de conversão</h2>
            <ul className="text-[15px] leading-7 text-muted-foreground list-disc list-inside space-y-1">
              <li>0°C = 32°F</li>
              <li>100°C = 212°F</li>
              <li>0°C = 273,15 K</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-2">Celsius</h2>
            <p className="text-[15px] leading-7 text-muted-foreground">
              A escala Celsius é baseada nos pontos de congelamento (0°C) e ebulição (100°C) da água. É a mais usada no cotidiano.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-2">Kelvin</h2>
            <p className="text-[15px] leading-7 text-muted-foreground">
              O Kelvin é uma escala absoluta, usada principalmente na ciência. Começa no zero absoluto (0 K), onde não há movimento térmico.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-2">Fahrenheit</h2>
            <p className="text-[15px] leading-7 text-muted-foreground">
              A escala Fahrenheit é utilizada principalmente nos Estados Unidos. Nela, a água congela a 32°F e ferve a 212°F.
            </p>
          </section>
    </>
  ),
};

const en: typeof pt = {
  title: "Temperature Converter",
  intro:
    "Online temperature converter. Type a value in Celsius, Fahrenheit or Kelvin and see it converted to the other units instantly. Just enter a value in one of the fields and the others are filled in automatically with the converted results.",
  placeholders: {
    celsius: "e.g. 100",
    fahrenheit: "e.g. 212",
    kelvin: "e.g. 373.15",
  },
  copyValue: (label: string) => `Copy ${label}`,
  resultTitle: "Conversion result",
  content: (
    <>
      <section>
        <h2 className="text-lg font-semibold text-foreground mb-2">What is temperature?</h2>
        <p className="text-[15px] leading-7 text-muted-foreground">
          Temperature is a measure of how hot or cold an object, environment or substance is. It is related to the motion of particles: the higher the temperature, the faster those particles move.
        </p>
      </section>

      <section>
        <h2 className="text-lg font-semibold text-foreground mb-2">Main temperature scales</h2>
        <ul className="text-[15px] leading-7 text-muted-foreground list-disc list-inside space-y-1">
          <li><strong className="text-foreground">Celsius (°C)</strong>: used day to day in most countries</li>
          <li><strong className="text-foreground">Fahrenheit (°F)</strong>: common in the United States</li>
          <li><strong className="text-foreground">Kelvin (K)</strong>: used in science and physics calculations</li>
        </ul>
      </section>

      <section>
        <h2 className="text-lg font-semibold text-foreground mb-2">How to convert temperatures</h2>
        <ol className="text-[15px] leading-7 text-muted-foreground list-decimal list-inside space-y-2">
          <li><strong className="text-foreground">Celsius to Fahrenheit</strong> — Multiply by 9, divide by 5 and add 32</li>
          <li><strong className="text-foreground">Fahrenheit to Celsius</strong> — Subtract 32 and multiply by 5/9</li>
          <li><strong className="text-foreground">Celsius to Kelvin</strong> — Add 273.15</li>
          <li><strong className="text-foreground">Kelvin to Celsius</strong> — Subtract 273.15</li>
        </ol>
      </section>

      <section>
        <h2 className="text-lg font-semibold text-foreground mb-2">Conversion examples</h2>
        <ul className="text-[15px] leading-7 text-muted-foreground list-disc list-inside space-y-1">
          <li>0°C = 32°F</li>
          <li>100°C = 212°F</li>
          <li>0°C = 273.15 K</li>
        </ul>
      </section>

      <section>
        <h2 className="text-lg font-semibold text-foreground mb-2">Celsius</h2>
        <p className="text-[15px] leading-7 text-muted-foreground">
          The Celsius scale is based on the freezing point (0°C) and boiling point (100°C) of water. It is the most widely used scale in everyday life.
        </p>
      </section>

      <section>
        <h2 className="text-lg font-semibold text-foreground mb-2">Kelvin</h2>
        <p className="text-[15px] leading-7 text-muted-foreground">
          Kelvin is an absolute scale, used mainly in science. It starts at absolute zero (0 K), where there is no thermal motion.
        </p>
      </section>

      <section>
        <h2 className="text-lg font-semibold text-foreground mb-2">Fahrenheit</h2>
        <p className="text-[15px] leading-7 text-muted-foreground">
          The Fahrenheit scale is used mainly in the United States. On this scale, water freezes at 32°F and boils at 212°F.
        </p>
      </section>
    </>
  ),
};

export default function TemperatureConverter() {
  const locale = useLocale();
  const copy = useCopy({ pt, en });
  const uiCopy = useUiCopy();
  const [values, setValues] = useState<Record<Scale, string>>({ celsius: "", fahrenheit: "", kelvin: "" });
  const [hasResult, setHasResult] = useState(false);

  const handleChange = (scale: Scale, raw: string) => {
    if (raw === "" || raw === "-") {
      setValues({ celsius: raw === "-" ? (scale === "celsius" ? "-" : "") : "", fahrenheit: raw === "-" ? (scale === "fahrenheit" ? "-" : "") : "", kelvin: raw === "-" ? (scale === "kelvin" ? "-" : "") : "" });
      setHasResult(false);
      return;
    }
    const num = parseDecimal(raw, locale);
    if (num === null) return;

    const converted = convert(scale, num, locale);
    converted[scale] = raw;
    setValues(converted);
    setHasResult(true);
  };

  const handleCopy = (scale: Scale) => {
    if (values[scale]) {
      navigator.clipboard.writeText(values[scale]);
      toast({ title: uiCopy.copied });
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">{copy.title}</h1>
        <p className="mt-3 max-w-prose text-base leading-7 text-muted-foreground">{copy.intro}</p>
      </div>

      <div className="grid gap-5 sm:grid-cols-3">
        {SCALES.map((scale) => (
          <div key={scale} className="space-y-2">
            <Label className="text-sm font-medium text-foreground">{labels[scale]}</Label>
            <div className="flex gap-2">
              <Input
                type="text"
                inputMode="decimal"
                value={values[scale]}
                onChange={(e) => handleChange(scale, e.target.value)}
                className="font-mono"
                placeholder={copy.placeholders[scale]}
              />
              <Button
                variant="outline"
                size="icon"
                onClick={() => handleCopy(scale)}
                disabled={!values[scale]}
                aria-label={copy.copyValue(labels[scale])}
              >
                <Copy className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>

      {hasResult && (
        <div className="rounded-lg border border-primary/20 bg-primary/5 p-5 space-y-3">
          <p className="text-sm font-medium text-muted-foreground">{copy.resultTitle}</p>
          <div className="grid gap-2 sm:grid-cols-3">
            {SCALES.map((scale) => (
              <div key={scale}>
                <p className="text-xs text-muted-foreground">{labels[scale]}</p>
                <p className="text-lg font-semibold font-mono text-foreground">{values[scale]}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="space-y-8 border-t border-border pt-10">
        {copy.content}

        <ToolFaq toolId="converter-temperaturas" />

        <RelatedTools ids={["converter-numeros"]} />
      </div>
    </div>
  );
}
