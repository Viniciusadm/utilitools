"use client";

import { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { toast } from "@/hooks/use-toast";
import { Copy } from "lucide-react";
import Link from "next/link";

const LOREM_WORDS = [
  "lorem","ipsum","dolor","sit","amet","consectetur","adipiscing","elit","sed","do",
  "eiusmod","tempor","incididunt","ut","labore","et","dolore","magna","aliqua","enim",
  "ad","minim","veniam","quis","nostrud","exercitation","ullamco","laboris","nisi",
  "aliquip","ex","ea","commodo","consequat","duis","aute","irure","in","reprehenderit",
  "voluptate","velit","esse","cillum","fugiat","nulla","pariatur","excepteur","sint",
  "occaecat","cupidatat","non","proident","sunt","culpa","qui","officia","deserunt",
  "mollit","anim","id","est","laborum","ac","accumsan","aliquet","ante","arcu","at",
  "auctor","augue","bibendum","blandit","condimentum","congue","cras","cursus",
  "dapibus","diam","dictum","dignissim","donec","dui","efficitur","egestas","elementum",
  "facilisi","fames","faucibus","felis","fermentum","finibus","gravida","habitant",
  "hendrerit","iaculis","imperdiet","integer","interdum","justo","lacinia","lacus",
  "laoreet","lectus","leo","libero","ligula","lobortis","luctus","maecenas","massa",
  "mattis","mauris","maximus","metus","mi","morbi","nam","nec","neque","nibh","nunc",
  "odio","orci","ornare","pellentesque","pharetra","phasellus","placerat","porta",
  "porttitor","posuere","praesent","pretium","proin","pulvinar","purus","quam",
  "risus","rutrum","sagittis","sapien","scelerisque","semper","senectus","sociosqu",
  "sodales","sollicitudin","suscipit","suspendisse","tellus","tincidunt","tortor",
  "tristique","turpis","ultrices","ultricies","urna","varius","vehicula","vel",
  "vestibulum","vitae","vivamus","viverra","volutpat","vulputate",
  "aenean","aliquam","aptent","assumenda","atque","beatae","blanditiis","commodi",
  "consequuntur","corporis","corrupti","culpabo","cumque","debitis","delectus",
  "deleniti","distinctio","dolorum","ducimus","eligendi","enim","eos","error",
  "eveniet","excepturi","expedita","explicabo","facere","facilis","fuga","fugit",
  "harum","hic","illo","impedit","incidunt","inventore","ipsa","ipsum","iste",
  "itaque","iusto","labore","laboriosam","laudantium","libero","magnam","maiores",
  "maxime","minima","minus","molestiae","molestias","necessitatibus","nemo",
  "nesciunt","nihil","nisi","nobis","nostrum","nulla","numquam","obcaecati",
  "occaecati","odio","officiis","omnis","optio","pariatur","perferendis","perspiciatis",
  "placeat","porro","possimus","praesentium","provident","quae","quaerat","quam",
  "quasi","quia","quibusdam","quid","quisquam","quod","ratione","recusandae",
  "reiciendis","rem","repellat","repellendus","repudiandae","rerum","saepe",
  "sapiente","sed","sequi","similique","sint","soluta","suscipit","tempora",
  "tempore","tenetur","totam","ullam","unde","ut","vel","velit","veniam","veritatis",
  "vero","vitae","voluptas","voluptatem","voluptatibus","voluptatum",
  "ab","adipisci","alias","amet","animi","aperiam","asperiores","assumenda",
  "at","aut","beatae","blanditiis","commodi","consectetur","consequatur",
  "consequuntur","corporis","culpa","cum","debitis","deleniti","deserunt",
  "dicta","distinctio","dolore","dolorem","dolores","dolorum","ea","earum",
  "eius","eligendi","enim","eos","error","esse","est","et","eum","eveniet",
  "excepturi","expedita","explicabo","facere","facilis","fuga","fugit",
  "harum","hic","id","illo","impedit","in","incidunt","inventore","ipsa",
  "ipsum","iste","itaque","iusto","labore","laboriosam","laudantium",
  "libero","magnam","maiores","maxime","minima","minus","molestiae",
  "molestias","nam","necessitatibus","nemo","nesciunt","nihil","nisi",
  "nobis","nostrum","nulla","numquam","obcaecati","odit","officiis",
  "omnis","optio","pariatur","perferendis","perspiciatis","placeat",
  "porro","possimus","praesentium","provident","quae","quaerat",
  "quam","quasi","quia","quibusdam","quid","quisquam","quod",
  "ratione","recusandae","reiciendis","rem","repellat","repellendus",
  "repudiandae","rerum","saepe","sapiente","sed","sequi","similique",
  "sint","soluta","suscipit","tempora","tempore","tenetur","totam",
  "ullam","unde","ut","vel","velit","veniam","veritatis","vero",
  "vitae","voluptas","voluptatem","voluptatibus","voluptatum"
];

function randomWord() {
  return LOREM_WORDS[Math.floor(Math.random() * LOREM_WORDS.length)];
}

function generateSentence(minWords = 6, maxWords = 14): string {
  const len = minWords + Math.floor(Math.random() * (maxWords - minWords + 1));
  const words = Array.from({ length: len }, () => randomWord());
  words[0] = words[0].charAt(0).toUpperCase() + words[0].slice(1);
  return words.join(" ") + ".";
}

function generateParagraph(): string {
  const sentences = 3 + Math.floor(Math.random() * 4);
  return Array.from({ length: sentences }, () => generateSentence()).join(" ");
}

function generateByParagraphs(qty: number): string {
  return Array.from({ length: qty }, () => generateParagraph()).join("\n\n");
}

function generateByWords(qty: number): string {
  const words: string[] = [];
  while (words.length < qty) words.push(randomWord());
  words[0] = words[0].charAt(0).toUpperCase() + words[0].slice(1);
  return words.slice(0, qty).join(" ") + ".";
}

function generateByChars(qty: number): string {
  let result = "";
  while (result.length < qty) {
    result += (result ? " " : "") + randomWord();
  }
  return result.slice(0, qty);
}

type LoremUnit = "paragraphs" | "words" | "characters";

export default function GenerateLorem() {
  const [unit, setUnit] = useState<LoremUnit>("paragraphs");
  const [quantity, setQuantity] = useState(3);
  const [output, setOutput] = useState("");

  useEffect(() => {
    setOutput(generateByParagraphs(3));
  }, []);

  const stats = useMemo(() => {
    if (!output) return { chars: 0, words: 0, lines: 0 };
    return {
      chars: output.length,
      words: output.trim().split(/\s+/).filter(Boolean).length,
      lines: output.split("\n").filter((l) => l.trim()).length,
    };
  }, [output]);

  const handleGenerate = () => {
    const qty = Math.max(1, Math.min(quantity, 1000));
    let text = "";
    switch (unit) {
      case "paragraphs":
        text = generateByParagraphs(qty);
        break;
      case "words":
        text = generateByWords(qty);
        break;
      case "characters":
        text = generateByChars(qty);
        break;
    }
    setOutput(text);
  };

  const handleCopy = () => {
    if (!output) return;
    navigator.clipboard.writeText(output);
    toast({ title: "Copiado para a área de transferência" });
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Gerador de Lorem Ipsum</h1>
        <p className="mt-2 text-muted-foreground text-sm leading-relaxed">
          Gere textos Lorem Ipsum online de forma rápida e prática. Você pode escolher gerar parágrafos, palavras ou
          até uma quantidade específica de caracteres. Ideal para testes de layout, softwares, sites e apresentações.
        </p>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div className="space-y-2">
          <Label className="text-muted-foreground text-xs uppercase tracking-wider">Tipo</Label>
          <ToggleGroup
            type="single"
            value={unit}
            onValueChange={(v) => v && setUnit(v as LoremUnit)}
            className="justify-start"
          >
            <ToggleGroupItem value="paragraphs" className="px-3 text-sm">Parágrafos</ToggleGroupItem>
            <ToggleGroupItem value="words" className="px-3 text-sm">Palavras</ToggleGroupItem>
            <ToggleGroupItem value="characters" className="px-3 text-sm">Caracteres</ToggleGroupItem>
          </ToggleGroup>
        </div>

        <div className="space-y-2">
          <Label className="text-muted-foreground text-xs uppercase tracking-wider">Quantidade</Label>
          <Input
            type="number"
            min={1}
            max={1000}
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            className="bg-muted border-border"
          />
        </div>
      </div>

      <div className="flex gap-3">
        <Button onClick={handleGenerate} className="px-8">Gerar</Button>
        <Button variant="secondary" onClick={handleCopy} className="gap-2">
          <Copy className="h-4 w-4" /> Copiar
        </Button>
      </div>

      <AnimatePresence mode="wait">
        {output && (
          <motion.div
            key={output.slice(0, 40)}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="space-y-3"
          >
            <Textarea
              value={output}
              readOnly
              className="min-h-[200px] bg-muted border-border font-mono text-sm"
            />
            <div className="flex gap-4 text-xs text-muted-foreground">
              <span>Caracteres: <strong className="text-foreground">{stats.chars}</strong></span>
              <span>Palavras: <strong className="text-foreground">{stats.words}</strong></span>
              <span>Linhas: <strong className="text-foreground">{stats.lines}</strong></span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="space-y-6 border-t border-border pt-8">
        <section>
          <h2 className="text-lg font-semibold text-foreground mb-2">O que é Lorem Ipsum?</h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Lorem Ipsum é um texto fictício utilizado na área de design, web e editoração para preencher espaços e
            demonstrar layouts. Ele permite que designers e desenvolvedores visualizem como um conteúdo ficará sem
            depender de textos reais.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground mb-2">Por que usar Lorem Ipsum?</h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Usar Lorem Ipsum ajuda a evitar distrações causadas por textos reais, mantendo o foco no design, na
            tipografia e na organização visual do conteúdo. É amplamente adotado em protótipos de sites, aplicativos
            e materiais gráficos.
          </p>
        </section>

        <div className="rounded-md border border-border bg-card p-4">
          <p className="text-xs text-muted-foreground leading-relaxed">
            <strong className="text-foreground">NOTA:</strong> O Lorem Ipsum gerado aqui é apenas para fins de teste
            e design. Ele não possui significado real e serve exclusivamente para preencher layouts.
          </p>
        </div>

        <section>
          <h2 className="text-lg font-semibold text-foreground mb-3">Veja também:</h2>
          <div className="flex flex-wrap gap-2">
            {[
              { label: "Gerar CPF", url: "/gerar-cpf" },
              { label: "Gerar CNPJ", url: "/gerar-cnpj" },
              { label: "Gerar Números", url: "/gerar-numeros" },
              { label: "Gerar Nomes", url: "/gerar-nomes" },
              { label: "Gerar RG", url: "/gerar-rg" },
              { label: "Gerar RJ", url: "/gerar-rj" },
            ].map((link) => (
              <Link key={link.url} href={link.url} className="text-sm text-primary hover:underline">
                {link.label}
              </Link>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
