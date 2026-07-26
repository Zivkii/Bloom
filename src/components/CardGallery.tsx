import { useState } from 'react';
import Illustration from './Illustration';

/** Bläddringsbart bildspel inuti ett kort — mjuka övergångar, pilar + prickar. */
export default function CardGallery({ scenes, videoIndex }: { scenes: string[]; videoIndex?: number }) {
  const [i, setI] = useState(0);
  const n = scenes.length;

  const stop = (e: React.MouseEvent) => { e.preventDefault(); e.stopPropagation(); };
  const go = (e: React.MouseEvent, dir: number) => { stop(e); setI((p) => (p + dir + n) % n); };
  const jump = (e: React.MouseEvent, idx: number) => { stop(e); setI(idx); };

  return (
    <div className="cg">
      <div className="cg__track" style={{ transform: `translateX(-${i * 100}%)` }}>
        {scenes.map((s, idx) => (
          <div className="cg__slide" key={idx}>
            <Illustration name={s} className="cg__img grain" />
            {videoIndex === idx && (
              <span className="cg__play" aria-hidden="true">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z" /></svg>
              </span>
            )}
          </div>
        ))}
      </div>
      {n > 1 && (
        <>
          <button className="cg__arrow cg__arrow--prev" type="button" onClick={(e) => go(e, -1)} aria-label="Föregående bild">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden="true"><path d="m15 18-6-6 6-6" /></svg>
          </button>
          <button className="cg__arrow cg__arrow--next" type="button" onClick={(e) => go(e, 1)} aria-label="Nästa bild">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden="true"><path d="m9 6 6 6-6 6" /></svg>
          </button>
          <div className="cg__dots" aria-hidden="true">
            {scenes.map((_, idx) => (
              <button key={idx} type="button" className={'cg__dot' + (idx === i ? ' on' : '')} onClick={(e) => jump(e, idx)} tabIndex={-1} aria-label={`Bild ${idx + 1}`} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
