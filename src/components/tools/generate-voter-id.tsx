import { useCallback, useState } from "react";
import { DocumentGenerator } from "@/components/document-generator";
import { ToolSection } from "@/components/tool-section";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useCopy } from "@/lib/i18n";
import { generateVoterId, VOTER_ID_STATES } from "@/lib/voter-id";

const ANY_STATE = "any";

const pt = {
  title: "Gerador de Título de Eleitor",
  intro:
    "Gere números de título de eleitor válidos para testes de software, escolhendo o estado de emissão. Gere vários de uma vez e copie com um clique.",
  resultLabel: "Título(s) gerado(s)",
  state: "Estado",
  anyState: "Qualquer",
  abroad: "Exterior",
  content: (
    <>
      <ToolSection title="O que é o título de eleitor?">
        <p>
          O título de eleitor é o documento emitido pela Justiça Eleitoral que comprova que o cidadão está apto a votar.
          Hoje ele também está disponível em formato digital pelo aplicativo e-Título.
        </p>
      </ToolSection>

      <ToolSection title="Como é formado o número do título de eleitor">
        <p>
          O número tem 12 dígitos: os 8 primeiros são sequenciais, os 2 seguintes indicam o estado (01 para São Paulo, 02
          para Minas Gerais, 03 para Rio de Janeiro e assim por diante, até 28 para eleitores no exterior) e os 2 últimos
          são dígitos verificadores.
        </p>
        <ol>
          <li>Multiplique os 8 primeiros dígitos pelos pesos 2 a 9 e calcule o resto da divisão por 11. Esse é o primeiro dígito.</li>
          <li>Multiplique os dois dígitos do estado por 7 e 8 e o primeiro dígito por 9, some e calcule o resto por 11. Esse é o segundo dígito.</li>
          <li>Se algum resto for 10, o dígito é 0. Em São Paulo e Minas Gerais, resto 0 vira 1.</li>
        </ol>
      </ToolSection>

      <ToolSection title="Para que usar um gerador de título de eleitor?">
        <ul>
          <li>Testar sistemas de cadastro e formulários</li>
          <li>Validar integrações que recebem o número do título</li>
          <li>Popular bancos de dados de homologação</li>
        </ul>
        <p>
          <strong>Importante:</strong> os números são fictícios e não correspondem a eleitores reais.
        </p>
      </ToolSection>
    </>
  ),
};

const en: typeof pt = {
  title: "Brazilian Voter ID Generator (Título de Eleitor)",
  intro:
    "Generate valid Brazilian voter registration numbers (título de eleitor) for software testing, choosing the issuing state. Generate several at once and copy them with one click.",
  resultLabel: "Generated voter ID(s)",
  state: "State",
  anyState: "Any",
  abroad: "Abroad",
  content: (
    <>
      <ToolSection title="What is the título de eleitor?">
        <p>
          The título de eleitor is the Brazilian voter registration card, issued by the Electoral Courts (Justiça
          Eleitoral) as proof that a citizen is registered to vote. Today it is also available in digital form through the
          e-Título app.
        </p>
      </ToolSection>

      <ToolSection title="How a voter ID number is built">
        <p>
          The number has 12 digits: the first 8 are sequential, the next 2 identify the state (01 for São Paulo, 02 for
          Minas Gerais, 03 for Rio de Janeiro and so on, up to 28 for voters living abroad) and the last 2 are check
          digits.
        </p>
        <ol>
          <li>Multiply the first 8 digits by the weights 2 to 9 and take the remainder of the division by 11. That is the first check digit.</li>
          <li>Multiply the two state digits by 7 and 8 and the first check digit by 9, add them up and take the remainder of the division by 11. That is the second check digit.</li>
          <li>If a remainder is 10, the digit is 0. In São Paulo and Minas Gerais, a remainder of 0 becomes 1.</li>
        </ol>
      </ToolSection>

      <ToolSection title="Why use a voter ID generator?">
        <ul>
          <li>Test registration systems and forms</li>
          <li>Validate integrations that receive the voter ID number</li>
          <li>Seed staging and QA databases</li>
        </ul>
        <p>
          <strong>Important:</strong> the numbers are fictitious and do not belong to real voters.
        </p>
      </ToolSection>
    </>
  ),
};

export default function GenerateVoterId() {
  const copy = useCopy({ pt, en });
  const [stateCode, setStateCode] = useState(ANY_STATE);

  const generate = useCallback(
    (punctuated: boolean) => generateVoterId(stateCode === ANY_STATE ? "" : stateCode, punctuated),
    [stateCode],
  );

  return (
    <DocumentGenerator
      title={copy.title}
      intro={copy.intro}
      validateToolId="validar-titulo-de-eleitor"
      resultLabel={copy.resultLabel}
      generate={generate}
      toolId="gerar-titulo-de-eleitor"
      related={["validar-titulo-de-eleitor", "gerar-cpf", "gerar-pis", "gerar-rg"]}
      extraControls={
        <div className="space-y-2">
          <Label className="text-sm font-medium text-foreground">{copy.state}</Label>
          <Select value={stateCode} onValueChange={setStateCode}>
            <SelectTrigger>
              <SelectValue placeholder={copy.anyState} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={ANY_STATE}>{copy.anyState}</SelectItem>
              {VOTER_ID_STATES.map((state) => (
                <SelectItem key={state.code} value={state.code}>
                  {state.name ?? copy.abroad}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      }
    >
      {copy.content}
    </DocumentGenerator>
  );
}
