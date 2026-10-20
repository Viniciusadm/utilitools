import { useEffect, useRef, useState, type ReactNode } from "react";
import { Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { OptionToggle } from "@/components/option-toggle";
import { RelatedTools } from "@/components/related-tools";
import { ToolLink } from "@/components/tool-link";
import { ToolFaq } from "@/components/tool-faq";
import { toast } from "@/hooks/use-toast";
import { useUiCopy } from "@/i18n/ui";

const MAX_QUANTITY = 100;

type DocumentGeneratorProps = {
  title: string;
  intro: ReactNode;
  validateToolId: string;
  resultLabel: string;
  generate: (punctuated: boolean) => string;
  supportsPunctuation?: boolean;
  extraControls?: ReactNode;
  toolId: string;
  related: readonly string[];
  children: ReactNode;
};

export function DocumentGenerator({
  title,
  intro,
  validateToolId,
  resultLabel,
  generate,
  supportsPunctuation = true,
  extraControls,
  toolId,
  related,
  children,
}: DocumentGeneratorProps) {
  const copy = useUiCopy();
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
    toast({ title: copy.copied });
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">{title}</h1>
        <p className="mt-3 max-w-prose text-base leading-7 text-muted-foreground">{intro}</p>
        <ToolLink id={validateToolId} className="text-primary text-sm hover:underline mt-1 inline-block">
          {copy.generator.switchToValidate}
        </ToolLink>
      </div>

      <div className="rounded-lg border border-border bg-card p-5 sm:p-6 space-y-5 shadow-xs">
        <div className="grid gap-5 sm:grid-cols-2">
          {supportsPunctuation && (
            <OptionToggle
              label={copy.generator.punctuation}
              value={punctuation}
              onChange={setPunctuation}
              trueLabel={copy.generator.yes}
              falseLabel={copy.generator.no}
            />
          )}
          <OptionToggle
            label={copy.generator.separator}
            value={newlineSeparator}
            onChange={setNewlineSeparator}
            trueLabel={copy.generator.newline}
            falseLabel={copy.generator.comma}
          />
          {extraControls}
          <div className="space-y-2">
            <Label className="text-sm font-medium text-foreground">{copy.generator.quantity}</Label>
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
            {copy.generator.generate}
          </Button>
          <Button variant="secondary" onClick={handleCopy} className="gap-2">
            <Copy className="h-4 w-4" /> {copy.generator.copy}
          </Button>
        </div>
      </div>

      {results.length > 0 && (
        <div className="rounded-lg border border-primary/20 bg-primary/5 p-5">
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
        </div>
      )}

      <div className="space-y-8 border-t border-border pt-10">
        {children}
        <ToolFaq toolId={toolId} />
        <RelatedTools ids={related} />
      </div>
    </div>
  );
}
