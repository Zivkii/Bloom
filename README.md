# Bloomly

En digital plattform, *"Hemnet för LSS"*, där deltagare och familjer kan söka,
jämföra och välja daglig verksamhet (och snart gruppbostad, servicebostad och
korttidsboende). Tillgänglig från grunden (WCAG 2.2 AA), med start i Stockholm.

Byggd med **Next.js (App Router)** + React + TypeScript, redo att deployas på **Vercel**.

## Kom igång

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # produktionsbygge (statisk generering av alla sidor)
npm run start      # kör produktionsbygget lokalt
npm run typecheck  # tsc --noEmit
```

## Miljövariabler

Kartan använder MapTiler. Nyckeln läses från `.env.local`:

```
NEXT_PUBLIC_MAPTILER_KEY=din_nyckel
# valfritt (används för sitemap, canonical, Open Graph):
NEXT_PUBLIC_SITE_URL=https://din-domän.se
```

`.env.local` är git-ignorerad. En mall finns i `.env.example`.

> **På Vercel:** lägg till `NEXT_PUBLIC_MAPTILER_KEY` (och gärna `NEXT_PUBLIC_SITE_URL`)
> under *Project → Settings → Environment Variables*. Begränsa MapTiler-nyckeln till
> er domän i MapTiler-kontot (*Allowed origins*) innan lansering — en frontend-nyckel
> är alltid synlig i webbläsaren.

## SEO & discoverability

- Varje verksamhet har en **egen, statiskt genererad sida** (`/verksamhet/[slug]`)
  med egen `<title>`, meta-description och Open Graph-taggar (`generateStaticParams`
  + `generateMetadata`).
- `app/sitemap.ts` genererar `/sitemap.xml` med alla verksamheter.
- `app/robots.ts` genererar `/robots.txt` (indexerar allt utom `/sparade` och `/jamfor`).
- Innehållet server-renderas → syns direkt för Google och vid delning.

## Struktur

```
src/
  app/                Next App Router
    layout.tsx        rot-layout: metadata, typsnitt, Header/Footer, providers
    page.tsx          startsida
    sok/              sök & filtrera
    verksamhet/[slug] verksamhetsprofil (SSG + generateMetadata)
    sparade/ jamfor/  favoriter / jämförelse
    sitemap.ts robots.ts icon.svg globals.css
  views/              klientvyer (Home/Sok/Profil/Sparade/Jamfor)
  components/         Header, Footer, Hero, MapExplorer (MapTiler), kort, ...
  data/               verksamheter.ts (data) · types.ts · scenes.ts (illustrationer)
  lib/                map.ts (MapTiler-stilar)
  hooks/ store/       useTheme/useReveal · collection (spara/jämför, localStorage)
```

## Byta ut platshållardata mot riktiga verksamheter

All verksamhetsdata bor på **ett** ställe: `src/data/verksamheter.ts`, typad av
`src/data/types.ts`. När Excel-filen finns: mappa varje rad till `Verksamhet`
(obligatoriskt: riktiga `lng`/`lat` för kartan) och ersätt arrayen. Sidorna,
sitemap och SEO-metadata uppdateras automatiskt vid nästa bygge.
