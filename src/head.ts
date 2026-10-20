import { HTML_LANG, OG_LOCALE, LOCALES, type Locale, type Localized } from "@/lib/i18n";
import { localeRedirectScript } from "@/lib/locale-redirect";
import { absoluteUrl } from "@/lib/site";
import { getToolSeo, type FaqItem } from "@/lib/tool-seo";
import { alternatePaths, routePath, type Route } from "./routes";

const siteName = "UtiliTools";

const HEAD_COPY = {
  pt: {
    defaultTitle: "UtiliTools — Ferramentas online gratuitas",
    homeTitle: `Ferramentas online gratuitas · ${siteName}`,
    homeDescription:
      "Central de ferramentas UtiliTools: validação de documentos, geradores, editores de texto, conversores, calculadoras e ferramentas para dev. Grátis e sem cadastro.",
    siteDescription:
      "Central de ferramentas UtiliTools: validação de documentos, geradores, editores de texto, conversores, calculadoras e ferramentas para desenvolvedores.",
    notFoundTitle: `Página não encontrada · ${siteName}`,
    notFoundDescription:
      "Utilitários online gratuitos: validar CPF e CNPJ, gerar dados de teste, editar texto, conversores e mais.",
    breadcrumbHome: "Início",
    defaultFaq: (toolTitle: string, toolDesc: string): FaqItem[] => [
      {
        question: `A ferramenta ${toolTitle} é gratuita?`,
        answer: "Sim. O uso é gratuito no navegador, sem cadastro obrigatório.",
      },
      {
        question: `Como usar ${toolTitle} no UtiliTools?`,
        answer: `${toolDesc}. Use os controles na página para obter o resultado.`,
      },
    ],
  },
  en: {
    defaultTitle: "UtiliTools — Free online tools",
    homeTitle: `Free online tools · ${siteName}`,
    homeDescription:
      "UtiliTools: free online tools for developers and everyday tasks. JSON formatter, Base64, UUID and hash generators, document validators, text editors, converters and calculators. No sign-up.",
    siteDescription:
      "UtiliTools: document generators and validators, text editors, converters, calculators and developer tools.",
    notFoundTitle: `Page not found · ${siteName}`,
    notFoundDescription:
      "Free online utilities: validate CPF and CNPJ, generate test data, edit text, converters and more.",
    breadcrumbHome: "Home",
    defaultFaq: (toolTitle: string, toolDesc: string): FaqItem[] => [
      {
        question: `Is ${toolTitle} free?`,
        answer: "Yes. It is free to use in your browser, with no sign-up required.",
      },
      {
        question: `How do I use ${toolTitle} on UtiliTools?`,
        answer: `${toolDesc}. Use the controls on the page to get the result.`,
      },
    ],
  },
} satisfies Localized<unknown>;

type HeadData = {
  title: string;
  description: string;
  shareTitle: string;
  shareDescription: string;
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
  const copy = HEAD_COPY[route.locale];
  const inLanguage = HTML_LANG[route.locale];
  const pageUrl = absoluteUrl(routePath(route));
  switch (route.kind) {
    case "home": {
      return {
        title: copy.homeTitle,
        description: copy.homeDescription,
        shareTitle: copy.defaultTitle,
        shareDescription: copy.homeDescription,
        index: true,
        jsonLd: {
          "@context": "https://schema.org",
          "@type": "WebSite",
          name: siteName,
          url: pageUrl,
          description: copy.siteDescription,
          inLanguage,
        },
      };
    }
    case "tool": {
      const { tool, locale } = route;
      const seo = getToolSeo(tool.id, locale);
      const toolTitle = tool.title[locale];
      const title = `${seo?.title ?? toolTitle} · ${siteName}`;
      const description = seo?.description ?? tool.desc[locale];
      const faq = seo?.faq ?? copy.defaultFaq(toolTitle, tool.desc[locale]);
      return {
        title,
        description,
        shareTitle: title,
        shareDescription: description,
        index: true,
        jsonLd: {
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "WebApplication",
              "@id": `${pageUrl}#app`,
              name: title,
              description,
              url: pageUrl,
              applicationCategory: "UtilityApplication",
              operatingSystem: "Any",
              browserRequirements: "Requires JavaScript.",
              inLanguage,
              offers: {
                "@type": "Offer",
                price: "0",
                priceCurrency: "BRL",
              },
            },
            {
              "@type": "FAQPage",
              "@id": `${pageUrl}#faq`,
              mainEntity: faq.map(({ question, answer }) => ({
                "@type": "Question",
                name: question,
                acceptedAnswer: {
                  "@type": "Answer",
                  text: answer,
                },
              })),
            },
            {
              "@type": "BreadcrumbList",
              "@id": `${pageUrl}#breadcrumb`,
              itemListElement: [
                {
                  "@type": "ListItem",
                  position: 1,
                  name: copy.breadcrumbHome,
                  item: absoluteUrl(routePath({ kind: "home", locale })),
                },
                { "@type": "ListItem", position: 2, name: toolTitle, item: pageUrl },
              ],
            },
          ],
        },
      };
    }
    case "not-found": {
      return {
        title: copy.notFoundTitle,
        description: copy.notFoundDescription,
        shareTitle: copy.defaultTitle,
        shareDescription: copy.notFoundDescription,
        index: false,
      };
    }
  }
}

function alternateLinks(route: Route) {
  const alternates = alternatePaths(route);
  if (!alternates) return [];
  return [
    ...LOCALES.map(
      (locale: Locale) =>
        `<link rel="alternate" hreflang="${HTML_LANG[locale]}" href="${escapeHtml(absoluteUrl(alternates[locale]))}" />`,
    ),
    `<link rel="alternate" hreflang="x-default" href="${escapeHtml(absoluteUrl(alternates.pt))}" />`,
  ];
}

export function renderHtmlLang(route: Route) {
  return HTML_LANG[route.locale];
}

export function renderHead(route: Route) {
  const { title, description, shareTitle, shareDescription, index, jsonLd } = headData(route);
  const pageUrl = absoluteUrl(routePath(route));
  const otherLocales = LOCALES.filter((locale) => locale !== route.locale);
  return [
    `<title>${escapeHtml(title)}</title>`,
    `<meta name="description" content="${escapeHtml(description)}" />`,
    `<meta name="robots" content="${index ? "index, follow" : "noindex"}" />`,
    ...(index ? [`<link rel="canonical" href="${escapeHtml(pageUrl)}" />`] : []),
    ...alternateLinks(route),
    `<meta property="og:title" content="${escapeHtml(shareTitle)}" />`,
    `<meta property="og:description" content="${escapeHtml(shareDescription)}" />`,
    `<meta property="og:url" content="${escapeHtml(pageUrl)}" />`,
    `<meta property="og:site_name" content="${siteName}" />`,
    `<meta property="og:locale" content="${OG_LOCALE[route.locale]}" />`,
    ...otherLocales.map((locale) => `<meta property="og:locale:alternate" content="${OG_LOCALE[locale]}" />`),
    `<meta property="og:type" content="website" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${escapeHtml(shareTitle)}" />`,
    `<meta name="twitter:description" content="${escapeHtml(shareDescription)}" />`,
    ...(jsonLd
      ? [`<script type="application/ld+json">${JSON.stringify(jsonLd).replace(/</g, "\\u003c")}</script>`]
      : []),
    ...(index ? [`<script>${localeRedirectScript()}</script>`] : []),
  ].join("\n    ");
}
