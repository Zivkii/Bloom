import { Link } from 'react-router-dom';
import VerksamhetCard from '../components/VerksamhetCard';
import { verksamheter } from '../data/verksamheter';
import { useCollection } from '../store/collection';
import { useReveal } from '../hooks/useReveal';

export default function Sparade() {
  useReveal();
  const { saved } = useCollection();
  const items = verksamheter.filter((v) => saved.includes(v.slug));

  return (
    <main className="band band--tight">
      <div className="wrap">
        <div className="sec-head reveal" style={{ marginBottom: '1.8rem' }}>
          <span className="eyebrow">Dina favoriter</span>
          <h1 style={{ marginTop: '.7rem', fontSize: 'var(--step-3)' }}>Sparade verksamheter</h1>
          {items.length > 0 && <p>Samla dina favoriter och dela dem med familj, god man eller LSS-handläggare.</p>}
        </div>

        {items.length === 0 ? (
          <div className="empty reveal">
            <div className="empty__ico" aria-hidden="true">
              <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M12 21s-7-4.6-9.3-9C1.2 8.8 2.6 5.5 6 5.5c2 0 3.2 1.2 4 2.4.8-1.2 2-2.4 4-2.4 3.4 0 4.8 3.3 3.3 6.5C19 16.4 12 21 12 21Z" /></svg>
            </div>
            <h2>Inga sparade ännu</h2>
            <p>Tryck på hjärtat på en verksamhet för att spara den här.</p>
            <Link className="btn" to="/sok">Utforska verksamheter</Link>
          </div>
        ) : (
          <div className="vcards reveal">
            {items.map((v) => <VerksamhetCard key={v.slug} v={v} />)}
          </div>
        )}
      </div>
    </main>
  );
}
