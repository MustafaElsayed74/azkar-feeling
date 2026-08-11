import type { MetadataRoute } from 'next';
import { getFeelingsWithGroups } from '@/lib/data';
import { SITE_URL } from '@/lib/constants';

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: SITE_URL, changeFrequency: 'weekly', priority: 1 },
    { url: `${SITE_URL}/bookmarks`, changeFrequency: 'monthly', priority: 0.4 },
  ];

  return [
    ...staticRoutes,
    ...getFeelingsWithGroups().map((group) => ({
      url: `${SITE_URL}/feeling/${group.slug}`,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    })),
  ];
}
