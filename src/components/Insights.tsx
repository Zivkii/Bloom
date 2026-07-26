import Illustration from './Illustration';
import { guider } from '../data/verksamheter';

export default function Insights() {
  return (
    <section className="band" id="guider">
      <div className="wrap">
        <div className="sec-head sec-head--split reveal">
          <div>
            <span className="eyebrow">Guider för familjer</span>
            <h2 style={{ marginTop: '1rem' }}>Att välja tillsammans — lite lättare.</h2>
          </div>
          <div className="sec-head__aside"><a className="btn btn--ghost" href="#">Alla guider →</a></div>
        </div>
        <div className="insights reveal">
          {guider.map((g) => (
            <a className="insight" href="#" key={g.titel}>
              <Illustration name={g.scene} className="insight__media grain" />
              <div className="insight__body">
                <span className="insight__k">{g.kategori}</span>
                <h3>{g.titel}</h3>
                <p>{g.text}</p>
                <span className="insight__read">Läs guiden →</span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
