import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/** Scrollar till toppen vid sidbyte, eller till #ankare om sådant finns. */
export default function ScrollManager() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const id = hash.slice(1);
      const scroll = () => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      };
      // vänta in att sidan renderats
      const t = window.setTimeout(scroll, 60);
      return () => window.clearTimeout(t);
    }
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, [pathname, hash]);

  return null;
}
