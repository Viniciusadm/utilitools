import { useCallback, useState } from "react";
import { DocumentGenerator } from "@/components/document-generator";
import { ToolSection } from "@/components/tool-section";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { generateCPF, formatCPF, CPF_STATE_OPTIONS } from "@/lib/cpf";

const ANY_STATE = "any";

const STATE_DIGITS = [
  { digit: 0, states: "Rio Grande do Sul" },
  { digit: 1, states: "Distrito Federal, Goiás, Mato Grosso, Mato Grosso do Sul e Tocantins" },
  { digit: 2, states: "Pará, Amazonas, Acre, Amapá, Rondônia e Roraima" },
  { digit: 3, states: "Ceará, Maranhão e Piauí" },
  { digit: 4, states: "Pernambuco, Rio Grande do Norte, Paraíba e Alagoas" },
  { digit: 5, states: "Bahia e Sergipe" },
  { digit: 6, states: "Minas Gerais" },
  { digit: 7, states: "Rio de Janeiro e Espírito Santo" },
  { digit: 8, states: "São Paulo" },
  { digit: 9, states: "Paraná e Santa Catarina" },
];

export default function GenerateCPF() {
  const [selectedState, setSelectedState] = useState(ANY_STATE);

  const generate = useCallback(
    (punctuated: boolean) => formatCPF(generateCPF(selectedState === ANY_STATE ? "" : selectedState), punctuated),
    [selectedState],
  );

  return (
    <DocumentGenerator
      title="Gerador de CPF"
      intro="Gerador de CPFs válidos aleatórios. Você pode escolher se quer pontuação ou não e o estado. Basta clicar em gerar e copiar o CPF gerado."
      validateHref="/validar-cpf"
      resultLabel="CPF(s) gerado"
      generate={generate}
      segment="gerar-cpf"
      related={["validar-cpf", "gerar-cnpj", "gerar-pis", "gerar-nomes", "gerar-rg", "gerar-rj", "gerar-numeros", "gerar-lorem"]}
      extraControls={
        <div className="space-y-2">
          <Label className="text-sm font-medium text-foreground">Estado</Label>
          <Select value={selectedState} onValueChange={setSelectedState}>
            <SelectTrigger>
              <SelectValue placeholder="Qualquer" />
            </SelectTrigger>
            <SelectContent>
              {CPF_STATE_OPTIONS.map((e) => (
                <SelectItem key={e.value || ANY_STATE} value={e.value || ANY_STATE}>
                  {e.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      }
    >
      <ToolSection title="O que é CPF?">
        <p>
          O CPF (Cadastro de Pessoas Físicas) é um número único de identificação de pessoas físicas no Brasil. Ele é
          utilizado em diversas transações financeiras, cadastros e serviços do governo.
        </p>
      </ToolSection>

      <ToolSection title="Como funciona o CPF?">
        <p>
          O CPF possui 11 dígitos. Os dois últimos são dígitos verificadores, calculados a partir dos nove primeiros através
          de um algoritmo específico. Isso garante que o número seja válido matematicamente.
        </p>
      </ToolSection>

      <ToolSection title="Como eu sei de qual estado é o CPF?">
        <p>O estado de origem do CPF é definido pelo 9º dígito (penúltimo antes dos verificadores). Veja a correspondência:</p>
        <ul className="!list-none text-sm space-y-1">
          {STATE_DIGITS.map(({ digit, states }) => (
            <li key={digit}>
              <strong className="font-medium">{digit}</strong> — {states}
            </li>
          ))}
        </ul>
      </ToolSection>

      <div className="rounded-lg border border-border bg-muted/60 p-4">
        <p className="text-xs text-muted-foreground leading-relaxed">
          <strong className="text-foreground">NOTA:</strong> O gerador de CPF fornecido tem exclusivamente propósitos
          educacionais. Os números gerados são aleatórios e seguem as regras matemáticas reais de validação do CPF, porém
          não correspondem a pessoas reais. Não nos responsabilizamos pelo uso indevido desta ferramenta. Em caso de
          problemas, entre em contato.
        </p>
      </div>
    </DocumentGenerator>
  );
}
