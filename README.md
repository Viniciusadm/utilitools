# Utilitools

Utilitools is a collection of small text, number and document tools in Portuguese, built with Next.js and exported as a static site. Every tool runs in the browser; there is no backend.

The tools are:

- Math: division remainder, rule of three, number base conversion, temperature conversion (Celsius, Fahrenheit and Kelvin) and counting days between two dates.
- Text: truncate, split by delimiter, transform words, edit and format text, strip accents, write numbers out in words and generate Lorem Ipsum.
- Random data: names and numbers.
- Brazilian documents: generate and validate CPF, CNPJ, CNH and RG from São Paulo and from Rio de Janeiro (IFP).

| Part | What it is |
| --- | --- |
| [`app`](app) | App Router pages. `(site)/[tool]` renders each tool from its URL segment; `sitemap.ts` and `robots.ts` build the SEO files. |
| [`components/tools`](components/tools) | One component per tool. |
| [`components/ui`](components/ui) | UI primitives on top of Radix UI and Tailwind CSS. |
| [`lib`](lib) | Document algorithms (`cpf.ts`, `cnpj.ts`, `cnh.ts`, `rg.ts`, `rg-sp.ts`), numbers in words (`extenso.ts`) and the list of tools (`nav-tools.ts`). |

## Requirements

- Node.js 20.9+ (required by Next.js 16)
- npm

The stack is Next.js 16, React 19, TypeScript 5 and Tailwind CSS 4.

## Configuration

`NEXT_PUBLIC_SITE_URL` is the public address used in the sitemap and `robots.txt`. Copy the example to set it:

```bash
cp .env.example .env
```

Without it the site uses `http://localhost:3000`.

## Running locally

Install the dependencies and start the development server on port 3000:

```bash
npm install
npm run dev
```

Build the static site into `out/`, ready to serve from any static host:

```bash
npm run build
```

Run the linter:

```bash
npm run lint
```
