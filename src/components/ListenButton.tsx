import { useState } from 'react';

/** Läser upp given text på svenska via webbläsarens talsyntes. */
export default function ListenButton({
  text,
  label = 'Lyssna på texten',
}: {
  text: string;
  label?: string;
}) {
  const [speaking, setSpeaking] = useState(false);
  const [current, setCurrent] = useState(label);

  function stop() {
    try {
      window.speechSynthesis.cancel();
    } catch {
      /* noop */
    }
    setSpeaking(false);
    setCurrent(label);
  }

  function onClick() {
    if (!('speechSynthesis' in window)) {
      setCurrent('Uppläsning stöds ej i din webbläsare');
      return;
    }
    if (speaking) {
      stop();
      return;
    }
    const u = new SpeechSynthesisUtterance(text);
    u.lang = 'sv-SE';
    u.rate = 0.96;
    u.onend = stop;
    u.onerror = stop;
    setSpeaking(true);
    setCurrent('Stoppa uppläsning');
    try {
      window.speechSynthesis.cancel();
      window.speechSynthesis.speak(u);
    } catch {
      stop();
    }
  }

  return (
    <button className="btn btn--soft listen" type="button" aria-pressed={speaking} onClick={onClick}>
      <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
        <path d="M11 5 6 9H3v6h3l5 4V5Z" />
        <path d="M16 9a4 4 0 0 1 0 6M19 6.5a8 8 0 0 1 0 11" />
      </svg>
      <span>{current}</span>
    </button>
  );
}
