import type { Metadata } from 'next';
import SparadeView from '@/views/SparadeView';

export const metadata: Metadata = {
  title: 'Sparade verksamheter',
  description: 'Dina sparade verksamheter på Bloomly.',
  robots: { index: false, follow: true },
};

export default function Page() {
  return <SparadeView />;
}
