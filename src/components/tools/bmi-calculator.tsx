import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Field } from "@/components/form-field";
import { RelatedTools } from "@/components/related-tools";
import { ToolFaq } from "@/components/tool-faq";
import { ToolSection } from "@/components/tool-section";
import { cn } from "@/lib/utils";
import {
  BMI_CATEGORIES,
  bmiCategory,
  calculateBmi,
  healthyWeightRange,
  parseHeightToMeters,
  type BmiCategoryCode,
} from "@/lib/bmi";
import { INTL_LOCALE, useCopy, useLocale } from "@/lib/i18n";
import { parseDecimal } from "@/lib/percentage";

type NumberFormatter = (value: number) => string;

const pt = {
  title: "Calculadora de IMC",
  intro:
    "Calcule seu IMC (Índice de Massa Corporal) com o peso e a altura. Veja a classificação segundo a Organização Mundial da Saúde e a faixa de peso considerada saudável para a sua altura.",
  weight: "Peso (kg)",
  height: "Altura (cm ou m)",
  yourBmi: "Seu IMC",
  healthyWeight: (min: string, max: string) => `Peso saudável para a sua altura: ${min} kg a ${max} kg.`,
  tableTitle: "Tabela de IMC",
  bmiColumn: "IMC",
  categoryColumn: "Classificação",
  below: (max: string) => `Menor que ${max}`,
  orMore: (min: string) => `${min} ou mais`,
  between: (min: string, max: string) => `${min} a ${max}`,
  categories: {
    underweight: "Abaixo do peso",
    normal: "Peso normal",
    overweight: "Sobrepeso",
    obesityClass1: "Obesidade grau I",
    obesityClass2: "Obesidade grau II",
    obesityClass3: "Obesidade grau III",
  } satisfies Record<BmiCategoryCode, string>,
  content: (
    <>
      <ToolSection title="Como calcular o IMC">
        <p>
          O IMC é o peso em quilos dividido pela altura em metros ao quadrado: <strong>IMC = peso ÷ (altura × altura)</strong>.
          Uma pessoa com 70 kg e 1,75 m tem IMC de 70 ÷ (1,75 × 1,75) ={" "}
          <strong className="font-mono">22,9</strong>, dentro da faixa de peso normal.
        </p>
      </ToolSection>

      <ToolSection title="Limitações do IMC">
        <p>
          O IMC é uma referência rápida, mas não diferencia gordura de massa muscular nem considera a distribuição de
          gordura no corpo. Atletas podem ter IMC alto sendo saudáveis, e a tabela não se aplica a crianças,
          adolescentes, gestantes e idosos, que têm referências próprias.
        </p>
      </ToolSection>

      <div className="rounded-lg border border-border bg-muted/60 p-4">
        <p className="text-xs text-muted-foreground leading-relaxed">
          <strong className="text-foreground">IMPORTANTE:</strong> o resultado é apenas informativo e não substitui a
          avaliação de um médico ou nutricionista.
        </p>
      </div>
    </>
  ),
};

const en: typeof pt = {
  title: "BMI Calculator",
  intro:
    "Calculate your BMI (Body Mass Index) from your weight and height in metric units. See your classification according to the World Health Organization (WHO) and the healthy weight range for your height.",
  weight: "Weight (kg)",
  height: "Height (cm or m)",
  yourBmi: "Your BMI",
  healthyWeight: (min: string, max: string) => `Healthy weight for your height: ${min} kg to ${max} kg.`,
  tableTitle: "BMI chart",
  bmiColumn: "BMI",
  categoryColumn: "Classification",
  below: (max: string) => `Below ${max}`,
  orMore: (min: string) => `${min} or higher`,
  between: (min: string, max: string) => `${min} to ${max}`,
  categories: {
    underweight: "Underweight",
    normal: "Normal weight",
    overweight: "Overweight",
    obesityClass1: "Obesity class I",
    obesityClass2: "Obesity class II",
    obesityClass3: "Obesity class III",
  },
  content: (
    <>
      <ToolSection title="How to calculate BMI">
        <p>
          BMI is your weight in kilograms divided by your height in meters squared:{" "}
          <strong>BMI = weight ÷ (height × height)</strong>. A person who weighs 70 kg and is 1.75 m tall has a BMI of
          70 ÷ (1.75 × 1.75) = <strong className="font-mono">22.9</strong>, within the normal weight range.
        </p>
        <p>
          This calculator uses metric units. If you know your weight in pounds, divide it by 2.205 to get kilograms;
          for height, multiply inches by 2.54 to get centimeters.
        </p>
      </ToolSection>

      <ToolSection title="Limitations of BMI">
        <p>
          BMI is a quick reference, but it does not distinguish fat from muscle mass or account for how fat is
          distributed in the body. Athletes can have a high BMI and still be healthy, and the chart does not apply to
          children, teenagers, pregnant women or older adults, who have their own reference ranges.
        </p>
      </ToolSection>

      <div className="rounded-lg border border-border bg-muted/60 p-4">
        <p className="text-xs text-muted-foreground leading-relaxed">
          <strong className="text-foreground">IMPORTANT:</strong> the result is for information only and does not
          replace an assessment by a doctor or dietitian.
        </p>
      </div>
    </>
  ),
};

export default function BmiCalculator() {
  const locale = useLocale();
  const copy = useCopy({ pt, en });
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");

  const oneDecimal = new Intl.NumberFormat(INTL_LOCALE[locale], { minimumFractionDigits: 1, maximumFractionDigits: 1 });
  const formatOne: NumberFormatter = (value) => oneDecimal.format(value);

  const rangeLabel = (min: number, max: number) => {
    if (min === 0) return copy.below(formatOne(max));
    if (max === Infinity) return copy.orMore(formatOne(min));
    return copy.between(formatOne(min), formatOne(max - 0.1));
  };

  const weightKg = parseDecimal(weight, locale);
  const heightValue = parseDecimal(height, locale);
  const heightM = heightValue === null ? null : parseHeightToMeters(heightValue);
  const valid = weightKg !== null && heightM !== null && weightKg > 0 && heightM >= 0.5 && heightM <= 2.6;
  const bmi = valid ? calculateBmi(weightKg, heightM) : null;
  const category = bmi === null ? null : bmiCategory(bmi);
  const healthy = valid ? healthyWeightRange(heightM) : null;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">{copy.title}</h1>
        <p className="mt-3 max-w-prose text-base leading-7 text-muted-foreground">{copy.intro}</p>
      </div>

      <div className="rounded-lg border border-border bg-card p-5 sm:p-6 shadow-xs">
        <div className="grid gap-5 sm:grid-cols-2">
          <Field label={copy.weight}>
            {(id) => (
              <Input id={id} inputMode="decimal" value={weight} onChange={(e) => setWeight(e.target.value)} placeholder="70" />
            )}
          </Field>
          <Field label={copy.height}>
            {(id) => (
              <Input id={id} inputMode="decimal" value={height} onChange={(e) => setHeight(e.target.value)} placeholder="175" />
            )}
          </Field>
        </div>
      </div>

      {bmi !== null && category && healthy && (
        <div className="rounded-lg border border-primary/20 bg-primary/5 p-5 space-y-1" aria-live="polite">
          <p className="text-sm font-medium text-muted-foreground">{copy.yourBmi}</p>
          <p className="text-3xl font-semibold font-mono text-foreground">{formatOne(bmi)}</p>
          <p className="text-base font-semibold text-foreground">{copy.categories[category.code]}</p>
          <p className="text-sm text-muted-foreground">{copy.healthyWeight(formatOne(healthy.min), formatOne(healthy.max))}</p>
        </div>
      )}

      <section>
        <h2 className="text-lg font-semibold text-foreground mb-3">{copy.tableTitle}</h2>
        <div className="overflow-hidden rounded-lg border border-border">
          <table className="w-full text-sm">
            <thead className="bg-muted/60 text-xs text-muted-foreground">
              <tr>
                <th className="px-4 py-2 text-left font-medium">{copy.bmiColumn}</th>
                <th className="px-4 py-2 text-left font-medium">{copy.categoryColumn}</th>
              </tr>
            </thead>
            <tbody>
              {BMI_CATEGORIES.map((row) => (
                <tr
                  key={row.code}
                  className={cn("border-t border-border", category?.code === row.code && "bg-primary/10 font-semibold")}
                >
                  <td className="px-4 py-2 font-mono text-foreground">{rangeLabel(row.min, row.max)}</td>
                  <td className="px-4 py-2 text-foreground">{copy.categories[row.code]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <div className="space-y-8 border-t border-border pt-10">
        {copy.content}

        <ToolFaq toolId="calculadora-imc" />
        <RelatedTools ids={["calcular-idade", "calculadora-de-porcentagem", "calcular-tres", "converter-temperaturas"]} />
      </div>
    </div>
  );
}
