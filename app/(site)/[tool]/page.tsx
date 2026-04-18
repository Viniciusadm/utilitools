import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ToolView } from "@/components/tools/tool-view";
import { getNavToolBySegment, NAV_TOOL_SEGMENTS } from "@/lib/nav-tools";
import { getSiteUrl } from "@/lib/site";

export function generateStaticParams() {
  return NAV_TOOL_SEGMENTS.map((tool) => ({ tool }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ tool: string }>;
}): Promise<Metadata> {
  const { tool } = await params;
  const meta = getNavToolBySegment(tool);
  if (!meta) {
    return {};
  }
  const canonicalPath = meta.url;
  const pageUrl = `${getSiteUrl()}${canonicalPath}`;
  return {
    title: meta.title,
    description: meta.desc,
    alternates: {
      canonical: canonicalPath,
    },
    openGraph: {
      title: `${meta.title} · UtiliTools`,
      description: meta.desc,
      url: pageUrl,
    },
    twitter: {
      title: `${meta.title} · UtiliTools`,
      description: meta.desc,
    },
  };
}

export default async function ToolPage({ params }: { params: Promise<{ tool: string }> }) {
  const { tool } = await params;
  const meta = getNavToolBySegment(tool);
  if (!meta) {
    notFound();
  }
  const baseUrl = getSiteUrl();
  const pageUrl = `${baseUrl}${meta.url}`;
  const pageTitle = `${meta.title} · UtiliTools`;
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
        "@id": `${pageUrl}#app`,
        name: pageTitle,
        description: meta.desc,
        url: pageUrl,
        applicationCategory: "UtilityApplication",
        operatingSystem: "Any",
        browserRequirements: "Requires JavaScript.",
        offers: {
          "@type": "Offer",
          price: "0",
          priceCurrency: "BRL",
        },
      },
      {
        "@type": "FAQPage",
        "@id": `${pageUrl}#faq`,
        mainEntity: [
          {
            "@type": "Question",
            name: `A ferramenta ${meta.title} é gratuita?`,
            acceptedAnswer: {
              "@type": "Answer",
              text: "Sim. O uso é gratuito no navegador, sem cadastro obrigatório.",
            },
          },
          {
            "@type": "Question",
            name: `Como usar ${meta.title} no UtiliTools?`,
            acceptedAnswer: {
              "@type": "Answer",
              text: `${meta.desc} Use os controles na página para obter o resultado.`,
            },
          },
        ],
      },
    ],
  };
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ToolView segment={tool} />
    </>
  );
}
