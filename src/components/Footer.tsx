import Link from 'next/link';
import BrandMark from './BrandMark';

export default function Footer() {
  return (
    <footer className="foot">
      <div className="wrap">
        <div className="foot__grid">
          <div>
            <Link className="brand" href="/" aria-label="Bloomly – startsida">
              <BrandMark />
              <span>Bloomly</span>
            </Link>
            <p className="foot__lead">
              Bloomly hjälper dig att hitta rätt inom LSS. Sök, jämför och känn dig trygg i valet.
            </p>
          </div>
          <div>
            <h4>Utforska</h4>
            <ul>
              <li><Link href="/sok">Daglig verksamhet</Link></li>
              <li><a href="#">Gruppbostad <span style={{ color: 'var(--ink-2)' }}>(snart)</span></a></li>
              <li><a href="#">Servicebostad <span style={{ color: 'var(--ink-2)' }}>(snart)</span></a></li>
              <li><a href="#">Korttidsboende <span style={{ color: 'var(--ink-2)' }}>(snart)</span></a></li>
              <li><Link href="/#guider">Guider för familjer</Link></li>
            </ul>
          </div>
          <div>
            <h4>Om Bloomly</h4>
            <ul>
              <li><Link href="/#sa-fungerar">Så fungerar det</Link></li>
              <li><a href="#">Vår vision</a></li>
              <li><a href="#">Kontakt</a></li>
            </ul>
          </div>
          <div>
            <h4>För verksamheter</h4>
            <ul>
              <li><a href="#">Anslut er verksamhet</a></li>
              <li><a href="#">Vanliga frågor</a></li>
            </ul>
          </div>
        </div>
        <div className="foot__bar">
          <span className="milan">
            <BrandMark size={18} />
            Bloomly
          </span>
          <span>Med omtanke i Stockholm · WCAG 2.2 AA</span>
        </div>
      </div>
    </footer>
  );
}
