'use client';

import { useState, type ReactNode } from 'react';
import { VERKSAMHETSTYPER, INRIKTNINGAR, MILJOER, STORLEKAR } from '../data/verksamheter';

export interface Filters {
  sok: string;
  typ: string;
  inriktning: string[];
  miljo: string[];
  storlek: string | null;
}

export const TOM_FILTER: Filters = { sok: '', typ: 'daglig', inriktning: [], miljo: [], storlek: null };

function toggle(list: string[], value: string): string[] {
  return list.includes(value) ? list.filter((x) => x !== value) : [...list, value];
}

function Section({ label, count, defaultOpen = true, children }: { label: string; count?: number; defaultOpen?: boolean; children: ReactNode }) {
  const [open, setOpen] = useState(defaultOpen);
  const id = 'flt-' + label.replace(/\s+/g, '-').toLowerCase();
  return (
    <div className={'filter__group' + (open ? ' is-open' : '')}>
      <button type="button" className="filter__toggle" aria-expanded={open} aria-controls={id} onClick={() => setOpen((o) => !o)}>
        <span className="filter__label">{label}{count ? <span className="filter__badge">{count}</span> : null}</span>
        <svg className="filter__chev" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="m6 9 6 6 6-6" /></svg>
      </button>
      <div className="filter__panel" id={id} hidden={!open}>{children}</div>
    </div>
  );
}

export default function FilterSidebar({
  filters,
  setFilters,
  onReset,
  activeCount,
}: {
  filters: Filters;
  setFilters: (f: Filters) => void;
  onReset: () => void;
  activeCount: number;
}) {
  return (
    <aside className="filter" aria-label="Filtrera verksamheter">
      <div className="filter__head">
        <span className="filter__title">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><path d="M4 6h16M7 12h10M10 18h4" /></svg>
          Filter
        </span>
        {activeCount > 0 && <button className="filter__reset" type="button" onClick={onReset}>Rensa ({activeCount})</button>}
      </div>

      <div className="filter__group filter__group--search">
        <label className="filter__label" htmlFor="fSok">Sök</label>
        <div className="filter__search">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" aria-hidden="true"><circle cx="11" cy="11" r="7" /><path d="m21 21-4.3-4.3" /></svg>
          <input id="fSok" type="text" placeholder="Namn eller nyckelord" value={filters.sok} onChange={(e) => setFilters({ ...filters, sok: e.target.value })} />
        </div>
      </div>

      <Section label="Typ av verksamhet">
        <div className="filter__radios">
          {VERKSAMHETSTYPER.map((t) => (
            <label key={t.id} className={'radio' + (t.snart ? ' radio--disabled' : '')}>
              <input type="radio" name="typ" value={t.id} checked={filters.typ === t.id} disabled={t.snart} onChange={() => setFilters({ ...filters, typ: t.id })} />
              <span className="radio__dot" aria-hidden="true" />
              <span>{t.label}{t.snart && <em className="soon"> (snart)</em>}</span>
            </label>
          ))}
        </div>
      </Section>

      <Section label="Inriktning" count={filters.inriktning.length}>
        <div className="filter__pills">
          {INRIKTNINGAR.map((x) => (
            <button key={x} type="button" className="fpill" aria-pressed={filters.inriktning.includes(x)} onClick={() => setFilters({ ...filters, inriktning: toggle(filters.inriktning, x) })}>{x}</button>
          ))}
        </div>
      </Section>

      <Section label="Miljö" count={filters.miljo.length}>
        <div className="filter__pills">
          {MILJOER.map((x) => (
            <button key={x} type="button" className="fpill" aria-pressed={filters.miljo.includes(x)} onClick={() => setFilters({ ...filters, miljo: toggle(filters.miljo, x) })}>{x}</button>
          ))}
        </div>
      </Section>

      <Section label="Gruppstorlek" count={filters.storlek ? 1 : 0}>
        <div className="filter__radios">
          <label className="radio">
            <input type="radio" name="storlek" checked={filters.storlek === null} onChange={() => setFilters({ ...filters, storlek: null })} />
            <span className="radio__dot" aria-hidden="true" /><span>Alla storlekar</span>
          </label>
          {STORLEKAR.map((s) => (
            <label key={s.id} className="radio">
              <input type="radio" name="storlek" checked={filters.storlek === s.id} onChange={() => setFilters({ ...filters, storlek: s.id })} />
              <span className="radio__dot" aria-hidden="true" /><span>{s.label}</span>
            </label>
          ))}
        </div>
      </Section>
    </aside>
  );
}
