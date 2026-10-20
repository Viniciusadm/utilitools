import { useId, useMemo, useState } from "react";
import { Copy, Trophy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { RelatedTools } from "@/components/related-tools";
import { ToolFaq } from "@/components/tool-faq";
import { toast } from "@/hooks/use-toast";
import { INTL_LOCALE, useCopy, useLocale, type Locale } from "@/lib/i18n";
import { secureShuffle } from "@/lib/random";

function parseNames(text: string, removeDuplicates: boolean, locale: Locale) {
  const names = text
    .split("\n")
    .map((name) => name.trim())
    .filter(Boolean);
  if (!removeDuplicates) return names;
  const seen = new Set<string>();
  return names.filter((name) => {
    const key = name.toLocaleLowerCase(INTL_LOCALE[locale]);
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

const pt = {
  title: "Sorteador de Nomes",
  intro:
    "Sorteie nomes online de forma justa e aleatória. Cole a lista de participantes, escolha quantos nomes sortear e clique em Sortear. Ideal para sorteios no Instagram, amigo secreto, rifas, brindes e para definir a ordem de apresentações.",
  namesLabel: "Participantes (um por linha)",
  participants: (n: number) => `${n} ${n === 1 ? "participante" : "participantes"}`,
  namesPlaceholder: "Ana\nBruno\nCarla\nDiego",
  quantityLabel: "Quantidade de sorteados",
  removeDuplicates: "Remover nomes repetidos",
  draw: "Sortear",
  copyResult: "Copiar resultado",
  copied: "Resultado copiado!",
  winners: (n: number): string => (n === 1 ? "Nome sorteado" : "Nomes sorteados"),
  rank: (n: number) => `${n}º`,
  content: (
    <>
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
    </>
  ),
};

const en: typeof pt = {
  title: "Random Name Picker",
  intro:
    "Pick random names online, fairly and instantly. Paste the list of participants, choose how many names to draw and click Pick. Perfect for Instagram giveaways, Secret Santa, raffles, prize draws and deciding the order of presentations.",
  namesLabel: "Participants (one per line)",
  participants: (n: number) => `${n} ${n === 1 ? "participant" : "participants"}`,
  namesPlaceholder: "Alice\nBen\nCharlotte\nDaniel",
  quantityLabel: "Number of winners",
  removeDuplicates: "Remove duplicate names",
  draw: "Pick",
  copyResult: "Copy result",
  copied: "Result copied!",
  winners: (n: number) => (n === 1 ? "Winner" : "Winners"),
  rank: (n: number) => `${n}.`,
  content: (
    <>
      <section>
        <h2 className="text-lg font-semibold text-foreground mb-2">How to pick a random name</h2>
        <ol className="text-[15px] leading-7 text-muted-foreground list-decimal list-inside space-y-1">
          <li>Paste or type the participants' names, one per line.</li>
          <li>Choose how many people will be picked.</li>
          <li>Turn on duplicate removal if each person can only enter once.</li>
          <li>
            Click <strong className="text-foreground">Pick</strong> and copy the result.
          </li>
        </ol>
      </section>

      <section>
        <h2 className="text-lg font-semibold text-foreground mb-2">What can you use a random name picker for?</h2>
        <ul className="text-[15px] leading-7 text-muted-foreground list-disc list-inside space-y-1">
          <li>Instagram, TikTok and YouTube giveaways and contests</li>
          <li>Secret Santa and gift exchanges</li>
          <li>Raffles, bingo and prize draws at events</li>
          <li>Order of class presentations at school</li>
          <li>Assigning chores and picking teams</li>
        </ul>
      </section>

      <div className="rounded-lg border border-border bg-muted/60 p-4">
        <p className="text-xs text-muted-foreground leading-relaxed">
          <strong className="text-foreground">TIP:</strong> to shuffle the order of all participants, set the number of
          winners equal to the number of participants.
        </p>
      </div>
    </>
  ),
};

export default function NameDraw() {
  const copy = useCopy({ pt, en });
  const locale = useLocale();
  const namesId = useId();
  const quantityId = useId();
  const duplicatesId = useId();
  const [text, setText] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [removeDuplicates, setRemoveDuplicates] = useState(true);
  const [winners, setWinners] = useState<string[]>([]);

  const names = useMemo(() => parseNames(text, removeDuplicates, locale), [text, removeDuplicates, locale]);

  const handleDraw = () => {
    if (names.length === 0) return;
    const count = Math.max(1, Math.min(quantity, names.length));
    setWinners(secureShuffle(names).slice(0, count));
  };

  const copyWinners = async () => {
    if (winners.length === 0) return;
    await navigator.clipboard.writeText(winners.map((name, i) => `${i + 1}. ${name}`).join("\n"));
    toast({ title: copy.copied });
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">{copy.title}</h1>
        <p className="mt-3 max-w-prose text-base leading-7 text-muted-foreground">{copy.intro}</p>
      </div>

      <div className="rounded-lg border border-border bg-card p-5 sm:p-6 space-y-5 shadow-xs">
        <div className="space-y-2">
          <div className="flex justify-between">
            <Label htmlFor={namesId} className="text-sm font-medium text-foreground">
              {copy.namesLabel}
            </Label>
            <span className="text-sm text-muted-foreground">
              {copy.participants(names.length)}
            </span>
          </div>
          <Textarea
            id={namesId}
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder={copy.namesPlaceholder}
            className="min-h-[180px] text-base"
          />
        </div>

        <div className="grid gap-5 sm:grid-cols-2 sm:items-end">
          <div className="space-y-2">
            <Label htmlFor={quantityId} className="text-sm font-medium text-foreground">
              {copy.quantityLabel}
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
              {copy.removeDuplicates}
            </Label>
            <Switch id={duplicatesId} checked={removeDuplicates} onCheckedChange={setRemoveDuplicates} />
          </div>
        </div>

        <div className="flex flex-wrap gap-3">
          <Button onClick={handleDraw} disabled={names.length === 0} className="gap-2 px-8">
            <Trophy className="h-4 w-4" /> {copy.draw}
          </Button>
          <Button variant="secondary" onClick={copyWinners} disabled={winners.length === 0} className="gap-2">
            <Copy className="h-4 w-4" /> {copy.copyResult}
          </Button>
        </div>
      </div>

      {winners.length > 0 && (
        <div className="rounded-lg border border-primary/20 bg-primary/5 p-5" aria-live="polite">
          <p className="text-sm font-medium text-muted-foreground mb-3">
            {copy.winners(winners.length)}
          </p>
          <ol className="space-y-1">
            {winners.map((name, i) => (
              <li key={`${name}-${i}`} className="flex gap-3 text-lg">
                <span className="font-mono text-muted-foreground">{copy.rank(i + 1)}</span>
                <span className="font-semibold text-foreground">{name}</span>
              </li>
            ))}
          </ol>
        </div>
      )}

      <div className="space-y-8 border-t border-border pt-10">
        {copy.content}

        <ToolFaq toolId="sorteador-de-nomes" />

        <RelatedTools ids={["gerar-numeros", "gerar-nomes", "gerador-de-senha", "dividir-texto"]} />
      </div>
    </div>
  );
}
