import { useCallback, useEffect, useId, useState } from "react";
import { Copy, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { RelatedTools } from "@/components/related-tools";
import { ToolFaq } from "@/components/tool-faq";
import { toast } from "@/hooks/use-toast";
import { useCopy } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import {
  generatePassword,
  passwordEntropyBits,
  passwordStrength,
  type PasswordOptions,
  type PasswordStrength,
} from "@/lib/password";

const MIN_LENGTH = 4;
const MAX_LENGTH = 64;

const OPTION_KEYS = ["uppercase", "lowercase", "digits", "symbols", "excludeAmbiguous"] as const;

type OptionKey = (typeof OPTION_KEYS)[number];

const STRENGTH_STYLES: Record<PasswordStrength, { color: string; width: string }> = {
  veryWeak: { color: "bg-destructive", width: "w-1/5" },
  weak: { color: "bg-orange-500", width: "w-2/5" },
  medium: { color: "bg-yellow-500", width: "w-3/5" },
  strong: { color: "bg-emerald-500", width: "w-4/5" },
  veryStrong: { color: "bg-emerald-600", width: "w-full" },
};

const pt = {
  title: "Gerador de Senha",
  intro:
    "Crie senhas fortes e aleatórias em um clique. Escolha o tamanho e quais caracteres usar: letras maiúsculas, minúsculas, números e símbolos. A senha é gerada no seu navegador e nunca é enviada para nenhum servidor.",
  options: {
    uppercase: "Letras maiúsculas (A-Z)",
    lowercase: "Letras minúsculas (a-z)",
    digits: "Números (0-9)",
    symbols: "Símbolos (!@#$%)",
    excludeAmbiguous: "Evitar caracteres ambíguos (O, 0, l, 1)",
  } satisfies Record<OptionKey, string>,
  strengths: {
    veryWeak: "Muito fraca",
    weak: "Fraca",
    medium: "Média",
    strong: "Forte",
    veryStrong: "Muito forte",
  } satisfies Record<PasswordStrength, string>,
  copied: "Senha copiada!",
  noCharset: "Selecione ao menos um tipo de caractere",
  strengthLabel: "Força da senha",
  regenerate: "Gerar nova senha",
  copy: "Copiar",
  lengthLabel: "Tamanho da senha",
  characters: (n: number) => `${n} caracteres`,
  content: (
    <>
      <section>
        <h2 className="text-lg font-semibold text-foreground mb-2">O que é uma senha forte?</h2>
        <p className="text-[15px] leading-7 text-muted-foreground">
          Uma senha forte é longa, aleatória e mistura diferentes tipos de caracteres. Ela não contém palavras do
          dicionário, nomes, datas de aniversário ou sequências como 123456. Quanto mais longa e variada, mais tempo um
          ataque de força bruta levaria para descobri-la.
        </p>
      </section>

      <section>
        <h2 className="text-lg font-semibold text-foreground mb-2">Como criar uma senha segura</h2>
        <ol className="text-[15px] leading-7 text-muted-foreground list-decimal list-inside space-y-1">
          <li>Escolha um tamanho de pelo menos 12 caracteres.</li>
          <li>Ative letras maiúsculas, minúsculas, números e símbolos.</li>
          <li>
            Clique em <strong className="text-foreground">Gerar nova senha</strong> e copie o resultado.
          </li>
          <li>Guarde a senha em um gerenciador de senhas.</li>
        </ol>
      </section>

      <section>
        <h2 className="text-lg font-semibold text-foreground mb-2">Dicas de segurança</h2>
        <ul className="text-[15px] leading-7 text-muted-foreground list-disc list-inside space-y-1">
          <li>Use uma senha diferente para cada site ou aplicativo</li>
          <li>Ative a verificação em duas etapas sempre que possível</li>
          <li>Troque imediatamente senhas que aparecerem em vazamentos</li>
          <li>Nunca envie senhas por e-mail ou mensagem</li>
        </ul>
      </section>
    </>
  ),
};

const en: typeof pt = {
  title: "Password Generator",
  intro:
    "Create strong, random passwords in one click. Choose the length and which characters to use: uppercase letters, lowercase letters, numbers and symbols. The password is generated in your browser and never sent to any server.",
  options: {
    uppercase: "Uppercase letters (A-Z)",
    lowercase: "Lowercase letters (a-z)",
    digits: "Numbers (0-9)",
    symbols: "Symbols (!@#$%)",
    excludeAmbiguous: "Avoid ambiguous characters (O, 0, l, 1)",
  },
  strengths: {
    veryWeak: "Very weak",
    weak: "Weak",
    medium: "Medium",
    strong: "Strong",
    veryStrong: "Very strong",
  },
  copied: "Password copied!",
  noCharset: "Select at least one character type",
  strengthLabel: "Password strength",
  regenerate: "Generate new password",
  copy: "Copy",
  lengthLabel: "Password length",
  characters: (n: number) => `${n} characters`,
  content: (
    <>
      <section>
        <h2 className="text-lg font-semibold text-foreground mb-2">What is a strong password?</h2>
        <p className="text-[15px] leading-7 text-muted-foreground">
          A strong password is long, random and mixes different types of characters. It contains no dictionary words,
          names, birthdays or sequences like 123456. The longer and more varied it is, the longer a brute-force attack
          would take to crack it.
        </p>
      </section>

      <section>
        <h2 className="text-lg font-semibold text-foreground mb-2">How to create a secure password</h2>
        <ol className="text-[15px] leading-7 text-muted-foreground list-decimal list-inside space-y-1">
          <li>Choose a length of at least 12 characters.</li>
          <li>Turn on uppercase letters, lowercase letters, numbers and symbols.</li>
          <li>
            Click <strong className="text-foreground">Generate new password</strong> and copy the result.
          </li>
          <li>Store the password in a password manager.</li>
        </ol>
      </section>

      <section>
        <h2 className="text-lg font-semibold text-foreground mb-2">Security tips</h2>
        <ul className="text-[15px] leading-7 text-muted-foreground list-disc list-inside space-y-1">
          <li>Use a different password for every website or app</li>
          <li>Turn on two-factor authentication whenever possible</li>
          <li>Change any password that shows up in a data breach right away</li>
          <li>Never send passwords by email or chat</li>
        </ul>
      </section>
    </>
  ),
};

function OptionSwitch({ label, checked, onChange }: { label: string; checked: boolean; onChange: (value: boolean) => void }) {
  const id = useId();
  return (
    <div className="flex items-center justify-between gap-4">
      <Label htmlFor={id} className="text-sm font-normal text-foreground">
        {label}
      </Label>
      <Switch id={id} checked={checked} onCheckedChange={onChange} />
    </div>
  );
}

export default function PasswordGenerator() {
  const copy = useCopy({ pt, en });
  const lengthId = useId();
  const [options, setOptions] = useState<PasswordOptions>({
    length: 16,
    uppercase: true,
    lowercase: true,
    digits: true,
    symbols: true,
    excludeAmbiguous: false,
  });
  const [password, setPassword] = useState("");

  const regenerate = useCallback(() => setPassword(generatePassword(options)), [options]);

  useEffect(() => {
    regenerate();
  }, [regenerate]);

  const updateOption = <K extends keyof PasswordOptions>(key: K, value: PasswordOptions[K]) =>
    setOptions((current) => ({ ...current, [key]: value }));

  const strength = passwordStrength(passwordEntropyBits(options));
  const hasCharset = options.uppercase || options.lowercase || options.digits || options.symbols;

  const copyPassword = async () => {
    if (!password) return;
    await navigator.clipboard.writeText(password);
    toast({ title: copy.copied });
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">{copy.title}</h1>
        <p className="mt-3 max-w-prose text-base leading-7 text-muted-foreground">{copy.intro}</p>
      </div>

      <div className="rounded-lg border border-border bg-card p-5 sm:p-6 space-y-6 shadow-xs">
        <div className="space-y-3">
          <output
            aria-live="polite"
            className="block min-h-14 break-all rounded-lg border border-primary/20 bg-primary/5 px-4 py-3 font-mono text-xl font-semibold text-foreground"
          >
            {hasCharset ? password : copy.noCharset}
          </output>
          <div className="space-y-1">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">{copy.strengthLabel}</span>
              <span className="font-medium text-foreground">{hasCharset ? copy.strengths[strength] : "—"}</span>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-muted">
              {hasCharset && (
                <div className={cn("h-full rounded-full transition-all", STRENGTH_STYLES[strength].color, STRENGTH_STYLES[strength].width)} />
              )}
            </div>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button onClick={regenerate} disabled={!hasCharset} className="gap-2 px-6">
              <RefreshCw className="h-4 w-4" /> {copy.regenerate}
            </Button>
            <Button variant="secondary" onClick={copyPassword} disabled={!password} className="gap-2">
              <Copy className="h-4 w-4" /> {copy.copy}
            </Button>
          </div>
        </div>

        <div className="space-y-2 border-t border-border pt-5">
          <div className="flex justify-between">
            <Label htmlFor={lengthId} className="text-sm font-medium text-foreground">
              {copy.lengthLabel}
            </Label>
            <span className="font-mono text-sm font-semibold text-foreground">{copy.characters(options.length)}</span>
          </div>
          <input
            id={lengthId}
            type="range"
            min={MIN_LENGTH}
            max={MAX_LENGTH}
            value={options.length}
            onChange={(e) => updateOption("length", Number(e.target.value))}
            className="w-full accent-primary"
          />
        </div>

        <div className="space-y-3">
          {OPTION_KEYS.map((key) => (
            <OptionSwitch key={key} label={copy.options[key]} checked={options[key]} onChange={(value) => updateOption(key, value)} />
          ))}
        </div>
      </div>

      <div className="space-y-8 border-t border-border pt-10">
        {copy.content}

        <ToolFaq toolId="gerador-de-senha" />

        <RelatedTools ids={["gerar-numeros", "sorteador-de-nomes", "gerar-nomes", "gerar-cpf"]} />
      </div>
    </div>
  );
}
