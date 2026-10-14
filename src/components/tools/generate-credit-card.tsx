import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RelatedTools } from "@/components/related-tools";
import { ToolFaq } from "@/components/tool-faq";
import { ToolSection } from "@/components/tool-section";
import { toast } from "@/hooks/use-toast";
import { CARD_BRANDS, generateCard, type GeneratedCard } from "@/lib/credit-card";

const MAX_QUANTITY = 50;

export default function GenerateCreditCard() {
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
    toast({ title: "Copiado para a área de transferência" });
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">Gerador de Cartão de Crédito</h1>
        <p className="mt-3 max-w-prose text-base leading-7 text-muted-foreground">
          Gere números de cartão de crédito válidos para testes de software, com bandeira, data de validade e CVV. Os
          números passam no algoritmo de Luhn, mas não são cartões reais e não fazem compras.
        </p>
        <a href="/validar-cartao-de-credito" className="text-primary text-sm hover:underline mt-1 inline-block">
          Deseja validar em vez de gerar?
        </a>
      </div>

      <div className="rounded-lg border border-border bg-card p-5 sm:p-6 space-y-5 shadow-xs">
        <div className="grid gap-5 sm:grid-cols-2">
          <div className="space-y-2">
            <Label className="text-sm font-medium text-foreground">Bandeira</Label>
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
            <Label className="text-sm font-medium text-foreground">Quantidade</Label>
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
            Gerar
          </Button>
          <Button variant="secondary" onClick={handleCopy} className="gap-2">
            <Copy className="h-4 w-4" /> Copiar
          </Button>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {cards.length > 0 && (
          <motion.div
            key={cards.map((c) => c.number).join()}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-x-auto rounded-lg border border-primary/20 bg-primary/5 p-5"
          >
            <table className="w-full min-w-[420px] text-left">
              <thead>
                <tr className="text-xs font-medium text-muted-foreground">
                  <th className="pb-2 font-medium">Bandeira</th>
                  <th className="pb-2 font-medium">Número</th>
                  <th className="pb-2 font-medium">Validade</th>
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
          </motion.div>
        )}
      </AnimatePresence>

      <div className="space-y-8 border-t border-border pt-10">
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

        <ToolFaq segment="gerar-cartao-de-credito" />
        <RelatedTools segments={["validar-cartao-de-credito", "gerar-cpf", "gerar-cnpj", "gerador-de-senha"]} />
      </div>
    </div>
  );
}
