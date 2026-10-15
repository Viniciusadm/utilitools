import { DocumentValidator } from "@/components/document-validator";
import { ToolSection } from "@/components/tool-section";
import { onlyDigits } from "@/lib/check-digit";
import { useCopy } from "@/lib/i18n";
import { voterIdState, type VoterIdState } from "@/lib/voter-id";

const pt = {
  title: "Validar Título de Eleitor",
  intro:
    "Verifique se um número de título de eleitor é válido pelo cálculo dos dígitos verificadores e descubra em qual estado ele foi emitido.",
  documentName: "Título de eleitor",
  issuedIn: ({ name, uf }: VoterIdState) => (name ? `Título emitido em ${name} (${uf}).` : "Título emitido em Exterior."),
  content: (
    <>
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
    </>
  ),
};

const en: typeof pt = {
  title: "Brazilian Voter ID Validator (Título de Eleitor)",
  intro:
    "Check whether a Brazilian voter registration number (título de eleitor) is valid by calculating its check digits, and find out which state issued it.",
  documentName: "Voter ID",
  issuedIn: ({ name, uf }: VoterIdState) => (name ? `Voter ID issued in ${name} (${uf}).` : "Voter ID issued abroad."),
  content: (
    <>
      <ToolSection title="How to validate a voter ID">
        <ol>
          <li>Split the number into the first 8 digits, the 2 state digits and the 2 check digits.</li>
          <li>Multiply the first 8 digits by the weights 2 to 9, add them up and take the remainder of the division by 11.</li>
          <li>Multiply the state digits by 7 and 8 and the first check digit by 9, add them up and take the remainder of the division by 11.</li>
          <li>A remainder of 10 becomes 0. In São Paulo (01) and Minas Gerais (02), a remainder of 0 becomes 1.</li>
        </ol>
      </ToolSection>

      <ToolSection title="How to tell which state issued a voter ID">
        <p>
          The 9th and 10th digits identify the issuing state: 01 is São Paulo, 02 Minas Gerais, 03 Rio de Janeiro, 04 Rio
          Grande do Sul, 05 Bahia, 06 Paraná, 07 Ceará, 08 Pernambuco, 09 Santa Catarina, 10 Goiás, 20 Distrito Federal
          (Brasília), and 28 identifies voters registered abroad.
        </p>
      </ToolSection>

      <ToolSection title="Does the validator show whether the voter registration is in good standing?">
        <p>
          No. The tool only checks whether the number is mathematically valid. To check a voter's registration status, use
          the TSE (Superior Electoral Court) website or the e-Título app.
        </p>
      </ToolSection>
    </>
  ),
};

export default function ValidateVoterId() {
  const copy = useCopy({ pt, en });

  const validate = (value: string) => {
    const state = voterIdState(value);
    return state ? { valid: true, detail: copy.issuedIn(state) } : { valid: false };
  };

  return (
    <DocumentValidator
      title={copy.title}
      intro={copy.intro}
      generateToolId="gerar-titulo-de-eleitor"
      documentName={copy.documentName}
      placeholder="0000 0000 0000"
      maxLength={14}
      isComplete={(value) => onlyDigits(value).length === 12}
      validate={validate}
      toolId="validar-titulo-de-eleitor"
      related={["gerar-titulo-de-eleitor", "validar-cpf", "validar-pis", "validar-rg"]}
    >
      {copy.content}
    </DocumentValidator>
  );
}
