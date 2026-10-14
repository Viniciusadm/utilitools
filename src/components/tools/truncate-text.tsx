
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { toast } from "@/hooks/use-toast";
import { Copy } from "lucide-react";

export default function TruncateText() {
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
      toast({ title: "Copiado para a área de transferência" });
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">Cortador de Texto</h1>
        <p className="mt-3 max-w-prose text-base leading-7 text-muted-foreground">
          Cortador de texto online. Você pode colar ou digitar um texto e limitar a quantidade de caracteres de forma rápida.
          Basta inserir o texto, definir o número máximo de caracteres e clicar em cortar para gerar o resultado automaticamente.
        </p>
      </div>

      <div className="space-y-5">
        <div className="space-y-2">
          <Label className="text-sm font-medium text-foreground">Texto</Label>
          <Textarea value={text} onChange={(e) => setText(e.target.value)} className="min-h-[120px]" placeholder="Digite ou cole o texto aqui..." />
          <p className="text-xs text-muted-foreground">{text.length} caracteres</p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div className="space-y-2">
            <Label className="text-sm font-medium text-foreground">Máximo de caracteres</Label>
            <Input type="number" min="1" value={maxLength} onChange={(e) => setMaxLength(e.target.value)} placeholder="Ex: 100" />
          </div>

          <div className="space-y-2">
            <Label className="text-sm font-medium text-foreground">Adicionar reticências (...)</Label>
            <div className="flex items-center gap-3 pt-1">
              <Switch checked={ellipsis} onCheckedChange={setEllipsis} />
              <span className="text-sm text-muted-foreground">{ellipsis ? "Sim" : "Não"}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex gap-3">
        <Button onClick={handleTruncate} disabled={!text || !maxLength}>Cortar texto</Button>
        <Button variant="outline" onClick={handleCopy} disabled={!output}>
          <Copy className="h-4 w-4 mr-2" /> Copiar
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
            <p className="text-sm font-medium text-muted-foreground">Resultado ({output.length} caracteres)</p>
            <p className="text-sm font-mono text-foreground whitespace-pre-wrap break-all">{output}</p>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="space-y-8 border-t border-border pt-10">
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
            Resultado: <strong className="text-foreground font-mono">"Este é um exemp..."</strong>
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

        <section>
          <h2 className="text-lg font-semibold text-foreground mb-3">Veja também:</h2>
          <div className="flex flex-wrap gap-2">
            <a href="/editar-texto" className="rounded-full border border-border bg-card px-3 py-1 text-sm text-foreground transition-colors hover:border-primary/40 hover:text-primary">Editar Texto</a>
            <a href="/dividir-texto" className="rounded-full border border-border bg-card px-3 py-1 text-sm text-foreground transition-colors hover:border-primary/40 hover:text-primary">Dividir Texto</a>
          </div>
        </section>
      </div>
    </div>
  );
}
