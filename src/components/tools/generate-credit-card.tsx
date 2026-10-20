import { useEffect, useState } from "react";
import { Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RelatedTools } from "@/components/related-tools";
import { ToolFaq } from "@/components/tool-faq";
import { ToolLink } from "@/components/tool-link";
import { ToolSection } from "@/components/tool-section";
import { toast } from "@/hooks/use-toast";
import { useUiCopy } from "@/i18n/ui";
import { useCopy } from "@/lib/i18n";
import { CARD_BRANDS, generateCard, type GeneratedCard } from "@/lib/credit-card";

const MAX_QUANTITY = 50;

const pt = {
  title: "Gerador de Cartão de Crédito",
  intro:
    "Gere números de cartão de crédito válidos para testes de software, com bandeira, data de validade e CVV. Os números passam no algoritmo de Luhn, mas não são cartões reais e não fazem compras.",
  brand: "Bandeira",
  number: "Número",
  expiry: "Validade",
  content: (
    <>
      <ToolSection title="Para que serve um gerador de cartão de crédito?">
        <p>
          Desenvolvedores e testadores usam números de cartão válidos para testar formulários de pagamento, máscaras de
          campo, identificação de bandeira e validação no front-end, sem expor dados reais de clientes.
        </p>
        <p>
          <strong>Importante:</strong> os cartões gerados não têm saldo, não estão ligados a nenhum banco e são recusados
          em qualquer compra real. Para testar pagamentos de ponta a ponta, use os números de teste oficiais do seu
          gateway de pagamento.
        </p>
      </ToolSection>

      <ToolSection title="Como é formado o número do cartão">
        <ul>
          <li>
            <strong>BIN:</strong> os primeiros 6 a 8 dígitos identificam a bandeira e o banco emissor. Visa começa com 4,
            Mastercard com 51 a 55 ou 2221 a 2720 e American Express com 34 ou 37.
          </li>
          <li>
            <strong>Número da conta:</strong> os dígitos do meio identificam o cartão.
          </li>
          <li>
            <strong>Dígito verificador:</strong> o último dígito é calculado pelo algoritmo de Luhn.
          </li>
        </ul>
      </ToolSection>

      <ToolSection title="O que é o algoritmo de Luhn?">
        <p>
          É uma fórmula de verificação criada por Hans Peter Luhn, da IBM, em 1954. Da direita para a esquerda, cada
          segundo dígito é dobrado (subtraindo 9 quando passa de 9) e tudo é somado. O número é válido quando a soma é
          múltipla de 10. Ela detecta a maioria dos erros de digitação.
        </p>
      </ToolSection>
    </>
  ),
};

const en: typeof pt = {
  title: "Credit Card Generator",
  intro:
    "Generate valid test credit card numbers for software development, with brand, expiration date and CVV. The numbers pass the Luhn algorithm, but they are not real cards and cannot be used for purchases.",
  brand: "Brand",
  number: "Number",
  expiry: "Expiry",
  content: (
    <>
      <ToolSection title="What is a credit card generator for?">
        <p>
          Developers and QA testers use valid card numbers to test payment forms, input masks, card brand detection and
          front-end validation without exposing real customer data.
        </p>
        <p>
          <strong>Important:</strong> the generated cards have no balance, are not linked to any bank and will be declined
          on any real purchase. For end-to-end payment testing, use the official test card numbers provided by your
          payment gateway.
        </p>
      </ToolSection>

      <ToolSection title="How a card number is structured">
        <ul>
          <li>
            <strong>BIN/IIN:</strong> the first 6 to 8 digits identify the card brand and the issuing bank. Visa starts
            with 4, Mastercard with 51 to 55 or 2221 to 2720, and American Express with 34 or 37.
          </li>
          <li>
            <strong>Account number:</strong> the middle digits identify the individual card.
          </li>
          <li>
            <strong>Check digit:</strong> the last digit is calculated with the Luhn algorithm.
          </li>
        </ul>
      </ToolSection>

      <ToolSection title="What is the Luhn algorithm?">
        <p>
          It is a checksum formula created by Hans Peter Luhn of IBM in 1954. Moving from right to left, every second
          digit is doubled (subtracting 9 when the result is greater than 9) and all digits are added up. The number is
          valid when the total is a multiple of 10. It catches most typing errors.
        </p>
      </ToolSection>
    </>
  ),
};

export default function GenerateCreditCard() {
  const copy = useCopy({ pt, en });
  const ui = useUiCopy();
  const [brandId, setBrandId] = useState("visa");
  const [quantity, setQuantity] = useState(1);
  const [cards, setCards] = useState<GeneratedCard[]>([]);

  useEffect(() => {
    setCards([generateCard("visa", new Date())]);
  }, []);

  const handleGenerate = () => {
    const qty = Math.max(1, Math.min(quantity, MAX_QUANTITY));
    const today = new Date();
    setCards(Array.from({ length: qty }, () => generateCard(brandId, today)));
  };

  const handleCopy = () => {
    if (cards.length === 0) return;
    navigator.clipboard.writeText(cards.map((c) => `${c.number} | ${c.expiry} | ${c.cvv}`).join("\n"));
    toast({ title: ui.copied });
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">{copy.title}</h1>
        <p className="mt-3 max-w-prose text-base leading-7 text-muted-foreground">{copy.intro}</p>
        <ToolLink id="validar-cartao-de-credito" className="text-primary text-sm hover:underline mt-1 inline-block">
          {ui.generator.switchToValidate}
        </ToolLink>
      </div>

      <div className="rounded-lg border border-border bg-card p-5 sm:p-6 space-y-5 shadow-xs">
        <div className="grid gap-5 sm:grid-cols-2">
          <div className="space-y-2">
            <Label className="text-sm font-medium text-foreground">{copy.brand}</Label>
            <Select value={brandId} onValueChange={setBrandId}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {CARD_BRANDS.map((brand) => (
                  <SelectItem key={brand.id} value={brand.id}>
                    {brand.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label className="text-sm font-medium text-foreground">{ui.generator.quantity}</Label>
            <Input
              type="number"
              min={1}
              max={MAX_QUANTITY}
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
            />
          </div>
        </div>

        <div className="flex flex-wrap gap-3">
          <Button onClick={handleGenerate} className="px-8">
            {ui.generator.generate}
          </Button>
          <Button variant="secondary" onClick={handleCopy} className="gap-2">
            <Copy className="h-4 w-4" /> {ui.generator.copy}
          </Button>
        </div>
      </div>

      {cards.length > 0 && (
        <div className="overflow-x-auto rounded-lg border border-primary/20 bg-primary/5 p-5">
          <table className="w-full min-w-[420px] text-left">
            <thead>
              <tr className="text-xs font-medium text-muted-foreground">
                <th className="pb-2 font-medium">{copy.brand}</th>
                <th className="pb-2 font-medium">{copy.number}</th>
                <th className="pb-2 font-medium">{copy.expiry}</th>
                <th className="pb-2 font-medium">CVV</th>
              </tr>
            </thead>
            <tbody className="font-mono text-foreground">
              {cards.map((card, i) => (
                <tr key={i}>
                  <td className="py-1 pr-4 font-sans text-sm text-muted-foreground">{card.brand}</td>
                  <td className="py-1 pr-4 text-lg font-semibold">{card.number}</td>
                  <td className="py-1 pr-4">{card.expiry}</td>
                  <td className="py-1">{card.cvv}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <div className="space-y-8 border-t border-border pt-10">
        {copy.content}
        <ToolFaq toolId="gerar-cartao-de-credito" />
        <RelatedTools ids={["validar-cartao-de-credito", "gerar-cpf", "gerar-cnpj", "gerador-de-senha"]} />
      </div>
    </div>
  );
}
