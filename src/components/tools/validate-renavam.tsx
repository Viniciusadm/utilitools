import { DocumentValidator } from "@/components/document-validator";
import { ToolSection } from "@/components/tool-section";
import { onlyDigits } from "@/lib/check-digit";
import { useCopy } from "@/lib/i18n";
import { isValidRENAVAM } from "@/lib/renavam";

const pt = {
  title: "Validar RENAVAM",
  intro:
    "Verifique se um número de RENAVAM é válido pelo cálculo do dígito verificador. Funciona com o formato atual de 11 dígitos e com o antigo de 9.",
  content: (
    <>
      <ToolSection title="Como validar o RENAVAM">
        <ol>
          <li>Se o número tiver 9 dígitos, complete com dois zeros à esquerda.</li>
          <li>Multiplique os 10 primeiros dígitos pelos pesos 3, 2, 9, 8, 7, 6, 5, 4, 3, 2 e some.</li>
          <li>Multiplique a soma por 10 e calcule o resto da divisão por 11. Se der 10, o dígito é 0.</li>
          <li>Compare o resultado com o último dígito do RENAVAM.</li>
        </ol>
      </ToolSection>

      <ToolSection title="Onde encontrar o RENAVAM do veículo">
        <ul>
          <li>No CRLV-e, o documento digital do veículo</li>
          <li>No aplicativo Carteira Digital de Trânsito</li>
          <li>No site do Detran do seu estado</li>
          <li>No antigo CRV, o documento de transferência</li>
        </ul>
      </ToolSection>

      <ToolSection title="Para que validar um RENAVAM?">
        <p>
          A validação evita erros de digitação antes de consultar débitos, pagar IPVA ou licenciamento, contratar seguro ou
          registrar uma transferência. Ela confere apenas se o número é matematicamente válido; a situação do veículo deve
          ser consultada no Detran.
        </p>
      </ToolSection>
    </>
  ),
};

const en: typeof pt = {
  title: "RENAVAM Validator",
  intro:
    "Check whether a Brazilian RENAVAM (national vehicle registration number) is valid by calculating its check digit. Works with the current 11-digit format and the older 9-digit one.",
  content: (
    <>
      <ToolSection title="How to validate a RENAVAM number">
        <ol>
          <li>If the number has 9 digits, pad it with two leading zeros.</li>
          <li>Multiply the first 10 digits by the weights 3, 2, 9, 8, 7, 6, 5, 4, 3, 2 and add them up.</li>
          <li>Multiply the sum by 10 and take the remainder of the division by 11. If it is 10, the digit is 0.</li>
          <li>Compare the result with the last digit of the RENAVAM.</li>
        </ol>
      </ToolSection>

      <ToolSection title="Where to find a vehicle's RENAVAM">
        <ul>
          <li>On the CRLV-e, the digital vehicle registration document</li>
          <li>In the Carteira Digital de Trânsito (Digital Traffic Wallet) app</li>
          <li>On the website of the state traffic department (Detran)</li>
          <li>On the old CRV, the vehicle transfer document</li>
        </ul>
      </ToolSection>

      <ToolSection title="Why validate a RENAVAM?">
        <p>
          Validation catches typos before you look up outstanding fees, pay the IPVA vehicle tax or annual licensing, buy
          insurance or register a transfer. It only checks whether the number is mathematically valid; the vehicle's status
          must be checked with the Detran.
        </p>
      </ToolSection>
    </>
  ),
};

export default function ValidateRENAVAM() {
  const copy = useCopy({ pt, en });
  return (
    <DocumentValidator
      title={copy.title}
      intro={copy.intro}
      generateToolId="gerar-renavam"
      documentName="RENAVAM"
      placeholder="00000000000"
      maxLength={11}
      isComplete={(value) => [9, 11].includes(onlyDigits(value).length)}
      validate={(value) => ({ valid: isValidRENAVAM(value) })}
      toolId="validar-renavam"
      related={["gerar-renavam", "validar-cnh", "validar-cpf", "validar-cnpj"]}
    >
      {copy.content}
    </DocumentValidator>
  );
}
