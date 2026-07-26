import ListenButton from './ListenButton';

const STEG_TEXT =
  'Så fungerar Bloomly, i tre lugna steg. Steg ett, Utforska. Sök och titta på verksamheter med foton, film och en beskrivning av en vanlig dag. Steg två, Jämför. Spara dina favoriter och lägg dem sida vid sida. Steg tre, Besök. Skicka en intresseanmälan eller boka ett studiebesök, så vet du vad som väntar.';

export default function Steps() {
  return (
    <section className="band" id="sa-fungerar">
      <div className="wrap">
        <div className="sec-head sec-head--split reveal">
          <div>
            <span className="eyebrow">Så fungerar Bloomly</span>
            <h2 style={{ marginTop: '1rem' }}>Tre lugna steg, från nyfiken till välkommen.</h2>
            <p className="measure" style={{ color: 'var(--ink-2)', marginTop: '.7rem' }}>
              Samma trygga ordning varje gång — allt sitter där du förväntar dig. Vill du hellre lyssna?
            </p>
          </div>
          <div className="sec-head__aside">
            <ListenButton text={STEG_TEXT} label="Lyssna på stegen" />
          </div>
        </div>
        <div className="steps reveal">
          <div className="step">
            <div className="step__ico"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><circle cx="11" cy="11" r="7" /><path d="m21 21-4.3-4.3" /></svg></div>
            <div className="step__n">01 · Utforska</div>
            <h3>Sök och titta</h3>
            <p>Filtrera efter stadsdel, intresse och miljö. Se varje verksamhet med foton, film och en beskrivning av en vanlig dag.</p>
          </div>
          <div className="step">
            <div className="step__ico"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><path d="M4 6h7M4 12h7M4 18h7" /><path d="M17 4v16M17 4l-3 3M17 4l3 3" /></svg></div>
            <div className="step__n">02 · Jämför</div>
            <h3>Spara och jämför</h3>
            <p>Lägg dina favoriter sida vid sida och dela dem med familj, god man eller LSS-handläggare — det som är viktigt för just dig.</p>
          </div>
          <div className="step">
            <div className="step__ico"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><rect x="3" y="5" width="18" height="16" rx="2" /><path d="M3 9h18M8 3v4M16 3v4M9 14l2 2 4-4" /></svg></div>
            <div className="step__n">03 · Besök</div>
            <h3>Boka ett besök</h3>
            <p>Skicka en intresseanmälan eller boka ett studiebesök direkt. Du vet vad som väntar — och kan förbereda dig i lugn och ro.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
