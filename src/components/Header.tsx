'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import BrandMark from './BrandMark';
import { useTheme } from '../hooks/useTheme';
import { useCollection } from '../store/collection';

export default function Header() {
  const { toggle } = useTheme();
  const { saved, compare } = useCollection();
  const [stuck, setStuck] = useState(false);

  useEffect(() => {
    const onScroll = () => setStuck(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className="head" data-stuck={stuck}>
      <div className="wrap head__row">
        <Link className="brand" href="/" aria-label="Bloomly – startsida">
          <BrandMark />
          <span>Bloomly</span>
        </Link>
        <nav className="nav" aria-label="Huvudmeny">
          <Link href="/">Hem</Link>
          <Link href="/sok">Utforska</Link>
          <Link href="/#sa-fungerar">Så fungerar det</Link>
          <Link href="/#guider">Guider</Link>
        </nav>
        <div className="head__end">
          <Link className="head__pill" href="/sparade" aria-label={`Sparade verksamheter${saved.length ? `, ${saved.length} st` : ''}`}>
            <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true"><path d="M12 21s-7-4.6-9.3-9C1.2 8.8 2.6 5.5 6 5.5c2 0 3.2 1.2 4 2.4.8-1.2 2-2.4 4-2.4 3.4 0 4.8 3.3 3.3 6.5C19 16.4 12 21 12 21Z" /></svg>
            <span className="head__pill-label">Sparade</span>
            {saved.length > 0 && <b className="head__count">{saved.length}</b>}
          </Link>
          <Link className="head__pill" href="/jamfor" aria-label={`Jämför verksamheter${compare.length ? `, ${compare.length} valda` : ''}`}>
            <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true"><path d="M4 7h9M4 12h16M4 17h11" /><path d="M17 4v6l3-3M17 20v-6l3 3" /></svg>
            <span className="head__pill-label">Jämför</span>
            {compare.length > 0 && <b className="head__count">{compare.length}</b>}
          </Link>
          <button className="iconbtn" type="button" onClick={toggle} aria-label="Byt mellan ljust och mörkt läge">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true"><circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M4 12H2M22 12h-2M5 5l1.5 1.5M17.5 17.5 19 19M19 5l-1.5 1.5M6.5 17.5 5 19" /></svg>
          </button>
        </div>
      </div>
    </header>
  );
}
