# Bloom — Projekt Milan

En digital plattform, *"Hemnet för LSS"*, där deltagare och familjer kan söka,
jämföra och välja daglig verksamhet. Byggd tillgänglig från grunden (WCAG 2.2 AA),
med start i Stockholm.

## Kom igång

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # produktionsbygge till dist/
npm run preview    # förhandsvisa bygget
```

## MapTiler-nyckel

Kartan använder MapTiler. Nyckeln läses från `.env`:

```
VITE_MAPTILER_KEY=din_nyckel
```

`.env` är git-ignorerad. En mall finns i `.env.example`.

> **Innan lansering:** begränsa nyckeln i MapTiler-kontot under
> *Account → Keys → Allowed origins* till er domän. En frontend-nyckel är
> alltid synlig i webbläsaren — origin-begränsning är det som skyddar den.

## Byta ut platshållardata mot riktiga verksamheter

All verksamhetsdata bor på **ett** ställe: `src/data/verksamheter.ts`.
Resten av appen läser bara typen `Verksamhet` (se `src/data/types.ts`), så inget
annat behöver ändras när riktig data kommer.

När Excel-filen finns:

1. Exportera raderna till JSON.
2. Mappa varje rad till `Verksamhet`. Obligatoriskt för kartan:
   `lng` och `lat` måste vara riktiga WGS84-koordinater.
3. Ersätt arrayen `verksamheter` i `src/data/verksamheter.ts`
   (eller läs in från `public/verksamheter.json` om ni hellre vill det).

Fältet `scene` väljer vilken lugn illustration som visas (se
`src/data/scenes.ts`). När ni senare har riktiga foton byter vi ut
`Illustration`-komponenten mot bildkomponenter — datamodellen är redan förberedd.

## Struktur

```
src/
  data/         verksamheter.ts (data) · types.ts · scenes.ts (illustrationer)
  lib/          map.ts (MapTiler-stilar + centrum)
  hooks/        useTheme · useReveal
  components/   Header, Footer, Hero, SearchBar, Steps, VerksamhetCard,
                MapExplorer (MapTiler), MapSection, Insights, CTA, ...
  pages/        Home · Sok (sök + karta) · VerksamhetProfil
```

## Routes

- `/` — startsida (hero, sök, steg, utvalda, karta, tillgänglighet, guider)
- `/sok` — sök & filtrera med lista + karta sida vid sida
- `/verksamhet/:slug` — verksamhetsprofil ("En vanlig dag", fakta, karta)

Del av **Projekt Milan**.
