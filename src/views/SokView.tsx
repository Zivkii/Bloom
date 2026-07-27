'use client';

import { useMemo, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import VerksamhetCard from '../components/VerksamhetCard';
import MapExplorer from '../components/Map';
import FilterSidebar, { TOM_FILTER, type Filters } from '../components/FilterSidebar';
import { verksamheter } from '../data/verksamheter';
import { useReveal } from '../hooks/useReveal';

export default function SokView() {
  useReveal();
  const params = useSearchParams();
  const [filters, setFilters] = useState<Filters>({
    ...TOM_FILTER,
    sok: params.get('plats') ?? '',
  });
  const [view, setView] = useState<'lista' | 'karta'>('lista');

  const results = useMemo(() => {
    if (filters.typ !== 'daglig') return [];
    const q = filters.sok.trim().toLowerCase();
    return verksamheter.filter((v) => {
      if (q) {
        const hay = `${v.namn} ${v.omrade} ${v.inriktning} ${v.kort} ${v.inriktningTaggar.join(' ')}`.toLowerCase();
        if (!hay.includes(q)) return false;
      }
      if (filters.inriktning.length && !filters.inriktning.some((t) => v.inriktningTaggar.includes(t))) return false;
      if (filters.miljo.length && !filters.miljo.some((t) => v.miljoTaggar.includes(t))) return false;
      if (filters.storlek && v.storlek !== filters.storlek) return false;
      return true;
    });
  }, [filters]);

  const activeCount =
    (filters.sok ? 1 : 0) +
    filters.inriktning.length +
    filters.miljo.length +
    (filters.storlek ? 1 : 0) +
    (filters.typ !== 'daglig' ? 1 : 0);

  return (
    <main className="band band--tight">
      <div className="wrap">
        <div className="sokhead reveal">
          <h1>Hitta verksamhet</h1>
          <div className="sokhead__view" role="group" aria-label="Visningsläge">
            <button type="button" className={view === 'lista' ? 'is-on' : ''} onClick={() => setView('lista')}>
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><rect x="3" y="4" width="7" height="7" rx="1.5" /><rect x="14" y="4" width="7" height="7" rx="1.5" /><rect x="3" y="14" width="7" height="7" rx="1.5" /><rect x="14" y="14" width="7" height="7" rx="1.5" /></svg>
              Lista
            </button>
            <button type="button" className={view === 'karta' ? 'is-on' : ''} onClick={() => setView('karta')}>
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><path d="m9 4 6 2 6-2v14l-6 2-6-2-6 2V6l6-2Z" /><path d="M9 4v14M15 6v14" /></svg>
              Visa på karta
            </button>
          </div>
        </div>

        <div className="sok2">
          <FilterSidebar filters={filters} setFilters={setFilters} onReset={() => setFilters(TOM_FILTER)} activeCount={activeCount} />

          <div className="sok2__main">
            <p className="sok2__count">
              Visar <b>{results.length}</b> av {verksamheter.length} verksamheter
              {view === 'karta' && results.length > 0 && ' — klicka på en nål för att se en verksamhet'}
            </p>

            {view === 'karta' ? (
              results.length === 0 ? (
                <div className="sok2__empty">
                  <p><b>Inga verksamheter matchar ditt val.</b></p>
                  {activeCount > 0 && <button className="btn btn--soft" type="button" onClick={() => setFilters(TOM_FILTER)}>Rensa alla filter</button>}
                </div>
              ) : (
                <div className="sok2__mapfull">
                  <MapExplorer items={results} markerMode="popup" />
                </div>
              )
            ) : results.length === 0 ? (
              <div className="sok2__empty">
                <p><b>Inga verksamheter matchar ditt val.</b></p>
                <p>Prova att ta bort ett filter, eller sök på något annat.</p>
                {activeCount > 0 && <button className="btn btn--soft" type="button" onClick={() => setFilters(TOM_FILTER)}>Rensa alla filter</button>}
              </div>
            ) : (
              <div className="vcards">
                {results.map((v) => <VerksamhetCard key={v.slug} v={v} />)}
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
