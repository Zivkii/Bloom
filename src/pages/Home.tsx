import { Link } from 'react-router-dom';
import Hero from '../components/Hero';
import Steps from '../components/Steps';
import VerksamhetCard from '../components/VerksamhetCard';
import MapSection from '../components/MapSection';
import Insights from '../components/Insights';
import CTA from '../components/CTA';
import { verksamheter } from '../data/verksamheter';
import { useReveal } from '../hooks/useReveal';

export default function Home() {
  useReveal();
  const featured = verksamheter.slice(0, 6);

  return (
    <>
      <Hero />
      <Steps />

      <section className="band">
        <div className="wrap">
          <div className="sec-head sec-head--split reveal">
            <div>
              <span className="eyebrow">Utvalda verksamheter</span>
              <h2 style={{ marginTop: '1rem' }}>Platser i Stockholm att bli nyfiken på.</h2>
            </div>
            <div className="sec-head__aside">
              <Link className="btn btn--ghost" to="/sok">Visa alla {verksamheter.length} →</Link>
            </div>
          </div>
          <div className="cards reveal">
            {featured.map((v) => <VerksamhetCard key={v.slug} v={v} />)}
          </div>
        </div>
      </section>

      <MapSection />
      <Insights />
      <CTA />
    </>
  );
}
