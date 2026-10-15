import { useEffect, useState } from "react";
import { format, parseISO } from "date-fns";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { OptionToggle } from "@/components/option-toggle";
import { Field } from "@/components/form-field";
import { RelatedTools } from "@/components/related-tools";
import { ToolFaq } from "@/components/tool-faq";
import { ToolSection } from "@/components/tool-section";
import { addBusinessDays, countBusinessDays, nationalHolidays, type HolidayCode } from "@/lib/business-days";
import { DATE_FNS_LOCALE } from "@/lib/date-locale";
import { useCopy, useLocale } from "@/lib/i18n";

const ISO_DATE = "yyyy-MM-dd";
const MAX_RANGE_DAYS = 365 * 50;
const HOLIDAY_TABLE_YEAR = 2026;

function parseDateInput(value: string) {
  if (!value) return null;
  const date = parseISO(value);
  return Number.isNaN(date.getTime()) ? null : date;
}

const pt = {
  title: "Calcular Dias Úteis",
  intro:
    "Conte quantos dias úteis existem entre duas datas ou descubra a data final de um prazo em dias úteis. O cálculo desconta sábados, domingos e feriados nacionais.",
  modeLabel: "O que você quer calcular?",
  countMode: "Dias úteis entre datas",
  addMode: "Somar dias úteis",
  startDate: "Data inicial",
  deadlineStart: "Data de início",
  endDate: "Data final",
  businessDaysAmount: "Quantidade de dias úteis",
  includeOptional: "Descontar Carnaval e Corpus Christi (pontos facultativos)",
  rangeTooLong: "Escolha um intervalo de até 50 anos.",
  businessDays: "Dias úteis",
  calendarDays: "Dias corridos",
  weekendDays: "Fins de semana",
  weekdayHolidays: "Feriados em dia útil",
  deadline: "Data final do prazo",
  dateFormat: "dd/MM/yyyy",
  longDateFormat: "EEEE, dd/MM/yyyy",
  shortDateFormat: "dd/MM",
  optionalSuffix: " (ponto facultativo)",
  holidays: {
    newYear: "Confraternização Universal",
    tiradentes: "Tiradentes",
    labourDay: "Dia do Trabalho",
    independence: "Independência do Brasil",
    ourLadyAparecida: "Nossa Senhora Aparecida",
    allSouls: "Finados",
    republic: "Proclamação da República",
    blackConsciousness: "Dia Nacional de Zumbi e da Consciência Negra",
    christmas: "Natal",
    goodFriday: "Sexta-feira Santa",
    carnivalMonday: "Carnaval (segunda-feira)",
    carnivalTuesday: "Carnaval (terça-feira)",
    corpusChristi: "Corpus Christi",
  } satisfies Record<HolidayCode, string>,
  howTitle: "Como os dias úteis são contados",
  how: (
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
  ),
  holidayTableTitle: `Feriados nacionais de ${HOLIDAY_TABLE_YEAR}`,
  holidayNote:
    "Feriados estaduais e municipais, como o aniversário da cidade, não estão incluídos. Se o seu prazo depende deles, desconte-os manualmente.",
};

const en: typeof pt = {
  title: "Business Days Calculator",
  intro:
    "Count the business days between two dates or find the end date of a deadline in business days. The calculation skips Saturdays, Sundays and Brazilian national holidays.",
  modeLabel: "What do you want to calculate?",
  countMode: "Business days between dates",
  addMode: "Add business days",
  startDate: "Start date",
  deadlineStart: "Start date",
  endDate: "End date",
  businessDaysAmount: "Number of business days",
  includeOptional: "Skip Carnival and Corpus Christi (optional holidays in Brazil)",
  rangeTooLong: "Choose a range of up to 50 years.",
  businessDays: "Business days",
  calendarDays: "Calendar days",
  weekendDays: "Weekend days",
  weekdayHolidays: "Holidays on weekdays",
  deadline: "Deadline end date",
  dateFormat: "MM/dd/yyyy",
  longDateFormat: "EEEE, MMMM d, yyyy",
  shortDateFormat: "MMM d",
  optionalSuffix: " (optional holiday)",
  holidays: {
    newYear: "New Year's Day (Confraternização Universal)",
    tiradentes: "Tiradentes Day",
    labourDay: "Labour Day (Dia do Trabalho)",
    independence: "Brazilian Independence Day",
    ourLadyAparecida: "Our Lady of Aparecida (Nossa Senhora Aparecida)",
    allSouls: "All Souls' Day (Finados)",
    republic: "Proclamation of the Republic",
    blackConsciousness: "Black Consciousness Day (Dia de Zumbi e da Consciência Negra)",
    christmas: "Christmas Day",
    goodFriday: "Good Friday",
    carnivalMonday: "Carnival Monday",
    carnivalTuesday: "Carnival Tuesday",
    corpusChristi: "Corpus Christi",
  },
  howTitle: "How business days are counted",
  how: (
    <ul>
      <li>
        <strong>Between dates:</strong> both the start date and the end date are included, like Excel's NETWORKDAYS
        function.
      </li>
      <li>
        <strong>Adding business days:</strong> counting starts on the first business day after the start date, as with
        legal and banking deadlines in Brazil.
      </li>
      <li>Saturdays, Sundays and Brazilian national holidays are not business days.</li>
      <li>
        <strong>Holidays used:</strong> this calculator only knows the national holidays of Brazil. Public holidays of
        other countries are not taken into account.
      </li>
    </ul>
  ),
  holidayTableTitle: `Brazilian national holidays in ${HOLIDAY_TABLE_YEAR}`,
  holidayNote:
    "State and municipal holidays in Brazil, such as a city's anniversary, are not included. If your deadline depends on them, subtract them manually.",
};

export default function BusinessDays() {
  const locale = useLocale();
  const copy = useCopy({ pt, en });
  const dateLocale = DATE_FNS_LOCALE[locale];
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
        <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">{copy.title}</h1>
        <p className="mt-3 max-w-prose text-base leading-7 text-muted-foreground">{copy.intro}</p>
      </div>

      <div className="rounded-lg border border-border bg-card p-5 sm:p-6 space-y-5 shadow-xs">
        <OptionToggle
          label={copy.modeLabel}
          value={countMode}
          onChange={setCountMode}
          trueLabel={copy.countMode}
          falseLabel={copy.addMode}
        />
        <div className="grid gap-5 sm:grid-cols-2">
          <Field label={countMode ? copy.startDate : copy.deadlineStart}>
            {(id) => <Input id={id} type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />}
          </Field>
          {countMode ? (
            <Field label={copy.endDate}>
              {(id) => <Input id={id} type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />}
            </Field>
          ) : (
            <Field label={copy.businessDaysAmount}>
              {(id) => (
                <Input id={id} type="number" value={daysToAdd} onChange={(e) => setDaysToAdd(e.target.value)} />
              )}
            </Field>
          )}
        </div>
        <div className="flex items-center justify-between gap-4">
          <Label htmlFor="include-optional" className="text-sm font-normal text-foreground">
            {copy.includeOptional}
          </Label>
          <Switch id="include-optional" checked={includeOptional} onCheckedChange={setIncludeOptional} />
        </div>
      </div>

      {rangeTooLong && <p className="text-sm text-destructive">{copy.rangeTooLong}</p>}

      {count && (
        <div className="space-y-3" aria-live="polite">
          <dl className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {[
              { label: copy.businessDays, value: count.businessDays, highlight: true },
              { label: copy.calendarDays, value: count.calendarDays, highlight: false },
              { label: copy.weekendDays, value: count.weekendDays, highlight: false },
              { label: copy.weekdayHolidays, value: count.holidays.length, highlight: false },
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
                  <span className="font-mono text-foreground">{format(holiday.date, copy.dateFormat)}</span> —{" "}
                  {copy.holidays[holiday.code]}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}

      {deadline && (
        <div className="rounded-lg border border-primary/20 bg-primary/5 p-5 space-y-1" aria-live="polite">
          <p className="text-sm font-medium text-muted-foreground">{copy.deadline}</p>
          <p className="text-2xl font-semibold text-foreground first-letter:uppercase">
            {format(deadline, copy.longDateFormat, { locale: dateLocale })}
          </p>
        </div>
      )}

      <div className="space-y-8 border-t border-border pt-10">
        <ToolSection title={copy.howTitle}>{copy.how}</ToolSection>

        <ToolSection title={copy.holidayTableTitle}>
          <ul className="!list-none space-y-1">
            {nationalHolidays(HOLIDAY_TABLE_YEAR).map((holiday) => (
              <li key={holiday.code}>
                <strong className="font-mono">{format(holiday.date, copy.shortDateFormat, { locale: dateLocale })}</strong> —{" "}
                {copy.holidays[holiday.code]}
                {holiday.optional && copy.optionalSuffix}
              </li>
            ))}
          </ul>
          <p>{copy.holidayNote}</p>
        </ToolSection>

        <ToolFaq toolId="calcular-dias-uteis" />
        <RelatedTools ids={["contar-dias", "calcular-idade", "calculadora-de-juros-compostos", "calculadora-de-porcentagem"]} />
      </div>
    </div>
  );
}
