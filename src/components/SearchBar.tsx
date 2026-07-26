import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { kategoriEtiketter, snabbfilter, STADSDELAR } from '../data/verksamheter';
import type { Kategori } from '../data/types';

export default function SearchBar({ hero = false }: { hero?: boolean }) {
  const navigate = useNavigate();
  const [plats, setPlats] = useState('');
  const [inriktning, setInriktning] = useState('');
  const [aktiva, setAktiva] = useState<string[]>([]);

  function toggleTag(tag: string) {
    setAktiva((prev) => (prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]));
  }

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const p = new URLSearchParams();
    if (plats) p.set('plats', plats);
    if (inriktning) p.set('inriktning', inriktning);
    if (aktiva.length) p.set('taggar', aktiva.join(','));
    navigate('/sok' + (p.toString() ? '?' + p.toString() : ''));
  }

  return (
    <form className={'search' + (hero ? ' search--hero' : '')} onSubmit={submit} aria-label="Sök daglig verksamhet">
      <div className="search__tabs" role="tablist" aria-label="Typ av insats">
        <button className="tab" type="button" role="tab" aria-selected="true">Daglig verksamhet</button>
        <button className="tab" type="button" role="tab" aria-selected="false" disabled>Gruppbostad <small>(snart)</small></button>
        <button className="tab" type="button" role="tab" aria-selected="false" disabled>Servicebostad <small>(snart)</small></button>
        <button className="tab" type="button" role="tab" aria-selected="false" disabled>Korttids <small>(snart)</small></button>
      </div>

      <div className="search__fields">
        <div className="field">
          <label htmlFor="fPlats">Var vill du vara?</label>
          <div className="control">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><path d="M12 21s7-5.6 7-11a7 7 0 1 0-14 0c0 5.4 7 11 7 11Z" /><circle cx="12" cy="10" r="2.6" /></svg>
            <select id="fPlats" value={plats} onChange={(e) => setPlats(e.target.value)}>
              <option value="">Hela Stockholm</option>
              {STADSDELAR.map((s) => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
        </div>

        <div className="field">
          <label htmlFor="fInriktning">Vad vill du göra?</label>
          <div className="control">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><path d="M4 7h16M4 12h16M4 17h10" /></svg>
            <select id="fInriktning" value={inriktning} onChange={(e) => setInriktning(e.target.value)}>
              <option value="">Alla inriktningar</option>
              {(Object.entries(kategoriEtiketter) as [Kategori, string][]).map(([k, label]) => (
                <option key={k} value={k}>{label}</option>
              ))}
            </select>
          </div>
        </div>

        <button className="btn" type="submit">
          <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><circle cx="11" cy="11" r="7" /><path d="m21 21-4.3-4.3" /></svg>
          Sök verksamheter
        </button>
      </div>

      <div className="pills" role="group" aria-label="Snabbfilter">
        <span className="pills__label">Populärt:</span>
        {snabbfilter.map((tag) => (
          <button key={tag} className="pill" type="button" aria-pressed={aktiva.includes(tag)} onClick={() => toggleTag(tag)}>
            {tag} <span className="pill__x" aria-hidden="true">×</span>
          </button>
        ))}
      </div>
    </form>
  );
}
