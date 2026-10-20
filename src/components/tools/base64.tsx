import { useMemo, useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { CopyButton } from "@/components/copy-button";
import { Field } from "@/components/form-field";
import { OptionToggle } from "@/components/option-toggle";
import { RelatedTools } from "@/components/related-tools";
import { ToolFaq } from "@/components/tool-faq";
import { ToolSection } from "@/components/tool-section";
import { decodeBase64, encodeBase64 } from "@/lib/base64";
import { useCopy } from "@/lib/i18n";

const pt = {
  title: "Codificar e Decodificar Base64",
  intro:
    "Converta texto para Base64 e Base64 para texto online. A ferramenta trata acentos e emojis corretamente (UTF-8) e também gera Base64 URL-safe, usado em JWT e em parâmetros de URL.",
  defaultText: "Olá, mundo! Codificação Base64 com acentos ✓",
  modeLabel: "Operação",
  encode: "Codificar",
  decode: "Decodificar",
  encodeInput: "Texto",
  decodeInput: "Base64",
  urlSafe: "Base64 URL-safe (troca + e / por - e _, sem =)",
  result: "Resultado",
  invalid: "Base64 inválido. Confira se o texto foi copiado inteiro e se não tem caracteres fora do alfabeto Base64.",
  content: (
    <>
      <ToolSection title="O que é Base64?">
        <p>
          Base64 é uma forma de representar dados binários usando apenas 64 caracteres seguros para texto: letras
          maiúsculas e minúsculas, números, <code>+</code> e <code>/</code>, com <code>=</code> como preenchimento. Ele é
          usado para enviar arquivos e imagens em JSON, em e-mails (MIME), em data URIs e no cabeçalho de autenticação
          HTTP Basic.
        </p>
      </ToolSection>

      <ToolSection title="Como codificar ou decodificar Base64">
        <ol>
          <li>Escolha se quer codificar (texto → Base64) ou decodificar (Base64 → texto).</li>
          <li>Cole ou digite o conteúdo no campo. O resultado aparece na hora.</li>
          <li>Ative o modo URL-safe se o valor for usado em URLs, nomes de arquivo ou tokens JWT.</li>
          <li>Clique em Copiar para levar o resultado para a área de transferência.</li>
        </ol>
      </ToolSection>

      <ToolSection title="Exemplos de Base64">
        <ul>
          <li>
            <code>UtiliTools</code> → <code>VXRpbGlUb29scw==</code>
          </li>
          <li>
            <code>usuario:senha</code> → <code>dXN1YXJpbzpzZW5oYQ==</code> (formato do HTTP Basic Auth)
          </li>
          <li>
            <code>ação</code> → <code>YcOnw6Nv</code> (acentos viram mais de um byte em UTF-8)
          </li>
        </ul>
      </ToolSection>

      <ToolSection title="Base64 não é criptografia">
        <p>
          Qualquer pessoa consegue decodificar um texto em Base64, porque não existe chave nem senha. Ele serve para
          transportar dados, não para protegê-los. Para guardar senhas, use um hash como SHA-256 ou, melhor ainda, um
          algoritmo próprio para senhas como bcrypt ou Argon2.
        </p>
      </ToolSection>
    </>
  ),
};

const en: typeof pt = {
  title: "Base64 Encode and Decode",
  intro:
    "Encode text to Base64 and decode Base64 to text online. Accents and emoji are handled correctly as UTF-8, and you can also produce URL-safe Base64, the variant used in JWTs and URL parameters.",
  defaultText: "Hello, world! Base64 encoding with emoji ✓",
  modeLabel: "Operation",
  encode: "Encode",
  decode: "Decode",
  encodeInput: "Text",
  decodeInput: "Base64",
  urlSafe: "URL-safe Base64 (replaces + and / with - and _, no =)",
  result: "Result",
  invalid: "Invalid Base64. Check that the whole value was copied and that it only uses Base64 characters.",
  content: (
    <>
      <ToolSection title="What is Base64?">
        <p>
          Base64 represents binary data using only 64 text-safe characters: uppercase and lowercase letters, digits,{" "}
          <code>+</code> and <code>/</code>, with <code>=</code> as padding. It is used to embed files and images in JSON,
          in email attachments (MIME), in data URIs and in the HTTP Basic authentication header.
        </p>
      </ToolSection>

      <ToolSection title="How to encode or decode Base64">
        <ol>
          <li>Choose whether to encode (text → Base64) or decode (Base64 → text).</li>
          <li>Paste or type your content. The result updates as you type.</li>
          <li>Turn on URL-safe mode if the value goes into a URL, a file name or a JWT.</li>
          <li>Click Copy to send the result to your clipboard.</li>
        </ol>
      </ToolSection>

      <ToolSection title="Base64 examples">
        <ul>
          <li>
            <code>UtiliTools</code> → <code>VXRpbGlUb29scw==</code>
          </li>
          <li>
            <code>user:password</code> → <code>dXNlcjpwYXNzd29yZA==</code> (the HTTP Basic Auth format)
          </li>
          <li>
            <code>café</code> → <code>Y2Fmw6k=</code> (accented letters take more than one byte in UTF-8)
          </li>
        </ul>
      </ToolSection>

      <ToolSection title="Base64 is not encryption">
        <p>
          Anyone can decode a Base64 string, because there is no key or password involved. It is meant for transporting
          data, not protecting it. To store passwords, use a hash such as SHA-256 or, better, a dedicated password
          algorithm such as bcrypt or Argon2.
        </p>
      </ToolSection>
    </>
  ),
};

export default function Base64Tool() {
  const copy = useCopy({ pt, en });
  const [encoding, setEncoding] = useState(true);
  const [urlSafe, setUrlSafe] = useState(false);
  const [input, setInput] = useState(copy.defaultText);

  const output = useMemo(() => {
    if (!input) return "";
    return encoding ? encodeBase64(input, urlSafe) : decodeBase64(input);
  }, [input, encoding, urlSafe]);

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
        <OptionToggle
          label={copy.modeLabel}
          value={encoding}
          onChange={changeMode}
          trueLabel={copy.encode}
          falseLabel={copy.decode}
        />
        <Field label={encoding ? copy.encodeInput : copy.decodeInput}>
          {(id) => (
            <Textarea
              id={id}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              rows={5}
              spellCheck={false}
              className="font-mono text-[13px] resize-y"
            />
          )}
        </Field>
        {encoding && (
          <label className="flex items-center gap-3 text-sm text-foreground">
            <Switch checked={urlSafe} onCheckedChange={setUrlSafe} />
            {copy.urlSafe}
          </label>
        )}
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
        <ToolFaq toolId="codificar-base64" />
        <RelatedTools ids={["decodificar-jwt", "codificar-url", "gerador-de-hash", "formatar-json"]} />
      </div>
    </div>
  );
}
