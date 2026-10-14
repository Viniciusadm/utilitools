import { useEffect, useRef, useState, type ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RelatedTools } from "@/components/related-tools";
import { ToolFaq } from "@/components/tool-faq";
import { toast } from "@/hooks/use-toast";

const MAX_QUANTITY = 100;

type OptionToggleProps = {
  label: string;
  value: boolean;
  onChange: (value: boolean) => void;
  trueLabel: string;
  falseLabel: string;
};

function OptionToggle({ label, value, onChange, trueLabel, falseLabel }: OptionToggleProps) {
  return (
    <div className="space-y-2">
      <Label className="text-sm font-medium text-foreground">{label}</Label>
      <div className="flex gap-2">
        <Button size="sm" variant={value ? "default" : "secondary"} onClick={() => onChange(true)} className="flex-1">
          {trueLabel}
        </Button>
        <Button size="sm" variant={!value ? "default" : "secondary"} onClick={() => onChange(false)} className="flex-1">
          {falseLabel}
        </Button>
      </div>
    </div>
  );
}

type DocumentGeneratorProps = {
  title: string;
  intro: ReactNode;
  validateHref: string;
  resultLabel: string;
  generate: (punctuated: boolean) => string;
  supportsPunctuation?: boolean;
  extraControls?: ReactNode;
  segment: string;
  related: readonly string[];
  children: ReactNode;
};

export function DocumentGenerator({
  title,
  intro,
  validateHref,
  resultLabel,
  generate,
  supportsPunctuation = true,
  extraControls,
  segment,
  related,
  children,
}: DocumentGeneratorProps) {
  const [punctuation, setPunctuation] = useState(true);
  const [newlineSeparator, setNewlineSeparator] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [results, setResults] = useState<string[]>([]);

  const initialGenerate = useRef(generate);

  useEffect(() => {
    setResults([initialGenerate.current(true)]);
  }, []);

  const handleGenerate = () => {
    const qty = Math.max(1, Math.min(quantity, MAX_QUANTITY));
    setResults(Array.from({ length: qty }, () => generate(punctuation)));
  };

  const separator = newlineSeparator ? "\n" : ", ";

  const handleCopy = () => {
    if (results.length === 0) return;
    navigator.clipboard.writeText(results.join(separator));
    toast({ title: "Copiado para a área de transferência" });
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">{title}</h1>
        <p className="mt-3 max-w-prose text-base leading-7 text-muted-foreground">{intro}</p>
        <a href={validateHref} className="text-primary text-sm hover:underline mt-1 inline-block">
          Deseja validar em vez de gerar?
        </a>
      </div>

      <div className="rounded-lg border border-border bg-card p-5 sm:p-6 space-y-5 shadow-xs">
        <div className="grid gap-5 sm:grid-cols-2">
          {supportsPunctuation && (
            <OptionToggle label="Pontuação?" value={punctuation} onChange={setPunctuation} trueLabel="Sim" falseLabel="Não" />
          )}
          <OptionToggle
            label="Separador"
            value={newlineSeparator}
            onChange={setNewlineSeparator}
            trueLabel="Quebra de linha"
            falseLabel="Vírgula"
          />
          {extraControls}
          <div className="space-y-2">
            <Label className="text-sm font-medium text-foreground">Quantidade</Label>
            <Input
              type="number"
              min={1}
              max={MAX_QUANTITY}
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
            />
          </div>
        </div>

        <div className="flex flex-wrap gap-3">
          <Button onClick={handleGenerate} className="px-8">
            Gerar
          </Button>
          <Button variant="secondary" onClick={handleCopy} className="gap-2">
            <Copy className="h-4 w-4" /> Copiar
          </Button>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {results.length > 0 && (
          <motion.div
            key={`${results.join()}-${newlineSeparator}`}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="rounded-lg border border-primary/20 bg-primary/5 p-5"
          >
            <p className="text-sm font-medium text-muted-foreground mb-2">{resultLabel}</p>
            <div className="font-mono text-lg text-foreground">
              {newlineSeparator ? (
                <div className="space-y-1">
                  {results.map((result, i) => (
                    <div key={i} className="font-semibold">
                      {result}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="font-semibold break-words">{results.join(", ")}</div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="space-y-8 border-t border-border pt-10">
        {children}
        <ToolFaq segment={segment} />
        <RelatedTools segments={related} />
      </div>
    </div>
  );
}
