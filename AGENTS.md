# Project notes

UtiliTools is built with React 19 + Vite 8 and statically prerendered at build time (`src/entry-server.tsx` + `scripts/prerender.js`). Every page (home, one per tool and `404.html`) is rendered to HTML and then hydrated on the client by `src/entry-client.tsx`. Routes are resolved in `src/routes.ts` from the tool list in `src/lib/nav-tools.ts`; page metadata lives in `src/head.ts`. Tool components are loaded through `toolLoaders` in `src/components/tools/tool-view.tsx`. Imports use the `@/` alias for `src/`.

Components render on the server during `npm run build`, so browser APIs (`window`, `document`, `localStorage`) and random values must only be used inside effects or event handlers to keep hydration consistent.

## Internationalization

The site is bilingual: Portuguese at the root (`/gerar-cpf/`) and English under `/en/` with English slugs (`/en/cpf-generator/`). The locale comes from the route (`src/routes.ts`) and is provided through `LocaleContext` (`src/lib/i18n.ts`). Each tool has a stable `id` (its Portuguese slug) plus localized `slugs`, `title` and `desc` in `src/lib/nav-tools.ts`. Link to tools with `ToolLink`, `RelatedTools` or `toolPath(id, locale)`, never with hardcoded paths.

Tool components keep their copy next to the code as `const pt = {...}` and `const en: typeof pt = {...}`, read with `useCopy({ pt, en })`. Shared strings live in `src/i18n/ui.ts`. English SEO metadata lives in `src/lib/tool-seo-en/`. Format numbers and dates with `INTL_LOCALE[locale]` and `DATE_FNS_LOCALE[locale]`. Lib functions return codes, not user-facing text. An inline script in `<head>` (`src/lib/locale-redirect.ts`) redirects first-time visitors to their browser language through the `hreflang` alternates, skipping crawlers and respecting the choice saved by the language switcher.
