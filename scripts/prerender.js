import { mkdir, readFile, rm, writeFile } from "node:fs/promises";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = fileURLToPath(new URL("..", import.meta.url));
const dist = `${root}dist/`;
const serverEntry = pathToFileURL(`${root}dist-ssr/entry-server.js`).href;

const {
  render,
  renderHead,
  renderHtmlLang,
  renderLlmsTxt,
  resolveRoute,
  routePath,
  alternatePaths,
  staticRoutes,
  LOCALES,
  HTML_LANG,
  absoluteUrl,
} = await import(serverEntry);

const template = await readFile(`${dist}index.html`, "utf-8");

async function writePage(route, file) {
  const html = template
    .replace('lang="pt-BR"', `lang="${renderHtmlLang(route)}"`)
    .replace("<!--app-head-->", renderHead(route))
    .replace("<!--app-html-->", await render(route));
  await mkdir(`${dist}${file}`.replace(/[^/]+$/, ""), { recursive: true });
  await writeFile(`${dist}${file}`, html);
  console.log(`Prerendered dist/${file}`);
}

const routes = staticRoutes();
for (const route of routes) {
  await writePage(route, `${routePath(route).slice(1)}index.html`);
}
for (const locale of LOCALES) {
  const route = resolveRoute(locale === "pt" ? "/404" : `/${locale}/404`);
  await writePage(route, `${routePath(route).slice(1)}.html`);
}

const lastmod = new Date().toISOString().slice(0, 10);
const sitemap = [
  '<?xml version="1.0" encoding="UTF-8"?>',
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">',
  ...routes.map((route) => {
    const priority = route.kind === "home" ? "1.0" : "0.8";
    const alternates = alternatePaths(route);
    const links = [
      ...LOCALES.map(
        (locale) => `<xhtml:link rel="alternate" hreflang="${HTML_LANG[locale]}" href="${absoluteUrl(alternates[locale])}"/>`,
      ),
      `<xhtml:link rel="alternate" hreflang="x-default" href="${absoluteUrl(alternates.pt)}"/>`,
    ].join("");
    return `  <url><loc>${absoluteUrl(routePath(route))}</loc>${links}<lastmod>${lastmod}</lastmod><changefreq>weekly</changefreq><priority>${priority}</priority></url>`;
  }),
  "</urlset>",
  "",
].join("\n");
await writeFile(`${dist}sitemap.xml`, sitemap);
await writeFile(`${dist}llms.txt`, renderLlmsTxt());
await writeFile(`${dist}robots.txt`, `User-agent: *\nAllow: /\n\nSitemap: ${absoluteUrl("sitemap.xml")}\n`);

await rm(`${root}dist-ssr`, { recursive: true, force: true });
