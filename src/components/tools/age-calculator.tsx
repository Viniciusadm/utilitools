import { useEffect, useId, useState } from "react";
import { format, parseISO } from "date-fns";
import { motion, AnimatePresence } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RelatedTools } from "@/components/related-tools";
import { ToolFaq } from "@/components/tool-faq";
import { calculateAge } from "@/lib/age";

const ISO_DATE = "yyyy-MM-dd";

const integerFormat = new Intl.NumberFormat("pt-BR");

function plural(value: number, singular: string, pluralForm: string) {
  return `${integerFormat.format(value)} ${value === 1 ? singular : pluralForm}`;
}

function parseDateInput(value: string) {
  if (!value) return null;
  const date = parseISO(value);
  return Number.isNaN(date.getTime()) ? null : date;
}

export default function AgeCalculator() {
  const birthId = useId();
  const referenceId = useId();
  const [birthDate, setBirthDate] = useState("");
  const [referenceDate, setReferenceDate] = useState("");

  useEffect(() => {
    setReferenceDate(format(new Date(), ISO_DATE));
  }, []);

  const birth = parseDateInput(birthDate);
  const reference = parseDateInput(referenceDate);
  const age = birth && reference ? calculateAge(birth, reference) : null;
  const invalidRange = birth !== null && reference !== null && age === null;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">Calcular Idade</h1>
        <p className="mt-3 max-w-prose text-base leading-7 text-muted-foreground">
          Calcule a idade exata em anos, meses e dias a partir da data de nascimento. Veja também quantos dias, semanas e
          meses a pessoa já viveu e quantos dias faltam para o próximo aniversário.
        </p>
      </div>

      <div className="rounded-lg border border-border bg-card p-5 sm:p-6 shadow-xs">
        <div className="grid gap-5 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor={birthId} className="text-sm font-medium text-foreground">
              Data de nascimento
            </Label>
            <Input id={birthId} type="date" value={birthDate} onChange={(e) => setBirthDate(e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label htmlFor={referenceId} className="text-sm font-medium text-foreground">
              Calcular idade em
            </Label>
            <Input id={referenceId} type="date" value={referenceDate} onChange={(e) => setReferenceDate(e.target.value)} />
          </div>
        </div>
      </div>

      {invalidRange && (
        <p className="text-sm text-destructive">A data de nascimento precisa ser anterior à data de referência.</p>
      )}

      <AnimatePresence mode="wait">
        {age && (
          <motion.div
            key={`${birthDate}-${referenceDate}`}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="space-y-3"
          >
            <div className="rounded-lg border border-primary/20 bg-primary/5 p-5 space-y-1">
              <p className="text-sm font-medium text-muted-foreground">Idade</p>
              <p className="text-2xl font-semibold text-foreground">
                {plural(age.years, "ano", "anos")}, {plural(age.months, "mês", "meses")} e {plural(age.days, "dia", "dias")}
              </p>
            </div>
            <dl className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {[
                { label: "Total em meses", value: integerFormat.format(age.totalMonths) },
                { label: "Total em semanas", value: integerFormat.format(age.totalWeeks) },
                { label: "Total em dias", value: integerFormat.format(age.totalDays) },
                {
                  label: "Próximo aniversário",
                  value: age.daysUntilBirthday === 0 ? "Hoje! 🎉" : `em ${plural(age.daysUntilBirthday, "dia", "dias")}`,
                },
              ].map(({ label, value }) => (
                <div key={label} className="rounded-lg border border-border bg-card p-4">
                  <dt className="text-xs font-medium text-muted-foreground">{label}</dt>
                  <dd className="mt-1 font-mono text-lg font-semibold text-foreground">{value}</dd>
                </div>
              ))}
            </dl>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="space-y-8 border-t border-border pt-10">
        <section>
          <h2 className="text-lg font-semibold text-foreground mb-2">Como calcular a idade</h2>
          <p className="text-[15px] leading-7 text-muted-foreground">
            Para calcular a idade, subtraia o ano de nascimento do ano atual. Se o aniversário deste ano ainda não
            aconteceu, diminua 1. Os meses e dias restantes são contados a partir do último aniversário até a data de
            referência.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground mb-2">Exemplo de cálculo de idade</h2>
          <p className="text-[15px] leading-7 text-muted-foreground">
            Quem nasceu em 15/08/1990 tinha, em 14/10/2026,{" "}
            <strong className="text-foreground font-mono">36 anos, 1 mês e 29 dias</strong>.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground mb-2">Quando usar a calculadora de idade?</h2>
          <ul className="text-[15px] leading-7 text-muted-foreground list-disc list-inside space-y-1">
            <li>Conferir a idade mínima ou máxima em concursos e editais</li>
            <li>Preencher cadastros, matrículas e formulários</li>
            <li>Calcular a idade de um bebê em meses e dias</li>
            <li>Saber quantos dias faltam para o próximo aniversário</li>
          </ul>
        </section>

        <ToolFaq segment="calcular-idade" />

        <RelatedTools segments={["contar-dias", "calculadora-de-porcentagem", "calcular-tres"]} />
      </div>
    </div>
  );
}
