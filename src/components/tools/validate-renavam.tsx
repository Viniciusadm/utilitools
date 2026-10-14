import { DocumentValidator } from "@/components/document-validator";
import { ToolSection } from "@/components/tool-section";
import { onlyDigits } from "@/lib/check-digit";
import { isValidRENAVAM } from "@/lib/renavam";

export default function ValidateRENAVAM() {
  return (
    <DocumentValidator
      title="Validar RENAVAM"
      intro="Verifique se um número de RENAVAM é válido pelo cálculo do dígito verificador. Funciona com o formato atual de 11 dígitos e com o antigo de 9."
      generateHref="/gerar-renavam"
      documentName="RENAVAM"
      placeholder="00000000000"
      maxLength={11}
      isComplete={(value) => [9, 11].includes(onlyDigits(value).length)}
      validate={(value) => ({ valid: isValidRENAVAM(value) })}
      segment="validar-renavam"
      related={["gerar-renavam", "validar-cnh", "validar-cpf", "validar-cnpj"]}
    >
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
    </DocumentValidator>
  );
}
