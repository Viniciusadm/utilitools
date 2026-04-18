"use client";

import { useState } from "react";
import { format, differenceInDays } from "date-fns";
import { ptBR } from "date-fns/locale";
import { motion, AnimatePresence } from "framer-motion";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

export default function CountDays() {
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();
  const [dayCount, setDayCount] = useState<number | null>(null);

  const handleCalculate = () => {
    if (startDate && endDate) {
      setDayCount(Math.abs(differenceInDays(endDate, startDate)));
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Contador de Dias</h1>
        <p className="mt-2 text-muted-foreground text-sm leading-relaxed">
          Contador de dias online entre datas. Você pode informar uma data inicial e uma data final para calcular quantos dias existem entre elas.
          Basta selecionar as datas e clicar em calcular para ver o total de dias entre os dois períodos.
        </p>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div className="space-y-2">
          <Label className="text-muted-foreground text-xs uppercase tracking-wider">Data inicial</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className={cn("w-full justify-start text-left font-normal bg-muted border-border", !startDate && "text-muted-foreground")}>
                <CalendarIcon className="mr-2 h-4 w-4" />
                {startDate ? format(startDate, "dd/MM/yyyy", { locale: ptBR }) : "Selecione a data"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar mode="single" selected={startDate} onSelect={setStartDate} locale={ptBR} initialFocus className={cn("p-3 pointer-events-auto")} />
            </PopoverContent>
          </Popover>
        </div>

        <div className="space-y-2">
          <Label className="text-muted-foreground text-xs uppercase tracking-wider">Data final</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className={cn("w-full justify-start text-left font-normal bg-muted border-border", !endDate && "text-muted-foreground")}>
                <CalendarIcon className="mr-2 h-4 w-4" />
                {endDate ? format(endDate, "dd/MM/yyyy", { locale: ptBR }) : "Selecione a data"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar mode="single" selected={endDate} onSelect={setEndDate} locale={ptBR} initialFocus className={cn("p-3 pointer-events-auto")} />
            </PopoverContent>
          </Popover>
        </div>
      </div>

      <Button onClick={handleCalculate} disabled={!startDate || !endDate}>Calcular</Button>

      <AnimatePresence mode="wait">
        {dayCount !== null && (
          <motion.div
            key={dayCount}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="rounded-md border border-border bg-muted p-5 space-y-1"
          >
            <p className="text-xs text-muted-foreground uppercase tracking-wider">Quantidade de dias</p>
            <p className="text-2xl font-semibold font-mono text-foreground">{dayCount} {dayCount === 1 ? "dia" : "dias"}</p>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="space-y-6 border-t border-border pt-8">
        <section>
          <h2 className="text-lg font-semibold text-foreground mb-2">O que é um contador de dias?</h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Um contador de dias é uma ferramenta que permite calcular a diferença entre duas datas. Ele é muito útil para descobrir prazos, intervalos de tempo e períodos entre eventos.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground mb-2">Como funciona o cálculo de dias?</h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            O cálculo é feito considerando a diferença entre uma data inicial e uma data final. O resultado mostra quantos dias existem entre essas duas datas, podendo incluir ou não o dia inicial dependendo da regra utilizada.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground mb-2">Como calcular dias entre duas datas</h2>
          <ol className="text-sm text-muted-foreground leading-relaxed list-decimal list-inside space-y-2">
            <li><strong className="text-foreground">Escolha a data inicial</strong> — Defina o ponto de partida do cálculo.</li>
            <li><strong className="text-foreground">Escolha a data final</strong> — Defina até onde deseja contar os dias.</li>
            <li><strong className="text-foreground">Calcule a diferença</strong> — Subtraia a data inicial da data final para obter o total de dias.</li>
          </ol>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground mb-2">Exemplo de contagem de dias</h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Se a data inicial for 12/03/2026 e a data final for 19/03/2026, o resultado será: <strong className="text-foreground font-mono">7 dias</strong>.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground mb-2">Quando usar um contador de dias?</h2>
          <ul className="text-sm text-muted-foreground leading-relaxed list-disc list-inside space-y-1">
            <li>Calcular prazos</li>
            <li>Contar dias entre eventos</li>
            <li>Planejar viagens</li>
            <li>Controlar períodos de tempo</li>
          </ul>
        </section>
      </div>
    </div>
  );
}
