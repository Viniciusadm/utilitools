import { useCallback, useState } from "react";
import { DocumentGenerator } from "@/components/document-generator";
import { ToolSection } from "@/components/tool-section";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { generateVoterId, VOTER_ID_STATES } from "@/lib/voter-id";

const ANY_STATE = "any";

export default function GenerateVoterId() {
  const [stateCode, setStateCode] = useState(ANY_STATE);

  const generate = useCallback(
    (punctuated: boolean) => generateVoterId(stateCode === ANY_STATE ? "" : stateCode, punctuated),
    [stateCode],
  );

  return (
    <DocumentGenerator
      title="Gerador de Título de Eleitor"
      intro="Gere números de título de eleitor válidos para testes de software, escolhendo o estado de emissão. Gere vários de uma vez e copie com um clique."
      validateHref="/validar-titulo-de-eleitor"
      resultLabel="Título(s) gerado(s)"
      generate={generate}
      segment="gerar-titulo-de-eleitor"
      related={["validar-titulo-de-eleitor", "gerar-cpf", "gerar-pis", "gerar-rg"]}
      extraControls={
        <div className="space-y-2">
          <Label className="text-sm font-medium text-foreground">Estado</Label>
          <Select value={stateCode} onValueChange={setStateCode}>
            <SelectTrigger>
              <SelectValue placeholder="Qualquer" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={ANY_STATE}>Qualquer</SelectItem>
              {VOTER_ID_STATES.map((state) => (
                <SelectItem key={state.code} value={state.code}>
                  {state.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      }
    >
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
    </DocumentGenerator>
  );
}
