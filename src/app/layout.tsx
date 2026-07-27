import type { Metadata, Viewport } from 'next';
import '@fontsource-variable/fraunces/opsz.css';
import '@fontsource-variable/fraunces/opsz-italic.css';
import '@fontsource-variable/hanken-grotesk';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import HashScroll from '@/components/HashScroll';
import { CollectionProvider } from '@/store/collection';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://bloomly.vercel.app';
const DESCRIPTION =
  'Bloomly hjälper dig att hitta rätt inom LSS i Stockholm. Sök, jämför och känn dig trygg i valet — daglig verksamhet nu, snart även gruppbostad, servicebostad och korttidsboende.';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Bloomly · Hitta en plats där du trivs',
    template: '%s · Bloomly',
  },
  description: DESCRIPTION,
  applicationName: 'Bloomly',
  keywords: ['LSS', 'daglig verksamhet', 'Stockholm', 'gruppbostad', 'servicebostad', 'korttidsboende', 'Bloomly'],
  authors: [{ name: 'Bloomly' }],
  robots: { index: true, follow: true },
  openGraph: {
    type: 'website',
    locale: 'sv_SE',
    siteName: 'Bloomly',
    title: 'Bloomly · Hitta en plats där du trivs',
    description: DESCRIPTION,
    url: SITE_URL,
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Bloomly · Hitta en plats där du trivs',
    description: DESCRIPTION,
  },
};

export const viewport: Viewport = {
  themeColor: '#F7F4EF',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="sv">
      <body>
        <CollectionProvider>
          <HashScroll />
          <Header />
          {children}
          <Footer />
        </CollectionProvider>
      </body>
    </html>
  );
}
