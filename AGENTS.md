# Project notes

UtiliTools is built with React 19 + Vite 8 and statically prerendered at build time (`src/entry-server.tsx` + `scripts/prerender.js`). Every page (home, one per tool and `404.html`) is rendered to HTML and then hydrated on the client by `src/entry-client.tsx`. Routes are resolved in `src/routes.ts` from the tool list in `src/lib/nav-tools.ts`; page metadata lives in `src/head.ts`. Tool components are loaded through `toolLoaders` in `src/components/tools/tool-view.tsx`. Imports use the `@/` alias for `src/`.

Components render on the server during `npm run build`, so browser APIs (`window`, `document`, `localStorage`) and random values must only be used inside effects or event handlers to keep hydration consistent.
