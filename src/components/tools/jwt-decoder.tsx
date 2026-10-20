import { useEffect, useMemo, useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { CopyButton } from "@/components/copy-button";
import { Field } from "@/components/form-field";
import { RelatedTools } from "@/components/related-tools";
import { ToolFaq } from "@/components/tool-faq";
import { ToolSection } from "@/components/tool-section";
import { INTL_LOCALE, useCopy, useLocale } from "@/lib/i18n";
import { decodeJwt, jwtTimeClaims, type JwtError, type JwtTimeClaim } from "@/lib/jwt";

const SAMPLE_TOKEN = {
  pt: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkFuYSBTb3V6YSIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTczNTY4OTYwMCwiZXhwIjo0MTAyNDQ0ODAwfQ.RptIC1tTd8Q3PRBCuqFtpThAPPhRsfU13zeBdYOCgx0",
  en: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkphbmUgRG9lIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNzM1Njg5NjAwLCJleHAiOjQxMDI0NDQ4MDB9.SVeJGvSn3pRA6BHtJk8jiig6THFcFEHKvL1a_u2b5Tc",
};

const pt = {
  title: "Decodificar JWT Online",
  intro:
    "Cole um token JWT para ver o header, o payload e as datas de emissão e expiração. A decodificação acontece no seu navegador: o token não é enviado para nenhum servidor.",
  tokenLabel: "Token JWT",
  header: "Header",
  payload: "Payload",
  signature: "Assinatura",
  claims: "Datas do token (UTC)",
  claimNames: { iat: "Emitido em (iat)", nbf: "Válido a partir de (nbf)", exp: "Expira em (exp)" } satisfies Record<
    JwtTimeClaim,
    string
  >,
  expired: "Token expirado",
  active: "Token dentro da validade",
  noExpiration: "O token não tem data de expiração (exp).",
  signatureNote: "A assinatura não é verificada. Para isso é preciso a chave secreta ou a chave pública do emissor.",
  errors: {
    segments: "Um JWT tem três partes separadas por pontos: header.payload.assinatura.",
    header: "O header do token não é um JSON válido em Base64URL.",
    payload: "O payload do token não é um JSON válido em Base64URL.",
  } satisfies Record<JwtError, string>,
  content: (
    <>
      <ToolSection title="O que é JWT?">
        <p>
          JWT (JSON Web Token) é um padrão (RFC 7519) para enviar informações assinadas entre sistemas. É muito usado
          em login e autenticação de APIs: depois que o usuário entra, o servidor devolve um token que o aplicativo
          envia no cabeçalho <code>Authorization: Bearer</code> de cada requisição.
        </p>
      </ToolSection>

      <ToolSection title="As três partes de um JWT">
        <ul>
          <li>
            <strong>Header:</strong> o tipo do token e o algoritmo de assinatura, como <code>HS256</code> ou{" "}
            <code>RS256</code>.
          </li>
          <li>
            <strong>Payload:</strong> os dados (claims), como o ID do usuário (<code>sub</code>), a emissão (
            <code>iat</code>) e a expiração (<code>exp</code>).
          </li>
          <li>
            <strong>Assinatura:</strong> garante que o header e o payload não foram alterados.
          </li>
        </ul>
        <p>Header e payload são apenas JSON em Base64URL, por isso qualquer pessoa consegue ler o conteúdo.</p>
      </ToolSection>

      <ToolSection title="Como decodificar um JWT">
        <ol>
          <li>Copie o token, com ou sem o prefixo Bearer.</li>
          <li>Cole no campo acima. O header e o payload aparecem formatados.</li>
          <li>Confira as datas de emissão e expiração convertidas do timestamp Unix.</li>
        </ol>
      </ToolSection>

      <div className="rounded-lg border border-border bg-muted/60 p-4 text-sm leading-6 text-muted-foreground">
        <strong className="text-foreground">Segurança:</strong> nunca coloque senhas ou dados sensíveis no payload de
        um JWT, porque ele não é criptografado. E evite colar tokens de produção em sites que enviam o conteúdo para um
        servidor. Aqui tudo roda localmente.
      </div>
    </>
  ),
};

const en: typeof pt = {
  title: "JWT Decoder",
  intro:
    "Paste a JSON Web Token to see its header, payload and issue and expiration dates. Decoding happens in your browser, so the token is never sent to a server.",
  tokenLabel: "JWT token",
  header: "Header",
  payload: "Payload",
  signature: "Signature",
  claims: "Token dates (UTC)",
  claimNames: { iat: "Issued at (iat)", nbf: "Not before (nbf)", exp: "Expires at (exp)" },
  expired: "Token expired",
  active: "Token not expired",
  noExpiration: "The token has no expiration date (exp).",
  signatureNote: "The signature is not verified. That requires the issuer's secret or public key.",
  errors: {
    segments: "A JWT has three parts separated by dots: header.payload.signature.",
    header: "The token header is not valid Base64URL-encoded JSON.",
    payload: "The token payload is not valid Base64URL-encoded JSON.",
  },
  content: (
    <>
      <ToolSection title="What is a JWT?">
        <p>
          A JWT (JSON Web Token) is a standard (RFC 7519) for passing signed information between systems. It is widely
          used for login and API authentication: after the user signs in, the server returns a token that the app sends
          in the <code>Authorization: Bearer</code> header of every request.
        </p>
      </ToolSection>

      <ToolSection title="The three parts of a JWT">
        <ul>
          <li>
            <strong>Header:</strong> the token type and signing algorithm, such as <code>HS256</code> or{" "}
            <code>RS256</code>.
          </li>
          <li>
            <strong>Payload:</strong> the claims, such as the user ID (<code>sub</code>), issue time (<code>iat</code>)
            and expiration (<code>exp</code>).
          </li>
          <li>
            <strong>Signature:</strong> proves that the header and payload were not tampered with.
          </li>
        </ul>
        <p>The header and payload are just Base64URL-encoded JSON, so anyone can read them.</p>
      </ToolSection>

      <ToolSection title="How to decode a JWT">
        <ol>
          <li>Copy the token, with or without the Bearer prefix.</li>
          <li>Paste it above. The header and payload appear formatted.</li>
          <li>Check the issue and expiration dates converted from Unix timestamps.</li>
        </ol>
      </ToolSection>

      <div className="rounded-lg border border-border bg-muted/60 p-4 text-sm leading-6 text-muted-foreground">
        <strong className="text-foreground">Security:</strong> never put passwords or sensitive data in a JWT payload,
        because it is not encrypted. And avoid pasting production tokens into sites that send them to a server.
        Everything here runs locally.
      </div>
    </>
  ),
};

function JsonBlock({ title, value }: { title: string; value: string }) {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between gap-3">
        <h2 className="text-sm font-semibold text-foreground">{title}</h2>
        <CopyButton value={value} />
      </div>
      <pre className="overflow-auto rounded-lg border border-primary/20 bg-primary/5 p-4 font-mono text-[13px] leading-6 text-foreground">
        {value}
      </pre>
    </div>
  );
}

export default function JwtDecoder() {
  const copy = useCopy({ pt, en });
  const locale = useLocale();
  const [token, setToken] = useState(SAMPLE_TOKEN[locale]);
  const [now, setNow] = useState<number | null>(null);

  useEffect(() => {
    setNow(Date.now());
  }, [token]);

  const result = useMemo(() => (token.trim() ? decodeJwt(token) : null), [token]);

  const dateFormat = useMemo(
    () => new Intl.DateTimeFormat(INTL_LOCALE[locale], { dateStyle: "long", timeStyle: "medium", timeZone: "UTC" }),
    [locale],
  );

  const claims = result?.ok ? jwtTimeClaims(result.jwt.payload) : [];
  const expiration = claims.find(({ claim }) => claim === "exp");

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">{copy.title}</h1>
        <p className="mt-3 max-w-prose text-base leading-7 text-muted-foreground">{copy.intro}</p>
      </div>

      <div className="rounded-lg border border-border bg-card p-5 sm:p-6 shadow-xs">
        <Field label={copy.tokenLabel}>
          {(id) => (
            <Textarea
              id={id}
              value={token}
              onChange={(e) => setToken(e.target.value)}
              rows={5}
              spellCheck={false}
              className="break-all font-mono text-[13px] resize-y"
            />
          )}
        </Field>
      </div>

      {result && !result.ok && <p className="text-sm text-destructive">{copy.errors[result.error]}</p>}

      {result?.ok && (
        <div className="space-y-6">
          {now !== null && (
            <p
              className={
                expiration && expiration.date.getTime() < now
                  ? "text-sm font-medium text-destructive"
                  : "text-sm font-medium text-primary"
              }
            >
              {!expiration ? copy.noExpiration : expiration.date.getTime() < now ? copy.expired : `✓ ${copy.active}`}
            </p>
          )}

          <div className="grid gap-6 lg:grid-cols-2">
            <JsonBlock title={copy.header} value={JSON.stringify(result.jwt.header, null, 2)} />
            <JsonBlock title={copy.payload} value={JSON.stringify(result.jwt.payload, null, 2)} />
          </div>

          {claims.length > 0 && (
            <div className="space-y-2">
              <h2 className="text-sm font-semibold text-foreground">{copy.claims}</h2>
              <dl className="grid gap-3 sm:grid-cols-3">
                {claims.map(({ claim, date }) => (
                  <div key={claim} className="rounded-lg border border-border bg-card p-4">
                    <dt className="text-xs font-medium text-muted-foreground">{copy.claimNames[claim]}</dt>
                    <dd className="mt-1 text-sm font-semibold text-foreground">{dateFormat.format(date)}</dd>
                  </div>
                ))}
              </dl>
            </div>
          )}

          <div className="space-y-2">
            <h2 className="text-sm font-semibold text-foreground">{copy.signature}</h2>
            <p className="break-all rounded-lg border border-border bg-card p-4 font-mono text-[13px] text-muted-foreground">
              {result.jwt.signature || "—"}
            </p>
            <p className="text-xs text-muted-foreground">{copy.signatureNote}</p>
          </div>
        </div>
      )}

      <div className="space-y-8 border-t border-border pt-10">
        {copy.content}
        <ToolFaq toolId="decodificar-jwt" />
        <RelatedTools ids={["codificar-base64", "formatar-json", "converter-timestamp", "gerador-de-hash"]} />
      </div>
    </div>
  );
}
