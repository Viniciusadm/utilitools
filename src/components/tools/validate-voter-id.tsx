import { DocumentValidator } from "@/components/document-validator";
import { ToolSection } from "@/components/tool-section";
import { onlyDigits } from "@/lib/check-digit";
import { voterIdState } from "@/lib/voter-id";

function validate(value: string) {
  const state = voterIdState(value);
  return state
    ? { valid: true, detail: `Título emitido em ${state.name}${state.uf === "ZZ" ? "" : ` (${state.uf})`}.` }
    : { valid: false };
}

export default function ValidateVoterId() {
  return (
    <DocumentValidator
      title="Validar Título de Eleitor"
      intro="Verifique se um número de título de eleitor é válido pelo cálculo dos dígitos verificadores e descubra em qual estado ele foi emitido."
      generateHref="/gerar-titulo-de-eleitor"
      documentName="Título de eleitor"
      placeholder="0000 0000 0000"
      maxLength={14}
      isComplete={(value) => onlyDigits(value).length === 12}
      validate={validate}
      segment="validar-titulo-de-eleitor"
      related={["gerar-titulo-de-eleitor", "validar-cpf", "validar-pis", "validar-rg"]}
    >
      <ToolSection title="Como validar o título de eleitor">
        <ol>
          <li>Separe os 8 primeiros dígitos, os 2 dígitos do estado e os 2 dígitos verificadores.</li>
          <li>Multiplique os 8 primeiros dígitos pelos pesos 2 a 9, some e calcule o resto por 11.</li>
          <li>Multiplique os dígitos do estado por 7 e 8 e o primeiro verificador por 9, some e calcule o resto por 11.</li>
          <li>Resto 10 vira 0. Em São Paulo (01) e Minas Gerais (02), resto 0 vira 1.</li>
        </ol>
      </ToolSection>

      <ToolSection title="Como saber o estado do título de eleitor">
        <p>
          O 9º e o 10º dígitos indicam o estado de emissão: 01 é São Paulo, 02 Minas Gerais, 03 Rio de Janeiro, 04 Rio
          Grande do Sul, 05 Bahia, 06 Paraná, 07 Ceará, 08 Pernambuco, 09 Santa Catarina, 10 Goiás, 20 Distrito Federal e
          28 identifica eleitores que votam no exterior.
        </p>
      </ToolSection>

      <ToolSection title="O validador mostra se o título está regular?">
        <p>
          Não. A ferramenta confere apenas se o número é matematicamente válido. Para saber se o título está regular,
          consulte a situação eleitoral no site do TSE ou no aplicativo e-Título.
        </p>
      </ToolSection>
    </DocumentValidator>
  );
}
