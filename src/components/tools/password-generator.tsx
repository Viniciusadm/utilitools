import { useCallback, useEffect, useId, useState } from "react";
import { Copy, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { RelatedTools } from "@/components/related-tools";
import { ToolFaq } from "@/components/tool-faq";
import { toast } from "@/hooks/use-toast";
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

const OPTION_LABELS = [
  { key: "uppercase", label: "Letras maiúsculas (A-Z)" },
  { key: "lowercase", label: "Letras minúsculas (a-z)" },
  { key: "digits", label: "Números (0-9)" },
  { key: "symbols", label: "Símbolos (!@#$%)" },
  { key: "excludeAmbiguous", label: "Evitar caracteres ambíguos (O, 0, l, 1)" },
] as const;

const STRENGTH_STYLES: Record<PasswordStrength, { color: string; width: string }> = {
  "Muito fraca": { color: "bg-destructive", width: "w-1/5" },
  Fraca: { color: "bg-orange-500", width: "w-2/5" },
  Média: { color: "bg-yellow-500", width: "w-3/5" },
  Forte: { color: "bg-emerald-500", width: "w-4/5" },
  "Muito forte": { color: "bg-emerald-600", width: "w-full" },
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
    toast({ title: "Senha copiada!" });
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">Gerador de Senha</h1>
        <p className="mt-3 max-w-prose text-base leading-7 text-muted-foreground">
          Crie senhas fortes e aleatórias em um clique. Escolha o tamanho e quais caracteres usar: letras maiúsculas,
          minúsculas, números e símbolos. A senha é gerada no seu navegador e nunca é enviada para nenhum servidor.
        </p>
      </div>

      <div className="rounded-lg border border-border bg-card p-5 sm:p-6 space-y-6 shadow-xs">
        <div className="space-y-3">
          <output
            aria-live="polite"
            className="block min-h-14 break-all rounded-lg border border-primary/20 bg-primary/5 px-4 py-3 font-mono text-xl font-semibold text-foreground"
          >
            {hasCharset ? password : "Selecione ao menos um tipo de caractere"}
          </output>
          <div className="space-y-1">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Força da senha</span>
              <span className="font-medium text-foreground">{hasCharset ? strength : "—"}</span>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-muted">
              {hasCharset && (
                <div className={cn("h-full rounded-full transition-all", STRENGTH_STYLES[strength].color, STRENGTH_STYLES[strength].width)} />
              )}
            </div>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button onClick={regenerate} disabled={!hasCharset} className="gap-2 px-6">
              <RefreshCw className="h-4 w-4" /> Gerar nova senha
            </Button>
            <Button variant="secondary" onClick={copyPassword} disabled={!password} className="gap-2">
              <Copy className="h-4 w-4" /> Copiar
            </Button>
          </div>
        </div>

        <div className="space-y-2 border-t border-border pt-5">
          <div className="flex justify-between">
            <Label htmlFor={lengthId} className="text-sm font-medium text-foreground">
              Tamanho da senha
            </Label>
            <span className="font-mono text-sm font-semibold text-foreground">{options.length} caracteres</span>
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
          {OPTION_LABELS.map(({ key, label }) => (
            <OptionSwitch key={key} label={label} checked={options[key]} onChange={(value) => updateOption(key, value)} />
          ))}
        </div>
      </div>

      <div className="space-y-8 border-t border-border pt-10">
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

        <ToolFaq segment="gerador-de-senha" />

        <RelatedTools segments={["gerar-numeros", "sorteador-de-nomes", "gerar-nomes", "gerar-cpf"]} />
      </div>
    </div>
  );
}
