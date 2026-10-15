import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { toast } from "@/hooks/use-toast";
import { Copy } from "lucide-react";
import { ToolFaq } from "@/components/tool-faq";
import { RelatedTools } from "@/components/related-tools";
import { useUiCopy } from "@/i18n/ui";
import { useCopy } from "@/lib/i18n";

const pt = {
  title: "Cortador de Texto",
  intro:
    "Cortador de texto online. Você pode colar ou digitar um texto e limitar a quantidade de caracteres de forma rápida. Basta inserir o texto, definir o número máximo de caracteres e clicar em cortar para gerar o resultado automaticamente.",
  textLabel: "Texto",
  placeholder: "Digite ou cole o texto aqui...",
  characters: (n: number) => `${n} caracteres`,
  maxLength: "Máximo de caracteres",
  maxLengthPlaceholder: "Ex: 100",
  ellipsis: "Adicionar reticências (...)",
  yes: "Sim",
  no: "Não",
  truncate: "Cortar texto",
  copy: "Copiar",
  result: (n: number) => `Resultado (${n} caracteres)`,
  content: (
    <>
      <section>
        <h2 className="text-lg font-semibold text-foreground mb-2">O que é cortar texto?</h2>
        <p className="text-[15px] leading-7 text-muted-foreground">
          Cortar texto é o processo de limitar a quantidade de caracteres de um conteúdo, reduzindo seu tamanho sem necessariamente alterar seu significado principal. Isso é muito útil quando existe um limite de caracteres, como em redes sociais, formulários ou títulos.
        </p>
      </section>

      <section>
        <h2 className="text-lg font-semibold text-foreground mb-2">Como funciona o corte de texto?</h2>
        <p className="text-[15px] leading-7 text-muted-foreground">
          A ferramenta analisa o texto inserido e mantém apenas a quantidade de caracteres definida. Se a opção de reticências estiver ativada, ela adiciona "..." ao final do texto cortado para indicar que ele foi reduzido.
        </p>
      </section>

      <section>
        <h2 className="text-lg font-semibold text-foreground mb-2">Como cortar texto</h2>
        <ol className="text-[15px] leading-7 text-muted-foreground list-decimal list-inside space-y-2">
          <li><strong className="text-foreground">Insira o texto</strong> — Cole ou digite o conteúdo que deseja cortar.</li>
          <li><strong className="text-foreground">Defina o limite de caracteres</strong> — Escolha quantos caracteres o texto final deve ter.</li>
          <li><strong className="text-foreground">Ative as reticências (opcional)</strong> — Marque essa opção se quiser indicar que o texto foi reduzido.</li>
          <li><strong className="text-foreground">Clique em cortar texto</strong> — O resultado será gerado automaticamente.</li>
        </ol>
      </section>

      <section>
        <h2 className="text-lg font-semibold text-foreground mb-2">Exemplo de corte de texto</h2>
        <p className="text-[15px] leading-7 text-muted-foreground">
          Texto original: <strong className="text-foreground">"Este é um exemplo de texto que será cortado."</strong><br />
          Limite: 20 caracteres<br />
          Resultado: <strong className="text-foreground font-mono">"Este é um exemplo..."</strong>
        </p>
      </section>

      <section>
        <h2 className="text-lg font-semibold text-foreground mb-2">Quando usar um cortador de texto?</h2>
        <ul className="text-[15px] leading-7 text-muted-foreground list-disc list-inside space-y-1">
          <li>Limitar textos para redes sociais</li>
          <li>Ajustar títulos e descrições</li>
          <li>Criar previews de conteúdo</li>
          <li>Respeitar limites de formulários</li>
        </ul>
      </section>
    </>
  ),
};

const en: typeof pt = {
  title: "Truncate Text",
  intro:
    "Online text truncator. Paste or type any text and quickly limit it to a maximum number of characters. Just enter the text, set the character limit and click truncate to get the result instantly.",
  textLabel: "Text",
  placeholder: "Type or paste your text here...",
  characters: (n: number) => `${n} ${n === 1 ? "character" : "characters"}`,
  maxLength: "Maximum characters",
  maxLengthPlaceholder: "e.g. 100",
  ellipsis: "Add ellipsis (...)",
  yes: "Yes",
  no: "No",
  truncate: "Truncate text",
  copy: "Copy",
  result: (n: number) => `Result (${n} ${n === 1 ? "character" : "characters"})`,
  content: (
    <>
      <section>
        <h2 className="text-lg font-semibold text-foreground mb-2">What does truncating text mean?</h2>
        <p className="text-[15px] leading-7 text-muted-foreground">
          Truncating text means cutting it down to a maximum number of characters, shortening it without necessarily changing its main meaning. It is very useful whenever there is a character limit, such as on social media, in forms or in page titles.
        </p>
      </section>

      <section>
        <h2 className="text-lg font-semibold text-foreground mb-2">How does text truncation work?</h2>
        <p className="text-[15px] leading-7 text-muted-foreground">
          The tool reads your text and keeps only the number of characters you set. If the ellipsis option is on, it adds "..." to the end of the shortened text to show that it was cut.
        </p>
      </section>

      <section>
        <h2 className="text-lg font-semibold text-foreground mb-2">How to truncate text</h2>
        <ol className="text-[15px] leading-7 text-muted-foreground list-decimal list-inside space-y-2">
          <li><strong className="text-foreground">Enter the text</strong> — Paste or type the content you want to shorten.</li>
          <li><strong className="text-foreground">Set the character limit</strong> — Choose how many characters the final text should have.</li>
          <li><strong className="text-foreground">Turn on the ellipsis (optional)</strong> — Enable it to indicate that the text was shortened.</li>
          <li><strong className="text-foreground">Click truncate text</strong> — The result is generated instantly.</li>
        </ol>
      </section>

      <section>
        <h2 className="text-lg font-semibold text-foreground mb-2">Text truncation example</h2>
        <p className="text-[15px] leading-7 text-muted-foreground">
          Original text: <strong className="text-foreground">"This is an example of text to be truncated."</strong><br />
          Limit: 20 characters<br />
          Result: <strong className="text-foreground font-mono">"This is an exampl..."</strong>
        </p>
      </section>

      <section>
        <h2 className="text-lg font-semibold text-foreground mb-2">When should you use a text truncator?</h2>
        <ul className="text-[15px] leading-7 text-muted-foreground list-disc list-inside space-y-1">
          <li>Fitting text into social media limits</li>
          <li>Shortening titles and descriptions</li>
          <li>Creating content previews and excerpts</li>
          <li>Respecting form field limits</li>
        </ul>
      </section>
    </>
  ),
};

export default function TruncateText() {
  const copy = useCopy({ pt, en });
  const uiCopy = useUiCopy();
  const [text, setText] = useState("");
  const [maxLength, setMaxLength] = useState("100");
  const [ellipsis, setEllipsis] = useState(true);
  const [output, setOutput] = useState<string | null>(null);

  const handleTruncate = () => {
    const max = parseInt(maxLength, 10);
    if (!text || isNaN(max) || max <= 0) return;

    if (text.length <= max) {
      setOutput(text);
    } else {
      const truncated = text.slice(0, ellipsis ? Math.max(max - 3, 0) : max);
      setOutput(ellipsis ? truncated + "..." : truncated);
    }
  };

  const handleCopy = () => {
    if (output) {
      navigator.clipboard.writeText(output);
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
          <p className="text-xs text-muted-foreground">{copy.characters(text.length)}</p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div className="space-y-2">
            <Label className="text-sm font-medium text-foreground">{copy.maxLength}</Label>
            <Input type="number" min="1" value={maxLength} onChange={(e) => setMaxLength(e.target.value)} placeholder={copy.maxLengthPlaceholder} />
          </div>

          <div className="space-y-2">
            <Label className="text-sm font-medium text-foreground">{copy.ellipsis}</Label>
            <div className="flex items-center gap-3 pt-1">
              <Switch checked={ellipsis} onCheckedChange={setEllipsis} />
              <span className="text-sm text-muted-foreground">{ellipsis ? copy.yes : copy.no}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex gap-3">
        <Button onClick={handleTruncate} disabled={!text || !maxLength}>{copy.truncate}</Button>
        <Button variant="outline" onClick={handleCopy} disabled={!output}>
          <Copy className="h-4 w-4 mr-2" /> {copy.copy}
        </Button>
      </div>

      <AnimatePresence mode="wait">
        {output !== null && (
          <motion.div
            key={output}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="rounded-lg border border-primary/20 bg-primary/5 p-5 space-y-1"
          >
            <p className="text-sm font-medium text-muted-foreground">{copy.result(output.length)}</p>
            <p className="text-sm font-mono text-foreground whitespace-pre-wrap break-all">{output}</p>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="space-y-8 border-t border-border pt-10">
        {copy.content}

        <ToolFaq toolId="cortar-texto" />

        <RelatedTools ids={["editar-texto", "dividir-texto"]} />
      </div>
    </div>
  );
}
