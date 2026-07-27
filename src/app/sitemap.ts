import type { MetadataRoute } from 'next';
import { verksamheter } from '@/data/verksamheter';

const SITE = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://bloomly.vercel.app';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const staticPages: MetadataRoute.Sitemap = [
    { url: `${SITE}/`, lastModified: now, changeFrequency: 'weekly', priority: 1 },
    { url: `${SITE}/sok`, lastModified: now, changeFrequency: 'weekly', priority: 0.8 },
  ];
  const profiles: MetadataRoute.Sitemap = verksamheter.map((v) => ({
    url: `${SITE}/verksamhet/${v.slug}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.7,
  }));
  return [...staticPages, ...profiles];
}
