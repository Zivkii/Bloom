// ---------------------------------------------------------------------------
// Lugna illustrationer (inga externa bilder) — samma bildspråk som prototypen.
// Varje funktion returnerar en självständig SVG-sträng.
// ---------------------------------------------------------------------------

function s(bg: string, sky: string, body: string): string {
  return (
    '<svg viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice" role="img" aria-hidden="true">' +
    '<rect width="400" height="300" fill="' + bg + '"/>' +
    (sky || '') + body + '</svg>'
  );
}
const sun = (cx: number, cy: number, c: string) =>
  '<circle cx="' + cx + '" cy="' + cy + '" r="34" fill="' + c + '" opacity=".55"/>';

const scenes: Record<string, () => string> = {
  heroDusk() {
    let rooftops = '';
    for (let i = 0; i < 24; i++) {
      const bx = i * 54 - 12;
      const bh = 44 + ((i * 37) % 78);
      rooftops += '<rect x="' + bx + '" y="' + (520 - bh) + '" width="48" height="' + bh + '"/>';
    }
    rooftops += '<path d="M300 470 L316 408 L332 470Z"/><path d="M770 470 L786 398 L802 470Z"/>';
    const plants =
      '<path d="M0 760 C 46 676 96 690 74 760Z"/><path d="M58 760 C 92 656 154 700 122 760Z"/>' +
      '<path d="M1200 760 C1156 676 1104 690 1128 760Z"/><path d="M1142 760 C1176 662 1092 692 1078 760Z"/>';
    return (
      '<svg viewBox="0 0 1200 760" preserveAspectRatio="xMidYMid slice" role="img" aria-hidden="true">' +
      '<defs><linearGradient id="bhSky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#F7DCAC"/><stop offset="0.42" stop-color="#EFC79A"/><stop offset="0.72" stop-color="#D6B49B"/><stop offset="1" stop-color="#B8A79A"/></linearGradient>' +
      '<linearGradient id="bhWater" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#C7B69C"/><stop offset="1" stop-color="#9A8F80"/></linearGradient></defs>' +
      '<rect width="1200" height="760" fill="url(#bhSky)"/>' +
      '<circle cx="885" cy="250" r="120" fill="#FBE9C4" opacity=".65"/><circle cx="885" cy="250" r="62" fill="#FDF3DE" opacity=".9"/>' +
      '<path d="M0 432 Q 300 384 600 420 T 1200 410 V520 H0Z" fill="#C6AB97" opacity=".55"/>' +
      '<g fill="#A98F86" opacity=".82">' + rooftops + '</g>' +
      '<rect y="520" width="1200" height="240" fill="url(#bhWater)"/>' +
      '<rect x="852" y="520" width="66" height="240" fill="#F7E7C6" opacity=".32"/>' +
      '<g fill="#6E8358" opacity=".85">' + plants + '</g>' +
      '</svg>'
    );
  },
  atelje: () =>
    s('#E9DFCD',
      '<rect x="0" y="0" width="400" height="185" fill="#EFE7D6"/>' + sun(320, 60, '#E7C79A'),
      '<rect x="235" y="40" width="120" height="120" rx="8" fill="#F5EFE2" stroke="#DcCcae" stroke-width="2"/>' +
      '<path d="M245 150 L275 70 L305 150 Z" fill="#CDA875" opacity=".5"/>' +
      '<rect x="0" y="185" width="400" height="115" fill="#D9C7A6"/>' +
      '<ellipse cx="90" cy="205" rx="60" ry="16" fill="#C9B48E"/>' +
      '<rect x="60" y="150" width="10" height="58" rx="3" fill="#B79A6a"/><rect x="110" y="150" width="10" height="58" rx="3" fill="#B79A6a"/>' +
      '<path d="M300 300c0-40 8-70 8-70s10 30 10 70" fill="#7C9A6A" opacity=".7"/><path d="M312 240c0-24 14-40 14-40s-2 26-14 40" fill="#8FAe79"/>'),
  atelje2: () =>
    s('#E7DAC6', '',
      '<rect x="0" y="0" width="400" height="300" fill="#EAE0CE"/>' +
      '<circle cx="150" cy="150" r="70" fill="#D8BE96"/>' +
      '<circle cx="150" cy="150" r="46" fill="#EBDFC9"/>' +
      '<circle cx="150" cy="150" r="20" fill="#C29B67"/>' +
      '<rect x="250" y="110" width="90" height="90" rx="12" fill="#CBB68f" opacity=".7"/>'),
  garden: () =>
    s('#DDE6D2',
      '<rect x="0" y="0" width="400" height="150" fill="#E6EDDD"/>' + sun(70, 55, '#CFE0A6'),
      '<rect x="0" y="180" width="400" height="120" fill="#B9CBA0"/>' +
      '<rect x="40" y="185" width="120" height="60" rx="6" fill="#8CA876"/>' +
      '<rect x="230" y="195" width="120" height="55" rx="6" fill="#7E9C68"/>' +
      '<path d="M100 185c0-30 6-46 6-46s8 18 8 46" fill="#6E8E56"/>' +
      '<path d="M285 195c0-26 6-40 6-40s8 16 8 40" fill="#6E8E56"/>' +
      '<circle cx="106" cy="150" r="8" fill="#D68C6A"/><circle cx="291" cy="163" r="7" fill="#E0A05A"/>'),
  musik: () =>
    s('#DED7E0',
      '<rect x="0" y="0" width="400" height="300" fill="#D9D2E0"/>' + sun(310, 70, '#B7A6C9'),
      '<rect x="0" y="200" width="400" height="100" fill="#B8AEC6"/>' +
      '<rect x="60" y="150" width="180" height="52" rx="6" fill="#5B5168"/>' +
      '<rect x="60" y="150" width="180" height="14" rx="4" fill="#6E6379"/>' +
      '<g fill="#EDE7F1"><rect x="70" y="168" width="12" height="30"/><rect x="90" y="168" width="12" height="30"/><rect x="110" y="168" width="12" height="30"/><rect x="130" y="168" width="12" height="30"/></g>' +
      '<circle cx="300" cy="150" r="7" fill="#7A6E88"/><rect x="306" y="120" width="3" height="33" fill="#7A6E88"/>'),
  cafe: () =>
    s('#E9DAC9',
      '<rect x="0" y="0" width="400" height="170" fill="#EFE2D2"/>',
      '<rect x="0" y="170" width="400" height="130" fill="#CDB393"/>' +
      '<rect x="60" y="120" width="120" height="70" rx="8" fill="#B98F63"/>' +
      '<path d="M210 150c0-16 14-26 30-26s30 10 30 26v14h-60z" fill="#F1E7D8"/>' +
      '<path d="M270 150h14a10 10 0 0 1 0 20h-14" fill="none" stroke="#F1E7D8" stroke-width="6"/>' +
      '<path d="M232 118c-3-6 3-10 0-16M250 118c-3-6 3-10 0-16" stroke="#C7A986" stroke-width="3" fill="none"/>'),
  skog: () =>
    s('#D6E0D6',
      '<rect x="0" y="0" width="400" height="200" fill="#E0E8DE"/>' + sun(330, 60, '#BcD0A8'),
      '<rect x="0" y="210" width="400" height="90" fill="#AFC29A"/>' +
      '<path d="M70 215 90 120 110 215Z" fill="#5F7E52"/><path d="M60 215 90 150 120 215Z" fill="#6E8E5D"/>' +
      '<path d="M300 215 320 130 340 215Z" fill="#5F7E52"/><path d="M290 215 320 160 350 215Z" fill="#6E8E5D"/>' +
      '<path d="M170 215 200 145 230 215Z" fill="#547449"/>' +
      '<path d="M20 240q180 -30 360 0" stroke="#C9B48E" stroke-width="18" fill="none" opacity=".7"/>'),
  media: () =>
    s('#DAD8CE',
      '<rect x="0" y="0" width="400" height="300" fill="#D5D3C9"/>',
      '<rect x="70" y="80" width="180" height="120" rx="10" fill="#3E4640"/>' +
      '<rect x="82" y="92" width="156" height="96" rx="6" fill="#8FA9A0"/>' +
      '<path d="M150 118 182 140 150 162Z" fill="#EDF1EE"/>' +
      '<rect x="130" y="200" width="60" height="10" rx="4" fill="#565E57"/>' +
      '<rect x="150" y="200" width="20" height="30" fill="#565E57"/>' +
      '<circle cx="300" cy="120" r="24" fill="#B7C2BB"/><circle cx="300" cy="120" r="10" fill="#3E4640"/>'),
  djur: () =>
    s('#E4E0CE',
      '<rect x="0" y="0" width="400" height="170" fill="#EBE7D6"/>' + sun(80, 55, '#D8C48E'),
      '<rect x="0" y="185" width="400" height="115" fill="#BCC79A"/>' +
      '<path d="M250 185v-46l30-22 30 22v46z" fill="#B4785C"/>' +
      '<path d="M250 139l30-22 30 22" fill="none" stroke="#96604A" stroke-width="6"/>' +
      '<rect x="268" y="150" width="24" height="35" fill="#8F5F49"/>' +
      '<ellipse cx="110" cy="215" rx="34" ry="20" fill="#F0EBDD"/><circle cx="80" cy="205" r="14" fill="#F0EBDD"/>' +
      '<rect x="96" y="228" width="6" height="16" fill="#D9D2BE"/><rect x="120" y="228" width="6" height="16" fill="#D9D2BE"/>'),
  guide1: () =>
    s('#E7DFD0', '',
      '<rect width="400" height="300" fill="#EBE3D4"/><rect x="120" y="70" width="160" height="180" rx="10" fill="#F4EEE1" stroke="#DBCDB4" stroke-width="2"/><rect x="140" y="95" width="120" height="10" rx="4" fill="#CDB799"/><rect x="140" y="120" width="120" height="8" rx="4" fill="#DFD2B9"/><rect x="140" y="138" width="90" height="8" rx="4" fill="#DFD2B9"/><path d="M150 210c0-24 12-40 12-40s10 16 10 40" fill="#7E9C68"/>'),
  guide2: () =>
    s('#DDE6DC', '',
      '<rect width="400" height="300" fill="#E2EAE0"/><circle cx="200" cy="150" r="66" fill="#CBDCC8"/><path d="M200 118a20 20 0 0 1 0 40 20 20 0 0 0 0 24" fill="none" stroke="#3E7A61" stroke-width="7"/><circle cx="200" cy="108" r="7" fill="#3E7A61"/>'),
  guide3: () =>
    s('#E4DEE6', '',
      '<rect width="400" height="300" fill="#E7E1EC"/><rect x="110" y="95" width="80" height="110" rx="10" fill="#C9BDD6"/><rect x="210" y="95" width="80" height="110" rx="10" fill="#D9CFE2"/><path d="M150 150h8M240 150h8" stroke="#5B5168" stroke-width="6" stroke-linecap="round"/><path d="M190 150h20" stroke="#8B7CA0" stroke-width="4"/>'),
};

export function sceneSVG(name: string): string {
  return (scenes[name] || scenes.atelje)();
}
