import { useMemo, useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { CopyButton } from "@/components/copy-button";
import { Field } from "@/components/form-field";
import { RelatedTools } from "@/components/related-tools";
import { ToolFaq } from "@/components/tool-faq";
import { ToolSection } from "@/components/tool-section";
import { useCopy } from "@/lib/i18n";
import { compileRegex, findMatches, MAX_MATCHES, REGEX_FLAGS, splitByMatches, type RegexFlag } from "@/lib/regex";

const DEFAULT_PATTERN = "[\\w.+-]+@([\\w-]+)\\.[\\w.]+";

const pt = {
  title: "Testar Regex Online",
  intro:
    "Teste expressões regulares em tempo real. Veja as ocorrências destacadas no texto, os grupos de captura de cada match e o resultado de uma substituição, usando o mesmo motor de regex do JavaScript.",
  defaultText: "Contatos: ana@empresa.com.br, joao.silva@gmail.com e suporte@utilitools.dev",
  patternLabel: "Expressão regular",
  flagsLabel: "Flags",
  flagNames: {
    g: "g (global)",
    i: "i (ignorar maiúsculas)",
    m: "m (multilinha)",
    s: "s (ponto pega quebra de linha)",
    u: "u (unicode)",
  } satisfies Record<RegexFlag, string>,
  textLabel: "Texto de teste",
  replaceLabel: "Substituir por (opcional)",
  replacePlaceholder: "Use $1, $2 para os grupos",
  highlight: "Ocorrências destacadas",
  matches: (count: number) =>
    count === 0 ? "Nenhuma ocorrência" : count === 1 ? "1 ocorrência" : `${count} ocorrências`,
  limit: `Mostrando as primeiras ${MAX_MATCHES} ocorrências.`,
  matchColumn: "Match",
  positionColumn: "Posição",
  groupsColumn: "Grupos",
  replaced: "Resultado da substituição",
  invalid: "Expressão regular inválida. Confira parênteses, colchetes e barras invertidas.",
  content: (
    <>
      <ToolSection title="O que é regex?">
        <p>
          Regex, ou expressão regular, é um padrão de texto usado para buscar, validar e substituir trechos de uma
          string. Com uma única linha dá para encontrar todos os e-mails de um texto, validar um CEP ou trocar o formato
          de datas. Regex funciona em praticamente todas as linguagens: JavaScript, Python, Java, PHP, Go e também em
          editores como o VS Code.
        </p>
      </ToolSection>

      <ToolSection title="Como testar uma regex">
        <ol>
          <li>Digite a expressão regular sem as barras, como <code>\d+</code>.</li>
          <li>Escolha as flags. A <code>g</code> encontra todas as ocorrências, e não só a primeira.</li>
          <li>Cole o texto de teste. As ocorrências ficam destacadas na hora.</li>
          <li>Se quiser, preencha o campo de substituição para ver o texto final.</li>
        </ol>
      </ToolSection>

      <ToolSection title="Exemplos de regex úteis">
        <ul>
          <li>
            CEP: <code>^\d{"{5}"}-?\d{"{3}"}$</code>
          </li>
          <li>
            CPF formatado: <code>^\d{"{3}"}\.\d{"{3}"}\.\d{"{3}"}-\d{"{2}"}$</code>
          </li>
          <li>
            Data dd/mm/aaaa: <code>^\d{"{2}"}/\d{"{2}"}/\d{"{4}"}$</code>
          </li>
          <li>
            Somente números: <code>^\d+$</code>
          </li>
          <li>
            Espaços duplicados: <code>\s{"{2,}"}</code>
          </li>
        </ul>
      </ToolSection>

      <ToolSection title="Resumo da sintaxe">
        <ul>
          <li>
            <code>.</code> qualquer caractere, <code>\d</code> dígito, <code>\w</code> letra, número ou _,{" "}
            <code>\s</code> espaço
          </li>
          <li>
            <code>*</code> zero ou mais, <code>+</code> um ou mais, <code>?</code> opcional, <code>{"{n,m}"}</code> de n
            a m vezes
          </li>
          <li>
            <code>^</code> início, <code>$</code> fim, <code>[abc]</code> um dos caracteres, <code>(...)</code> grupo de
            captura
          </li>
        </ul>
      </ToolSection>
    </>
  ),
};

const en: typeof pt = {
  title: "Regex Tester",
  intro:
    "Test regular expressions in real time. See matches highlighted in your text, the capture groups of each match and the result of a replacement, using the same regex engine as JavaScript.",
  defaultText: "Contacts: jane@company.com, john.smith@gmail.com and support@utilitools.dev",
  patternLabel: "Regular expression",
  flagsLabel: "Flags",
  flagNames: {
    g: "g (global)",
    i: "i (ignore case)",
    m: "m (multiline)",
    s: "s (dot matches newline)",
    u: "u (unicode)",
  },
  textLabel: "Test string",
  replaceLabel: "Replace with (optional)",
  replacePlaceholder: "Use $1, $2 for groups",
  highlight: "Highlighted matches",
  matches: (count: number) => (count === 0 ? "No matches" : count === 1 ? "1 match" : `${count} matches`),
  limit: `Showing the first ${MAX_MATCHES} matches.`,
  matchColumn: "Match",
  positionColumn: "Index",
  groupsColumn: "Groups",
  replaced: "Replacement result",
  invalid: "Invalid regular expression. Check your parentheses, brackets and backslashes.",
  content: (
    <>
      <ToolSection title="What is regex?">
        <p>
          A regex, or regular expression, is a text pattern used to search, validate and replace parts of a string. A
          single line can find every email address in a document, validate a ZIP code or reformat dates. Regex works in
          almost every language, including JavaScript, Python, Java, PHP and Go, and in editors such as VS Code.
        </p>
      </ToolSection>

      <ToolSection title="How to test a regex">
        <ol>
          <li>Type the regular expression without slashes, such as <code>\d+</code>.</li>
          <li>Pick the flags. The <code>g</code> flag finds every match instead of only the first.</li>
          <li>Paste your test string. Matches are highlighted instantly.</li>
          <li>Optionally fill in the replacement to preview the final text.</li>
        </ol>
      </ToolSection>

      <ToolSection title="Useful regex examples">
        <ul>
          <li>
            US ZIP code: <code>^\d{"{5}"}(-\d{"{4}"})?$</code>
          </li>
          <li>
            Date mm/dd/yyyy: <code>^\d{"{2}"}/\d{"{2}"}/\d{"{4}"}$</code>
          </li>
          <li>
            Hex color: <code>^#([0-9a-fA-F]{"{3}"}){"{1,2}"}$</code>
          </li>
          <li>
            Digits only: <code>^\d+$</code>
          </li>
          <li>
            Repeated spaces: <code>\s{"{2,}"}</code>
          </li>
        </ul>
      </ToolSection>

      <ToolSection title="Syntax cheat sheet">
        <ul>
          <li>
            <code>.</code> any character, <code>\d</code> digit, <code>\w</code> letter, digit or _, <code>\s</code>{" "}
            whitespace
          </li>
          <li>
            <code>*</code> zero or more, <code>+</code> one or more, <code>?</code> optional, <code>{"{n,m}"}</code>{" "}
            between n and m times
          </li>
          <li>
            <code>^</code> start, <code>$</code> end, <code>[abc]</code> one of the characters, <code>(...)</code>{" "}
            capture group
          </li>
        </ul>
      </ToolSection>
    </>
  ),
};

export default function RegexTester() {
  const copy = useCopy({ pt, en });
  const [pattern, setPattern] = useState(DEFAULT_PATTERN);
  const [flags, setFlags] = useState<RegexFlag[]>(["g"]);
  const [text, setText] = useState(copy.defaultText);
  const [replacement, setReplacement] = useState("");

  const regex = useMemo(() => (pattern ? compileRegex(pattern, flags) : null), [pattern, flags]);
  const matches = useMemo(() => (regex ? findMatches(regex, text) : []), [regex, text]);
  const segments = useMemo(() => splitByMatches(text, matches), [text, matches]);
  const replaced = regex && replacement ? text.replace(regex, replacement) : "";

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">{copy.title}</h1>
        <p className="mt-3 max-w-prose text-base leading-7 text-muted-foreground">{copy.intro}</p>
      </div>

      <div className="rounded-lg border border-border bg-card p-5 sm:p-6 space-y-5 shadow-xs">
        <Field label={copy.patternLabel}>
          {(id) => (
            <div className="flex items-center gap-1 font-mono">
              <span className="text-muted-foreground">/</span>
              <Input
                id={id}
                value={pattern}
                onChange={(e) => setPattern(e.target.value)}
                spellCheck={false}
                className="font-mono"
              />
              <span className="text-muted-foreground">/{flags.join("")}</span>
            </div>
          )}
        </Field>
        <div className="space-y-2">
          <Label className="text-sm font-medium text-foreground">{copy.flagsLabel}</Label>
          <ToggleGroup
            type="multiple"
            value={flags}
            onValueChange={(value) => setFlags(REGEX_FLAGS.filter((flag) => value.includes(flag)))}
            className="flex-wrap justify-start"
          >
            {REGEX_FLAGS.map((flag) => (
              <ToggleGroupItem key={flag} value={flag} className="text-xs px-3">
                {copy.flagNames[flag]}
              </ToggleGroupItem>
            ))}
          </ToggleGroup>
        </div>
        <Field label={copy.textLabel}>
          {(id) => (
            <Textarea
              id={id}
              value={text}
              onChange={(e) => setText(e.target.value)}
              rows={5}
              spellCheck={false}
              className="font-mono text-[13px] resize-y"
            />
          )}
        </Field>
        <Field label={copy.replaceLabel}>
          {(id) => (
            <Input
              id={id}
              value={replacement}
              onChange={(e) => setReplacement(e.target.value)}
              placeholder={copy.replacePlaceholder}
              spellCheck={false}
              className="font-mono"
            />
          )}
        </Field>
      </div>

      {pattern && !regex ? (
        <p className="text-sm text-destructive">{copy.invalid}</p>
      ) : (
        regex && (
          <div className="space-y-6">
            <div className="space-y-2">
              <div className="flex items-center justify-between gap-3">
                <h2 className="text-sm font-semibold text-foreground">{copy.highlight}</h2>
                <span className="text-sm text-muted-foreground">{copy.matches(matches.length)}</span>
              </div>
              <p className="whitespace-pre-wrap break-words rounded-lg border border-border bg-card p-4 font-mono text-[13px] leading-6 text-foreground">
                {segments.map((segment, i) =>
                  segment.match ? (
                    <mark key={i} className="rounded bg-primary/20 px-0.5 text-foreground">
                      {segment.text}
                    </mark>
                  ) : (
                    <span key={i}>{segment.text}</span>
                  ),
                )}
              </p>
              {matches.length >= MAX_MATCHES && <p className="text-xs text-muted-foreground">{copy.limit}</p>}
            </div>

            {matches.length > 0 && (
              <div className="overflow-x-auto rounded-lg border border-border">
                <table className="w-full min-w-[420px] text-sm">
                  <thead className="bg-muted/60 text-xs text-muted-foreground">
                    <tr>
                      <th className="px-4 py-2 text-left font-medium">#</th>
                      <th className="px-4 py-2 text-left font-medium">{copy.matchColumn}</th>
                      <th className="px-4 py-2 text-left font-medium">{copy.positionColumn}</th>
                      <th className="px-4 py-2 text-left font-medium">{copy.groupsColumn}</th>
                    </tr>
                  </thead>
                  <tbody className="font-mono text-[13px]">
                    {matches.slice(0, 100).map((match, i) => (
                      <tr key={i} className="border-t border-border">
                        <td className="px-4 py-2 text-muted-foreground">{i + 1}</td>
                        <td className="px-4 py-2 break-all text-foreground">{match.text}</td>
                        <td className="px-4 py-2 text-muted-foreground">{match.index}</td>
                        <td className="px-4 py-2 break-all text-muted-foreground">
                          {match.groups.length > 0
                            ? match.groups.map((group, g) => `$${g + 1}: ${group ?? "—"}`).join("  ")
                            : "—"}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {replaced && (
              <div className="rounded-lg border border-primary/20 bg-primary/5 p-5 space-y-3">
                <div className="flex items-center justify-between gap-3">
                  <h2 className="text-sm font-medium text-muted-foreground">{copy.replaced}</h2>
                  <CopyButton value={replaced} />
                </div>
                <p className="whitespace-pre-wrap break-words font-mono text-[13px] text-foreground">{replaced}</p>
              </div>
            )}
          </div>
        )
      )}

      <div className="space-y-8 border-t border-border pt-10">
        {copy.content}
        <ToolFaq toolId="testar-regex" />
        <RelatedTools ids={["editar-texto", "formatar-json", "gerador-de-slug", "codificar-url"]} />
      </div>
    </div>
  );
}
