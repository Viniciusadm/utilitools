import { DocumentValidator } from "@/components/document-validator";
import { ToolSection } from "@/components/tool-section";
import { onlyDigits } from "@/lib/check-digit";
import { validateCard } from "@/lib/credit-card";
import { useCopy } from "@/lib/i18n";

const pt = {
  title: "Validar Cartão de Crédito",
  intro:
    "Verifique se um número de cartão de crédito é válido pelo algoritmo de Luhn e descubra a bandeira: Visa, Mastercard, Elo, American Express, Hipercard ou Diners.",
  documentName: "Cartão",
  brandFound: (name: string) => `Bandeira identificada: ${name}.`,
  brandNotFound: "Bandeira não identificada.",
  passes: "O número passa no algoritmo de Luhn.",
  fails: "O número não passa na verificação.",
  content: (
    <>
      <ToolSection title="Como funciona a validação do cartão">
        <ol>
          <li>Da direita para a esquerda, dobre cada segundo dígito.</li>
          <li>Se o dobro passar de 9, subtraia 9.</li>
          <li>Some todos os dígitos.</li>
          <li>Se a soma for múltipla de 10, o número é válido.</li>
        </ol>
        <p>
          Além disso, a ferramenta confere se a quantidade de dígitos bate com a bandeira identificada pelos primeiros
          números.
        </p>
      </ToolSection>

      <ToolSection title="Como identificar a bandeira do cartão">
        <ul>
          <li>
            <strong>Visa:</strong> começa com 4 (16 dígitos)
          </li>
          <li>
            <strong>Mastercard:</strong> começa com 51 a 55 ou 2221 a 2720 (16 dígitos)
          </li>
          <li>
            <strong>American Express:</strong> começa com 34 ou 37 (15 dígitos)
          </li>
          <li>
            <strong>Elo:</strong> faixas próprias, como 636368, 438935 e 504175 (16 dígitos)
          </li>
          <li>
            <strong>Hipercard:</strong> começa com 606282 (16 dígitos)
          </li>
          <li>
            <strong>Diners Club:</strong> começa com 36, 38 ou 300 a 305 (14 dígitos)
          </li>
        </ul>
      </ToolSection>

      <ToolSection title="A validação é segura?">
        <p>
          Sim. O cálculo é feito no seu navegador e o número não é enviado para nenhum servidor. Ainda assim, evite digitar
          dados completos de cartões reais em sites que você não conhece.
        </p>
      </ToolSection>
    </>
  ),
};

const en: typeof pt = {
  title: "Credit Card Validator",
  intro:
    "Check whether a credit card number is valid with the Luhn algorithm and identify the card brand: Visa, Mastercard, Elo, American Express, Hipercard or Diners Club.",
  documentName: "Card",
  brandFound: (name: string) => `Brand detected: ${name}.`,
  brandNotFound: "Brand not detected.",
  passes: "The number passes the Luhn check.",
  fails: "The number fails the check.",
  content: (
    <>
      <ToolSection title="How credit card validation works">
        <ol>
          <li>Starting from the right, double every second digit.</li>
          <li>If the doubled value is greater than 9, subtract 9.</li>
          <li>Add up all the digits.</li>
          <li>If the total is a multiple of 10, the number is valid.</li>
        </ol>
        <p>The tool also checks whether the number of digits matches the brand identified by the leading digits.</p>
      </ToolSection>

      <ToolSection title="How to identify the card brand">
        <ul>
          <li>
            <strong>Visa:</strong> starts with 4 (16 digits)
          </li>
          <li>
            <strong>Mastercard:</strong> starts with 51 to 55 or 2221 to 2720 (16 digits)
          </li>
          <li>
            <strong>American Express:</strong> starts with 34 or 37 (15 digits)
          </li>
          <li>
            <strong>Elo</strong> (Brazilian brand): its own ranges, such as 636368, 438935 and 504175 (16 digits)
          </li>
          <li>
            <strong>Hipercard</strong> (Brazilian brand): starts with 606282 (16 digits)
          </li>
          <li>
            <strong>Diners Club:</strong> starts with 36, 38 or 300 to 305 (14 digits)
          </li>
        </ul>
      </ToolSection>

      <ToolSection title="Is it safe to validate a card here?">
        <p>
          Yes. The calculation runs in your browser and the number is never sent to any server. Even so, avoid typing full
          details of real cards on websites you do not know.
        </p>
      </ToolSection>
    </>
  ),
};

export default function ValidateCreditCard() {
  const copy = useCopy({ pt, en });

  const validate = (value: string) => {
    const { valid, brand } = validateCard(value);
    const brandText = brand ? copy.brandFound(brand.name) : copy.brandNotFound;
    return { valid, detail: `${brandText} ${valid ? copy.passes : copy.fails}` };
  };

  return (
    <DocumentValidator
      title={copy.title}
      intro={copy.intro}
      generateToolId="gerar-cartao-de-credito"
      documentName={copy.documentName}
      placeholder="0000 0000 0000 0000"
      maxLength={23}
      isComplete={(value) => onlyDigits(value).length >= 12}
      validate={validate}
      toolId="validar-cartao-de-credito"
      related={["gerar-cartao-de-credito", "validar-cpf", "validar-cnpj", "gerador-de-senha"]}
    >
      {copy.content}
    </DocumentValidator>
  );
}
