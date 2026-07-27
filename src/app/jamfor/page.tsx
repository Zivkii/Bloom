import type { Metadata } from 'next';
import JamforView from '@/views/JamforView';

export const metadata: Metadata = {
  title: 'Jämför verksamheter',
  description: 'Jämför daglig verksamhet sida vid sida på Bloomly.',
  robots: { index: false, follow: true },
};

export default function Page() {
  return <JamforView />;
}
