
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import { generateCNPJ } from "@/lib/cnpj";
import { Copy } from "lucide-react";

export default function GenerateCNPJ() {
  const [punctuation, setPunctuation] = useState(true);
  const [outputSeparator, setOutputSeparator] = useState<"newline" | "comma">("newline");
  const [quantity, setQuantity] = useState(1);
  const [results, setResults] = useState<string[]>([]);

  useEffect(() => {
    setResults([generateCNPJ(true)]);
  }, []);

  const handleGenerate = () => {
    const qty = Math.max(1, Math.min(quantity, 100));
    const cnpjs: string[] = [];
    for (let i = 0; i < qty; i++) {
      cnpjs.push(generateCNPJ(punctuation));
    }
    setResults(cnpjs);
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
        <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">Gerador de CNPJ</h1>
        <p className="mt-3 max-w-prose text-base leading-7 text-muted-foreground">
          Gerador de CNPJs válidos aleatórios. Você pode escolher se quer pontuação ou não.
          Basta clicar em gerar e copiar o CNPJ gerado.
        </p>
        <a href="/validar-cnpj" className="text-primary text-sm hover:underline mt-1 inline-block">
          Deseja validar em vez de gerar?
        </a>
      </div>

      <div className="rounded-lg border border-border bg-card p-5 sm:p-6 space-y-5 shadow-xs">
        <div className="grid gap-5 sm:grid-cols-3">
          <div className="space-y-2">
            <Label className="text-sm font-medium text-foreground">Pontuação?</Label>
            <div className="flex gap-2">
              <Button size="sm" variant={punctuation ? "default" : "secondary"} onClick={() => setPunctuation(true)} className="flex-1">
                Sim
              </Button>
              <Button size="sm" variant={!punctuation ? "default" : "secondary"} onClick={() => setPunctuation(false)} className="flex-1">
                Não
              </Button>
            </div>
          </div>

          <div className="space-y-2">
            <Label className="text-sm font-medium text-foreground">Separador</Label>
            <div className="flex gap-2">
              <Button size="sm" variant={outputSeparator === "newline" ? "default" : "secondary"} onClick={() => setOutputSeparator("newline")} className="flex-1">
                Quebra de linha
              </Button>
              <Button size="sm" variant={outputSeparator === "comma" ? "default" : "secondary"} onClick={() => setOutputSeparator("comma")} className="flex-1">
                Vírgula
              </Button>
            </div>
          </div>

          <div className="space-y-2">
            <Label className="text-sm font-medium text-foreground">Quantidade</Label>
            <Input type="number" min={1} max={100} value={quantity} onChange={(e) => setQuantity(Number(e.target.value))} />
          </div>
        </div>

        <div className="flex flex-wrap gap-3">
          <Button onClick={handleGenerate} className="px-8">Gerar</Button>
          <Button variant="secondary" onClick={handleCopy} className="gap-2">
            <Copy className="h-4 w-4" /> Copiar
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
            <p className="text-sm font-medium text-muted-foreground mb-2">CNPJ(s) gerado</p>
            <div className="font-mono text-lg text-foreground">
              {outputSeparator === "comma" ? (
                <div className="font-semibold break-words">{results.join(", ")}</div>
              ) : (
                <div className="space-y-1">
                  {results.map((cnpj, i) => (
                    <div key={i} className="font-semibold">{cnpj}</div>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="space-y-8 border-t border-border pt-10">
        <section>
          <h2 className="text-lg font-semibold text-foreground mb-2">O que é CNPJ?</h2>
          <p className="text-[15px] leading-7 text-muted-foreground">
            Um CNPJ (Cadastro Nacional da Pessoa Jurídica) é um número único atribuído a cada empresa e entidade legal no Brasil.
            Ele serve como um identificador único para fins fiscais e administrativos e é emitido pela Receita Federal.
            O CNPJ é essencial para que as empresas possam operar legalmente no país, realizar transações financeiras,
            emitir notas fiscais e cumprir suas obrigações tributárias.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground mb-2">Como funciona o CNPJ?</h2>
          <p className="text-[15px] leading-7 text-muted-foreground">
            O CNPJ é um número composto por 14 dígitos, sendo os dois últimos dígitos verificadores.
            Os oito primeiros dígitos representam a identificação da empresa, os quatro dígitos seguintes são utilizados
            para identificar a unidade de atuação da empresa, e os dois últimos dígitos são os verificadores.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground mb-2">Como obter um CNPJ?</h2>
          <p className="text-[15px] leading-7 text-muted-foreground">
            Para obter um CNPJ, uma empresa deve se registrar na Receita Federal. O registro pode ser feito online
            ou pessoalmente em uma unidade da Receita Federal. O registro online é feito através do site da Receita Federal,
            e o registro presencial é feito através de um Centro Virtual de Atendimento ao Contribuinte (e-CAC).
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground mb-2">Quando foi criado o CNPJ?</h2>
          <p className="text-[15px] leading-7 text-muted-foreground">
            O CNPJ foi criado em 1998, através da Instrução Normativa SRF nº 27. A lei foi criada para substituir
            o antigo Cadastro Geral de Contribuintes (CGC), que foi criado em 1968 e era utilizado para identificar
            as empresas brasileiras.
          </p>
        </section>

        <div className="rounded-lg border border-border bg-muted/60 p-4">
          <p className="text-xs text-muted-foreground leading-relaxed">
            <strong className="text-foreground">NOTA:</strong> O gerador de CNPJ fornecido tem exclusivamente propósitos educacionais,
            destinando-se à avaliação de sites, softwares e outros. Os números são gerados aleatoriamente, respeitando as normas
            de formação do CNPJ. Não nos responsabilizamos por qualquer uso indevido.
          </p>
        </div>

        <section>
          <h2 className="text-lg font-semibold text-foreground mb-3">Veja também:</h2>
          <div className="flex flex-wrap gap-2">
            {[
              { label: "Gerar CPF", url: "/gerar-cpf" },
              { label: "Gerar Números", url: "/gerar-numeros" },
              { label: "Gerar Nomes", url: "/gerar-nomes" },
              { label: "Gerar Lorem", url: "/gerar-lorem" },
              { label: "Gerar RG", url: "/gerar-rg" },
              { label: "Gerar RJ", url: "/gerar-rj" },
            ].map((link) => (
              <a key={link.url} href={link.url} className="rounded-full border border-border bg-card px-3 py-1 text-sm text-foreground transition-colors hover:border-primary/40 hover:text-primary">
                {link.label}
              </a>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
