import type { Metadata } from "next";
import Link from "next/link";

import { NAV_TOOLS } from "@/lib/nav-tools";
import { getSiteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Ferramentas online gratuitas",
  description:
    "Central de ferramentas UtiliTools: validação de documentos, geradores, editores de texto, conversores e calculadoras. Grátis e sem cadastro.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "UtiliTools — Ferramentas online gratuitas",
    description:
      "Central de ferramentas UtiliTools: validação de documentos, geradores, editores de texto, conversores e calculadoras. Grátis e sem cadastro.",
    url: getSiteUrl(),
  },
  twitter: {
    title: "UtiliTools — Ferramentas online gratuitas",
    description:
      "Central de ferramentas UtiliTools: validação de documentos, geradores, editores de texto, conversores e calculadoras. Grátis e sem cadastro.",
  },
};

export default function Home() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "UtiliTools",
    url: getSiteUrl(),
    description:
      "Central de ferramentas UtiliTools: validação de documentos, geradores, editores de texto, conversores e calculadoras.",
    inLanguage: "pt-BR",
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div>
        <h1 className="text-2xl font-bold text-foreground mb-2">Ferramentas</h1>
        <p className="text-muted-foreground text-sm mb-8">Escolha uma ferramenta abaixo para começar.</p>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {NAV_TOOLS.map((tool) => (
            <Link
              key={tool.url}
              href={tool.url}
              className="group rounded-md border border-border bg-card p-4 hover:border-primary/40 hover:bg-accent transition-colors"
            >
              <h2 className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors">
                {tool.title}
              </h2>
              <p className="text-xs text-muted-foreground mt-1">{tool.desc}</p>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
