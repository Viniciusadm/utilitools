
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";
import { generateCPF, formatCPF, CPF_STATE_OPTIONS } from "@/lib/cpf";
import { Copy } from "lucide-react";

export default function GenerateCPF() {
  const [punctuation, setPunctuation] = useState(true);
  const [outputSeparator, setOutputSeparator] = useState<"newline" | "comma">("newline");
  const [selectedState, setSelectedState] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [results, setResults] = useState<string[]>([]);

  useEffect(() => {
    setResults([formatCPF(generateCPF(""), true)]);
  }, []);

  const handleGenerate = () => {
    const cpfs: string[] = [];
    const qty = Math.max(1, Math.min(quantity, 100));
    for (let i = 0; i < qty; i++) {
      cpfs.push(formatCPF(generateCPF(selectedState), punctuation));
    }
    setResults(cpfs);
  };

  const handleCopy = () => {
    if (results.length === 0) return;
    const sep = outputSeparator === "comma" ? ", " : "\n";
    navigator.clipboard.writeText(results.join(sep));
    toast({ title: "Copiado para a área de transferência" });
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">Gerador de CPF</h1>
        <p className="mt-3 max-w-prose text-base leading-7 text-muted-foreground">
          Gerador de CPFs válidos aleatórios. Você pode escolher se quer pontuação ou não e o estado. Basta clicar em gerar e copiar o CPF gerado.
        </p>
        <a
          href="/validar-cpf"
          className="text-primary text-sm hover:underline mt-1 inline-block"
        >
          Deseja validar em vez de gerar?
        </a>
      </div>

      <div className="rounded-lg border border-border bg-card p-5 sm:p-6 space-y-5 shadow-xs">
        <div className="grid gap-5 sm:grid-cols-2">
          <div className="space-y-2">
            <Label className="text-sm font-medium text-foreground">Pontuação?</Label>
            <div className="flex gap-2">
              <Button
                size="sm"
                variant={punctuation ? "default" : "secondary"}
                onClick={() => setPunctuation(true)}
                className="flex-1"
              >
                Sim
              </Button>
              <Button
                size="sm"
                variant={!punctuation ? "default" : "secondary"}
                onClick={() => setPunctuation(false)}
                className="flex-1"
              >
                Não
              </Button>
            </div>
          </div>

          <div className="space-y-2">
            <Label className="text-sm font-medium text-foreground">Separador?</Label>
            <div className="flex gap-2">
              <Button
                size="sm"
                variant={outputSeparator === "newline" ? "default" : "secondary"}
                onClick={() => setOutputSeparator("newline")}
                className="flex-1"
              >
                Quebra de linha
              </Button>
              <Button
                size="sm"
                variant={outputSeparator === "comma" ? "default" : "secondary"}
                onClick={() => setOutputSeparator("comma")}
                className="flex-1"
              >
                Vírgula
              </Button>
            </div>
          </div>

          <div className="space-y-2">
            <Label className="text-sm font-medium text-foreground">Estado</Label>
            <Select value={selectedState || "any"} onValueChange={(v) => setSelectedState(v === "any" ? "" : v)}>
              <SelectTrigger>
                <SelectValue placeholder="Qualquer" />
              </SelectTrigger>
              <SelectContent>
                {CPF_STATE_OPTIONS.map((e) => (
                  <SelectItem key={e.value} value={e.value || "any"}>
                    {e.label}
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
              max={100}
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
            <Copy className="h-4 w-4" />
            Copiar
          </Button>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {results.length > 0 && (
          <motion.div
            key={`${results.join()}-${outputSeparator}`}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="rounded-lg border border-primary/20 bg-primary/5 p-5"
          >
            <p className="text-sm font-medium text-muted-foreground mb-2">CPF(s) gerado</p>
            <div className="font-mono text-lg text-foreground">
              {outputSeparator === "comma" ? (
                <div className="font-semibold break-words">{results.join(", ")}</div>
              ) : (
                <div className="space-y-1">
                  {results.map((cpf, i) => (
                    <div key={i} className="font-semibold">{cpf}</div>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="space-y-8 border-t border-border pt-10">
        <section>
          <h2 className="text-lg font-semibold text-foreground mb-2">O que é CPF?</h2>
          <p className="text-[15px] leading-7 text-muted-foreground">
            O CPF (Cadastro de Pessoas Físicas) é um número único de identificação de pessoas físicas no Brasil. Ele é utilizado em diversas transações financeiras, cadastros e serviços do governo.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground mb-2">Como funciona o CPF?</h2>
          <p className="text-[15px] leading-7 text-muted-foreground">
            O CPF possui 11 dígitos. Os dois últimos são dígitos verificadores, calculados a partir dos nove primeiros através de um algoritmo específico. Isso garante que o número seja válido matematicamente.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground mb-2">Como eu sei de qual estado é o CPF?</h2>
          <p className="text-[15px] leading-7 text-muted-foreground mb-3">
            O estado de origem do CPF é definido pelo 9º dígito (penúltimo antes dos verificadores). Veja a correspondência:
          </p>
          <ul className="text-sm text-muted-foreground space-y-1 list-none">
            <li><span className="text-foreground font-medium">0</span> — Rio Grande do Sul</li>
            <li><span className="text-foreground font-medium">1</span> — Distrito Federal, Goiás, Mato Grosso do Sul e Tocantins</li>
            <li><span className="text-foreground font-medium">2</span> — Pará, Amazonas, Acre, Amapá, Rondônia e Roraima</li>
            <li><span className="text-foreground font-medium">3</span> — Ceará, Maranhão e Piauí</li>
            <li><span className="text-foreground font-medium">4</span> — Pernambuco, Rio Grande do Norte, Paraíba e Alagoas</li>
            <li><span className="text-foreground font-medium">5</span> — Bahia e Sergipe</li>
            <li><span className="text-foreground font-medium">6</span> — Minas Gerais</li>
            <li><span className="text-foreground font-medium">7</span> — Rio de Janeiro e Espírito Santo</li>
            <li><span className="text-foreground font-medium">8</span> — São Paulo</li>
            <li><span className="text-foreground font-medium">9</span> — Paraná e Santa Catarina</li>
          </ul>
        </section>

        <div className="rounded-lg border border-border bg-muted/60 p-4">
          <p className="text-xs text-muted-foreground leading-relaxed">
            <strong className="text-foreground">NOTA:</strong> O gerador de CPF fornecido tem exclusivamente propósitos educacionais. Os números gerados são aleatórios e seguem as regras matemáticas reais de validação do CPF, porém não correspondem a pessoas reais. Não nos responsabilizamos pelo uso indevido desta ferramenta. Em caso de problemas, entre em contato.
          </p>
        </div>

        <section>
          <h2 className="text-lg font-semibold text-foreground mb-3">Veja também:</h2>
          <div className="flex flex-wrap gap-2">
            {[
              { label: "Gerar CNPJ", url: "/gerar-cnpj" },
              { label: "Gerar Números", url: "/gerar-numeros" },
              { label: "Gerar Nomes", url: "/gerar-nomes" },
              { label: "Gerar Lorem", url: "/gerar-lorem" },
              { label: "Gerar RG", url: "/gerar-rg" },
              { label: "Gerar RJ", url: "/gerar-rj" },
            ].map((link) => (
              <a
                key={link.url}
                href={link.url}
                className="rounded-full border border-border bg-card px-3 py-1 text-sm text-foreground transition-colors hover:border-primary/40 hover:text-primary"
              >
                {link.label}
              </a>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
