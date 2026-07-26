// ---------------------------------------------------------------------------
// Bloomly — datamodell för verksamheter
//
// Denna typ är den enda kontrakt-ytan mot resten av appen. När riktiga
// verksamheter finns i Excel: mappa varje rad till detta interface (se
// data/verksamheter.ts) — inget annat i appen behöver ändras.
// ---------------------------------------------------------------------------

/** Kategori styr filter + vilken lugn illustration som visas. */
export type Kategori =
  | 'skapande'
  | 'natur'
  | 'musik'
  | 'media'
  | 'cafe'
  | 'djur'
  | 'rorelse';

export interface DagPunkt {
  tid: string;
  titel: string;
  text: string;
}

export interface Verksamhet {
  /** Stabilt id (t.ex. från källdata). */
  id: string;
  /** URL-vänligt: /verksamhet/:slug */
  slug: string;

  namn: string;
  omrade: string;   // stadsdel, t.ex. "Södermalm"
  kommun: string;   // t.ex. "Stockholm"

  inriktning: string;   // kort etikett, t.ex. "Skapande & hantverk"
  kategori: Kategori;   // för filter + illustration
  scene: string;        // illustrationsnyckel (se data/scenes.ts)
  galleri: string[];    // illustrationsnycklar för profil-galleriet

  kort: string;         // 1 mening för kort
  beskrivning: string;  // längre klarspråkstext för profilen
  chips: string[];      // amenity-taggar

  subtitel: string;        // kort tagline under rubriken på profilen

  gruppstorlek: string;    // "6–8 deltagare"
  storlek: Storlek;        // för filter (gruppstorlek)
  kommunikation: string;   // "Bildstöd & AKK"
  miljo: string;           // "Lugn, inomhus"
  hallplats: string;       // "Medborgarplatsen, 6 min"

  // filter- + checklistfält
  inriktningTaggar: string[];  // "Skapande", "Hantverk" ...
  miljoTaggar: string[];       // "Lugn", "Utomhus", "Inomhus", "Strukturerat"
  stod: string[];              // kommunikationsstöd: "Bildstöd", "AKK", "TAKK" ...

  // kontaktuppgifter (visas i profilens kontaktkort)
  adress: string;
  oppettider: string;
  telefon: string;
  epost: string;
  webb: string;

  bekvamligheter: string[];   // vad som finns för deltagare (ikon-lista)
  aktiviteter: string[];      // vad verksamheten gör
  naromrade: Narpunkt[];      // kollektivtrafik + service i närområdet

  lng: number;  // longitud (WGS84) för kartan
  lat: number;  // latitud

  enVanligDag: DagPunkt[];
}

export interface Narpunkt {
  typ: 'buss' | 'tunnelbana' | 'pendel' | 'restaurang' | 'natur' | 'butik';
  namn: string;
  avstand: string;
}

export type Storlek = 'liten' | 'mellan' | 'stor';

export interface VerksamhetTyp {
  id: string;
  label: string;
  snart: boolean;
}

export interface Guide {
  scene: string;
  kategori: string;
  titel: string;
  text: string;
}
