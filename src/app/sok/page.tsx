import { Suspense } from 'react';
import type { Metadata } from 'next';
import SokView from '@/views/SokView';

export const metadata: Metadata = {
  title: 'Hitta verksamhet',
  description:
    'Sök och jämför daglig verksamhet i Stockholm. Filtrera på inriktning, miljö och gruppstorlek — eller utforska allt på kartan.',
  alternates: { canonical: '/sok' },
};

export default function Page() {
  return (
    <Suspense fallback={null}>
      <SokView />
    </Suspense>
  );
}
