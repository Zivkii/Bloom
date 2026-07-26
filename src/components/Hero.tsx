import Illustration from './Illustration';
import SearchBar from './SearchBar';

export default function Hero() {
  return (
    <section className="hero" id="utforska">
      <Illustration name="heroDusk" className="hero__bg grain" />
      <div className="hero__scrim" />
      <div className="wrap hero__inner hero__inner--center">
        <div className="hero__copy">
          <span className="eyebrow eyebrow--onDark">Din plattform för LSS</span>
          <h1>
            Hitta en plats där du <em>trivs</em>.
          </h1>
          <p className="hero__lead">
            Bloomly hjälper dig att hitta rätt inom LSS. Sök, jämför och känn dig trygg i valet.
          </p>
        </div>
        <div className="hero__searchwrap">
          <SearchBar hero />
        </div>
      </div>
      <p className="hero__credit">Stockholm i kvällsljus · illustration</p>
    </section>
  );
}
