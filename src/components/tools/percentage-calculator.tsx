import { useId, useState } from "react";
import { Input } from "@/components/ui/input";
import { RelatedTools } from "@/components/related-tools";
import { ToolFaq } from "@/components/tool-faq";
import {
  applyDiscount,
  applyIncrease,
  formatDecimal,
  parseDecimal,
  percentChange,
  percentOf,
  percentageRatio,
} from "@/lib/percentage";

type Field = { prefix?: string; suffix?: string; value: string; onChange: (value: string) => void; label: string };

function InlineInput({ value, onChange, label }: Pick<Field, "value" | "onChange" | "label">) {
  const id = useId();
  return (
    <>
      <label htmlFor={id} className="sr-only">
        {label}
      </label>
      <Input
        id={id}
        inputMode="decimal"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="inline-flex h-10 w-28 text-center font-mono"
      />
    </>
  );
}

function CalculatorCard({
  title,
  fields,
  result,
}: {
  title: string;
  fields: readonly Field[];
  result: string | null;
}) {
  return (
    <div className="rounded-lg border border-border bg-card p-5 sm:p-6 shadow-xs space-y-4">
      <h2 className="text-base font-semibold text-foreground">{title}</h2>
      <div className="flex flex-wrap items-center gap-2 text-[15px] text-muted-foreground">
        {fields.map((field) => (
          <span key={field.label} className="inline-flex items-center gap-2">
            {field.prefix && <span>{field.prefix}</span>}
            <InlineInput value={field.value} onChange={field.onChange} label={field.label} />
            {field.suffix && <span>{field.suffix}</span>}
          </span>
        ))}
        <span>=</span>
        <output className="rounded-md border border-primary/20 bg-primary/5 px-3 py-2 font-mono text-lg font-semibold text-foreground">
          {result ?? "—"}
        </output>
      </div>
    </div>
  );
}

function compute([first, second]: [string, string], fn: (a: number, b: number) => number | null, suffix = "") {
  const a = parseDecimal(first);
  const b = parseDecimal(second);
  if (a === null || b === null) return null;
  const result = fn(a, b);
  return result === null ? null : `${formatDecimal(result)}${suffix}`;
}

export default function PercentageCalculator() {
  const [ofPercent, setOfPercent] = useState("15");
  const [ofTotal, setOfTotal] = useState("200");
  const [ratioPart, setRatioPart] = useState("30");
  const [ratioTotal, setRatioTotal] = useState("120");
  const [increaseValue, setIncreaseValue] = useState("50");
  const [increasePercent, setIncreasePercent] = useState("10");
  const [discountValue, setDiscountValue] = useState("80");
  const [discountPercent, setDiscountPercent] = useState("25");
  const [changeFrom, setChangeFrom] = useState("50");
  const [changeTo, setChangeTo] = useState("65");

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">Calculadora de Porcentagem</h1>
        <p className="mt-3 max-w-prose text-base leading-7 text-muted-foreground">
          Calcule porcentagens online de forma rápida: descubra quanto é X% de um valor, quantos por cento um número
          representa de outro, aplique aumentos e descontos e veja a variação percentual entre dois valores. O resultado
          aparece enquanto você digita.
        </p>
      </div>

      <div className="grid gap-4">
        <CalculatorCard
          title="Quanto é X% de um valor?"
          fields={[
            { value: ofPercent, onChange: setOfPercent, suffix: "% de", label: "Porcentagem" },
            { value: ofTotal, onChange: setOfTotal, label: "Valor total" },
          ]}
          result={compute([ofPercent, ofTotal], percentOf)}
        />
        <CalculatorCard
          title="Um valor é quantos % de outro?"
          fields={[
            { value: ratioPart, onChange: setRatioPart, suffix: "é quantos % de", label: "Parte" },
            { value: ratioTotal, onChange: setRatioTotal, label: "Total" },
          ]}
          result={compute([ratioPart, ratioTotal], percentageRatio, "%")}
        />
        <CalculatorCard
          title="Aumento percentual"
          fields={[
            { value: increaseValue, onChange: setIncreaseValue, suffix: "com aumento de", label: "Valor inicial" },
            { value: increasePercent, onChange: setIncreasePercent, suffix: "%", label: "Porcentagem de aumento" },
          ]}
          result={compute([increaseValue, increasePercent], applyIncrease)}
        />
        <CalculatorCard
          title="Desconto percentual"
          fields={[
            { value: discountValue, onChange: setDiscountValue, suffix: "com desconto de", label: "Valor inicial" },
            { value: discountPercent, onChange: setDiscountPercent, suffix: "%", label: "Porcentagem de desconto" },
          ]}
          result={compute([discountValue, discountPercent], applyDiscount)}
        />
        <CalculatorCard
          title="Variação percentual entre dois valores"
          fields={[
            { value: changeFrom, onChange: setChangeFrom, prefix: "De", label: "Valor inicial" },
            { value: changeTo, onChange: setChangeTo, prefix: "para", label: "Valor final" },
          ]}
          result={compute([changeFrom, changeTo], percentChange, "%")}
        />
      </div>

      <div className="space-y-8 border-t border-border pt-10">
        <section>
          <h2 className="text-lg font-semibold text-foreground mb-2">O que é porcentagem?</h2>
          <p className="text-[15px] leading-7 text-muted-foreground">
            Porcentagem é uma razão de base 100, representada pelo símbolo %. Dizer 25% é o mesmo que dizer 25 partes
            de 100, ou seja, 0,25. Ela é usada no dia a dia para calcular descontos, juros, impostos, gorjetas,
            comissões, notas e variações de preço.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground mb-2">Fórmulas de porcentagem</h2>
          <ul className="text-[15px] leading-7 text-muted-foreground list-disc list-inside space-y-1">
            <li>
              <strong className="text-foreground">X% de Y:</strong> Y × X ÷ 100
            </li>
            <li>
              <strong className="text-foreground">X é quantos % de Y:</strong> X ÷ Y × 100
            </li>
            <li>
              <strong className="text-foreground">Aumento de X%:</strong> valor × (1 + X ÷ 100)
            </li>
            <li>
              <strong className="text-foreground">Desconto de X%:</strong> valor × (1 − X ÷ 100)
            </li>
            <li>
              <strong className="text-foreground">Variação percentual:</strong> (final − inicial) ÷ inicial × 100
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground mb-2">Exemplos de cálculo de porcentagem</h2>
          <ul className="text-[15px] leading-7 text-muted-foreground list-disc list-inside space-y-1">
            <li>
              10% de R$ 350 é <strong className="text-foreground font-mono">R$ 35</strong>.
            </li>
            <li>
              Uma conta de R$ 120 com 10% de serviço fica em <strong className="text-foreground font-mono">R$ 132</strong>.
            </li>
            <li>
              Um salário que passou de R$ 2.000 para R$ 2.150 teve aumento de{" "}
              <strong className="text-foreground font-mono">7,5%</strong>.
            </li>
          </ul>
        </section>

        <div className="rounded-lg border border-border bg-muted/60 p-4">
          <p className="text-xs text-muted-foreground leading-relaxed">
            <strong className="text-foreground">DICA:</strong> um aumento de 10% seguido de um desconto de 10% não volta
            ao valor original. R$ 100 + 10% = R$ 110, e R$ 110 − 10% = R$ 99.
          </p>
        </div>

        <ToolFaq segment="calculadora-de-porcentagem" />

        <RelatedTools segments={["calcular-tres", "calcular-resto", "numeros-por-extenso", "calcular-idade"]} />
      </div>
    </div>
  );
}
