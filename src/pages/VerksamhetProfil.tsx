import { Link, useParams } from 'react-router-dom';
import Illustration from '../components/Illustration';
import MapExplorer from '../components/Map';
import ListenButton from '../components/ListenButton';
import ContactCard from '../components/ContactCard';
import { getBySlug } from '../data/verksamheter';
import { useCollection } from '../store/collection';
import { useReveal } from '../hooks/useReveal';
import type { Narpunkt } from '../data/types';

function AmenityIcon({ label }: { label: string }) {
  const l = label.toLowerCase();
  const p = { width: 20, height: 20, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 1.7, 'aria-hidden': true } as const;
  if (l.includes('tillgäng') || l.includes('rullstol')) return <svg {...p}><circle cx="12" cy="4" r="1.6" /><path d="M12 6v6h5M8 10a5 5 0 1 0 6 7" /></svg>;
  if (l.includes('lugn') || l.includes('ljuddämp')) return <svg {...p}><path d="M20 14a8 8 0 1 1-9.9-9.9 7 7 0 0 0 9.9 9.9Z" /></svg>;
  if (l.includes('lunch') || l.includes('mat')) return <svg {...p}><path d="M6 3v7a2 2 0 0 0 4 0V3M8 3v18M18 3c-2 0-3 2-3 5s1 4 3 4v9" /></svg>;
  if (l.includes('bildstöd') || l.includes('bild')) return <svg {...p}><rect x="3" y="4" width="18" height="16" rx="2" /><circle cx="8.5" cy="9.5" r="1.6" /><path d="m5 18 4-4 3 3 4-4 3 3" /></svg>;
  if (l.includes('vilrum') || l.includes('vila')) return <svg {...p}><path d="M3 18v-5a2 2 0 0 1 2-2h9a3 3 0 0 1 3 3v4M3 14h18M3 18v2M21 17v3" /></svg>;
  if (l.includes('natur') || l.includes('utomhus') || l.includes('grön')) return <svg {...p}><path d="M12 22v-6M8 16a4 4 0 0 1-4-4c0-3 3-4 3-4a4 4 0 0 1 5-3 4 4 0 0 1 5 3s3 1 3 4a4 4 0 0 1-4 4Z" /></svg>;
  if (l.includes('hörsel')) return <svg {...p}><path d="M6 9a6 6 0 1 1 11 3c-1.5 2-3 2.5-3 4a2.5 2.5 0 0 1-5 .2M9 18h.01" /></svg>;
  if (l.includes('rutin') || l.includes('överskåd')) return <svg {...p}><path d="M8 6h12M8 12h12M8 18h12M4 6h.01M4 12h.01M4 18h.01" /></svg>;
  if (l.includes('social')) return <svg {...p}><circle cx="9" cy="8" r="3" /><path d="M4 20c0-3 2.5-5 5-5s5 2 5 5M16 11a3 3 0 1 0-1-5.8" /></svg>;
  if (l.includes('skärm') || l.includes('anpassad')) return <svg {...p}><rect x="3" y="4" width="18" height="12" rx="2" /><path d="M8 20h8M12 16v4" /></svg>;
  return <svg {...p}><circle cx="12" cy="12" r="9" opacity=".25" /><path d="m8 12 3 3 5-6" /></svg>;
}

function NarIcon({ typ }: { typ: Narpunkt['typ'] }) {
  const p = { width: 20, height: 20, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 1.7, 'aria-hidden': true } as const;
  if (typ === 'buss') return <svg {...p}><rect x="4" y="5" width="16" height="12" rx="2" /><path d="M4 12h16M7 20v-3M17 20v-3" /><circle cx="8" cy="17" r="1" /><circle cx="16" cy="17" r="1" /></svg>;
  if (typ === 'tunnelbana' || typ === 'pendel') return <svg {...p}><rect x="5" y="3" width="14" height="14" rx="3" /><path d="M5 11h14M8 20l2-3M16 20l-2-3" /><circle cx="8.5" cy="14" r="1" /><circle cx="15.5" cy="14" r="1" /></svg>;
  if (typ === 'natur') return <svg {...p}><path d="M12 22v-7M12 15c-4 0-6-2.5-6-6 0-3 2-5 2-5s1 2 4 2 4-2 4-2 2 2 2 5c0 3.5-2 6-6 6Z" /></svg>;
  if (typ === 'butik') return <svg {...p}><path d="M4 9h16l-1 11H5L4 9ZM4 9l1-4h14l1 4M9 13v4M15 13v4" /></svg>;
  return <svg {...p}><path d="M6 3v7a2 2 0 0 0 4 0V3M8 3v18M18 3c-2 0-3 2-3 5s1 4 3 4v9" /></svg>;
}

const TYP_LABEL: Record<Narpunkt['typ'], string> = {
  buss: 'Busshållplats',
  tunnelbana: 'Tunnelbana',
  pendel: 'Pendeltåg',
  restaurang: 'Restaurang & café',
  natur: 'Grönområde',
  butik: 'Butik',
};

export default function VerksamhetProfil() {
  useReveal();
  const { slug = '' } = useParams();
  const v = getBySlug(slug);
  const { isSaved, toggleSaved, isCompared, toggleCompare } = useCollection();

  if (!v) {
    return (
      <main className="band">
        <div className="wrap">
          <h1 style={{ fontSize: 'var(--step-2)' }}>Verksamheten kunde inte hittas</h1>
          <p style={{ color: 'var(--ink-2)', marginTop: '.6rem' }}>Den kan ha flyttats eller tagits bort.</p>
          <Link className="btn" to="/sok" style={{ marginTop: '1.2rem' }}>Tillbaka till sökningen</Link>
        </div>
      </main>
    );
  }

  const saved = isSaved(v.slug);
  const compared = isCompared(v.slug);
  const g = v.galleri;
  const kollektiv = v.naromrade.filter((n) => ['buss', 'tunnelbana', 'pendel'].includes(n.typ));
  const service = v.naromrade.filter((n) => !['buss', 'tunnelbana', 'pendel'].includes(n.typ));

  return (
    <main className="band band--tight">
      <div className="wrap">
        <Link className="back" to="/sok">← Tillbaka till sökningen</Link>

        {/* GALLERI */}
        <div className="pgallery2 reveal">
          <div className="pg2__main">
            <Illustration name={g[0]} className="illusfill grain" />
            <div className="pg2__actions">
              <button
                className="pg2__save"
                type="button"
                aria-pressed={saved}
                aria-label={saved ? 'Ta bort från sparade' : 'Spara'}
                onClick={() => toggleSaved(v.slug)}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill={saved ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><path d="M12 21s-7-4.6-9.3-9C1.2 8.8 2.6 5.5 6 5.5c2 0 3.2 1.2 4 2.4.8-1.2 2-2.4 4-2.4 3.4 0 4.8 3.3 3.3 6.5C19 16.4 12 21 12 21Z" /></svg>
              </button>
            </div>
          </div>
          <div className="pg2__cell">
            <Illustration name={g[1] ?? g[0]} className="illusfill grain" />
            <span className="pg2__play" aria-hidden="true"><svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z" /></svg></span>
          </div>
          <div className="pg2__cell">
            <Illustration name={g[2] ?? g[0]} className="illusfill grain" />
          </div>
          <div className="pg2__cell">
            <Illustration name={g[3] ?? g[1] ?? g[0]} className="illusfill grain" />
          </div>
          <div className="pg2__cell pg2__more">
            <Illustration name={g[0]} className="illusfill grain" />
            <span className="pg2__morelabel">Visa alla bilder</span>
          </div>
        </div>

        {/* INNEHÅLL */}
        <div className="plisting">
          <div className="plisting__main">
            <p className="plisting__area">{v.omrade}, {v.kommun}</p>
            <h1 className="plisting__title">{v.namn}</h1>

            <div className="factchips">
              <span className="factchip"><svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true"><circle cx="9" cy="8" r="3" /><path d="M4 20c0-3 2.5-5 5-5s5 2 5 5M16 11a3 3 0 1 0-1-5.8" /></svg>{v.gruppstorlek}</span>
              <span className="factchip"><svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true"><circle cx="13.5" cy="6.5" r="2.5" /><circle cx="17.5" cy="10.5" r="2.5" /><circle cx="8.5" cy="7.5" r="2.5" /><circle cx="6.5" cy="12.5" r="2.5" /><path d="M12 22a4 4 0 0 0 0-8" /></svg>{v.inriktning}</span>
              <span className="factchip"><svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true"><path d="M12 22v-7M12 15c-4 0-6-2.5-6-6 0-3 2-5 2-5s1 2 4 2 4-2 4-2 2 2 2 5c0 3.5-2 6-6 6Z" /></svg>{v.miljo}</span>
            </div>

            <div className="plisting__quick">
              <button className={'btn ' + (compared ? 'btn--soft' : 'btn--ghost')} type="button" onClick={() => toggleCompare(v.slug)} aria-pressed={compared}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true"><path d="M4 7h9M4 12h16M4 17h11" /><path d="M17 4v6l3-3M17 20v-6l3 3" /></svg>
                {compared ? 'Jämförs' : 'Jämför'}
              </button>
              <ListenButton text={`${v.namn}. ${v.beskrivning}`} label="Lyssna" />
            </div>

            <hr className="pbody__rule" />

            <h2 className="pbody__h">Tillgänglighet</h2>
            <ul className="bekvam">
              {v.bekvamligheter.map((b) => (
                <li key={b}><span className="bekvam__ico"><AmenityIcon label={b} /></span>{b}</li>
              ))}
            </ul>

            <hr className="pbody__rule" />

            <h2 className="pbody__h">Det här gör vi</h2>
            <div className="chipset">
              {v.aktiviteter.map((a) => <span key={a} className="chip-soft">{a}</span>)}
            </div>

            <h3 className="pbody__sub">Inriktning</h3>
            <div className="chipset">
              {v.inriktningTaggar.map((t) => <span key={t} className="chip-tint">{t}</span>)}
            </div>

            <hr className="pbody__rule" />

            <h2 className="pbody__h">Beskrivning</h2>
            <p className="measure prose">{v.beskrivning}</p>
            <p className="measure prose">
              Vi anpassar dagen efter varje deltagare, i lugn takt och med tydlig struktur.
              Kommunikationsstöd: {v.stod.join(', ')}.
            </p>

            <hr className="pbody__rule" />

            <h2 className="pbody__h">Område</h2>
            <div className="omrade__map">
              <MapExplorer items={[v]} center={[v.lng, v.lat]} zoom={14} showStyleToggle={false} fitToItems={false} scrollZoom={false} />
            </div>

            <div className="omrade__grid">
              <div>
                <h3 className="omrade__h">Kollektivtrafik</h3>
                <ul className="narlist">
                  {kollektiv.map((n) => (
                    <li key={n.namn}>
                      <span className="narlist__ico"><NarIcon typ={n.typ} /></span>
                      <span className="narlist__txt">
                        <span className="narlist__typ">{TYP_LABEL[n.typ]}</span>
                        <b>{n.namn}</b>
                        <em>{n.avstand}</em>
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="omrade__h">I närheten</h3>
                <ul className="narlist">
                  {service.map((n) => (
                    <li key={n.namn}>
                      <span className="narlist__ico"><NarIcon typ={n.typ} /></span>
                      <span className="narlist__txt">
                        <span className="narlist__typ">{TYP_LABEL[n.typ]}</span>
                        <b>{n.namn}</b>
                        <em>{n.avstand}</em>
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <aside className="plisting__aside">
            <ContactCard v={v} />
          </aside>
        </div>
      </div>
    </main>
  );
}
