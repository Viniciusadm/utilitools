import { useState } from "react";
import { format, differenceInDays } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { RelatedTools } from "@/components/related-tools";
import { ToolFaq } from "@/components/tool-faq";
import { DATE_FNS_LOCALE } from "@/lib/date-locale";
import { INTL_LOCALE, useCopy, useLocale } from "@/lib/i18n";

const pt = {
  title: "Contador de Dias",
  intro:
    "Contador de dias online entre datas. Você pode informar uma data inicial e uma data final para calcular quantos dias existem entre elas. Basta selecionar as datas e clicar em calcular para ver o total de dias entre os dois períodos.",
  startDate: "Data inicial",
  endDate: "Data final",
  selectDate: "Selecione a data",
  dateFormat: "dd/MM/yyyy",
  calculate: "Calcular",
  dayCount: "Quantidade de dias",
  days: (count: string, n: number) => `${count} ${n === 1 ? "dia" : "dias"}`,
  content: (
    <>
      <section>
        <h2 className="text-lg font-semibold text-foreground mb-2">O que é um contador de dias?</h2>
        <p className="text-[15px] leading-7 text-muted-foreground">
          Um contador de dias é uma ferramenta que permite calcular a diferença entre duas datas. Ele é muito útil para descobrir prazos, intervalos de tempo e períodos entre eventos.
        </p>
      </section>

      <section>
        <h2 className="text-lg font-semibold text-foreground mb-2">Como funciona o cálculo de dias?</h2>
        <p className="text-[15px] leading-7 text-muted-foreground">
          O cálculo é feito considerando a diferença entre uma data inicial e uma data final. O resultado mostra quantos dias existem entre essas duas datas, podendo incluir ou não o dia inicial dependendo da regra utilizada.
        </p>
      </section>

      <section>
        <h2 className="text-lg font-semibold text-foreground mb-2">Como calcular dias entre duas datas</h2>
        <ol className="text-[15px] leading-7 text-muted-foreground list-decimal list-inside space-y-2">
          <li><strong className="text-foreground">Escolha a data inicial</strong> — Defina o ponto de partida do cálculo.</li>
          <li><strong className="text-foreground">Escolha a data final</strong> — Defina até onde deseja contar os dias.</li>
          <li><strong className="text-foreground">Calcule a diferença</strong> — Subtraia a data inicial da data final para obter o total de dias.</li>
        </ol>
      </section>

      <section>
        <h2 className="text-lg font-semibold text-foreground mb-2">Exemplo de contagem de dias</h2>
        <p className="text-[15px] leading-7 text-muted-foreground">
          Se a data inicial for 12/03/2026 e a data final for 19/03/2026, o resultado será: <strong className="text-foreground font-mono">7 dias</strong>.
        </p>
      </section>

      <section>
        <h2 className="text-lg font-semibold text-foreground mb-2">Quando usar um contador de dias?</h2>
        <ul className="text-[15px] leading-7 text-muted-foreground list-disc list-inside space-y-1">
          <li>Calcular prazos</li>
          <li>Contar dias entre eventos</li>
          <li>Planejar viagens</li>
          <li>Controlar períodos de tempo</li>
        </ul>
      </section>
    </>
  ),
};

const en: typeof pt = {
  title: "Days Between Dates Calculator",
  intro:
    "Online day counter between dates. Enter a start date and an end date to find out how many days there are between them. Just pick the dates and click Calculate to see the total number of days between the two.",
  startDate: "Start date",
  endDate: "End date",
  selectDate: "Pick a date",
  dateFormat: "MM/dd/yyyy",
  calculate: "Calculate",
  dayCount: "Number of days",
  days: (count: string, n: number) => `${count} ${n === 1 ? "day" : "days"}`,
  content: (
    <>
      <section>
        <h2 className="text-lg font-semibold text-foreground mb-2">What is a day counter?</h2>
        <p className="text-[15px] leading-7 text-muted-foreground">
          A day counter is a tool that calculates the difference between two dates. It is very useful for working out deadlines, time intervals and the length of time between events.
        </p>
      </section>

      <section>
        <h2 className="text-lg font-semibold text-foreground mb-2">How are the days counted?</h2>
        <p className="text-[15px] leading-7 text-muted-foreground">
          The calculation takes the difference between a start date and an end date. The result shows how many days there are between the two dates. The start date itself is not counted, so the result is the number of days you need to add to the start date to reach the end date.
        </p>
      </section>

      <section>
        <h2 className="text-lg font-semibold text-foreground mb-2">How to calculate the days between two dates</h2>
        <ol className="text-[15px] leading-7 text-muted-foreground list-decimal list-inside space-y-2">
          <li><strong className="text-foreground">Pick the start date</strong> — Set the starting point of the count.</li>
          <li><strong className="text-foreground">Pick the end date</strong> — Set the date you want to count up to.</li>
          <li><strong className="text-foreground">Calculate the difference</strong> — Subtract the start date from the end date to get the total number of days.</li>
        </ol>
      </section>

      <section>
        <h2 className="text-lg font-semibold text-foreground mb-2">Day count example</h2>
        <p className="text-[15px] leading-7 text-muted-foreground">
          If the start date is March 12, 2026 and the end date is March 19, 2026, the result is: <strong className="text-foreground font-mono">7 days</strong>.
        </p>
      </section>

      <section>
        <h2 className="text-lg font-semibold text-foreground mb-2">When to use a day counter</h2>
        <ul className="text-[15px] leading-7 text-muted-foreground list-disc list-inside space-y-1">
          <li>Calculate deadlines</li>
          <li>Count the days between events</li>
          <li>Plan trips and vacations</li>
          <li>Track periods of time</li>
        </ul>
      </section>
    </>
  ),
};

export default function CountDays() {
  const locale = useLocale();
  const copy = useCopy({ pt, en });
  const dateLocale = DATE_FNS_LOCALE[locale];
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();
  const [dayCount, setDayCount] = useState<number | null>(null);

  const handleCalculate = () => {
    if (startDate && endDate) {
      setDayCount(Math.abs(differenceInDays(endDate, startDate)));
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">{copy.title}</h1>
        <p className="mt-3 max-w-prose text-base leading-7 text-muted-foreground">{copy.intro}</p>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div className="space-y-2">
          <Label className="text-sm font-medium text-foreground">{copy.startDate}</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className={cn("w-full justify-start text-left font-normal", !startDate && "text-muted-foreground")}>
                <CalendarIcon className="mr-2 h-4 w-4" />
                {startDate ? format(startDate, copy.dateFormat, { locale: dateLocale }) : copy.selectDate}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar mode="single" selected={startDate} onSelect={setStartDate} locale={dateLocale} initialFocus className={cn("p-3 pointer-events-auto")} />
            </PopoverContent>
          </Popover>
        </div>

        <div className="space-y-2">
          <Label className="text-sm font-medium text-foreground">{copy.endDate}</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className={cn("w-full justify-start text-left font-normal", !endDate && "text-muted-foreground")}>
                <CalendarIcon className="mr-2 h-4 w-4" />
                {endDate ? format(endDate, copy.dateFormat, { locale: dateLocale }) : copy.selectDate}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar mode="single" selected={endDate} onSelect={setEndDate} locale={dateLocale} initialFocus className={cn("p-3 pointer-events-auto")} />
            </PopoverContent>
          </Popover>
        </div>
      </div>

      <Button onClick={handleCalculate} disabled={!startDate || !endDate}>{copy.calculate}</Button>

      {dayCount !== null && (
        <div className="rounded-lg border border-primary/20 bg-primary/5 p-5 space-y-1">
          <p className="text-sm font-medium text-muted-foreground">{copy.dayCount}</p>
          <p className="text-2xl font-semibold font-mono text-foreground">
            {copy.days(new Intl.NumberFormat(INTL_LOCALE[locale]).format(dayCount), dayCount)}
          </p>
        </div>
      )}

      <div className="space-y-8 border-t border-border pt-10">
        {copy.content}

        <ToolFaq toolId="contar-dias" />

        <RelatedTools ids={["calcular-dias-uteis", "calcular-idade", "calculadora-de-porcentagem", "calcular-tres"]} />
      </div>
    </div>
  );
}
