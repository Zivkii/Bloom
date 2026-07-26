import { Link } from 'react-router-dom';
import Illustration from '../components/Illustration';
import { verksamheter } from '../data/verksamheter';
import { useCollection } from '../store/collection';
import { useReveal } from '../hooks/useReveal';
import type { Verksamhet } from '../data/types';

type Row = { label: string; chips?: (v: Verksamhet) => string[]; text?: (v: Verksamhet) => string };

const ROWS: Row[] = [
  { label: 'Område', text: (v) => `${v.omrade} · ${v.kommun}` },
  { label: 'Inriktning', chips: (v) => v.inriktningTaggar },
  { label: 'Gruppstorlek', text: (v) => v.gruppstorlek },
  { label: 'Miljö', chips: (v) => v.miljoTaggar },
  { label: 'Kommunikationsstöd', chips: (v) => v.stod },
  { label: 'Öppettider', text: (v) => v.oppettider },
  { label: 'Närmaste hållplats', text: (v) => v.hallplats },
];

export default function Jamfor() {
  useReveal();
  const { compare, removeCompare, clearCompare } = useCollection();
  const items = verksamheter.filter((v) => compare.includes(v.slug));

  return (
    <main className="band band--tight">
      <div className="wrap">
        <div className="sec-head sec-head--split reveal" style={{ marginBottom: '1.8rem' }}>
          <div>
            <span className="eyebrow">Sida vid sida</span>
            <h1 style={{ marginTop: '.7rem', fontSize: 'var(--step-3)' }}>Jämför verksamheter</h1>
            {items.length > 0 && <p>Se det som är viktigt för just dig — sida vid sida, i lugn och ro.</p>}
          </div>
          {items.length > 0 && (
            <div className="sec-head__aside">
              <button className="btn btn--ghost" type="button" onClick={clearCompare}>Rensa jämförelse</button>
            </div>
          )}
        </div>

        {items.length === 0 ? (
          <div className="empty reveal">
            <div className="empty__ico" aria-hidden="true">
              <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M4 7h9M4 12h16M4 17h11" /><path d="M17 4v6l3-3M17 20v-6l3 3" /></svg>
            </div>
            <h2>Inget att jämföra ännu</h2>
            <p>Välj upp till tre verksamheter med “Jämför” så visas de här sida vid sida.</p>
            <Link className="btn" to="/sok">Utforska verksamheter</Link>
          </div>
        ) : (
          <>
            <div className="cmp reveal">
              <table className="cmp2">
                <thead>
                  <tr>
                    <th className="cmp2__corner"><span className="visually-hidden">Egenskap</span></th>
                    {items.map((v) => (
                      <th key={v.slug} scope="col" className="cmp2__head">
                        <button className="cmp2__remove" type="button" onClick={() => removeCompare(v.slug)} aria-label={`Ta bort ${v.namn}`}>×</button>
                        <Illustration name={v.scene} className="cmp2__thumb grain" />
                        <Link className="cmp2__name" to={`/verksamhet/${v.slug}`}>{v.namn}</Link>
                        <span className="cmp2__area">{v.omrade}</span>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {ROWS.map((row) => (
                    <tr key={row.label}>
                      <th scope="row">{row.label}</th>
                      {items.map((v) => (
                        <td key={v.slug}>
                          {row.chips ? (
                            <span className="cellchips">{row.chips(v).map((c) => <span key={c} className="chip-soft">{c}</span>)}</span>
                          ) : (
                            row.text!(v)
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}
                  <tr className="cmp2__ctarow">
                    <th scope="row"><span className="visually-hidden">Åtgärd</span></th>
                    {items.map((v) => (
                      <td key={v.slug}><Link className="btn btn--soft" to={`/verksamhet/${v.slug}`}>Visa verksamhet</Link></td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>

            {items.length < 3 && (
              <Link className="cmp2__add" to="/sok">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M12 5v14M5 12h14" /></svg>
                Lägg till fler verksamheter att jämföra
              </Link>
            )}
          </>
        )}
      </div>
    </main>
  );
}
