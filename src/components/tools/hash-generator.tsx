import { useEffect, useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { CopyButton } from "@/components/copy-button";
import { Field } from "@/components/form-field";
import { RelatedTools } from "@/components/related-tools";
import { ToolFaq } from "@/components/tool-faq";
import { ToolSection } from "@/components/tool-section";
import { HASH_ALGORITHMS, hashText, type HashAlgorithm } from "@/lib/hash";
import { useCopy } from "@/lib/i18n";

const pt = {
  title: "Gerador de Hash MD5, SHA-1 e SHA-256",
  intro:
    "Gere hash MD5, SHA-1, SHA-256, SHA-384 e SHA-512 de qualquer texto, todos ao mesmo tempo. Útil para conferir integridade de arquivos, comparar valores e testar integrações.",
  defaultText: "UtiliTools",
  inputLabel: "Texto",
  uppercase: "Hash em letras maiúsculas",
  unavailable: "Seu navegador não liberou a API de criptografia nesta página. Os hashes SHA precisam de HTTPS.",
  content: (
    <>
      <ToolSection title="O que é hash?">
        <p>
          Uma função de hash transforma qualquer texto em uma sequência de tamanho fixo, chamada de hash ou resumo. O
          mesmo texto sempre gera o mesmo hash, e qualquer mudança mínima, como trocar uma letra, gera um hash
          completamente diferente. Não dá para voltar do hash para o texto original.
        </p>
      </ToolSection>

      <ToolSection title="Diferença entre MD5, SHA-1 e SHA-256">
        <ul>
          <li>
            <strong>MD5</strong> (128 bits, 32 caracteres): rápido e ainda comum em checksums de download, mas inseguro
            contra colisões. Não use para segurança.
          </li>
          <li>
            <strong>SHA-1</strong> (160 bits, 40 caracteres): usado no Git e em sistemas antigos. Também tem colisões
            conhecidas.
          </li>
          <li>
            <strong>SHA-256</strong> (256 bits, 64 caracteres): padrão atual para assinaturas, certificados, blockchain e
            verificação de integridade.
          </li>
          <li>
            <strong>SHA-384 e SHA-512</strong>: da mesma família SHA-2, com resumos maiores.
          </li>
        </ul>
      </ToolSection>

      <ToolSection title="Como gerar um hash">
        <ol>
          <li>Digite ou cole o texto no campo.</li>
          <li>Os hashes MD5, SHA-1, SHA-256, SHA-384 e SHA-512 aparecem na hora.</li>
          <li>Clique em Copiar ao lado do algoritmo que você precisa.</li>
        </ol>
      </ToolSection>

      <ToolSection title="Exemplo de hash">
        <p>
          O texto <code>abc</code> tem MD5 <code>900150983cd24fb0d6963f7d28e17f72</code> e SHA-256{" "}
          <code className="break-all">ba7816bf8f01cfea414140de5dae2223b00361a396177a9cb410ff61f20015ad</code>. Use
          esses valores para conferir se outra ferramenta está calculando certo.
        </p>
      </ToolSection>

      <div className="rounded-lg border border-border bg-muted/60 p-4 text-sm leading-6 text-muted-foreground">
        <strong className="text-foreground">Dica:</strong> para guardar senhas, não use MD5 nem SHA puro. Prefira
        algoritmos lentos e com salt, como bcrypt, scrypt ou Argon2.
      </div>
    </>
  ),
};

const en: typeof pt = {
  title: "MD5, SHA-1 and SHA-256 Hash Generator",
  intro:
    "Generate MD5, SHA-1, SHA-256, SHA-384 and SHA-512 hashes of any text, all at once. Handy for checking file integrity, comparing values and testing integrations.",
  defaultText: "UtiliTools",
  inputLabel: "Text",
  uppercase: "Uppercase hash",
  unavailable: "Your browser blocked the Web Crypto API on this page. SHA hashes require HTTPS.",
  content: (
    <>
      <ToolSection title="What is a hash?">
        <p>
          A hash function turns any text into a fixed-length string called a hash or digest. The same input always
          produces the same hash, and the smallest change, such as a single letter, produces a completely different one.
          You cannot turn a hash back into the original text.
        </p>
      </ToolSection>

      <ToolSection title="MD5 vs SHA-1 vs SHA-256">
        <ul>
          <li>
            <strong>MD5</strong> (128 bits, 32 characters): fast and still common for download checksums, but broken
            against collisions. Do not use it for security.
          </li>
          <li>
            <strong>SHA-1</strong> (160 bits, 40 characters): used by Git and older systems. It also has known
            collisions.
          </li>
          <li>
            <strong>SHA-256</strong> (256 bits, 64 characters): today&apos;s standard for signatures, certificates,
            blockchains and integrity checks.
          </li>
          <li>
            <strong>SHA-384 and SHA-512</strong>: members of the same SHA-2 family with longer digests.
          </li>
        </ul>
      </ToolSection>

      <ToolSection title="How to generate a hash">
        <ol>
          <li>Type or paste your text.</li>
          <li>The MD5, SHA-1, SHA-256, SHA-384 and SHA-512 hashes appear instantly.</li>
          <li>Click Copy next to the algorithm you need.</li>
        </ol>
      </ToolSection>

      <ToolSection title="Hash example">
        <p>
          The text <code>abc</code> has the MD5 hash <code>900150983cd24fb0d6963f7d28e17f72</code> and the SHA-256 hash{" "}
          <code className="break-all">ba7816bf8f01cfea414140de5dae2223b00361a396177a9cb410ff61f20015ad</code>. Use these
          values to check whether another tool computes hashes correctly.
        </p>
      </ToolSection>

      <div className="rounded-lg border border-border bg-muted/60 p-4 text-sm leading-6 text-muted-foreground">
        <strong className="text-foreground">Tip:</strong> never store passwords with plain MD5 or SHA. Use slow, salted
        algorithms such as bcrypt, scrypt or Argon2.
      </div>
    </>
  ),
};

type Hashes = Partial<Record<HashAlgorithm, string>>;

export default function HashGenerator() {
  const copy = useCopy({ pt, en });
  const [input, setInput] = useState(copy.defaultText);
  const [uppercase, setUppercase] = useState(false);
  const [hashes, setHashes] = useState<Hashes>({});
  const [unavailable, setUnavailable] = useState(false);

  useEffect(() => {
    let cancelled = false;
    Promise.all(HASH_ALGORITHMS.map(async (algorithm) => [algorithm, await hashText(input, algorithm)] as const))
      .then((entries) => {
        if (!cancelled) setHashes(Object.fromEntries(entries));
      })
      .catch(() => {
        if (!cancelled) setUnavailable(true);
      });
    return () => {
      cancelled = true;
    };
  }, [input]);

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
              rows={4}
              spellCheck={false}
              className="font-mono text-[13px] resize-y"
            />
          )}
        </Field>
        <label className="flex items-center gap-3 text-sm text-foreground">
          <Switch checked={uppercase} onCheckedChange={setUppercase} />
          {copy.uppercase}
        </label>
      </div>

      {unavailable && <p className="text-sm text-destructive">{copy.unavailable}</p>}

      <dl className="space-y-3">
        {HASH_ALGORITHMS.map((algorithm) => {
          const hash = hashes[algorithm] ?? "";
          const value = uppercase ? hash.toUpperCase() : hash;
          return (
            <div key={algorithm} className="rounded-lg border border-border bg-card p-4 space-y-2">
              <div className="flex items-center justify-between gap-3">
                <dt className="text-sm font-semibold text-foreground">{algorithm}</dt>
                <CopyButton value={value} />
              </div>
              <dd className="min-h-5 break-all font-mono text-[13px] text-muted-foreground">{value}</dd>
            </div>
          );
        })}
      </dl>

      <div className="space-y-8 border-t border-border pt-10">
        {copy.content}
        <ToolFaq toolId="gerador-de-hash" />
        <RelatedTools ids={["codificar-base64", "gerador-de-uuid", "gerador-de-senha", "decodificar-jwt"]} />
      </div>
    </div>
  );
}
