// ---------------------------------------------------------------------------
// SEED-DATA — platshållarverksamheter i Stockholm.
//
// ⚠️  Byts ut mot riktig data senare (Excel → JSON → mappa till Verksamhet).
//     lng/lat måste vara riktiga WGS84-värden (driver kartan).
// ---------------------------------------------------------------------------

import type { Verksamhet, Guide, Kategori, VerksamhetTyp, Narpunkt } from './types';

type Bas = Omit<Verksamhet, 'bekvamligheter' | 'aktiviteter' | 'naromrade'>;

const bas: Bas[] = [
  {
    id: '1', slug: 'atelje-savja', namn: 'Ateljé Sävja',
    omrade: 'Södermalm', kommun: 'Stockholm',
    inriktning: 'Skapande & hantverk', kategori: 'skapande',
    scene: 'atelje', galleri: ['atelje', 'atelje2', 'garden', 'cafe'],
    kort: 'Lugn verkstad med keramik, textil och måleri. Gott om tid och tydlig struktur.',
    subtitel: 'Kreativt konstcenter med måleri, keramik och textil i hjärtat av Södermalm.',
    beskrivning:
      'Ateljé Sävja är en lugn och välkomnande verkstad för dig som vill utforska skapande i alla dess former. Vi arbetar med keramik, textil och måleri i en ljus och rymlig lokal nära Nytorget. Varje deltagare får stöd att uttrycka sig på sitt eget sätt, oavsett erfarenhet, och dagen har en fast och förutsägbar rytm.',
    chips: ['Skapande', 'Lugn miljö', 'Bildstöd'],
    gruppstorlek: '6–8 deltagare', storlek: 'mellan',
    kommunikation: 'Bildstöd & AKK', miljo: 'Lugn, inomhus',
    hallplats: 'Medborgarplatsen, 6 min',
    inriktningTaggar: ['Skapande', 'Hantverk'],
    miljoTaggar: ['Lugn', 'Inomhus'],
    stod: ['Bildstöd', 'AKK'],
    adress: 'Nytorgsgatan 30, 116 40 Stockholm',
    oppettider: 'Måndag–fredag 09:00–15:00',
    telefon: '08-123 45 60', epost: 'kontakt@ateljesavja.se', webb: 'ateljesavja.se',
    lng: 18.0807, lat: 59.3128,
    enVanligDag: [
      { tid: '09:00', titel: 'Morgonsamling', text: 'Vi säger godmorgon, går igenom dagen med bildschema och väljer aktivitet.' },
      { tid: '10:00', titel: 'Skapande pass', text: 'Keramik, textil eller måleri — i din takt, med stöd av personal.' },
      { tid: '11:30', titel: 'Gemensam lunch', text: 'Vi lagar och äter tillsammans i ett lugnt rum.' },
      { tid: '13:00', titel: 'Utevistelse', text: 'En kort promenad eller tid i den gröna innergården.' },
      { tid: '14:30', titel: 'Avslut', text: 'Vi visar vad vi gjort, städar undan och tar farväl.' },
    ],
  },
  {
    id: '2', slug: 'grona-garden-arsta', namn: 'Gröna Gården',
    omrade: 'Årsta', kommun: 'Stockholm',
    inriktning: 'Natur & odling', kategori: 'natur',
    scene: 'garden', galleri: ['garden', 'skog', 'djur', 'atelje'],
    kort: 'Odling, växthus och djurskötsel utomhus. Vi följer årstiderna tillsammans.',
    subtitel: 'Stadsnära odling och djurskötsel i en grön och trygg miljö.',
    beskrivning:
      'Hos Gröna Gården arbetar vi utomhus med odling, växthus och djurskötsel. Vi följer årstiderna och varje deltagare hittar sina uppgifter i lugn takt. Här finns gott om plats, frisk luft och tydliga rutiner för dagen.',
    chips: ['Utomhus', 'Natur', 'Djur'],
    gruppstorlek: '4–6 deltagare', storlek: 'liten',
    kommunikation: 'AKK & tydliggörande', miljo: 'Utomhus, grönt',
    hallplats: 'Årsta torg, 8 min',
    inriktningTaggar: ['Natur', 'Hantverk'],
    miljoTaggar: ['Utomhus', 'Lugn'],
    stod: ['AKK', 'Tydliggörande'],
    adress: 'Årstavägen 62, 120 55 Årsta',
    oppettider: 'Måndag–fredag 08:30–15:00',
    telefon: '08-123 45 61', epost: 'hej@gronagarden.se', webb: 'gronagarden.se',
    lng: 18.0430, lat: 59.2986,
    enVanligDag: [
      { tid: '09:00', titel: 'Morgonsamling', text: 'Vi ses i växthuset, går igenom dagens uppgifter med bildstöd.' },
      { tid: '09:45', titel: 'I trädgården', text: 'Så, vattna och skörda — eller ta hand om djuren.' },
      { tid: '12:00', titel: 'Lunch i det gröna', text: 'Vi äter tillsammans, gärna ute när vädret tillåter.' },
      { tid: '13:00', titel: 'Lugnt pass', text: 'Krukor, frön eller vila i lugn miljö.' },
      { tid: '14:30', titel: 'Avslut', text: 'Vi går igenom dagen och säger hej då.' },
    ],
  },
  {
    id: '3', slug: 'studio-ljudverket', namn: 'Studio Ljudverket',
    omrade: 'Vasastan', kommun: 'Stockholm',
    inriktning: 'Musik & ljud', kategori: 'musik',
    scene: 'musik', galleri: ['musik', 'media', 'atelje2', 'cafe'],
    kort: 'Spela, sjunga och skapa ljud i ett lugnt rum med bra ljudmiljö och hörselstöd.',
    subtitel: 'En musikstudio där du spelar, sjunger och skapar i lugn takt.',
    beskrivning:
      'Studio Ljudverket är en plats för musik och ljud. Vi spelar, sjunger och skapar egna låtar i ett rum med genomtänkt ljudmiljö och hörselstöd. Tempot är lugnt och du väljer själv hur mycket du vill delta.',
    chips: ['Musik', 'Media', 'Lugn miljö'],
    gruppstorlek: '5–7 deltagare', storlek: 'mellan',
    kommunikation: 'Tydliggörande', miljo: 'Lugn, ljuddämpad',
    hallplats: 'Odenplan, 4 min',
    inriktningTaggar: ['Musik', 'Media'],
    miljoTaggar: ['Lugn', 'Inomhus', 'Strukturerat'],
    stod: ['Tydliggörande', 'Hörselstöd'],
    adress: 'Dalagatan 40, 113 24 Stockholm',
    oppettider: 'Måndag–fredag 09:15–15:15',
    telefon: '08-123 45 62', epost: 'studio@ljudverket.se', webb: 'ljudverket.se',
    lng: 18.0490, lat: 59.3430,
    enVanligDag: [
      { tid: '09:15', titel: 'Morgonsamling', text: 'Vi lyssnar på musik och väljer dagens aktivitet.' },
      { tid: '10:00', titel: 'Musikpass', text: 'Spela instrument, sjunga eller spela in — i din takt.' },
      { tid: '11:45', titel: 'Lunch', text: 'Vi äter tillsammans i ett lugnt rum.' },
      { tid: '13:00', titel: 'Skapa ljud', text: 'Enkla inspelningar och ljudlek med stöd.' },
      { tid: '14:30', titel: 'Avslut', text: 'Vi lyssnar på det vi gjort och tar farväl.' },
    ],
  },
  {
    id: '4', slug: 'kafeet-vid-torget', namn: 'Kaféet vid Torget',
    omrade: 'Hägersten', kommun: 'Stockholm',
    inriktning: 'Café & servering', kategori: 'cafe',
    scene: 'cafe', galleri: ['cafe', 'atelje', 'garden', 'atelje2'],
    kort: 'Baka, servera och möta gäster i ett riktigt kafé. Tydliga rutiner varje dag.',
    subtitel: 'Ett riktigt kafé där du bakar, serverar och möter gäster.',
    beskrivning:
      'Kaféet vid Torget är en daglig verksamhet i ett riktigt kafé. Här bakar vi, dukar och möter gäster med stöd av tydliga rutiner. Varje deltagare har sina uppgifter och vi tar det i lugn takt.',
    chips: ['Servering', 'Socialt', 'Struktur'],
    gruppstorlek: '6–8 deltagare', storlek: 'mellan',
    kommunikation: 'Bildstöd', miljo: 'Socialt, inomhus',
    hallplats: 'Axelsberg, 5 min',
    inriktningTaggar: ['Hantverk'],
    miljoTaggar: ['Inomhus', 'Strukturerat'],
    stod: ['Bildstöd'],
    adress: 'Personnevägen 4, 126 33 Hägersten',
    oppettider: 'Måndag–fredag 08:30–15:00',
    telefon: '08-123 45 63', epost: 'kafe@vidtorget.se', webb: 'kafeetvidtorget.se',
    lng: 17.9990, lat: 59.3018,
    enVanligDag: [
      { tid: '08:30', titel: 'Öppning', text: 'Vi förbereder kaféet och går igenom dagen med bildschema.' },
      { tid: '10:00', titel: 'Bakning & servering', text: 'Baka, duka och möta gäster med stöd.' },
      { tid: '12:00', titel: 'Lunch', text: 'Vi äter tillsammans innan eftermiddagen.' },
      { tid: '13:00', titel: 'Lugnare pass', text: 'Diska, städa och förbereda inför morgondagen.' },
      { tid: '14:30', titel: 'Avslut', text: 'Vi summerar dagen och tar farväl.' },
    ],
  },
  {
    id: '5', slug: 'skogsglantan-bromma', namn: 'Skogsgläntan',
    omrade: 'Bromma', kommun: 'Stockholm',
    inriktning: 'Natur & rörelse', kategori: 'rorelse',
    scene: 'skog', galleri: ['skog', 'garden', 'djur', 'musik'],
    kort: 'Friluftsliv, promenader och lugn rörelse i naturen — i din egen takt.',
    subtitel: 'Friluftsliv och lugn rörelse nära naturen i Bromma.',
    beskrivning:
      'Skogsgläntan är en verksamhet nära naturen. Vi ägnar dagarna åt friluftsliv, promenader och lugn rörelse. Här finns tid att andas, och aktiviteterna anpassas helt efter varje deltagare.',
    chips: ['Utomhus', 'Natur', 'Rörelse'],
    gruppstorlek: '4–6 deltagare', storlek: 'liten',
    kommunikation: 'AKK', miljo: 'Utomhus, skog',
    hallplats: 'Åkeshov, 7 min',
    inriktningTaggar: ['Natur', 'Sport'],
    miljoTaggar: ['Utomhus', 'Lugn'],
    stod: ['AKK'],
    adress: 'Åkeshovsvägen 10, 168 39 Bromma',
    oppettider: 'Måndag–fredag 09:00–15:00',
    telefon: '08-123 45 64', epost: 'info@skogsglantan.se', webb: 'skogsglantan.se',
    lng: 17.9390, lat: 59.3345,
    enVanligDag: [
      { tid: '09:00', titel: 'Morgonsamling', text: 'Vi ses vid stugan och planerar dagen med bildstöd.' },
      { tid: '09:45', titel: 'Ut i naturen', text: 'Promenad, enkel rörelse eller lugn utevistelse.' },
      { tid: '12:00', titel: 'Lunch vid elden', text: 'Vi äter tillsammans, ute eller inne.' },
      { tid: '13:00', titel: 'Lugnt pass', text: 'Vila, naturpyssel eller en kort tur.' },
      { tid: '14:30', titel: 'Avslut', text: 'Vi samlas, går igenom dagen och tar farväl.' },
    ],
  },
  {
    id: '6', slug: 'verkstan-media-lab', namn: 'Verkstan Media Lab',
    omrade: 'Kungsholmen', kommun: 'Stockholm',
    inriktning: 'Film & media', kategori: 'media',
    scene: 'media', galleri: ['media', 'musik', 'atelje2', 'cafe'],
    kort: 'Foto, film och digitalt skapande med lugnt tempo och personligt stöd.',
    subtitel: 'Foto, film och digitalt skapande med lugnt tempo.',
    beskrivning:
      'Verkstan Media Lab är en verksamhet för foto, film och digitalt skapande. Vi arbetar med lugnt tempo och personligt stöd, och varje deltagare hittar sitt uttryck — framför eller bakom kameran.',
    chips: ['Media', 'Digitalt', 'Skapande'],
    gruppstorlek: '5–7 deltagare', storlek: 'mellan',
    kommunikation: 'Tydliggörande', miljo: 'Lugn, inomhus',
    hallplats: 'Fridhemsplan, 5 min',
    inriktningTaggar: ['Media', 'Skapande'],
    miljoTaggar: ['Inomhus', 'Lugn'],
    stod: ['Tydliggörande', 'Bildstöd'],
    adress: 'Sankt Eriksgatan 48, 112 34 Stockholm',
    oppettider: 'Måndag–fredag 09:15–15:15',
    telefon: '08-123 45 65', epost: 'hej@medialab.se', webb: 'verkstanmedialab.se',
    lng: 18.0300, lat: 59.3300,
    enVanligDag: [
      { tid: '09:15', titel: 'Morgonsamling', text: 'Vi går igenom dagens projekt med bildstöd.' },
      { tid: '10:00', titel: 'Media-pass', text: 'Foto, film eller redigering — i din takt.' },
      { tid: '11:45', titel: 'Lunch', text: 'Vi äter tillsammans i ett lugnt rum.' },
      { tid: '13:00', titel: 'Visning', text: 'Vi tittar på det vi skapat och delar med varandra.' },
      { tid: '14:30', titel: 'Avslut', text: 'Vi summerar och tar farväl.' },
    ],
  },
  {
    id: '7', slug: 'odlingslabbet-enskede', namn: 'Odlingslabbet',
    omrade: 'Enskede', kommun: 'Stockholm',
    inriktning: 'Natur & odling', kategori: 'natur',
    scene: 'garden', galleri: ['garden', 'atelje', 'skog', 'djur'],
    kort: 'Stadsodling och enkelt hantverk i en lugn och grön miljö.',
    subtitel: 'Stadsodling och återbruk i en lugn, grön miljö.',
    beskrivning:
      'Odlingslabbet kombinerar stadsodling med enkelt hantverk. Vi odlar, återbrukar och skapar i en lugn och grön miljö där dagen har en tydlig och trygg struktur.',
    chips: ['Natur', 'Skapande', 'Lugn miljö'],
    gruppstorlek: '5–7 deltagare', storlek: 'mellan',
    kommunikation: 'Bildstöd & AKK', miljo: 'Grönt, inne & ute',
    hallplats: 'Enskede gård, 6 min',
    inriktningTaggar: ['Natur', 'Skapande'],
    miljoTaggar: ['Utomhus', 'Inomhus', 'Lugn'],
    stod: ['Bildstöd', 'AKK'],
    adress: 'Enskedevägen 105, 122 44 Enskede',
    oppettider: 'Måndag–fredag 09:00–15:00',
    telefon: '08-123 45 66', epost: 'kontakt@odlingslabbet.se', webb: 'odlingslabbet.se',
    lng: 18.0850, lat: 59.2830,
    enVanligDag: [
      { tid: '09:00', titel: 'Morgonsamling', text: 'Vi planerar dagen tillsammans med bildstöd.' },
      { tid: '10:00', titel: 'Odling & hantverk', text: 'Så, plantera eller skapa något av återbruk.' },
      { tid: '12:00', titel: 'Lunch', text: 'Vi lagar och äter tillsammans.' },
      { tid: '13:00', titel: 'Lugnt pass', text: 'Kruklek, vila eller en stund i trädgården.' },
      { tid: '14:30', titel: 'Avslut', text: 'Vi går igenom dagen och tar farväl.' },
    ],
  },
  {
    id: '8', slug: 'ljusverkstan-farsta', namn: 'Ljusverkstan',
    omrade: 'Farsta', kommun: 'Stockholm',
    inriktning: 'Skapande & hantverk', kategori: 'skapande',
    scene: 'atelje', galleri: ['atelje', 'atelje2', 'cafe', 'garden'],
    kort: 'Ljusstöpning, ateljéarbete och enkel servering i trygg miljö.',
    subtitel: 'Ljusstöpning och ateljéarbete i en trygg, överskådlig miljö.',
    beskrivning:
      'Ljusverkstan är en verksamhet där vi stöper ljus, arbetar i ateljén och sköter en liten servering. Det är en trygg och överskådlig miljö där varje deltagare får uppgifter som passar just dem.',
    chips: ['Skapande', 'Servering', 'Struktur'],
    gruppstorlek: '6–8 deltagare', storlek: 'mellan',
    kommunikation: 'Bildstöd', miljo: 'Lugn, inomhus',
    hallplats: 'Farsta centrum, 4 min',
    inriktningTaggar: ['Skapande', 'Hantverk'],
    miljoTaggar: ['Inomhus', 'Lugn', 'Strukturerat'],
    stod: ['Bildstöd'],
    adress: 'Farstavägen 20, 123 47 Farsta',
    oppettider: 'Måndag–fredag 09:00–15:00',
    telefon: '08-123 45 67', epost: 'info@ljusverkstan.se', webb: 'ljusverkstan.se',
    lng: 18.0930, lat: 59.2440,
    enVanligDag: [
      { tid: '09:00', titel: 'Morgonsamling', text: 'Vi hälsar och går igenom dagen med bildschema.' },
      { tid: '10:00', titel: 'Ateljépass', text: 'Ljusstöpning eller eget skapande med stöd.' },
      { tid: '11:45', titel: 'Lunch', text: 'Vi äter tillsammans i lugn miljö.' },
      { tid: '13:00', titel: 'Servering', text: 'Enkla uppgifter i serveringen, i din takt.' },
      { tid: '14:30', titel: 'Avslut', text: 'Vi summerar dagen och tar farväl.' },
    ],
  },
];

// Profildata (bekvämligheter, aktiviteter, närområde) — separerat för läsbarhet.
const extra: Record<string, { bekvamligheter: string[]; aktiviteter: string[]; naromrade: Narpunkt[] }> = {
  'atelje-savja': {
    bekvamligheter: ['Tillgänglig lokal', 'Lugna rum', 'Lunch ingår', 'Bildstöd', 'Vilrum'],
    aktiviteter: ['Keramik', 'Måleri', 'Textil', 'Utställningar', 'Fika & samtal'],
    naromrade: [
      { typ: 'tunnelbana', namn: 'Medborgarplatsen', avstand: '450 m' },
      { typ: 'buss', namn: 'Nytorget', avstand: '120 m' },
      { typ: 'natur', namn: 'Vitabergsparken', avstand: '350 m' },
      { typ: 'restaurang', namn: 'Café Nytorget', avstand: '90 m' },
    ],
  },
  'grona-garden-arsta': {
    bekvamligheter: ['Utomhusmiljö', 'Nära natur', 'Rullstolsanpassat', 'Lunch ingår', 'Vilrum'],
    aktiviteter: ['Odling', 'Växthus', 'Djurskötsel', 'Utflykter', 'Skörd & matlagning'],
    naromrade: [
      { typ: 'tunnelbana', namn: 'Årsta torg', avstand: '650 m' },
      { typ: 'buss', namn: 'Årstafältet', avstand: '200 m' },
      { typ: 'natur', namn: 'Årstafältet', avstand: '150 m' },
      { typ: 'butik', namn: 'ICA Årsta', avstand: '400 m' },
    ],
  },
  'studio-ljudverket': {
    bekvamligheter: ['Ljuddämpade rum', 'Hörselstöd', 'Lugna rum', 'Tillgänglig lokal', 'Vilrum'],
    aktiviteter: ['Spela instrument', 'Sång', 'Inspelning', 'Lyssning', 'Ljudlek'],
    naromrade: [
      { typ: 'tunnelbana', namn: 'Odenplan', avstand: '300 m' },
      { typ: 'pendel', namn: 'Odenplan', avstand: '320 m' },
      { typ: 'restaurang', namn: 'Café Vasa', avstand: '110 m' },
      { typ: 'natur', namn: 'Vasaparken', avstand: '250 m' },
    ],
  },
  'kafeet-vid-torget': {
    bekvamligheter: ['Tillgänglig lokal', 'Tydliga rutiner', 'Bildstöd', 'Lunch ingår', 'Socialt'],
    aktiviteter: ['Bakning', 'Servering', 'Kassa', 'Dukning', 'Möta gäster'],
    naromrade: [
      { typ: 'tunnelbana', namn: 'Axelsberg', avstand: '350 m' },
      { typ: 'buss', namn: 'Hägerstensvägen', avstand: '150 m' },
      { typ: 'restaurang', namn: 'Torgcaféet', avstand: '40 m' },
      { typ: 'butik', namn: 'Hemköp', avstand: '220 m' },
    ],
  },
  'skogsglantan-bromma': {
    bekvamligheter: ['Utomhusmiljö', 'Nära natur', 'Vilrum', 'Lugna rum', 'Lunch ingår'],
    aktiviteter: ['Promenader', 'Naturpyssel', 'Enkel rörelse', 'Utevistelse', 'Eldning & fika'],
    naromrade: [
      { typ: 'tunnelbana', namn: 'Åkeshov', avstand: '500 m' },
      { typ: 'buss', namn: 'Åkeshovs slott', avstand: '180 m' },
      { typ: 'natur', namn: 'Judarskogen', avstand: '300 m' },
      { typ: 'butik', namn: 'Kiosk Åkeshov', avstand: '450 m' },
    ],
  },
  'verkstan-media-lab': {
    bekvamligheter: ['Tillgänglig lokal', 'Lugna rum', 'Anpassade skärmar', 'Vilrum', 'Bildstöd'],
    aktiviteter: ['Foto', 'Film', 'Redigering', 'Poddar', 'Visningar'],
    naromrade: [
      { typ: 'tunnelbana', namn: 'Fridhemsplan', avstand: '350 m' },
      { typ: 'buss', namn: 'Sankt Eriksgatan', avstand: '90 m' },
      { typ: 'restaurang', namn: 'Café Fridhem', avstand: '120 m' },
      { typ: 'natur', namn: 'Rålambshovsparken', avstand: '600 m' },
    ],
  },
  'odlingslabbet-enskede': {
    bekvamligheter: ['Utomhusmiljö', 'Nära natur', 'Tillgänglig lokal', 'Bildstöd', 'Lunch ingår'],
    aktiviteter: ['Odling', 'Återbruk', 'Krukmakeri', 'Utevistelse', 'Skörd'],
    naromrade: [
      { typ: 'tunnelbana', namn: 'Enskede gård', avstand: '450 m' },
      { typ: 'buss', namn: 'Enskedevägen', avstand: '130 m' },
      { typ: 'natur', namn: 'Enskede gårds koloniträdgård', avstand: '200 m' },
      { typ: 'butik', namn: 'Coop Enskede', avstand: '500 m' },
    ],
  },
  'ljusverkstan-farsta': {
    bekvamligheter: ['Tillgänglig lokal', 'Överskådlig miljö', 'Tydliga rutiner', 'Bildstöd', 'Lunch ingår'],
    aktiviteter: ['Ljusstöpning', 'Ateljéarbete', 'Servering', 'Pyssel', 'Utställningar'],
    naromrade: [
      { typ: 'tunnelbana', namn: 'Farsta centrum', avstand: '300 m' },
      { typ: 'buss', namn: 'Farsta centrum', avstand: '120 m' },
      { typ: 'restaurang', namn: 'Café Farsta', avstand: '80 m' },
      { typ: 'natur', namn: 'Farstanäset', avstand: '700 m' },
    ],
  },
};

export const verksamheter: Verksamhet[] = bas.map((v) => ({ ...v, ...extra[v.slug] }));

export const kategoriEtiketter: Record<Kategori, string> = {
  skapande: 'Skapande & hantverk',
  natur: 'Natur & odling',
  musik: 'Musik & ljud',
  media: 'Film & media',
  cafe: 'Café & servering',
  djur: 'Djur & lantliv',
  rorelse: 'Natur & rörelse',
};

// --- filteralternativ ------------------------------------------------------
export const VERKSAMHETSTYPER: VerksamhetTyp[] = [
  { id: 'daglig', label: 'Daglig verksamhet', snart: false },
  { id: 'gruppbostad', label: 'Gruppbostad', snart: true },
  { id: 'servicebostad', label: 'Servicebostad', snart: true },
  { id: 'korttids', label: 'Korttidsboende', snart: true },
];
export const INRIKTNINGAR = ['Skapande', 'Natur', 'Media', 'Musik', 'Sport', 'Hantverk'];
export const MILJOER = ['Lugn', 'Utomhus', 'Inomhus', 'Strukturerat'];
export const STORLEKAR: { id: 'liten' | 'mellan' | 'stor'; label: string }[] = [
  { id: 'liten', label: 'Liten (1–5)' },
  { id: 'mellan', label: 'Mellan (6–8)' },
  { id: 'stor', label: 'Stor (9+)' },
];

export const snabbfilter = ['Lugn miljö', 'Bildstöd', 'Utomhus', 'Liten grupp', 'Nära pendeltåg'];

export const STADSDELAR = [
  'Södermalm', 'Norrmalm', 'Östermalm', 'Vasastan', 'Kungsholmen', 'Gamla Stan',
  'Årsta', 'Enskede', 'Hägersten', 'Liljeholmen', 'Bromma', 'Farsta',
  'Bagarmossen', 'Skarpnäck', 'Vällingby', 'Skärholmen',
];

export function getBySlug(slug: string): Verksamhet | undefined {
  return verksamheter.find((v) => v.slug === slug);
}

export const guider: Guide[] = [
  { scene: 'guide1', kategori: 'Inför besöket', titel: 'Förbered ett studiebesök', text: 'En lugn checklista för dig och din familj — vad ni kan fråga och vad ni kan förvänta er.' },
  { scene: 'guide2', kategori: 'Grunderna', titel: 'Vad är daglig verksamhet?', text: 'Kort och tydligt om vad LSS-insatsen innebär och hur valet går till, för hela familjen.' },
  { scene: 'guide3', kategori: 'Kommunikation', titel: 'Bildstöd, AKK och tecken', text: 'Olika sätt att kommunicera — och hur du känner igen dem i en verksamhets profil.' },
];
