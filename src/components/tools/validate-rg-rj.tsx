import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import { CheckCircle, XCircle, ShieldCheck } from "lucide-react";
import { RelatedTools } from "@/components/related-tools";
import { ToolFaq } from "@/components/tool-faq";
import { ToolLink } from "@/components/tool-link";
import { useUiCopy } from "@/i18n/ui";
import { useCopy } from "@/lib/i18n";

function validateRgRjDigits(rg: string): boolean {
  const digits = rg.replace(/\D/g, "");
  if (digits.length !== 9) return false;
  if (/^(\d)\1{8}$/.test(digits)) return false;

  const nums = digits.split("").map(Number);
  const weights = [2, 7, 6, 5, 4, 3, 2, 1];
  let sum = 0;
  for (let i = 0; i < 8; i++) {
    sum += nums[i] * weights[i];
  }
  const remainder = sum % 11;
  const check = remainder < 2 ? 0 : 11 - remainder;
  return nums[8] === check;
}

const pt = {
  title: "Validar RG – IFP RJ",
  intro:
    "Valide números de RG no padrão IFP RJ de forma rápida e gratuita. Digite o RG abaixo e descubra se ele é válido de acordo com a regra de cálculo do dígito verificador.",
  lengthError: "Digite um RG com 9 dígitos",
  content: (
    <>
      <section>
        <h2 className="text-xl font-semibold text-foreground mb-2">O que é RG?</h2>
        <p>
          O RG (Registro Geral) é um documento de identificação civil utilizado no Brasil. Ele é emitido pelos órgãos de
          segurança pública de cada estado e é amplamente utilizado para identificação em diversas situações.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-foreground mb-2">RG IFP RJ</h2>
        <p>
          No estado do Rio de Janeiro, o RG segue o padrão do Instituto Félix Pacheco (IFP RJ), que utiliza um sistema de
          verificação baseado em cálculos matemáticos para validar a autenticidade do número.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-foreground mb-2">Como funciona a validação do RG</h2>
        <p>
          A validação do RG é feita através do cálculo do dígito verificador. Esse dígito é gerado a partir dos números
          anteriores utilizando uma fórmula matemática específica. Se o resultado do cálculo corresponder ao dígito final
          informado, o RG é considerado válido.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-foreground mb-2">Por que validar um RG?</h2>
        <ul className="list-disc list-inside space-y-1">
          <li>Verificar dados em sistemas</li>
          <li>Evitar erros de digitação</li>
          <li>Garantir consistência em cadastros</li>
          <li>Testar aplicações e formulários</li>
        </ul>
      </section>

      <p className="text-sm italic">
        <strong>Nota:</strong> Esta ferramenta valida apenas a estrutura matemática do RG e não verifica se o documento
        existe ou pertence a uma pessoa real.
      </p>
    </>
  ),
};

const en: typeof pt = {
  title: "RG Validator – IFP RJ (Rio de Janeiro)",
  intro:
    "Validate Brazilian RG (state ID card) numbers in the Rio de Janeiro IFP RJ format, quickly and for free. Enter the RG below to check whether it is valid according to the check digit rule.",
  lengthError: "Enter an RG with 9 digits",
  content: (
    <>
      <section>
        <h2 className="text-xl font-semibold text-foreground mb-2">What is an RG?</h2>
        <p>
          The RG (Registro Geral) is Brazil's civil identity card. It is issued by the public security agencies of each
          state and is widely used for identification in many situations.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-foreground mb-2">RG IFP RJ</h2>
        <p>
          In the state of Rio de Janeiro, the RG follows the format of the Instituto Félix Pacheco (IFP RJ), which uses a
          check system based on a mathematical calculation to validate the number.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-foreground mb-2">How RG validation works</h2>
        <p>
          RG validation is based on the check digit. The first 8 digits are multiplied by the weights 2, 7, 6, 5, 4, 3, 2
          and 1, and the remainder of the sum divided by 11 gives the check digit (0 when the remainder is 0 or 1,
          otherwise 11 minus the remainder). If it matches the last digit entered, the RG is considered valid.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-foreground mb-2">Why validate an RG?</h2>
        <ul className="list-disc list-inside space-y-1">
          <li>Check data stored in your systems</li>
          <li>Catch typos</li>
          <li>Keep registration records consistent</li>
          <li>Test applications and forms</li>
        </ul>
      </section>

      <p className="text-sm italic">
        <strong>Note:</strong> This tool only validates the mathematical structure of the RG. It does not check whether the
        document exists or belongs to a real person.
      </p>
    </>
  ),
};

export default function ValidateRGRJ() {
  const copy = useCopy({ pt, en });
  const ui = useUiCopy();
  const [rg, setRg] = useState("");
  const [isValid, setIsValid] = useState<boolean | null>(null);

  const handleValidate = () => {
    const clean = rg.replace(/\D/g, "");
    if (clean.length !== 9) {
      toast({ title: copy.lengthError, variant: "destructive" });
      return;
    }
    setIsValid(validateRgRjDigits(clean));
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">{copy.title}</h1>
        <p className="mt-2 text-muted-foreground">{copy.intro}</p>
        <ToolLink id="gerar-rj" className="text-primary hover:underline text-sm mt-2 inline-block">
          {ui.validator.switchToGenerate}
        </ToolLink>
      </div>

      <div className="space-y-4 rounded-lg border border-border bg-card p-5 sm:p-6 shadow-xs">
        <div className="space-y-2">
          <Label htmlFor="rg-rj-input">RG</Label>
          <Input
            id="rg-rj-input"
            placeholder="00.000.000-0"
            value={rg}
            onChange={(e) => {
              setRg(e.target.value);
              setIsValid(null);
            }}
            maxLength={12}
          />
        </div>

        <Button onClick={handleValidate} className="w-full">
          <ShieldCheck className="mr-2 h-4 w-4" />
          {ui.validator.validate}
        </Button>
      </div>

      <AnimatePresence mode="wait">
        {isValid !== null && (
          <motion.div
            key={String(isValid)}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className={`rounded-lg border p-6 flex items-center gap-3 ${
              isValid
                ? "border-success/30 bg-success/10 text-success"
                : "border-destructive/30 bg-destructive/10 text-destructive"
            }`}
          >
            {isValid ? (
              <>
                <CheckCircle className="h-6 w-6" />
                <span className="text-lg font-semibold">{ui.validator.valid("RG")}</span>
              </>
            ) : (
              <>
                <XCircle className="h-6 w-6" />
                <span className="text-lg font-semibold">{ui.validator.invalid("RG")}</span>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="space-y-6 text-muted-foreground">{copy.content}</div>

      <ToolFaq toolId="validar-rj" />

      <RelatedTools ids={["gerar-rj", "validar-cpf", "validar-cnpj", "validar-rg", "validar-cnh"]} />
    </div>
  );
}
