import { useId, useState, type ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RelatedTools } from "@/components/related-tools";
import { ToolFaq } from "@/components/tool-faq";

export type ValidationResult = {
  valid: boolean;
  detail?: string;
};

type DocumentValidatorProps = {
  title: string;
  intro: ReactNode;
  generateHref: string;
  documentName: string;
  placeholder: string;
  maxLength: number;
  isComplete: (value: string) => boolean;
  validate: (value: string) => ValidationResult;
  segment: string;
  related: readonly string[];
  children: ReactNode;
};

export function DocumentValidator({
  title,
  intro,
  generateHref,
  documentName,
  placeholder,
  maxLength,
  isComplete,
  validate,
  segment,
  related,
  children,
}: DocumentValidatorProps) {
  const inputId = useId();
  const [value, setValue] = useState("");
  const [result, setResult] = useState<ValidationResult | null>(null);

  const handleValidate = () => {
    if (isComplete(value)) setResult(validate(value));
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">{title}</h1>
        <p className="mt-3 max-w-prose text-base leading-7 text-muted-foreground">{intro}</p>
        <a href={generateHref} className="text-primary text-sm hover:underline mt-1 inline-block">
          Deseja gerar em vez de validar?
        </a>
      </div>

      <form
        className="space-y-5"
        onSubmit={(e) => {
          e.preventDefault();
          handleValidate();
        }}
      >
        <div className="space-y-2 sm:w-80">
          <Label htmlFor={inputId} className="text-sm font-medium text-foreground">
            {documentName}
          </Label>
          <Input
            id={inputId}
            value={value}
            onChange={(e) => {
              setValue(e.target.value.replace(/[^\d .\-/]/g, "").slice(0, maxLength));
              setResult(null);
            }}
            placeholder={placeholder}
            inputMode="numeric"
            className="font-mono"
          />
        </div>
        <Button type="submit" disabled={!isComplete(value)}>
          Validar
        </Button>
      </form>

      <AnimatePresence mode="wait">
        {result && (
          <motion.div
            key={`${result.valid}-${result.detail}`}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            aria-live="polite"
            className={`rounded-lg border p-5 flex items-center gap-3 ${result.valid ? "border-success/30 bg-success/10" : "border-destructive/30 bg-destructive/10"}`}
          >
            {result.valid ? (
              <CheckCircle className="h-5 w-5 text-success shrink-0" />
            ) : (
              <XCircle className="h-5 w-5 text-destructive shrink-0" />
            )}
            <div>
              <p className="text-sm font-semibold text-foreground">
                {documentName} {result.valid ? "válido" : "inválido"}
              </p>
              <p className="text-xs text-muted-foreground">
                {result.detail ??
                  (result.valid
                    ? "O número informado possui dígito verificador correto."
                    : "O número informado não possui dígito verificador válido.")}
              </p>
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
