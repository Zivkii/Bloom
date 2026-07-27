'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

/** Scrollar mjukt till #ankare när man landar på en sida med hash (t.ex. /#guider). */
export default function HashScroll() {
  const pathname = usePathname();
  useEffect(() => {
    const hash = window.location.hash;
    if (!hash) return;
    const id = hash.slice(1);
    const t = window.setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 90);
    return () => window.clearTimeout(t);
  }, [pathname]);
  return null;
}
