import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";
import { Copy } from "lucide-react";
import { ToolFaq } from "@/components/tool-faq";
import { RelatedTools } from "@/components/related-tools";
import { useUiCopy } from "@/i18n/ui";
import { useCopy } from "@/lib/i18n";

const pt = {
  title: "Dividir Texto",
  intro:
    "Divida textos de forma rápida utilizando um separador personalizado. Basta inserir o conteúdo e definir como deseja separar as partes. Ideal para organização de dados, listas, programação e manipulação de textos.",
  textLabel: "Texto",
  placeholder: "Digite ou cole o texto que deseja dividir...",
  delimiter: "Separador",
  delimiterPlaceholder: "Ex: , ; | espaço",
  split: "Dividir texto",
  copy: "Copiar",
  result: (n: number) => `Resultado (${n} partes)`,
  content: (
    <>
      <section>
        <h2 className="text-lg font-semibold text-foreground mb-2">O que é dividir texto?</h2>
        <p className="text-[15px] leading-7 text-muted-foreground">
          Dividir texto é o processo de separar um conteúdo em várias partes menores com base em um caractere específico, como vírgula, espaço ou outro símbolo.
        </p>
      </section>

      <section>
        <h2 className="text-lg font-semibold text-foreground mb-2">Como dividir um texto</h2>
        <ol className="text-[15px] leading-7 text-muted-foreground list-decimal list-inside space-y-2">
          <li><strong className="text-foreground">Cole ou digite o texto</strong> — Insira o conteúdo que deseja dividir.</li>
          <li><strong className="text-foreground">Informe o separador</strong> — Defina o caractere usado para separar as partes.</li>
          <li><strong className="text-foreground">Clique em Dividir texto</strong> — O resultado será exibido automaticamente.</li>
          <li><strong className="text-foreground">Copie, se necessário</strong> — Use o botão copiar para transferir o resultado.</li>
        </ol>
      </section>

      <section>
        <h2 className="text-lg font-semibold text-foreground mb-2">Exemplos de separadores</h2>
        <ul className="text-[15px] leading-7 text-muted-foreground list-disc list-inside space-y-1">
          <li>Vírgula (,) → para listas</li>
          <li>Espaço → para separar palavras</li>
          <li>Ponto e vírgula (;)</li>
          <li>Caracteres personalizados</li>
        </ul>
      </section>

      <section>
        <h2 className="text-lg font-semibold text-foreground mb-2">Para que dividir texto?</h2>
        <ul className="text-[15px] leading-7 text-muted-foreground list-disc list-inside space-y-1">
          <li>Organizar listas de dados</li>
          <li>Preparar informações para planilhas</li>
          <li>Manipular strings em programação</li>
          <li>Separar palavras ou frases</li>
          <li>Tratar dados para importação/exportação</li>
        </ul>
      </section>

      <section>
        <h2 className="text-lg font-semibold text-foreground mb-2">Dica</h2>
        <p className="text-[15px] leading-7 text-muted-foreground">
          Se o texto não for dividido corretamente, verifique se o separador utilizado corresponde exatamente ao que está no conteúdo.
        </p>
      </section>
    </>
  ),
};

const en: typeof pt = {
  title: "Split Text",
  intro:
    "Split text quickly using any custom separator. Just paste the content and choose how to break it into parts. Ideal for organizing data, lists, programming and text manipulation.",
  textLabel: "Text",
  placeholder: "Type or paste the text you want to split...",
  delimiter: "Separator",
  delimiterPlaceholder: "e.g. , ; | space",
  split: "Split text",
  copy: "Copy",
  result: (n: number) => `Result (${n} ${n === 1 ? "part" : "parts"})`,
  content: (
    <>
      <section>
        <h2 className="text-lg font-semibold text-foreground mb-2">What does splitting text mean?</h2>
        <p className="text-[15px] leading-7 text-muted-foreground">
          Splitting text means breaking content into several smaller parts based on a specific character, such as a comma, a space or any other symbol.
        </p>
      </section>

      <section>
        <h2 className="text-lg font-semibold text-foreground mb-2">How to split a text</h2>
        <ol className="text-[15px] leading-7 text-muted-foreground list-decimal list-inside space-y-2">
          <li><strong className="text-foreground">Paste or type the text</strong> — Enter the content you want to split.</li>
          <li><strong className="text-foreground">Enter the separator</strong> — Set the character used to separate the parts.</li>
          <li><strong className="text-foreground">Click Split text</strong> — The result is shown instantly, one part per line.</li>
          <li><strong className="text-foreground">Copy it if needed</strong> — Use the copy button to grab the result.</li>
        </ol>
      </section>

      <section>
        <h2 className="text-lg font-semibold text-foreground mb-2">Separator examples</h2>
        <ul className="text-[15px] leading-7 text-muted-foreground list-disc list-inside space-y-1">
          <li>Comma (,) → for lists and CSV values</li>
          <li>Space → to separate words</li>
          <li>Semicolon (;)</li>
          <li>Custom characters, such as | or -</li>
        </ul>
      </section>

      <section>
        <h2 className="text-lg font-semibold text-foreground mb-2">Why split text?</h2>
        <ul className="text-[15px] leading-7 text-muted-foreground list-disc list-inside space-y-1">
          <li>Organize data lists</li>
          <li>Prepare information for spreadsheets</li>
          <li>Work with strings in programming</li>
          <li>Separate words or sentences</li>
          <li>Clean up data for import and export</li>
        </ul>
      </section>

      <section>
        <h2 className="text-lg font-semibold text-foreground mb-2">Tip</h2>
        <p className="text-[15px] leading-7 text-muted-foreground">
          If the text is not split correctly, check that the separator exactly matches the one used in the content.
        </p>
      </section>
    </>
  ),
};

export default function SplitText() {
  const copy = useCopy({ pt, en });
  const uiCopy = useUiCopy();
  const [text, setText] = useState("");
  const [delimiter, setDelimiter] = useState(",");
  const [parts, setParts] = useState<string[] | null>(null);

  const handleSplit = () => {
    if (!text || !delimiter) return;
    const splitParts = text.split(delimiter).map((p) => p.trim()).filter(Boolean);
    setParts(splitParts);
  };

  const handleCopy = () => {
    if (parts) {
      navigator.clipboard.writeText(parts.join("\n"));
      toast({ title: uiCopy.copied });
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">{copy.title}</h1>
        <p className="mt-3 max-w-prose text-base leading-7 text-muted-foreground">{copy.intro}</p>
      </div>

      <div className="space-y-5">
        <div className="space-y-2">
          <Label className="text-sm font-medium text-foreground">{copy.textLabel}</Label>
          <Textarea value={text} onChange={(e) => setText(e.target.value)} className="min-h-[120px]" placeholder={copy.placeholder} />
        </div>

        <div className="space-y-2 sm:w-80">
          <Label className="text-sm font-medium text-foreground">{copy.delimiter}</Label>
          <Input value={delimiter} onChange={(e) => setDelimiter(e.target.value)} placeholder={copy.delimiterPlaceholder} />
        </div>
      </div>

      <div className="flex gap-3">
        <Button onClick={handleSplit} disabled={!text || !delimiter}>{copy.split}</Button>
        <Button variant="outline" onClick={handleCopy} disabled={!parts}>
          <Copy className="h-4 w-4 mr-2" /> {copy.copy}
        </Button>
      </div>

      {parts !== null && (
        <div className="rounded-lg border border-primary/20 bg-primary/5 p-5 space-y-3">
          <p className="text-sm font-medium text-muted-foreground">{copy.result(parts.length)}</p>
          <div className="space-y-1">
            {parts.map((part, i) => (
              <p key={i} className="text-sm font-mono text-foreground bg-background rounded px-3 py-1.5 border border-border">{part}</p>
            ))}
          </div>
        </div>
      )}

      <div className="space-y-8 border-t border-border pt-10">
        {copy.content}

        <ToolFaq toolId="dividir-texto" />

        <RelatedTools ids={["editar-texto", "cortar-texto"]} />
      </div>
    </div>
  );
}
