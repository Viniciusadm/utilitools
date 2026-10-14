# Utilitools

Utilitools is a collection of small text, number and document tools in Portuguese, built with React and Vite and prerendered as a static site. Every tool runs in the browser; there is no backend. It is live at [utilitools.com.br](https://www.utilitools.com.br/).

The tools are:

- Math: division remainder, rule of three, number base conversion, temperature conversion (Celsius, Fahrenheit and Kelvin) and counting days between two dates.
- Text: truncate, split by delimiter, transform words, edit and format text, strip accents, write numbers out in words and generate Lorem Ipsum.
- Random data: names and numbers.
- Brazilian documents: generate and validate CPF, CNPJ, CNH and RG from São Paulo and from Rio de Janeiro (IFP).

| Part | What it is |
| --- | --- |
| [`src`](src) | Entry points: `entry-server.tsx` renders each page to HTML at build time and `entry-client.tsx` hydrates it in the browser. `routes.ts` maps URLs to pages and `head.ts` builds the meta tags. |
| [`scripts/prerender.js`](scripts/prerender.js) | Writes one HTML file per page, plus `404.html`, `sitemap.xml` and `robots.txt`. |
| [`src/components/tools`](src/components/tools) | One component per tool. |
| [`src/components/ui`](src/components/ui) | UI primitives on top of Radix UI and Tailwind CSS. |
| [`src/lib`](src/lib) | Document algorithms (`cpf.ts`, `cnpj.ts`, `cnh.ts`, `rg.ts`, `rg-sp.ts`), numbers in words (`extenso.ts`) and the list of tools (`nav-tools.ts`). |

## Requirements

- Node.js 20.19+ (required by Vite 8)
- npm

The stack is Vite 8, React 19, TypeScript 6 and Tailwind CSS 4.

## Configuration

`VITE_SITE_URL` is the public address used in canonical links, the sitemap and `robots.txt`. Set it in the environment when building:

```bash
VITE_SITE_URL=https://www.utilitools.com.br npm run build
```

Without it the site uses `https://www.utilitools.com.br`.

## Running locally

Install the dependencies and start the development server on port 5173:

```bash
npm install
npm run dev
```

Build the static site into `dist/`, ready to serve from any static host:

```bash
npm run build
```

Run the linter:

```bash
npm run lint
```
