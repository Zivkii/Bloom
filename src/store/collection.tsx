'use client';

import { createContext, useCallback, useContext, useEffect, useRef, useState, type ReactNode } from 'react';

export const MAX_COMPARE = 3;

interface CollectionValue {
  saved: string[];
  compare: string[];
  isSaved: (slug: string) => boolean;
  isCompared: (slug: string) => boolean;
  toggleSaved: (slug: string) => void;
  toggleCompare: (slug: string) => boolean; // returnerar false om listan är full
  removeCompare: (slug: string) => void;
  clearCompare: () => void;
}

const Ctx = createContext<CollectionValue | null>(null);

function load(key: string): string[] {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as string[]) : [];
  } catch {
    return [];
  }
}

export function CollectionProvider({ children }: { children: ReactNode }) {
  // Starta tomt (SSR-säkert), läs in sparat efter mount → ingen hydration-mismatch.
  const [saved, setSaved] = useState<string[]>([]);
  const [compare, setCompare] = useState<string[]>([]);
  const ready = useRef(false);

  useEffect(() => {
    setSaved(load('bloom-saved'));
    setCompare(load('bloom-compare'));
    ready.current = true;
  }, []);

  useEffect(() => { if (ready.current) localStorage.setItem('bloom-saved', JSON.stringify(saved)); }, [saved]);
  useEffect(() => { if (ready.current) localStorage.setItem('bloom-compare', JSON.stringify(compare)); }, [compare]);

  const toggleSaved = useCallback((slug: string) => {
    setSaved((p) => (p.includes(slug) ? p.filter((x) => x !== slug) : [...p, slug]));
  }, []);

  const toggleCompare = useCallback((slug: string): boolean => {
    let ok = true;
    setCompare((p) => {
      if (p.includes(slug)) return p.filter((x) => x !== slug);
      if (p.length >= MAX_COMPARE) { ok = false; return p; }
      return [...p, slug];
    });
    return ok;
  }, []);

  const removeCompare = useCallback((slug: string) => {
    setCompare((p) => p.filter((x) => x !== slug));
  }, []);

  const clearCompare = useCallback(() => setCompare([]), []);

  const value: CollectionValue = {
    saved, compare,
    isSaved: (s) => saved.includes(s),
    isCompared: (s) => compare.includes(s),
    toggleSaved, toggleCompare, removeCompare, clearCompare,
  };

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useCollection(): CollectionValue {
  const c = useContext(Ctx);
  if (!c) throw new Error('useCollection måste användas inom CollectionProvider');
  return c;
}
