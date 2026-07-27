import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="band band--tight">
      <div className="wrap">
        <div className="empty" style={{ marginTop: '1rem' }}>
          <div className="empty__ico" aria-hidden="true">
            <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><circle cx="11" cy="11" r="7" /><path d="m21 21-4.3-4.3" /></svg>
          </div>
          <h2>Sidan kunde inte hittas</h2>
          <p>Länken kan vara felaktig, eller så har sidan flyttats.</p>
          <Link className="btn" href="/sok">Utforska verksamheter</Link>
        </div>
      </div>
    </main>
  );
}
