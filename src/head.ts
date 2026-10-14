import { absoluteUrl } from "@/lib/site";
import type { Route } from "./routes";

const siteName = "UtiliTools";
const defaultTitle = "UtiliTools — Ferramentas online gratuitas";

type HeadData = {
  title: string;
  description: string;
  shareTitle: string;
  shareDescription: string;
  path: string;
  index: boolean;
  jsonLd?: Record<string, unknown>;
};

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function headData(route: Route): HeadData {
  switch (route.kind) {
    case "home": {
      const description =
        "Central de ferramentas UtiliTools: validação de documentos, geradores, editores de texto, conversores e calculadoras. Grátis e sem cadastro.";
      return {
        title: `Ferramentas online gratuitas · ${siteName}`,
        description,
        shareTitle: defaultTitle,
        shareDescription: description,
        path: "",
        index: true,
        jsonLd: {
          "@context": "https://schema.org",
          "@type": "WebSite",
          name: siteName,
          url: absoluteUrl(),
          description:
            "Central de ferramentas UtiliTools: validação de documentos, geradores, editores de texto, conversores e calculadoras.",
          inLanguage: "pt-BR",
        },
      };
    }
    case "tool": {
      const { tool, segment } = route;
      const path = `${segment}/`;
      const pageUrl = absoluteUrl(path);
      const title = `${tool.title} · ${siteName}`;
      return {
        title,
        description: tool.desc,
        shareTitle: title,
        shareDescription: tool.desc,
        path,
        index: true,
        jsonLd: {
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "WebApplication",
              "@id": `${pageUrl}#app`,
              name: title,
              description: tool.desc,
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
                  name: `A ferramenta ${tool.title} é gratuita?`,
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Sim. O uso é gratuito no navegador, sem cadastro obrigatório.",
                  },
                },
                {
                  "@type": "Question",
                  name: `Como usar ${tool.title} no UtiliTools?`,
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: `${tool.desc} Use os controles na página para obter o resultado.`,
                  },
                },
              ],
            },
          ],
        },
      };
    }
    case "not-found": {
      const description =
        "Utilitários online gratuitos: validar CPF e CNPJ, gerar dados de teste, editar texto, conversores e mais.";
      return {
        title: `Página não encontrada · ${siteName}`,
        description,
        shareTitle: defaultTitle,
        shareDescription: description,
        path: "404",
        index: false,
      };
    }
  }
}

export function renderHead(route: Route) {
  const { title, description, shareTitle, shareDescription, path, index, jsonLd } = headData(route);
  const pageUrl = absoluteUrl(path);
  return [
    `<title>${escapeHtml(title)}</title>`,
    `<meta name="description" content="${escapeHtml(description)}" />`,
    `<meta name="robots" content="${index ? "index, follow" : "noindex"}" />`,
    ...(index ? [`<link rel="canonical" href="${escapeHtml(pageUrl)}" />`] : []),
    `<meta property="og:title" content="${escapeHtml(shareTitle)}" />`,
    `<meta property="og:description" content="${escapeHtml(shareDescription)}" />`,
    `<meta property="og:url" content="${escapeHtml(pageUrl)}" />`,
    `<meta property="og:site_name" content="${siteName}" />`,
    `<meta property="og:locale" content="pt_BR" />`,
    `<meta property="og:type" content="website" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${escapeHtml(shareTitle)}" />`,
    `<meta name="twitter:description" content="${escapeHtml(shareDescription)}" />`,
    ...(jsonLd
      ? [`<script type="application/ld+json">${JSON.stringify(jsonLd).replace(/</g, "\\u003c")}</script>`]
      : []),
  ].join("\n    ");
}
