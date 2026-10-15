
import { useCallback, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import { Copy } from "lucide-react";
import { RelatedTools } from "@/components/related-tools";
import { ToolFaq } from "@/components/tool-faq";
import { useUiCopy } from "@/i18n/ui";
import { useCopy } from "@/lib/i18n";

const pt = {
  title: "Gerador de Números Aleatórios",
  intro:
    "Gere números aleatórios de forma rápida e personalizada. Defina o valor mínimo, o valor máximo e a quantidade de números que deseja gerar. Ideal para sorteios, testes, decisões rápidas e uso em projetos.",
  min: "Mínimo",
  max: "Máximo",
  quantity: "Quantidade",
  generate: "Gerar",
  copy: "Copiar",
  generatedNumbers: "Números gerados",
  content: (
    <>
      <section>
        <h2 className="text-lg font-semibold text-foreground mb-2">O que são números aleatórios?</h2>
        <p className="text-[15px] leading-7 text-muted-foreground">
          Números aleatórios são valores gerados sem um padrão previsível, utilizados em diversas áreas como
          estatística, programação, jogos e sorteios. Eles garantem imparcialidade e variabilidade nos resultados.
        </p>
      </section>

      <section>
        <h2 className="text-lg font-semibold text-foreground mb-2">Como gerar números aleatórios</h2>
        <ol className="text-[15px] leading-7 text-muted-foreground list-decimal list-inside space-y-1">
          <li>Defina o valor mínimo permitido.</li>
          <li>Defina o valor máximo permitido.</li>
          <li>Escolha a quantidade de números desejada.</li>
          <li>Clique em <strong className="text-foreground">Gerar</strong>.</li>
          <li>Copie os números, se necessário.</li>
        </ol>
      </section>

      <section>
        <h2 className="text-lg font-semibold text-foreground mb-2">Para que usar um gerador de números aleatórios?</h2>
        <ul className="text-[15px] leading-7 text-muted-foreground list-disc list-inside space-y-1">
          <li>Realizar sorteios e rifas</li>
          <li>Escolher números de forma imparcial</li>
          <li>Testar sistemas e aplicações</li>
          <li>Criar dados fictícios para desenvolvimento</li>
          <li>Tomar decisões rápidas</li>
        </ul>
      </section>

      <div className="rounded-lg border border-border bg-muted/60 p-4">
        <p className="text-xs text-muted-foreground leading-relaxed">
          <strong className="text-foreground">DICA:</strong> Para resultados mais variados, utilize intervalos
          maiores entre o valor mínimo e máximo.
        </p>
      </div>
    </>
  ),
};

const en: typeof pt = {
  title: "Random Number Generator",
  intro:
    "Generate random numbers quickly and your way. Set the minimum value, the maximum value and how many numbers you want. Great for giveaways, raffles, testing, quick decisions and your own projects.",
  min: "Minimum",
  max: "Maximum",
  quantity: "Quantity",
  generate: "Generate",
  copy: "Copy",
  generatedNumbers: "Generated numbers",
  content: (
    <>
      <section>
        <h2 className="text-lg font-semibold text-foreground mb-2">What are random numbers?</h2>
        <p className="text-[15px] leading-7 text-muted-foreground">
          Random numbers are values generated without a predictable pattern. They are used in many fields, such as
          statistics, programming, games and prize draws, and ensure fair, unbiased results.
        </p>
      </section>

      <section>
        <h2 className="text-lg font-semibold text-foreground mb-2">How to generate random numbers</h2>
        <ol className="text-[15px] leading-7 text-muted-foreground list-decimal list-inside space-y-1">
          <li>Set the minimum allowed value.</li>
          <li>Set the maximum allowed value.</li>
          <li>Choose how many numbers you want.</li>
          <li>Click <strong className="text-foreground">Generate</strong>.</li>
          <li>Copy the numbers if needed.</li>
        </ol>
      </section>

      <section>
        <h2 className="text-lg font-semibold text-foreground mb-2">What can you use a random number generator for?</h2>
        <ul className="text-[15px] leading-7 text-muted-foreground list-disc list-inside space-y-1">
          <li>Running giveaways, raffles and lotteries</li>
          <li>Picking numbers fairly</li>
          <li>Testing systems and applications</li>
          <li>Creating mock data for development</li>
          <li>Making quick decisions</li>
        </ul>
      </section>

      <div className="rounded-lg border border-border bg-muted/60 p-4">
        <p className="text-xs text-muted-foreground leading-relaxed">
          <strong className="text-foreground">TIP:</strong> For more varied results, use a wider range between the
          minimum and maximum values.
        </p>
      </div>
    </>
  ),
};

export default function GenerateRandomNumbers() {
  const copy = useCopy({ pt, en });
  const uiCopy = useUiCopy();
  const [minVal, setMinVal] = useState(1);
  const [maxVal, setMaxVal] = useState(100);
  const [quantity, setQuantity] = useState(1);
  const [results, setResults] = useState<number[]>([]);

  useEffect(() => {
    setResults([Math.floor(Math.random() * 100) + 1]);
  }, []);

  const handleGenerate = useCallback(() => {
    const min = Math.min(minVal, maxVal);
    const max = Math.max(minVal, maxVal);
    const qty = Math.max(1, Math.min(quantity, 1000));
    const nums: number[] = [];
    for (let i = 0; i < qty; i++) {
      nums.push(Math.floor(Math.random() * (max - min + 1)) + min);
    }
    setResults(nums);
  }, [minVal, maxVal, quantity]);

  const handleCopy = () => {
    if (results.length === 0) return;
    navigator.clipboard.writeText(results.join(", "));
    toast({ title: uiCopy.copied });
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">{copy.title}</h1>
        <p className="mt-3 max-w-prose text-base leading-7 text-muted-foreground">{copy.intro}</p>
      </div>

      <div className="rounded-lg border border-border bg-card p-5 sm:p-6 space-y-5 shadow-xs">
        <div className="grid gap-5 sm:grid-cols-3">
          <div className="space-y-2">
            <Label className="text-sm font-medium text-foreground">{copy.min}</Label>
            <Input
              type="number"
              value={minVal}
              onChange={(e) => setMinVal(Number(e.target.value))}
             
            />
          </div>
          <div className="space-y-2">
            <Label className="text-sm font-medium text-foreground">{copy.max}</Label>
            <Input
              type="number"
              value={maxVal}
              onChange={(e) => setMaxVal(Number(e.target.value))}
             
            />
          </div>
          <div className="space-y-2">
            <Label className="text-sm font-medium text-foreground">{copy.quantity}</Label>
            <Input
              type="number"
              min={1}
              max={1000}
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
             
            />
          </div>
        </div>

        <div className="flex flex-wrap gap-3">
          <Button onClick={handleGenerate} className="px-8">{copy.generate}</Button>
          <Button variant="secondary" onClick={handleCopy} className="gap-2">
            <Copy className="h-4 w-4" /> {copy.copy}
          </Button>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {results.length > 0 && (
          <motion.div
            key={results.join(",")}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="rounded-lg border border-primary/20 bg-primary/5 p-5"
          >
            <p className="text-sm font-medium text-muted-foreground mb-2">{copy.generatedNumbers}</p>
            <div className="font-mono text-lg text-foreground flex flex-wrap gap-3">
              {results.map((num, i) => (
                <span key={i} className="font-semibold">{num}</span>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="space-y-8 border-t border-border pt-10">
        {copy.content}

        <ToolFaq toolId="gerar-numeros" />

        <RelatedTools ids={["gerar-cpf", "gerar-cnpj", "gerar-nomes", "sorteador-de-nomes", "gerador-de-senha", "gerar-lorem", "gerar-rg", "gerar-rj"]} />
      </div>
    </div>
  );
}
