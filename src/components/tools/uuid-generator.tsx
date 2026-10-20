import { useCallback, useEffect, useState } from "react";
import { RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { CopyButton } from "@/components/copy-button";
import { Field } from "@/components/form-field";
import { OptionToggle } from "@/components/option-toggle";
import { RelatedTools } from "@/components/related-tools";
import { ToolFaq } from "@/components/tool-faq";
import { ToolSection } from "@/components/tool-section";
import { useCopy } from "@/lib/i18n";
import { formatUuid, generateUuid, type UuidVersion } from "@/lib/uuid";

const MAX_QUANTITY = 500;

const pt = {
  title: "Gerador de UUID Online",
  intro:
    "Gere UUID v4 aleatório ou UUID v7 ordenado por tempo, um por vez ou centenas de uma vez. Escolha maiúsculas, com ou sem hífens, e copie a lista pronta para usar em bancos de dados, APIs e testes.",
  versionLabel: "Versão",
  quantityLabel: "Quantidade",
  quantityHint: `De 1 a ${MAX_QUANTITY}`,
  uppercase: "Letras maiúsculas",
  hyphens: "Com hífens",
  generate: "Gerar UUID",
  copyAll: "Copiar todos",
  result: (count: number) => (count === 1 ? "UUID gerado" : `${count} UUIDs gerados`),
  content: (
    <>
      <ToolSection title="O que é UUID?">
        <p>
          UUID (Universally Unique Identifier), também chamado de GUID, é um identificador de 128 bits escrito como 32
          dígitos hexadecimais em cinco grupos: <code>8-4-4-4-12</code>. Ele permite criar IDs únicos em qualquer
          sistema, sem consultar um banco de dados central, por isso é muito usado como chave primária, ID de pedidos,
          nomes de arquivos e tokens de correlação.
        </p>
      </ToolSection>

      <ToolSection title="UUID v4 ou UUID v7?">
        <ul>
          <li>
            <strong>UUID v4</strong> tem 122 bits aleatórios. É a versão mais usada e não revela nada sobre quando ou
            onde foi criado.
          </li>
          <li>
            <strong>UUID v7</strong> começa com o horário em milissegundos (RFC 9562), então os IDs ficam em ordem de
            criação. Isso deixa índices de banco de dados mais rápidos do que com o v4 aleatório.
          </li>
        </ul>
      </ToolSection>

      <ToolSection title="Como gerar UUIDs">
        <ol>
          <li>Escolha a versão: v4 (aleatório) ou v7 (ordenado por tempo).</li>
          <li>Informe quantos UUIDs quer gerar, até {MAX_QUANTITY} de uma vez.</li>
          <li>Ajuste o formato: maiúsculas e com ou sem hífens.</li>
          <li>Copie um UUID ou a lista inteira, um por linha.</li>
        </ol>
      </ToolSection>

      <ToolSection title="Exemplo de UUID">
        <p>
          Um UUID v4 tem este formato: <code>3f2b8c9e-1a4d-4f6b-9c2e-7d5a1b8e4f03</code>. O <strong>4</strong> no
          início do terceiro grupo indica a versão, e o primeiro dígito do quarto grupo (8, 9, a ou b) indica a variante
          do padrão.
        </p>
      </ToolSection>

      <div className="rounded-lg border border-border bg-muted/60 p-4 text-sm leading-6 text-muted-foreground">
        <strong className="text-foreground">Seguro e local:</strong> os UUIDs são gerados no seu navegador com{" "}
        <code className="font-mono">crypto.getRandomValues</code>, o gerador criptográfico do sistema. Nada é enviado
        para servidores.
      </div>
    </>
  ),
};

const en: typeof pt = {
  title: "UUID Generator",
  intro:
    "Generate random UUID v4 or time-ordered UUID v7 values, one at a time or hundreds at once. Choose uppercase, with or without hyphens, and copy a ready-to-use list for databases, APIs and tests.",
  versionLabel: "Version",
  quantityLabel: "Quantity",
  quantityHint: `From 1 to ${MAX_QUANTITY}`,
  uppercase: "Uppercase",
  hyphens: "With hyphens",
  generate: "Generate UUID",
  copyAll: "Copy all",
  result: (count: number) => (count === 1 ? "Generated UUID" : `${count} generated UUIDs`),
  content: (
    <>
      <ToolSection title="What is a UUID?">
        <p>
          A UUID (Universally Unique Identifier), also called a GUID, is a 128-bit identifier written as 32 hexadecimal
          digits in five groups: <code>8-4-4-4-12</code>. It lets any system create unique IDs without asking a central
          database, which is why UUIDs are used as primary keys, order IDs, file names and correlation IDs.
        </p>
      </ToolSection>

      <ToolSection title="UUID v4 or UUID v7?">
        <ul>
          <li>
            <strong>UUID v4</strong> has 122 random bits. It is the most common version and reveals nothing about when or
            where it was created.
          </li>
          <li>
            <strong>UUID v7</strong> starts with a millisecond timestamp (RFC 9562), so IDs sort in creation order. That
            keeps database indexes faster than with random v4 values.
          </li>
        </ul>
      </ToolSection>

      <ToolSection title="How to generate UUIDs">
        <ol>
          <li>Pick the version: v4 (random) or v7 (time-ordered).</li>
          <li>Enter how many UUIDs you need, up to {MAX_QUANTITY} at once.</li>
          <li>Adjust the format: uppercase and with or without hyphens.</li>
          <li>Copy a single UUID or the whole list, one per line.</li>
        </ol>
      </ToolSection>

      <ToolSection title="UUID example">
        <p>
          A UUID v4 looks like this: <code>3f2b8c9e-1a4d-4f6b-9c2e-7d5a1b8e4f03</code>. The <strong>4</strong> at the
          start of the third group is the version, and the first digit of the fourth group (8, 9, a or b) is the variant.
        </p>
      </ToolSection>

      <div className="rounded-lg border border-border bg-muted/60 p-4 text-sm leading-6 text-muted-foreground">
        <strong className="text-foreground">Secure and local:</strong> UUIDs are generated in your browser with{" "}
        <code className="font-mono">crypto.getRandomValues</code>, the system&apos;s cryptographic random generator.
        Nothing is sent to a server.
      </div>
    </>
  ),
};

function clampQuantity(value: string) {
  const parsed = Number.parseInt(value, 10);
  return Number.isNaN(parsed) ? 1 : Math.min(Math.max(parsed, 1), MAX_QUANTITY);
}

export default function UuidGenerator() {
  const copy = useCopy({ pt, en });
  const [isV4, setIsV4] = useState(true);
  const [quantity, setQuantity] = useState("5");
  const [uppercase, setUppercase] = useState(false);
  const [hyphens, setHyphens] = useState(true);
  const [uuids, setUuids] = useState<string[]>([]);

  const version: UuidVersion = isV4 ? "v4" : "v7";

  const regenerate = useCallback(() => {
    const count = clampQuantity(quantity);
    const now = Date.now();
    const list = Array.from({ length: count }, () => generateUuid(version, now));
    setUuids(version === "v7" ? list.sort() : list);
  }, [quantity, version]);

  useEffect(() => {
    regenerate();
  }, [regenerate]);

  const formatted = uuids.map((uuid) => formatUuid(uuid, { uppercase, hyphens }));

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">{copy.title}</h1>
        <p className="mt-3 max-w-prose text-base leading-7 text-muted-foreground">{copy.intro}</p>
      </div>

      <div className="rounded-lg border border-border bg-card p-5 sm:p-6 space-y-5 shadow-xs">
        <div className="grid gap-5 sm:grid-cols-2">
          <OptionToggle label={copy.versionLabel} value={isV4} onChange={setIsV4} trueLabel="UUID v4" falseLabel="UUID v7" />
          <Field label={copy.quantityLabel} hint={copy.quantityHint}>
            {(id) => (
              <Input
                id={id}
                type="number"
                min={1}
                max={MAX_QUANTITY}
                inputMode="numeric"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
              />
            )}
          </Field>
        </div>
        <div className="flex flex-wrap gap-x-6 gap-y-3">
          <label className="flex items-center gap-3 text-sm text-foreground">
            <Switch checked={uppercase} onCheckedChange={setUppercase} />
            {copy.uppercase}
          </label>
          <label className="flex items-center gap-3 text-sm text-foreground">
            <Switch checked={hyphens} onCheckedChange={setHyphens} />
            {copy.hyphens}
          </label>
        </div>
        <Button onClick={regenerate}>
          <RefreshCw className="h-4 w-4" /> {copy.generate}
        </Button>
      </div>

      {formatted.length > 0 && (
        <div className="rounded-lg border border-primary/20 bg-primary/5 p-5 space-y-3">
          <div className="flex items-center justify-between gap-3">
            <p className="text-sm font-medium text-muted-foreground">{copy.result(formatted.length)}</p>
            <CopyButton value={formatted.join("\n")} label={formatted.length > 1 ? copy.copyAll : undefined} />
          </div>
          <ul className="max-h-[420px] overflow-auto space-y-1 font-mono text-sm text-foreground">
            {formatted.map((uuid, i) => (
              <li key={i} className="break-all">
                {uuid}
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="space-y-8 border-t border-border pt-10">
        {copy.content}
        <ToolFaq toolId="gerador-de-uuid" />
        <RelatedTools ids={["gerador-de-hash", "gerador-de-senha", "converter-timestamp", "gerar-numeros"]} />
      </div>
    </div>
  );
}
