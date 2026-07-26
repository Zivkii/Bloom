import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from 'react';

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
  const [saved, setSaved] = useState<string[]>(() => load('bloom-saved'));
  const [compare, setCompare] = useState<string[]>(() => load('bloom-compare'));

  useEffect(() => { localStorage.setItem('bloom-saved', JSON.stringify(saved)); }, [saved]);
  useEffect(() => { localStorage.setItem('bloom-compare', JSON.stringify(compare)); }, [compare]);

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
