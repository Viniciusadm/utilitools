
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";
import { Copy } from "lucide-react";
import { ToolFaq } from "@/components/tool-faq";

export default function SplitText() {
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
      toast({ title: "Copiado para a área de transferência" });
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">Dividir Texto</h1>
        <p className="mt-3 max-w-prose text-base leading-7 text-muted-foreground">
          Divida textos de forma rápida utilizando um separador personalizado. Basta inserir o conteúdo e definir como deseja separar as partes. Ideal para organização de dados, listas, programação e manipulação de textos.
        </p>
      </div>

      <div className="space-y-5">
        <div className="space-y-2">
          <Label className="text-sm font-medium text-foreground">Texto</Label>
          <Textarea value={text} onChange={(e) => setText(e.target.value)} className="min-h-[120px]" placeholder="Digite ou cole o texto que deseja dividir..." />
        </div>

        <div className="space-y-2 sm:w-80">
          <Label className="text-sm font-medium text-foreground">Separador</Label>
          <Input value={delimiter} onChange={(e) => setDelimiter(e.target.value)} placeholder="Ex: , ; | espaço" />
        </div>
      </div>

      <div className="flex gap-3">
        <Button onClick={handleSplit} disabled={!text || !delimiter}>Dividir texto</Button>
        <Button variant="outline" onClick={handleCopy} disabled={!parts}>
          <Copy className="h-4 w-4 mr-2" /> Copiar
        </Button>
      </div>

      <AnimatePresence mode="wait">
        {parts !== null && (
          <motion.div
            key={parts.length + parts.join("")}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="rounded-lg border border-primary/20 bg-primary/5 p-5 space-y-3"
          >
            <p className="text-sm font-medium text-muted-foreground">Resultado ({parts.length} partes)</p>
            <div className="space-y-1">
              {parts.map((part, i) => (
                <p key={i} className="text-sm font-mono text-foreground bg-background rounded px-3 py-1.5 border border-border">{part}</p>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="space-y-8 border-t border-border pt-10">
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

        <ToolFaq segment="dividir-texto" />

        <section>
          <h2 className="text-lg font-semibold text-foreground mb-3">Veja também:</h2>
          <div className="flex flex-wrap gap-2">
            <a href="/editar-texto" className="rounded-full border border-border bg-card px-3 py-1 text-sm text-foreground transition-colors hover:border-primary/40 hover:text-primary">Editar Texto</a>
            <a href="/cortar-texto" className="rounded-full border border-border bg-card px-3 py-1 text-sm text-foreground transition-colors hover:border-primary/40 hover:text-primary">Cortar Texto</a>
          </div>
        </section>
      </div>
    </div>
  );
}
