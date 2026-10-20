import { useEffect, useMemo, useState } from "react";
import { Input } from "@/components/ui/input";
import { CopyButton } from "@/components/copy-button";
import { Field } from "@/components/form-field";
import { OptionToggle } from "@/components/option-toggle";
import { RelatedTools } from "@/components/related-tools";
import { ToolFaq } from "@/components/tool-faq";
import { ToolSection } from "@/components/tool-section";
import { INTL_LOCALE, useCopy, useLocale } from "@/lib/i18n";
import { parseTimestamp, relativeTime, toUnixSeconds } from "@/lib/timestamp";

const DEFAULT_TIMESTAMP = "1735689600";

const pt = {
  title: "Converter Timestamp Unix",
  intro:
    "Converta timestamp Unix (epoch) em data e hora legível, e data em timestamp. Aceita segundos e milissegundos, mostra o horário em UTC e no seu fuso, e exibe o timestamp atual em tempo real.",
  now: "Timestamp atual",
  seconds: "Segundos",
  milliseconds: "Milissegundos",
  toDateTitle: "Timestamp para data",
  timestampLabel: "Timestamp Unix",
  timestampHint: "Em segundos (10 dígitos) ou milissegundos (13 dígitos)",
  detected: (unit: string) => `Detectado em ${unit === "seconds" ? "segundos" : "milissegundos"}`,
  invalid: "Digite apenas números, como 1735689600.",
  iso: "ISO 8601",
  utc: "UTC",
  local: "Seu fuso horário",
  relative: "Relativo",
  toTimestampTitle: "Data para timestamp",
  dateLabel: "Data e hora",
  zoneLabel: "Interpretar a data em",
  localZone: "Meu fuso",
  utcZone: "UTC",
  content: (
    <>
      <ToolSection title="O que é timestamp Unix?">
        <p>
          O timestamp Unix, também chamado de epoch time ou POSIX time, é a quantidade de segundos que se passaram desde{" "}
          <strong>1º de janeiro de 1970, às 00:00:00 UTC</strong>. Por ser só um número, sem fuso horário nem formato
          de data, ele é a forma mais usada para guardar datas em bancos de dados, logs, APIs e tokens JWT.
        </p>
      </ToolSection>

      <ToolSection title="Segundos ou milissegundos?">
        <p>
          Sistemas Unix, PHP, Python e a maioria das APIs usam segundos (10 dígitos, como <code>1735689600</code>).
          JavaScript (<code>Date.now()</code>) e Java usam milissegundos (13 dígitos, como <code>1735689600000</code>). A
          ferramenta detecta a unidade pelo número de dígitos.
        </p>
      </ToolSection>

      <ToolSection title="Como pegar o timestamp atual">
        <ul>
          <li>
            JavaScript: <code>Math.floor(Date.now() / 1000)</code>
          </li>
          <li>
            Python: <code>int(time.time())</code>
          </li>
          <li>
            PHP: <code>time()</code>
          </li>
          <li>
            SQL (PostgreSQL): <code>extract(epoch from now())</code>
          </li>
          <li>
            Linux e macOS: <code>date +%s</code>
          </li>
        </ul>
      </ToolSection>

      <ToolSection title="O problema do ano 2038">
        <p>
          Sistemas que guardam o timestamp em um inteiro de 32 bits com sinal só conseguem contar até{" "}
          <code>2147483647</code>, que corresponde a 19 de janeiro de 2038, às 03:14:07 UTC. Depois disso o número
          estoura. Sistemas modernos usam 64 bits e não têm esse limite.
        </p>
      </ToolSection>
    </>
  ),
};

const en: typeof pt = {
  title: "Unix Timestamp Converter",
  intro:
    "Convert a Unix (epoch) timestamp to a human-readable date and time, and a date to a timestamp. Works with seconds and milliseconds, shows UTC and your local time zone, and displays the current timestamp live.",
  now: "Current timestamp",
  seconds: "Seconds",
  milliseconds: "Milliseconds",
  toDateTitle: "Timestamp to date",
  timestampLabel: "Unix timestamp",
  timestampHint: "In seconds (10 digits) or milliseconds (13 digits)",
  detected: (unit: string) => `Detected as ${unit}`,
  invalid: "Enter digits only, such as 1735689600.",
  iso: "ISO 8601",
  utc: "UTC",
  local: "Your time zone",
  relative: "Relative",
  toTimestampTitle: "Date to timestamp",
  dateLabel: "Date and time",
  zoneLabel: "Read the date as",
  localZone: "My time zone",
  utcZone: "UTC",
  content: (
    <>
      <ToolSection title="What is a Unix timestamp?">
        <p>
          A Unix timestamp, also called epoch time or POSIX time, is the number of seconds elapsed since{" "}
          <strong>January 1, 1970 at 00:00:00 UTC</strong>. Because it is just a number, with no time zone or date
          format, it is the most common way to store dates in databases, logs, APIs and JWTs.
        </p>
      </ToolSection>

      <ToolSection title="Seconds or milliseconds?">
        <p>
          Unix systems, PHP, Python and most APIs use seconds (10 digits, such as <code>1735689600</code>). JavaScript (
          <code>Date.now()</code>) and Java use milliseconds (13 digits, such as <code>1735689600000</code>). The tool
          detects the unit from the number of digits.
        </p>
      </ToolSection>

      <ToolSection title="How to get the current timestamp">
        <ul>
          <li>
            JavaScript: <code>Math.floor(Date.now() / 1000)</code>
          </li>
          <li>
            Python: <code>int(time.time())</code>
          </li>
          <li>
            PHP: <code>time()</code>
          </li>
          <li>
            SQL (PostgreSQL): <code>extract(epoch from now())</code>
          </li>
          <li>
            Linux and macOS: <code>date +%s</code>
          </li>
        </ul>
      </ToolSection>

      <ToolSection title="The year 2038 problem">
        <p>
          Systems that store the timestamp as a signed 32-bit integer can only count up to <code>2147483647</code>, which
          is January 19, 2038 at 03:14:07 UTC. After that the number overflows. Modern systems use 64 bits and have no
          such limit.
        </p>
      </ToolSection>
    </>
  ),
};

function pad(value: number) {
  return String(value).padStart(2, "0");
}

function toDateTimeInput(date: Date) {
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`;
}

function parseDateTimeInput(value: string, utc: boolean) {
  if (!value) return null;
  const date = new Date(utc ? `${value}Z` : value);
  return Number.isNaN(date.getTime()) ? null : date;
}

function ValueRow({ label, value, copyable = false }: { label: string; value: string; copyable?: boolean }) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-1 border-t border-border py-2 first:border-t-0">
      <dt className="text-sm text-muted-foreground">{label}</dt>
      <dd className="flex items-center gap-2 font-mono text-sm text-foreground">
        <span className="break-all">{value}</span>
        {copyable && <CopyButton value={value} label="" variant="ghost" className="h-7 px-2" />}
      </dd>
    </div>
  );
}

export default function UnixTimestamp() {
  const copy = useCopy({ pt, en });
  const locale = useLocale();
  const intlLocale = INTL_LOCALE[locale];
  const [now, setNow] = useState<Date | null>(null);
  const [timestamp, setTimestamp] = useState(DEFAULT_TIMESTAMP);
  const [dateInput, setDateInput] = useState("");
  const [utcInput, setUtcInput] = useState(false);

  useEffect(() => {
    const current = new Date();
    setNow(current);
    setDateInput(toDateTimeInput(current));
    const interval = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  const parsed = useMemo(() => parseTimestamp(timestamp), [timestamp]);
  const typedDate = useMemo(() => parseDateTimeInput(dateInput, utcInput), [dateInput, utcInput]);

  const utcFormat = new Intl.DateTimeFormat(intlLocale, { dateStyle: "full", timeStyle: "long", timeZone: "UTC" });
  const localFormat = new Intl.DateTimeFormat(intlLocale, { dateStyle: "full", timeStyle: "long" });

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">{copy.title}</h1>
        <p className="mt-3 max-w-prose text-base leading-7 text-muted-foreground">{copy.intro}</p>
      </div>

      <div className="rounded-lg border border-primary/20 bg-primary/5 p-5">
        <p className="text-sm font-medium text-muted-foreground">{copy.now}</p>
        <dl className="mt-1">
          <ValueRow label={copy.seconds} value={now ? String(toUnixSeconds(now)) : "—"} copyable={now !== null} />
          <ValueRow label={copy.milliseconds} value={now ? String(now.getTime()) : "—"} copyable={now !== null} />
        </dl>
      </div>

      <section className="rounded-lg border border-border bg-card p-5 sm:p-6 space-y-4 shadow-xs">
        <h2 className="text-lg font-semibold text-foreground">{copy.toDateTitle}</h2>
        <Field label={copy.timestampLabel} hint={parsed ? copy.detected(parsed.unit) : copy.timestampHint}>
          {(id) => (
            <Input
              id={id}
              inputMode="numeric"
              value={timestamp}
              onChange={(e) => setTimestamp(e.target.value)}
              className="font-mono"
            />
          )}
        </Field>
        {parsed ? (
          <dl>
            <ValueRow label={copy.iso} value={parsed.date.toISOString()} copyable />
            <ValueRow label={copy.utc} value={utcFormat.format(parsed.date)} />
            {now && <ValueRow label={copy.local} value={localFormat.format(parsed.date)} />}
            {now && <ValueRow label={copy.relative} value={relativeTime(parsed.date, now, intlLocale)} />}
          </dl>
        ) : (
          timestamp.trim() && <p className="text-sm text-destructive">{copy.invalid}</p>
        )}
      </section>

      <section className="rounded-lg border border-border bg-card p-5 sm:p-6 space-y-4 shadow-xs">
        <h2 className="text-lg font-semibold text-foreground">{copy.toTimestampTitle}</h2>
        <div className="grid gap-5 sm:grid-cols-2">
          <Field label={copy.dateLabel}>
            {(id) => (
              <Input
                id={id}
                type="datetime-local"
                step={1}
                value={dateInput}
                onChange={(e) => setDateInput(e.target.value)}
              />
            )}
          </Field>
          <OptionToggle
            label={copy.zoneLabel}
            value={utcInput}
            onChange={setUtcInput}
            trueLabel={copy.utcZone}
            falseLabel={copy.localZone}
          />
        </div>
        {typedDate && (
          <dl>
            <ValueRow label={copy.seconds} value={String(toUnixSeconds(typedDate))} copyable />
            <ValueRow label={copy.milliseconds} value={String(typedDate.getTime())} copyable />
            <ValueRow label={copy.iso} value={typedDate.toISOString()} copyable />
          </dl>
        )}
      </section>

      <div className="space-y-8 border-t border-border pt-10">
        {copy.content}
        <ToolFaq toolId="converter-timestamp" />
        <RelatedTools ids={["decodificar-jwt", "contar-dias", "calcular-dias-uteis", "gerador-de-uuid"]} />
      </div>
    </div>
  );
}
