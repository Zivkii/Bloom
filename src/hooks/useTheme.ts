'use client';

import { useCallback, useEffect, useState } from 'react';

type Theme = 'light' | 'dark';

/** Ljust/mörkt läge — respekterar OS-inställning tills användaren väljer.
 *  Läser sparat val efter mount (SSR-säkert, ingen hydration-mismatch). */
export function useTheme() {
  const [theme, setTheme] = useState<Theme | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem('bloom-theme') as Theme | null;
    if (saved) setTheme(saved);
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    if (theme) root.setAttribute('data-theme', theme);
    else root.removeAttribute('data-theme');
  }, [theme]);

  const toggle = useCallback(() => {
    setTheme((prev) => {
      const isDark = prev
        ? prev === 'dark'
        : window.matchMedia('(prefers-color-scheme: dark)').matches;
      const next: Theme = isDark ? 'light' : 'dark';
      localStorage.setItem('bloom-theme', next);
      return next;
    });
  }, []);

  return { theme, toggle };
}
