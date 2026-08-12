# mateuscardosogs.com

Personal site and CV of **Mateus Cardoso** — senior full-stack developer.

Bilingual (English at the root, Portuguese under `/pt`), prerendered to static HTML,
published to GitHub Pages on every push to `main`.

The design comes from the **MCode Design System** project on Claude Design: tokens,
components and copy rules are ported from there, and `src/styles/tokens.css` mirrors
its token files verbatim.

The **copy is authored separately from that project** — English is the original, and
`src/content/pt.ts` is an adaptation of it rather than a literal translation. When the
two drift, English wins. No number or case on this site was invented.

## Stack

| Piece | Choice |
| --- | --- |
| Build | Vite 6 + React 18 + TypeScript |
| Rendering | Static: `react-dom/server` at build time, one HTML file per route, hydrated on the client |
| Routing | None at runtime. Every route is a real file; navigation is plain `<a href>` |
| Styling | Hand-written CSS with design-system tokens. No framework, no CSS-in-JS |
| Contact form | [Web3Forms](https://web3forms.com) — a static-friendly POST, no backend |
| CV PDF | Headless Chrome printing the `/cv/` page |
| Hosting | GitHub Pages via Actions, custom domain from `public/CNAME` |

## Commands

```bash
npm install

npm run dev        # dev server, all routes browsable
npm run build      # client build → SSR build → prerender → dist/
npm run serve      # serve dist/ the way GitHub Pages does (clean URLs, 404.html)
npm run typecheck  # tsc --noEmit

npm run cv:pdf     # rebuild public/cv/*.pdf from the built /cv/ pages (needs a build first)
npm run images     # regenerate public/og.png and public/apple-touch-icon.png
```

`cv:pdf` and `images` are deliberately manual: their output is committed, so CI never
needs a browser.

## Routes

| URL | |
| --- | --- |
| `/` · `/pt/` | Home: hero → proof → cases → method → about → experience → contact |
| `/cases/{scraping,routing,apex}/` (+ `/pt/…`) | Full case: context → role → decision → trade-off → outcome |
| `/cv/` · `/pt/cv/` | One-column, ATS-safe CV, with a PDF next to it |
| `/404.html` | Fallback GitHub Pages serves for unknown paths |

`sitemap.xml` is generated at build time; `robots.txt` and `CNAME` live in `public/`.

## Where to change things

- **Copy, numbers, cases** — `src/content/en.ts` and `src/content/pt.ts`. Both implement
  the same `SiteContent` type, so a field added to one must be added to the other.
- **Links, e-mail, phone, form key** — `src/site.ts`.
- **Design tokens** — `src/styles/tokens.css` (keep in sync with Claude Design).
- **Components** — `src/ds/`. Sections — `src/sections/`. Pages — `src/pages/`.
- **New route** — add it to `routes.ts`; the prerender and sitemap pick it up.

### Contact form

`src/site.ts` holds `web3formsKey`. Get one at <https://web3forms.com> by entering
`contato@mateuscardosogs.com` — the key arrives by e-mail and is public by design,
since it can only send mail to that address. Until it is filled in, the form validates
and then falls back to opening a prefilled `mailto:`.

## Content rules

Inherited from the design system, and worth keeping:

- First person singular. Show, don't tell — no claim without an artefact or an outcome.
- The case title carries the **result**, not the technology.
- Every case names its trade-off. A case without one is not a case.
- Where a number is soft, the note says so ("validated demand, not a paying base").
- Client names never appear. Restricted work is described by architecture and magnitude.
- Sentence case in titles, mono uppercase in labels, no emoji anywhere.
