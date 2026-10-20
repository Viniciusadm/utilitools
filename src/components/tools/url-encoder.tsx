import { useMemo, useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { CopyButton } from "@/components/copy-button";
import { Field } from "@/components/form-field";
import { OptionToggle } from "@/components/option-toggle";
import { RelatedTools } from "@/components/related-tools";
import { ToolFaq } from "@/components/tool-faq";
import { ToolSection } from "@/components/tool-section";
import { useCopy } from "@/lib/i18n";

function transformUrl(text: string, encoding: boolean, component: boolean) {
  try {
    if (encoding) return component ? encodeURIComponent(text) : encodeURI(text);
    const spaced = text.replace(/\+/g, " ");
    return component ? decodeURIComponent(spaced) : decodeURI(spaced);
  } catch {
    return null;
  }
}

const pt = {
  title: "URL Encode e Decode Online",
  intro:
    "Codifique e decodifique URLs e parâmetros de query string. Converta espaços, acentos e símbolos para o formato percent-encoding (%20, %C3%A7) e volte ao texto original com um clique.",
  defaultText: "busca=ação rápida & preço=R$ 10,00",
  modeLabel: "Operação",
  encode: "Codificar",
  decode: "Decodificar",
  scopeLabel: "Codificar como",
  component: "Parâmetro",
  fullUrl: "URL completa",
  input: "Texto ou URL",
  result: "Resultado",
  invalid: "Não foi possível decodificar. Há uma sequência % incompleta ou inválida, como %E ou %ZZ.",
  content: (
    <>
      <ToolSection title="O que é URL encoding?">
        <p>
          URLs só aceitam um conjunto limitado de caracteres. Espaços, acentos e símbolos como <code>&amp;</code>,{" "}
          <code>?</code> e <code>#</code> precisam ser convertidos para o formato <strong>percent-encoding</strong>: o
          caractere vira seus bytes em UTF-8, cada um escrito como <code>%</code> seguido de dois dígitos hexadecimais.
          Assim, um espaço vira <code>%20</code> e <code>ç</code> vira <code>%C3%A7</code>.
        </p>
      </ToolSection>

      <ToolSection title="Parâmetro ou URL completa?">
        <ul>
          <li>
            <strong>Parâmetro</strong> (<code>encodeURIComponent</code>): codifica tudo, inclusive <code>/</code>,{" "}
            <code>?</code>, <code>&amp;</code> e <code>=</code>. Use para o valor de um parâmetro da query string.
          </li>
          <li>
            <strong>URL completa</strong> (<code>encodeURI</code>): mantém a estrutura da URL e só codifica o que é
            inválido, como espaços e acentos. Use quando tiver o endereço inteiro.
          </li>
        </ul>
      </ToolSection>

      <ToolSection title="Exemplos de URL encode">
        <ul>
          <li>
            <code>São Paulo</code> → <code>S%C3%A3o%20Paulo</code>
          </li>
          <li>
            <code>a&amp;b=c</code> → <code>a%26b%3Dc</code>
          </li>
          <li>
            <code>100%</code> → <code>100%25</code>
          </li>
        </ul>
      </ToolSection>

      <ToolSection title="E o sinal de mais (+)?">
        <p>
          Em formulários HTML (<code>application/x-www-form-urlencoded</code>), o espaço costuma ser enviado como{" "}
          <code>+</code>. Por isso, ao decodificar, a ferramenta converte <code>+</code> em espaço. Ao codificar, o
          espaço sempre vira <code>%20</code>, que funciona em qualquer parte da URL.
        </p>
      </ToolSection>
    </>
  ),
};

const en: typeof pt = {
  title: "URL Encoder and Decoder",
  intro:
    "Encode and decode URLs and query string parameters. Turn spaces, accented letters and symbols into percent-encoding (%20, %C3%A9) and back to plain text in one click.",
  defaultText: "q=café & crème & price=$10",
  modeLabel: "Operation",
  encode: "Encode",
  decode: "Decode",
  scopeLabel: "Encode as",
  component: "Parameter",
  fullUrl: "Full URL",
  input: "Text or URL",
  result: "Result",
  invalid: "Could not decode. There is an incomplete or invalid % sequence, such as %E or %ZZ.",
  content: (
    <>
      <ToolSection title="What is URL encoding?">
        <p>
          URLs only accept a limited set of characters. Spaces, accented letters and symbols such as <code>&amp;</code>,{" "}
          <code>?</code> and <code>#</code> must be converted to <strong>percent-encoding</strong>: the character is
          turned into its UTF-8 bytes, each written as <code>%</code> followed by two hexadecimal digits. A space becomes{" "}
          <code>%20</code> and <code>é</code> becomes <code>%C3%A9</code>.
        </p>
      </ToolSection>

      <ToolSection title="Parameter or full URL?">
        <ul>
          <li>
            <strong>Parameter</strong> (<code>encodeURIComponent</code>): encodes everything, including <code>/</code>,{" "}
            <code>?</code>, <code>&amp;</code> and <code>=</code>. Use it for a single query string value.
          </li>
          <li>
            <strong>Full URL</strong> (<code>encodeURI</code>): keeps the URL structure and only encodes what is invalid,
            such as spaces and accents. Use it when you have the whole address.
          </li>
        </ul>
      </ToolSection>

      <ToolSection title="URL encoding examples">
        <ul>
          <li>
            <code>New York</code> → <code>New%20York</code>
          </li>
          <li>
            <code>a&amp;b=c</code> → <code>a%26b%3Dc</code>
          </li>
          <li>
            <code>100%</code> → <code>100%25</code>
          </li>
        </ul>
      </ToolSection>

      <ToolSection title="What about the plus sign (+)?">
        <p>
          HTML forms (<code>application/x-www-form-urlencoded</code>) often send spaces as <code>+</code>. That is why the
          decoder turns <code>+</code> into a space. When encoding, a space always becomes <code>%20</code>, which works
          anywhere in a URL.
        </p>
      </ToolSection>
    </>
  ),
};

export default function UrlEncoder() {
  const copy = useCopy({ pt, en });
  const [encoding, setEncoding] = useState(true);
  const [component, setComponent] = useState(true);
  const [input, setInput] = useState(copy.defaultText);

  const output = useMemo(() => (input ? transformUrl(input, encoding, component) : ""), [input, encoding, component]);

  const changeMode = (encode: boolean) => {
    if (encode === encoding) return;
    setEncoding(encode);
    if (output) setInput(output);
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">{copy.title}</h1>
        <p className="mt-3 max-w-prose text-base leading-7 text-muted-foreground">{copy.intro}</p>
      </div>

      <div className="rounded-lg border border-border bg-card p-5 sm:p-6 space-y-5 shadow-xs">
        <div className="grid gap-5 sm:grid-cols-2">
          <OptionToggle
            label={copy.modeLabel}
            value={encoding}
            onChange={changeMode}
            trueLabel={copy.encode}
            falseLabel={copy.decode}
          />
          <OptionToggle
            label={copy.scopeLabel}
            value={component}
            onChange={setComponent}
            trueLabel={copy.component}
            falseLabel={copy.fullUrl}
          />
        </div>
        <Field label={copy.input}>
          {(id) => (
            <Textarea
              id={id}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              rows={4}
              spellCheck={false}
              className="font-mono text-[13px] resize-y"
            />
          )}
        </Field>
      </div>

      {output === null ? (
        <p className="text-sm text-destructive">{copy.invalid}</p>
      ) : (
        output && (
          <div className="rounded-lg border border-primary/20 bg-primary/5 p-5 space-y-3">
            <div className="flex items-center justify-between gap-3">
              <p className="text-sm font-medium text-muted-foreground">{copy.result}</p>
              <CopyButton value={output} />
            </div>
            <p className="whitespace-pre-wrap break-all font-mono text-sm text-foreground">{output}</p>
          </div>
        )
      )}

      <div className="space-y-8 border-t border-border pt-10">
        {copy.content}
        <ToolFaq toolId="codificar-url" />
        <RelatedTools ids={["codificar-base64", "gerador-de-slug", "formatar-json", "remover-acentos"]} />
      </div>
    </div>
  );
}
