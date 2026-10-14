import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Field } from "@/components/form-field";
import { RelatedTools } from "@/components/related-tools";
import { ToolFaq } from "@/components/tool-faq";
import { ToolSection } from "@/components/tool-section";
import { cn } from "@/lib/utils";
import { BMI_CATEGORIES, bmiCategory, calculateBmi, healthyWeightRange, parseHeightToMeters } from "@/lib/bmi";
import { parseDecimal } from "@/lib/percentage";

const oneDecimal = new Intl.NumberFormat("pt-BR", { minimumFractionDigits: 1, maximumFractionDigits: 1 });

function rangeLabel(min: number, max: number) {
  if (min === 0) return `Menor que ${oneDecimal.format(max)}`;
  if (max === Infinity) return `${oneDecimal.format(min)} ou mais`;
  return `${oneDecimal.format(min)} a ${oneDecimal.format(max - 0.1)}`;
}

export default function BmiCalculator() {
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");

  const weightKg = parseDecimal(weight);
  const heightValue = parseDecimal(height);
  const heightM = heightValue === null ? null : parseHeightToMeters(heightValue);
  const valid = weightKg !== null && heightM !== null && weightKg > 0 && heightM >= 0.5 && heightM <= 2.6;
  const bmi = valid ? calculateBmi(weightKg, heightM) : null;
  const category = bmi === null ? null : bmiCategory(bmi);
  const healthy = valid ? healthyWeightRange(heightM) : null;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">Calculadora de IMC</h1>
        <p className="mt-3 max-w-prose text-base leading-7 text-muted-foreground">
          Calcule seu IMC (Índice de Massa Corporal) com o peso e a altura. Veja a classificação segundo a Organização
          Mundial da Saúde e a faixa de peso considerada saudável para a sua altura.
        </p>
      </div>

      <div className="rounded-lg border border-border bg-card p-5 sm:p-6 shadow-xs">
        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="Peso (kg)">
            {(id) => (
              <Input id={id} inputMode="decimal" value={weight} onChange={(e) => setWeight(e.target.value)} placeholder="70" />
            )}
          </Field>
          <Field label="Altura (cm ou m)">
            {(id) => (
              <Input id={id} inputMode="decimal" value={height} onChange={(e) => setHeight(e.target.value)} placeholder="175" />
            )}
          </Field>
        </div>
      </div>

      {bmi !== null && category && healthy && (
        <div className="rounded-lg border border-primary/20 bg-primary/5 p-5 space-y-1" aria-live="polite">
          <p className="text-sm font-medium text-muted-foreground">Seu IMC</p>
          <p className="text-3xl font-semibold font-mono text-foreground">{oneDecimal.format(bmi)}</p>
          <p className="text-base font-semibold text-foreground">{category.label}</p>
          <p className="text-sm text-muted-foreground">
            Peso saudável para a sua altura: {oneDecimal.format(healthy.min)} kg a {oneDecimal.format(healthy.max)} kg.
          </p>
        </div>
      )}

      <section>
        <h2 className="text-lg font-semibold text-foreground mb-3">Tabela de IMC</h2>
        <div className="overflow-hidden rounded-lg border border-border">
          <table className="w-full text-sm">
            <thead className="bg-muted/60 text-xs text-muted-foreground">
              <tr>
                <th className="px-4 py-2 text-left font-medium">IMC</th>
                <th className="px-4 py-2 text-left font-medium">Classificação</th>
              </tr>
            </thead>
            <tbody>
              {BMI_CATEGORIES.map((row) => (
                <tr
                  key={row.label}
                  className={cn("border-t border-border", category?.label === row.label && "bg-primary/10 font-semibold")}
                >
                  <td className="px-4 py-2 font-mono text-foreground">{rangeLabel(row.min, row.max)}</td>
                  <td className="px-4 py-2 text-foreground">{row.label}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <div className="space-y-8 border-t border-border pt-10">
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

        <ToolFaq segment="calculadora-imc" />
        <RelatedTools segments={["calcular-idade", "calculadora-de-porcentagem", "calcular-tres", "converter-temperaturas"]} />
      </div>
    </div>
  );
}
