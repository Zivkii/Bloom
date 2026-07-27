'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import MapExplorer from './Map';
import Illustration from './Illustration';
import { verksamheter } from '../data/verksamheter';

/** Hemsidans kartsektion: lista till vänster, riktig MapTiler-karta till höger. */
export default function MapSection() {
  const [active, setActive] = useState<string | null>(null);
  const router = useRouter();

  return (
    <section className="band" id="karta">
      <div className="wrap">
        <div className="sec-head sec-head--split reveal">
          <div>
            <span className="eyebrow">Utforska på kartan</span>
            <h2 style={{ marginTop: '1rem' }}>Se var verksamheterna ligger.</h2>
          </div>
          <div className="sec-head__aside"><p>Välj i listan eller klicka på en nål för att öppna verksamheten.</p></div>
        </div>
        <div className="mapwrap reveal">
          <div className="maplist" aria-label="Verksamheter på kartan">
            {verksamheter.map((v, i) => (
              <button
                key={v.slug}
                className={'maplist__item' + (active === v.slug ? ' is-active' : '')}
                type="button"
                onClick={() => router.push(`/verksamhet/${v.slug}`)}
                onMouseEnter={() => setActive(v.slug)}
                onMouseLeave={() => setActive(null)}
              >
                <Illustration name={v.scene} className="maplist__thumb" />
                <span className="maplist__meta">
                  <b>{v.namn}</b>
                  <span>{v.omrade} · {v.kommun}</span>
                </span>
                <span className="maplist__pinnum">{i + 1}</span>
              </button>
            ))}
          </div>
          <MapExplorer items={verksamheter} activeSlug={active} markerMode="navigate" scrollZoom={false} />
        </div>
      </div>
    </section>
  );
}
