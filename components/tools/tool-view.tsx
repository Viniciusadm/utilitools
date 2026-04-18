"use client";

import dynamic from "next/dynamic";
import type { ComponentType } from "react";

const tools: Record<string, ComponentType<object>> = {
  "calcular-resto": dynamic(() => import("./divide-remainder")),
  "calcular-tres": dynamic(() => import("./rule-of-three")),
  "converter-numeros": dynamic(() => import("./radix-converter")),
  "converter-temperaturas": dynamic(() => import("./temperature-converter")),
  "contar-dias": dynamic(() => import("./count-days")),
  "cortar-texto": dynamic(() => import("./truncate-text")),
  "editar-palavras": dynamic(() => import("./edit-words")),
  "editar-texto": dynamic(() => import("./edit-text")),
  "gerar-cpf": dynamic(() => import("./generate-cpf")),
  "gerar-cnh": dynamic(() => import("./generate-cnh")),
  "gerar-rj": dynamic(() => import("./generate-rg-rj")),
  "gerar-rg": dynamic(() => import("./generate-rg-sp")),
  "gerar-lorem": dynamic(() => import("./generate-lorem")),
  "gerar-nomes": dynamic(() => import("./generate-names")),
  "gerar-numeros": dynamic(() => import("./generate-numbers")),
  "gerar-cnpj": dynamic(() => import("./generate-cnpj")),
  "numeros-por-extenso": dynamic(() => import("./numbers-spell-out")),
  "remover-acentos": dynamic(() => import("./strip-diacritics")),
  "dividir-texto": dynamic(() => import("./split-text")),
  "validar-cnh": dynamic(() => import("./validate-cnh")),
  "validar-rj": dynamic(() => import("./validate-rg-rj")),
  "validar-rg": dynamic(() => import("./validate-rg-sp")),
  "validar-cnpj": dynamic(() => import("./validate-cnpj")),
  "validar-cpf": dynamic(() => import("./validate-cpf")),
};

export function ToolView({ segment }: { segment: string }) {
  const Comp = tools[segment];
  if (!Comp) return null;
  return <Comp />;
}
