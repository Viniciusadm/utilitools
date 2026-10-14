import { useEffect, useState } from "react";
import { format, parseISO } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { OptionToggle } from "@/components/option-toggle";
import { Field } from "@/components/form-field";
import { RelatedTools } from "@/components/related-tools";
import { ToolFaq } from "@/components/tool-faq";
import { ToolSection } from "@/components/tool-section";
import { addBusinessDays, countBusinessDays, nationalHolidays } from "@/lib/business-days";

const ISO_DATE = "yyyy-MM-dd";
const MAX_RANGE_DAYS = 365 * 50;
const HOLIDAY_TABLE_YEAR = 2026;

function parseDateInput(value: string) {
  if (!value) return null;
  const date = parseISO(value);
  return Number.isNaN(date.getTime()) ? null : date;
}

const longDate = (date: Date) => format(date, "EEEE, dd/MM/yyyy", { locale: ptBR });

export default function BusinessDays() {
  const [countMode, setCountMode] = useState(true);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [daysToAdd, setDaysToAdd] = useState("10");
  const [includeOptional, setIncludeOptional] = useState(true);

  useEffect(() => {
    setStartDate(format(new Date(), ISO_DATE));
  }, []);

  const start = parseDateInput(startDate);
  const end = parseDateInput(endDate);
  const amount = Number(daysToAdd);
  const rangeTooLong = start && end && Math.abs(end.getTime() - start.getTime()) / 864e5 > MAX_RANGE_DAYS;

  const count = countMode && start && end && !rangeTooLong ? countBusinessDays(start, end, includeOptional) : null;
  const deadline =
    !countMode && start && Number.isInteger(amount) && Math.abs(amount) <= 10000
      ? addBusinessDays(start, amount, includeOptional)
      : null;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">Calcular Dias Úteis</h1>
        <p className="mt-3 max-w-prose text-base leading-7 text-muted-foreground">
          Conte quantos dias úteis existem entre duas datas ou descubra a data final de um prazo em dias úteis. O cálculo
          desconta sábados, domingos e feriados nacionais.
        </p>
      </div>

      <div className="rounded-lg border border-border bg-card p-5 sm:p-6 space-y-5 shadow-xs">
        <OptionToggle
          label="O que você quer calcular?"
          value={countMode}
          onChange={setCountMode}
          trueLabel="Dias úteis entre datas"
          falseLabel="Somar dias úteis"
        />
        <div className="grid gap-5 sm:grid-cols-2">
          <Field label={countMode ? "Data inicial" : "Data de início"}>
            {(id) => <Input id={id} type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />}
          </Field>
          {countMode ? (
            <Field label="Data final">
              {(id) => <Input id={id} type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />}
            </Field>
          ) : (
            <Field label="Quantidade de dias úteis">
              {(id) => (
                <Input id={id} type="number" value={daysToAdd} onChange={(e) => setDaysToAdd(e.target.value)} />
              )}
            </Field>
          )}
        </div>
        <div className="flex items-center justify-between gap-4">
          <Label htmlFor="include-optional" className="text-sm font-normal text-foreground">
            Descontar Carnaval e Corpus Christi (pontos facultativos)
          </Label>
          <Switch id="include-optional" checked={includeOptional} onCheckedChange={setIncludeOptional} />
        </div>
      </div>

      {rangeTooLong && <p className="text-sm text-destructive">Escolha um intervalo de até 50 anos.</p>}

      {count && (
        <div className="space-y-3" aria-live="polite">
          <dl className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {[
              { label: "Dias úteis", value: count.businessDays, highlight: true },
              { label: "Dias corridos", value: count.calendarDays, highlight: false },
              { label: "Fins de semana", value: count.weekendDays, highlight: false },
              { label: "Feriados em dia útil", value: count.holidays.length, highlight: false },
            ].map(({ label, value, highlight }) => (
              <div
                key={label}
                className={highlight ? "rounded-lg border border-primary/20 bg-primary/5 p-4" : "rounded-lg border border-border bg-card p-4"}
              >
                <dt className="text-xs font-medium text-muted-foreground">{label}</dt>
                <dd className="mt-1 font-mono text-2xl font-semibold text-foreground">{value}</dd>
              </div>
            ))}
          </dl>
          {count.holidays.length > 0 && (
            <ul className="text-sm text-muted-foreground space-y-1">
              {count.holidays.map((holiday) => (
                <li key={holiday.date.toISOString()}>
                  <span className="font-mono text-foreground">{format(holiday.date, "dd/MM/yyyy")}</span> — {holiday.name}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}

      {deadline && (
        <div className="rounded-lg border border-primary/20 bg-primary/5 p-5 space-y-1" aria-live="polite">
          <p className="text-sm font-medium text-muted-foreground">Data final do prazo</p>
          <p className="text-2xl font-semibold text-foreground first-letter:uppercase">{longDate(deadline)}</p>
        </div>
      )}

      <div className="space-y-8 border-t border-border pt-10">
        <ToolSection title="Como os dias úteis são contados">
          <ul>
            <li>
              <strong>Entre datas:</strong> a data inicial e a final entram na contagem, como na função DIATRABALHOTOTAL do
              Excel.
            </li>
            <li>
              <strong>Somar dias úteis:</strong> a contagem começa no primeiro dia útil depois da data de início, como nos
              prazos processuais e bancários.
            </li>
            <li>Sábados, domingos e feriados nacionais não são dias úteis.</li>
          </ul>
        </ToolSection>

        <ToolSection title={`Feriados nacionais de ${HOLIDAY_TABLE_YEAR}`}>
          <ul className="!list-none space-y-1">
            {nationalHolidays(HOLIDAY_TABLE_YEAR).map((holiday) => (
              <li key={holiday.name}>
                <strong className="font-mono">{format(holiday.date, "dd/MM")}</strong> — {holiday.name}
                {holiday.optional && " (ponto facultativo)"}
              </li>
            ))}
          </ul>
          <p>
            Feriados estaduais e municipais, como o aniversário da cidade, não estão incluídos. Se o seu prazo depende
            deles, desconte-os manualmente.
          </p>
        </ToolSection>

        <ToolFaq segment="calcular-dias-uteis" />
        <RelatedTools segments={["contar-dias", "calcular-idade", "calculadora-de-juros-compostos", "calculadora-de-porcentagem"]} />
      </div>
    </div>
  );
}
