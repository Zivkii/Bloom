'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import CardGallery from './CardGallery';
import { useCollection } from '../store/collection';
import type { Verksamhet } from '../data/types';

function Pin() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" aria-hidden="true">
      <path d="M12 21s7-5.6 7-11a7 7 0 1 0-14 0c0 5.4 7 11 7 11Z" /><circle cx="12" cy="10" r="2.4" />
    </svg>
  );
}

export default function VerksamhetCard({ v }: { v: Verksamhet }) {
  const { isSaved, toggleSaved, isCompared, toggleCompare } = useCollection();
  const router = useRouter();
  const saved = isSaved(v.slug);
  const compared = isCompared(v.slug);

  return (
    <article className="vcard">
      <div
        className="vcard__media"
        onClick={() => router.push(`/verksamhet/${v.slug}`)}
        role="link"
        aria-label={`Öppna ${v.namn}`}
      >
        <CardGallery scenes={v.galleri} />
        <button
          className="vcard__save"
          type="button"
          aria-pressed={saved}
          aria-label={saved ? `Ta bort ${v.namn} från sparade` : `Spara ${v.namn}`}
          onClick={(e) => { e.stopPropagation(); toggleSaved(v.slug); }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
            <path d="M12 21s-7-4.6-9.3-9C1.2 8.8 2.6 5.5 6 5.5c2 0 3.2 1.2 4 2.4.8-1.2 2-2.4 4-2.4 3.4 0 4.8 3.3 3.3 6.5C19 16.4 12 21 12 21Z" />
          </svg>
        </button>
      </div>

      <div className="vcard__body">
        <div className="vcard__top">
          <span className="vcard__cat">Daglig verksamhet</span>
          <span className="vcard__loc"><Pin />{v.omrade}</span>
        </div>
        <h3><Link className="vcard__title" href={`/verksamhet/${v.slug}`}>{v.namn}</Link></h3>
        <p className="vcard__desc">{v.kort}</p>
        <div className="vcard__tags">
          {v.inriktningTaggar.map((t) => <span key={t} className="tagpill">{t}</span>)}
        </div>
        <div className="vcard__foot">
          <button
            className={'cmpbtn' + (compared ? ' on' : '')}
            type="button"
            aria-pressed={compared}
            onClick={() => toggleCompare(v.slug)}
          >
            {compared ? (
              <><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" aria-hidden="true"><path d="m5 12 4 4 10-10" /></svg> Jämförs</>
            ) : (
              <><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" aria-hidden="true"><path d="M4 7h9M4 12h16M4 17h11" /><path d="M17 4v6l3-3M17 20v-6l3 3" /></svg> Jämför</>
            )}
          </button>
          <Link className="vcard__more" href={`/verksamhet/${v.slug}`}>Läs mer →</Link>
        </div>
      </div>
    </article>
  );
}
