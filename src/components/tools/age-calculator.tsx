import { useEffect, useId, useState } from "react";
import { format, parseISO } from "date-fns";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RelatedTools } from "@/components/related-tools";
import { ToolFaq } from "@/components/tool-faq";
import { calculateAge, type Age } from "@/lib/age";
import { INTL_LOCALE, useCopy, useLocale } from "@/lib/i18n";

const ISO_DATE = "yyyy-MM-dd";

type CountFormatter = (value: number) => string;

function parseDateInput(value: string) {
  if (!value) return null;
  const date = parseISO(value);
  return Number.isNaN(date.getTime()) ? null : date;
}

const pt = {
  title: "Calcular Idade",
  intro:
    "Calcule a idade exata em anos, meses e dias a partir da data de nascimento. Veja também quantos dias, semanas e meses a pessoa já viveu e quantos dias faltam para o próximo aniversário.",
  birthDate: "Data de nascimento",
  referenceDate: "Calcular idade em",
  invalidRange: "A data de nascimento precisa ser anterior à data de referência.",
  age: "Idade",
  ageSummary: (age: Age, n: CountFormatter) =>
    `${n(age.years)} ${age.years === 1 ? "ano" : "anos"}, ${n(age.months)} ${age.months === 1 ? "mês" : "meses"} e ${n(age.days)} ${age.days === 1 ? "dia" : "dias"}`,
  totalMonths: "Total em meses",
  totalWeeks: "Total em semanas",
  totalDays: "Total em dias",
  nextBirthday: "Próximo aniversário",
  birthdayToday: "Hoje! 🎉",
  daysUntil: (days: number, n: CountFormatter) => `em ${n(days)} ${days === 1 ? "dia" : "dias"}`,
  content: (
    <>
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
    </>
  ),
};

const en: typeof pt = {
  title: "Age Calculator",
  intro:
    "Calculate exact age in years, months and days from a date of birth. See how many days, weeks and months someone has lived and how many days are left until their next birthday.",
  birthDate: "Date of birth",
  referenceDate: "Age on",
  invalidRange: "The date of birth must be before the reference date.",
  age: "Age",
  ageSummary: (age: Age, n: CountFormatter) =>
    `${n(age.years)} ${age.years === 1 ? "year" : "years"}, ${n(age.months)} ${age.months === 1 ? "month" : "months"} and ${n(age.days)} ${age.days === 1 ? "day" : "days"}`,
  totalMonths: "Total months",
  totalWeeks: "Total weeks",
  totalDays: "Total days",
  nextBirthday: "Next birthday",
  birthdayToday: "Today! 🎉",
  daysUntil: (days: number, n: CountFormatter) => `in ${n(days)} ${days === 1 ? "day" : "days"}`,
  content: (
    <>
      <section>
        <h2 className="text-lg font-semibold text-foreground mb-2">How to calculate age</h2>
        <p className="text-[15px] leading-7 text-muted-foreground">
          To calculate age, subtract the birth year from the current year. If this year's birthday has not happened
          yet, subtract 1. The remaining months and days are counted from the last birthday up to the reference date.
        </p>
      </section>

      <section>
        <h2 className="text-lg font-semibold text-foreground mb-2">Age calculation example</h2>
        <p className="text-[15px] leading-7 text-muted-foreground">
          Someone born on August 15, 1990 was{" "}
          <strong className="text-foreground font-mono">36 years, 1 month and 29 days</strong> old on October 14, 2026.
        </p>
      </section>

      <section>
        <h2 className="text-lg font-semibold text-foreground mb-2">When to use an age calculator</h2>
        <ul className="text-[15px] leading-7 text-muted-foreground list-disc list-inside space-y-1">
          <li>Check minimum or maximum age requirements for exams, jobs or applications</li>
          <li>Fill in registrations, enrollments and forms</li>
          <li>Work out a baby's age in months and days</li>
          <li>Find out how many days are left until your next birthday</li>
        </ul>
      </section>
    </>
  ),
};

export default function AgeCalculator() {
  const locale = useLocale();
  const copy = useCopy({ pt, en });
  const birthId = useId();
  const referenceId = useId();
  const [birthDate, setBirthDate] = useState("");
  const [referenceDate, setReferenceDate] = useState("");

  useEffect(() => {
    setReferenceDate(format(new Date(), ISO_DATE));
  }, []);

  const integerFormat = new Intl.NumberFormat(INTL_LOCALE[locale]);
  const formatCount = (value: number) => integerFormat.format(value);

  const birth = parseDateInput(birthDate);
  const reference = parseDateInput(referenceDate);
  const age = birth && reference ? calculateAge(birth, reference) : null;
  const invalidRange = birth !== null && reference !== null && age === null;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">{copy.title}</h1>
        <p className="mt-3 max-w-prose text-base leading-7 text-muted-foreground">{copy.intro}</p>
      </div>

      <div className="rounded-lg border border-border bg-card p-5 sm:p-6 shadow-xs">
        <div className="grid gap-5 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor={birthId} className="text-sm font-medium text-foreground">
              {copy.birthDate}
            </Label>
            <Input id={birthId} type="date" value={birthDate} onChange={(e) => setBirthDate(e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label htmlFor={referenceId} className="text-sm font-medium text-foreground">
              {copy.referenceDate}
            </Label>
            <Input id={referenceId} type="date" value={referenceDate} onChange={(e) => setReferenceDate(e.target.value)} />
          </div>
        </div>
      </div>

      {invalidRange && <p className="text-sm text-destructive">{copy.invalidRange}</p>}

      {age && (
        <div className="space-y-3">
          <div className="rounded-lg border border-primary/20 bg-primary/5 p-5 space-y-1">
            <p className="text-sm font-medium text-muted-foreground">{copy.age}</p>
            <p className="text-2xl font-semibold text-foreground">{copy.ageSummary(age, formatCount)}</p>
          </div>
          <dl className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {[
              { label: copy.totalMonths, value: formatCount(age.totalMonths) },
              { label: copy.totalWeeks, value: formatCount(age.totalWeeks) },
              { label: copy.totalDays, value: formatCount(age.totalDays) },
              {
                label: copy.nextBirthday,
                value: age.daysUntilBirthday === 0 ? copy.birthdayToday : copy.daysUntil(age.daysUntilBirthday, formatCount),
              },
            ].map(({ label, value }) => (
              <div key={label} className="rounded-lg border border-border bg-card p-4">
                <dt className="text-xs font-medium text-muted-foreground">{label}</dt>
                <dd className="mt-1 font-mono text-lg font-semibold text-foreground">{value}</dd>
              </div>
            ))}
          </dl>
        </div>
      )}

      <div className="space-y-8 border-t border-border pt-10">
        {copy.content}

        <ToolFaq toolId="calcular-idade" />

        <RelatedTools ids={["contar-dias", "calculadora-de-porcentagem", "calcular-tres"]} />
      </div>
    </div>
  );
}
