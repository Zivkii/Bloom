import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import ProfilView from '@/views/ProfilView';
import { verksamheter, getBySlug } from '@/data/verksamheter';

/** Statisk generering av en sida per verksamhet (bra för SEO + snabb laddning). */
export function generateStaticParams() {
  return verksamheter.map((v) => ({ slug: v.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const v = getBySlug(slug);
  if (!v) return { title: 'Verksamheten kunde inte hittas' };

  const title = `${v.namn} – ${v.inriktning}, ${v.omrade}`;
  const description = `${v.kort} Daglig verksamhet i ${v.omrade}, ${v.kommun}.`;

  return {
    title,
    description,
    alternates: { canonical: `/verksamhet/${v.slug}` },
    openGraph: {
      type: 'article',
      title: `${v.namn} · Bloomly`,
      description,
      url: `/verksamhet/${v.slug}`,
      locale: 'sv_SE',
    },
    twitter: { card: 'summary', title: `${v.namn} · Bloomly`, description },
  };
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const v = getBySlug(slug);
  if (!v) notFound();
  return <ProfilView v={v} />;
}
