import { mkdir, readFile, rm, writeFile } from "node:fs/promises";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = fileURLToPath(new URL("..", import.meta.url));
const dist = `${root}dist/`;
const serverEntry = pathToFileURL(`${root}dist-ssr/entry-server.js`).href;

const { render, renderHead, resolveRoute, NAV_TOOL_SEGMENTS, absoluteUrl } = await import(serverEntry);

const template = await readFile(`${dist}index.html`, "utf-8");

const pages = [
  { path: "", file: "index.html" },
  ...NAV_TOOL_SEGMENTS.map((segment) => ({ path: `${segment}/`, file: `${segment}/index.html` })),
];

async function writePage(pathname, file) {
  const route = resolveRoute(pathname);
  const html = template
    .replace("<!--app-head-->", renderHead(route))
    .replace("<!--app-html-->", await render(route));
  await mkdir(`${dist}${file}`.replace(/[^/]+$/, ""), { recursive: true });
  await writeFile(`${dist}${file}`, html);
  console.log(`Prerendered dist/${file}`);
}

for (const { path, file } of pages) {
  await writePage(`/${path}`, file);
}
await writePage("/404", "404.html");

const lastmod = new Date().toISOString().slice(0, 10);
const sitemap = [
  '<?xml version="1.0" encoding="UTF-8"?>',
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
  ...pages.map(({ path }) => {
    const priority = path === "" ? "1.0" : "0.8";
    return `  <url><loc>${absoluteUrl(path)}</loc><lastmod>${lastmod}</lastmod><changefreq>weekly</changefreq><priority>${priority}</priority></url>`;
  }),
  "</urlset>",
  "",
].join("\n");
await writeFile(`${dist}sitemap.xml`, sitemap);
await writeFile(`${dist}robots.txt`, `User-agent: *\nAllow: /\n\nSitemap: ${absoluteUrl("sitemap.xml")}\n`);

await rm(`${root}dist-ssr`, { recursive: true, force: true });
