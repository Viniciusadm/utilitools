import { useMemo, useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { CopyButton } from "@/components/copy-button";
import { Field } from "@/components/form-field";
import { RelatedTools } from "@/components/related-tools";
import { ToolFaq } from "@/components/tool-faq";
import { ToolSection } from "@/components/tool-section";
import { useCopy } from "@/lib/i18n";
import { formatJson, type JsonIndent } from "@/lib/json";

const SAMPLE_JSON = `{"id":42,"name":"UtiliTools","active":true,"tags":["json","dev"],"owner":{"name":"Ana","email":"ana@example.com"},"score":9.5,"deletedAt":null}`;

const pt = {
  title: "Formatar JSON Online",
  intro:
    "Formate, valide e minifique JSON direto no navegador. Cole o JSON, escolha a indentação e veja o resultado organizado na hora, com o erro apontado por linha e coluna quando o JSON for inválido.",
  inputLabel: "JSON de entrada",
  outputLabel: "Resultado",
  indentLabel: "Indentação",
  indents: { "2": "2 espaços", "4": "4 espaços", tab: "Tab", minify: "Minificar" } satisfies Record<JsonIndent, string>,
  sortKeys: "Ordenar chaves em ordem alfabética",
  valid: "JSON válido",
  invalid: "JSON inválido",
  invalidAt: (line: number, column: number) => `JSON inválido: erro na linha ${line}, coluna ${column}.`,
  invalidHint: "Confira vírgulas sobrando, aspas simples, chaves sem fechar e nomes de propriedade sem aspas.",
  empty: "Cole um JSON para formatar.",
  content: (
    <>
      <ToolSection title="O que é JSON?">
        <p>
          JSON (JavaScript Object Notation) é um formato de texto para troca de dados. É o padrão das APIs REST, de
          arquivos de configuração como <code>package.json</code> e de bancos de dados como MongoDB. Ele aceita objetos
          entre chaves, listas entre colchetes, textos entre aspas duplas, números, <code>true</code>,{" "}
          <code>false</code> e <code>null</code>.
        </p>
      </ToolSection>

      <ToolSection title="Como formatar JSON">
        <ol>
          <li>Cole o JSON no campo de entrada, mesmo que esteja em uma única linha.</li>
          <li>Escolha a indentação: 2 espaços, 4 espaços, tab ou minificado.</li>
          <li>Se quiser, ative a ordenação das chaves para comparar dois JSONs com mais facilidade.</li>
          <li>Copie o resultado. Se houver erro, a ferramenta mostra a linha e a coluna do problema.</li>
        </ol>
      </ToolSection>

      <ToolSection title="Erros comuns que deixam o JSON inválido">
        <ul>
          <li>
            <strong>Vírgula no último item:</strong> <code>{'{"a": 1,}'}</code> não é aceito em JSON.
          </li>
          <li>
            <strong>Aspas simples:</strong> textos e chaves precisam de aspas duplas, como <code>{'"nome"'}</code>.
          </li>
          <li>
            <strong>Chaves sem aspas:</strong> <code>{"{nome: 1}"}</code> é válido em JavaScript, mas não em JSON.
          </li>
          <li>
            <strong>Comentários:</strong> JSON não permite <code>//</code> nem <code>/* */</code>.
          </li>
          <li>
            <strong>Valores especiais:</strong> <code>undefined</code>, <code>NaN</code> e funções não existem em JSON.
          </li>
        </ul>
      </ToolSection>

      <ToolSection title="Formatar ou minificar?">
        <p>
          O JSON formatado (pretty print) é mais fácil de ler e revisar. O JSON minificado remove espaços e quebras de
          linha, o que deixa o arquivo menor para enviar em requisições ou guardar em variáveis de ambiente. Os dois têm
          exatamente os mesmos dados.
        </p>
      </ToolSection>

      <div className="rounded-lg border border-border bg-muted/60 p-4 text-sm leading-6 text-muted-foreground">
        <strong className="text-foreground">Privacidade:</strong> o JSON é processado só no seu navegador. Nada é
        enviado para servidores, então você pode formatar respostas de API e configurações com segurança.
      </div>
    </>
  ),
};

const en: typeof pt = {
  title: "JSON Formatter and Validator",
  intro:
    "Format, validate and minify JSON right in your browser. Paste your JSON, pick the indentation and get clean, readable output instantly, with the exact line and column of any syntax error.",
  inputLabel: "Input JSON",
  outputLabel: "Output",
  indentLabel: "Indentation",
  indents: { "2": "2 spaces", "4": "4 spaces", tab: "Tab", minify: "Minify" },
  sortKeys: "Sort keys alphabetically",
  valid: "Valid JSON",
  invalid: "Invalid JSON",
  invalidAt: (line: number, column: number) => `Invalid JSON: error at line ${line}, column ${column}.`,
  invalidHint: "Look for trailing commas, single quotes, unclosed braces and unquoted property names.",
  empty: "Paste some JSON to format it.",
  content: (
    <>
      <ToolSection title="What is JSON?">
        <p>
          JSON (JavaScript Object Notation) is a text format for exchanging data. It is the standard for REST APIs,
          configuration files such as <code>package.json</code> and document databases such as MongoDB. It supports
          objects in braces, arrays in brackets, double-quoted strings, numbers, <code>true</code>, <code>false</code>{" "}
          and <code>null</code>.
        </p>
      </ToolSection>

      <ToolSection title="How to format JSON">
        <ol>
          <li>Paste your JSON into the input box, even if it is all on a single line.</li>
          <li>Choose the indentation: 2 spaces, 4 spaces, tab or minified.</li>
          <li>Optionally sort the keys, which makes two JSON documents much easier to compare.</li>
          <li>Copy the result. If the JSON is invalid, the tool shows the line and column of the error.</li>
        </ol>
      </ToolSection>

      <ToolSection title="Common errors that make JSON invalid">
        <ul>
          <li>
            <strong>Trailing comma:</strong> <code>{'{"a": 1,}'}</code> is not allowed in JSON.
          </li>
          <li>
            <strong>Single quotes:</strong> strings and keys need double quotes, as in <code>{'"name"'}</code>.
          </li>
          <li>
            <strong>Unquoted keys:</strong> <code>{"{name: 1}"}</code> is valid JavaScript but not valid JSON.
          </li>
          <li>
            <strong>Comments:</strong> JSON does not allow <code>//</code> or <code>/* */</code>.
          </li>
          <li>
            <strong>Special values:</strong> <code>undefined</code>, <code>NaN</code> and functions do not exist in JSON.
          </li>
        </ul>
      </ToolSection>

      <ToolSection title="Beautify or minify?">
        <p>
          Beautified (pretty-printed) JSON is easier to read and review. Minified JSON strips whitespace and line breaks,
          so it is smaller to send in requests or store in environment variables. Both contain exactly the same data.
        </p>
      </ToolSection>

      <div className="rounded-lg border border-border bg-muted/60 p-4 text-sm leading-6 text-muted-foreground">
        <strong className="text-foreground">Privacy:</strong> your JSON is processed only in your browser. Nothing is
        sent to a server, so it is safe to format API responses and configuration files.
      </div>
    </>
  ),
};

const INDENTS: readonly JsonIndent[] = ["2", "4", "tab", "minify"];

export default function JsonFormatter() {
  const copy = useCopy({ pt, en });
  const [input, setInput] = useState(SAMPLE_JSON);
  const [indent, setIndent] = useState<JsonIndent>("2");
  const [sorted, setSorted] = useState(false);

  const result = useMemo(() => (input.trim() ? formatJson(input, indent, sorted) : null), [input, indent, sorted]);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">{copy.title}</h1>
        <p className="mt-3 max-w-prose text-base leading-7 text-muted-foreground">{copy.intro}</p>
      </div>

      <div className="rounded-lg border border-border bg-card p-5 sm:p-6 space-y-5 shadow-xs">
        <Field label={copy.inputLabel}>
          {(id) => (
            <Textarea
              id={id}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              rows={8}
              spellCheck={false}
              className="font-mono text-[13px] resize-y"
            />
          )}
        </Field>

        <div className="flex flex-wrap items-end justify-between gap-4">
          <div className="space-y-2">
            <Label className="text-sm font-medium text-foreground">{copy.indentLabel}</Label>
            <ToggleGroup
              type="single"
              value={indent}
              onValueChange={(value) => value && setIndent(value as JsonIndent)}
              className="flex-wrap justify-start"
            >
              {INDENTS.map((option) => (
                <ToggleGroupItem key={option} value={option} className="text-xs px-3">
                  {copy.indents[option]}
                </ToggleGroupItem>
              ))}
            </ToggleGroup>
          </div>
          <label className="flex items-center gap-3 text-sm text-foreground">
            <Switch checked={sorted} onCheckedChange={setSorted} />
            {copy.sortKeys}
          </label>
        </div>
      </div>

      {!result ? (
        <p className="text-sm text-muted-foreground">{copy.empty}</p>
      ) : result.ok ? (
        <div className="space-y-3">
          <div className="flex items-center justify-between gap-3">
            <p className="text-sm font-medium text-primary">✓ {copy.valid}</p>
            <CopyButton value={result.output} />
          </div>
          <pre
            aria-label={copy.outputLabel}
            className="max-h-[480px] overflow-auto rounded-lg border border-primary/20 bg-primary/5 p-4 font-mono text-[13px] leading-6 text-foreground"
          >
            {result.output}
          </pre>
        </div>
      ) : (
        <div className="rounded-lg border border-destructive/30 bg-destructive/5 p-4 space-y-1">
          <p className="text-sm font-medium text-destructive">
            {result.line !== null && result.column !== null ? copy.invalidAt(result.line, result.column) : copy.invalid}
          </p>
          <p className="text-sm text-muted-foreground">{copy.invalidHint}</p>
        </div>
      )}

      <div className="space-y-8 border-t border-border pt-10">
        {copy.content}
        <ToolFaq toolId="formatar-json" />
        <RelatedTools ids={["codificar-base64", "decodificar-jwt", "codificar-url", "gerador-de-uuid"]} />
      </div>
    </div>
  );
}
