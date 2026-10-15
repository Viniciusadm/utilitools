import { useCallback, useState } from "react";
import { DocumentGenerator } from "@/components/document-generator";
import { ToolSection } from "@/components/tool-section";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useCopy } from "@/lib/i18n";
import { generateCPF, formatCPF, CPF_STATES, type CpfState } from "@/lib/cpf";

const ANY_STATE = "any";

const STATE_NAMES_PT: Record<CpfState, string> = {
  AC: "Acre",
  AL: "Alagoas",
  AM: "Amazonas",
  AP: "Amapá",
  BA: "Bahia",
  CE: "Ceará",
  DF: "Distrito Federal",
  ES: "Espírito Santo",
  GO: "Goiás",
  MA: "Maranhão",
  MG: "Minas Gerais",
  MS: "Mato Grosso do Sul",
  MT: "Mato Grosso",
  PA: "Pará",
  PB: "Paraíba",
  PE: "Pernambuco",
  PI: "Piauí",
  PR: "Paraná",
  RJ: "Rio de Janeiro",
  RN: "Rio Grande do Norte",
  RO: "Rondônia",
  RR: "Roraima",
  RS: "Rio Grande do Sul",
  SC: "Santa Catarina",
  SE: "Sergipe",
  SP: "São Paulo",
  TO: "Tocantins",
};

const pt = {
  title: "Gerador de CPF",
  intro:
    "Gerador de CPFs válidos aleatórios. Você pode escolher se quer pontuação ou não e o estado. Basta clicar em gerar e copiar o CPF gerado.",
  resultLabel: "CPF(s) gerado",
  stateLabel: "Estado",
  anyState: "Qualquer",
  stateNames: STATE_NAMES_PT,
  stateDigitsTitle: "Como eu sei de qual estado é o CPF?",
  stateDigitsIntro:
    "O estado de origem do CPF é definido pelo 9º dígito (penúltimo antes dos verificadores). Veja a correspondência:",
  stateDigits: [
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
  ],
  about: (
    <>
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
    </>
  ),
  note: (
    <>
      <strong className="text-foreground">NOTA:</strong> O gerador de CPF fornecido tem exclusivamente propósitos
      educacionais. Os números gerados são aleatórios e seguem as regras matemáticas reais de validação do CPF, porém
      não correspondem a pessoas reais. Não nos responsabilizamos pelo uso indevido desta ferramenta. Em caso de
      problemas, entre em contato.
    </>
  ),
};

const en: typeof pt = {
  title: "CPF Generator",
  intro:
    "Generate random valid Brazilian CPF numbers for software testing. Choose whether you want formatting and which Brazilian state the CPF should belong to, then click generate and copy the result.",
  resultLabel: "Generated CPF(s)",
  stateLabel: "State",
  anyState: "Any",
  stateNames: { ...STATE_NAMES_PT, DF: "Federal District" },
  stateDigitsTitle: "How do I know which state a CPF is from?",
  stateDigitsIntro:
    "The state where a CPF was issued is defined by its 9th digit (the last one before the check digits). Here is the mapping:",
  stateDigits: [
    { digit: 0, states: "Rio Grande do Sul" },
    { digit: 1, states: "Federal District, Goiás, Mato Grosso, Mato Grosso do Sul and Tocantins" },
    { digit: 2, states: "Pará, Amazonas, Acre, Amapá, Rondônia and Roraima" },
    { digit: 3, states: "Ceará, Maranhão and Piauí" },
    { digit: 4, states: "Pernambuco, Rio Grande do Norte, Paraíba and Alagoas" },
    { digit: 5, states: "Bahia and Sergipe" },
    { digit: 6, states: "Minas Gerais" },
    { digit: 7, states: "Rio de Janeiro and Espírito Santo" },
    { digit: 8, states: "São Paulo" },
    { digit: 9, states: "Paraná and Santa Catarina" },
  ],
  about: (
    <>
      <ToolSection title="What is a CPF?">
        <p>
          The CPF (Cadastro de Pessoas Físicas) is the Brazilian individual taxpayer ID, a unique number that identifies
          every person in Brazil. It is required for bank accounts, online purchases, sign-up forms and government
          services, so almost every Brazilian system has a CPF field that needs test data.
        </p>
      </ToolSection>

      <ToolSection title="How does a CPF number work?">
        <p>
          A CPF has 11 digits. The last two are check digits, calculated from the first nine with a specific algorithm
          (weighted sums and modulo 11). That is what makes a number mathematically valid and lets systems catch typos.
        </p>
      </ToolSection>
    </>
  ),
  note: (
    <>
      <strong className="text-foreground">NOTE:</strong> This CPF generator is intended exclusively for educational
      purposes and software testing. The numbers are random and follow the real CPF validation rules, but they do not
      belong to real people. We are not responsible for any misuse of this tool. If you run into any problems, please
      contact us.
    </>
  ),
};

export default function GenerateCPF() {
  const copy = useCopy({ pt, en });
  const [selectedState, setSelectedState] = useState(ANY_STATE);

  const generate = useCallback(
    (punctuated: boolean) => formatCPF(generateCPF(selectedState === ANY_STATE ? "" : selectedState), punctuated),
    [selectedState],
  );

  return (
    <DocumentGenerator
      title={copy.title}
      intro={copy.intro}
      validateToolId="validar-cpf"
      resultLabel={copy.resultLabel}
      generate={generate}
      toolId="gerar-cpf"
      related={["validar-cpf", "gerar-cnpj", "gerar-pis", "gerar-nomes", "gerar-rg", "gerar-rj", "gerar-numeros", "gerar-lorem"]}
      extraControls={
        <div className="space-y-2">
          <Label className="text-sm font-medium text-foreground">{copy.stateLabel}</Label>
          <Select value={selectedState} onValueChange={setSelectedState}>
            <SelectTrigger>
              <SelectValue placeholder={copy.anyState} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={ANY_STATE}>{copy.anyState}</SelectItem>
              {CPF_STATES.map((state) => (
                <SelectItem key={state} value={state}>
                  {copy.stateNames[state]}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      }
    >
      {copy.about}

      <ToolSection title={copy.stateDigitsTitle}>
        <p>{copy.stateDigitsIntro}</p>
        <ul className="!list-none text-sm space-y-1">
          {copy.stateDigits.map(({ digit, states }) => (
            <li key={digit}>
              <strong className="font-medium">{digit}</strong> — {states}
            </li>
          ))}
        </ul>
      </ToolSection>

      <div className="rounded-lg border border-border bg-muted/60 p-4">
        <p className="text-xs text-muted-foreground leading-relaxed">{copy.note}</p>
      </div>
    </DocumentGenerator>
  );
}
