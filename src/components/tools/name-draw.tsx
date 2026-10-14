import { useId, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Copy, Trophy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { RelatedTools } from "@/components/related-tools";
import { ToolFaq } from "@/components/tool-faq";
import { toast } from "@/hooks/use-toast";
import { secureShuffle } from "@/lib/random";

function parseNames(text: string, removeDuplicates: boolean) {
  const names = text
    .split("\n")
    .map((name) => name.trim())
    .filter(Boolean);
  if (!removeDuplicates) return names;
  const seen = new Set<string>();
  return names.filter((name) => {
    const key = name.toLocaleLowerCase("pt-BR");
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

export default function NameDraw() {
  const namesId = useId();
  const quantityId = useId();
  const duplicatesId = useId();
  const [text, setText] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [removeDuplicates, setRemoveDuplicates] = useState(true);
  const [winners, setWinners] = useState<string[]>([]);
  const [drawCount, setDrawCount] = useState(0);

  const names = useMemo(() => parseNames(text, removeDuplicates), [text, removeDuplicates]);

  const handleDraw = () => {
    if (names.length === 0) return;
    const count = Math.max(1, Math.min(quantity, names.length));
    setWinners(secureShuffle(names).slice(0, count));
    setDrawCount((n) => n + 1);
  };

  const copyWinners = async () => {
    if (winners.length === 0) return;
    await navigator.clipboard.writeText(winners.map((name, i) => `${i + 1}. ${name}`).join("\n"));
    toast({ title: "Resultado copiado!" });
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">Sorteador de Nomes</h1>
        <p className="mt-3 max-w-prose text-base leading-7 text-muted-foreground">
          Sorteie nomes online de forma justa e aleatória. Cole a lista de participantes, escolha quantos nomes sortear e
          clique em Sortear. Ideal para sorteios no Instagram, amigo secreto, rifas, brindes e para definir a ordem de
          apresentações.
        </p>
      </div>

      <div className="rounded-lg border border-border bg-card p-5 sm:p-6 space-y-5 shadow-xs">
        <div className="space-y-2">
          <div className="flex justify-between">
            <Label htmlFor={namesId} className="text-sm font-medium text-foreground">
              Participantes (um por linha)
            </Label>
            <span className="text-sm text-muted-foreground">
              {names.length} {names.length === 1 ? "participante" : "participantes"}
            </span>
          </div>
          <Textarea
            id={namesId}
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder={"Ana\nBruno\nCarla\nDiego"}
            className="min-h-[180px] text-base"
          />
        </div>

        <div className="grid gap-5 sm:grid-cols-2 sm:items-end">
          <div className="space-y-2">
            <Label htmlFor={quantityId} className="text-sm font-medium text-foreground">
              Quantidade de sorteados
            </Label>
            <Input
              id={quantityId}
              type="number"
              min={1}
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
            />
          </div>
          <div className="flex h-10 items-center justify-between gap-4">
            <Label htmlFor={duplicatesId} className="text-sm font-normal text-foreground">
              Remover nomes repetidos
            </Label>
            <Switch id={duplicatesId} checked={removeDuplicates} onCheckedChange={setRemoveDuplicates} />
          </div>
        </div>

        <div className="flex flex-wrap gap-3">
          <Button onClick={handleDraw} disabled={names.length === 0} className="gap-2 px-8">
            <Trophy className="h-4 w-4" /> Sortear
          </Button>
          <Button variant="secondary" onClick={copyWinners} disabled={winners.length === 0} className="gap-2">
            <Copy className="h-4 w-4" /> Copiar resultado
          </Button>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {winners.length > 0 && (
          <motion.div
            key={drawCount}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="rounded-lg border border-primary/20 bg-primary/5 p-5"
            aria-live="polite"
          >
            <p className="text-sm font-medium text-muted-foreground mb-3">
              {winners.length === 1 ? "Nome sorteado" : "Nomes sorteados"}
            </p>
            <ol className="space-y-1">
              {winners.map((name, i) => (
                <li key={`${name}-${i}`} className="flex gap-3 text-lg">
                  <span className="font-mono text-muted-foreground">{i + 1}º</span>
                  <span className="font-semibold text-foreground">{name}</span>
                </li>
              ))}
            </ol>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="space-y-8 border-t border-border pt-10">
        <section>
          <h2 className="text-lg font-semibold text-foreground mb-2">Como fazer um sorteio de nomes</h2>
          <ol className="text-[15px] leading-7 text-muted-foreground list-decimal list-inside space-y-1">
            <li>Cole ou digite os nomes dos participantes, um por linha.</li>
            <li>Defina quantas pessoas serão sorteadas.</li>
            <li>Ative a remoção de repetidos se cada pessoa puder participar só uma vez.</li>
            <li>
              Clique em <strong className="text-foreground">Sortear</strong> e copie o resultado.
            </li>
          </ol>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground mb-2">Para que usar um sorteador de nomes?</h2>
          <ul className="text-[15px] leading-7 text-muted-foreground list-disc list-inside space-y-1">
            <li>Sorteios e promoções no Instagram</li>
            <li>Amigo secreto e amigo oculto</li>
            <li>Rifas, bingos e brindes em eventos</li>
            <li>Ordem de apresentação de trabalhos na escola</li>
            <li>Divisão de tarefas e escolha de times</li>
          </ul>
        </section>

        <div className="rounded-lg border border-border bg-muted/60 p-4">
          <p className="text-xs text-muted-foreground leading-relaxed">
            <strong className="text-foreground">DICA:</strong> para sortear a ordem de todos os participantes, coloque a
            quantidade de sorteados igual ao número de participantes.
          </p>
        </div>

        <ToolFaq segment="sorteador-de-nomes" />

        <RelatedTools segments={["gerar-numeros", "gerar-nomes", "gerador-de-senha", "dividir-texto"]} />
      </div>
    </div>
  );
}
