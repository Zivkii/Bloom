// MapTiler-konfiguration. Nyckeln läses från .env (VITE_MAPTILER_KEY).
// I produktion: begränsa nyckeln till er domän i MapTiler-kontot (Allowed origins).

export const MAPTILER_KEY = (process.env.NEXT_PUBLIC_MAPTILER_KEY as string | undefined) ?? '';

export const MAP_STYLES = {
  karta: `https://api.maptiler.com/maps/streets-v2/style.json?key=${MAPTILER_KEY}`,
  satellit: `https://api.maptiler.com/maps/satellite/style.json?key=${MAPTILER_KEY}`,
  hybrid: `https://api.maptiler.com/maps/hybrid/style.json?key=${MAPTILER_KEY}`,
} as const;

export type MapMode = keyof typeof MAP_STYLES;

/** Stockholm centrum (lng, lat). */
export const STOCKHOLM_CENTER: [number, number] = [18.0686, 59.3293];
