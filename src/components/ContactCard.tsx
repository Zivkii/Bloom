import type { Verksamhet } from '../data/types';

function Row({ icon, children }: { icon: React.ReactNode; children: React.ReactNode }) {
  return (
    <li className="contact__row">
      <span className="contact__ico" aria-hidden="true">{icon}</span>
      <span>{children}</span>
    </li>
  );
}

export default function ContactCard({ v }: { v: Verksamhet }) {
  return (
    <div className="contact">
      <span className="contact__eyebrow">Kontakta verksamheten</span>
      <h3 className="contact__name">{v.namn}</h3>
      <ul className="contact__list">
        <Row icon={<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7"><path d="M12 21s7-5.6 7-11a7 7 0 1 0-14 0c0 5.4 7 11 7 11Z" /><circle cx="12" cy="10" r="2.4" /></svg>}>
          {v.adress}<br /><span className="contact__muted">{v.omrade}, {v.kommun}</span>
        </Row>
        <Row icon={<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7"><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></svg>}>{v.oppettider}</Row>
        <Row icon={<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7"><path d="M4 5c0 9 6 15 15 15l1.5-3.5-4-2-1.5 2c-3-1.4-5.6-4-7-7l2-1.5-2-4L4 5Z" /></svg>}>
          <a href={`tel:${v.telefon.replace(/\s/g, '')}`}>{v.telefon}</a>
        </Row>
        <Row icon={<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7"><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 7 9 6 9-6" /></svg>}>
          <a href={`mailto:${v.epost}`}>{v.epost}</a>
        </Row>
        <Row icon={<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7"><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3c2.5 3 2.5 15 0 18M12 3c-2.5 3-2.5 15 0 18" /></svg>}>
          <a href={`https://${v.webb}`} target="_blank" rel="noopener noreferrer">Webbplats</a>
        </Row>
      </ul>
      <div className="contact__actions">
        <a className="btn" href={`tel:${v.telefon.replace(/\s/g, '')}`}>Ring verksamheten</a>
        <a className="btn btn--soft" href={`mailto:${v.epost}`}>Skicka e-post</a>
      </div>
      <p className="contact__note">Bloomly visar kontaktuppgifter direkt från verksamheten.</p>
    </div>
  );
}
