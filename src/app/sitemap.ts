import { MetadataRoute } from 'next';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://yourpilatecrush.studio';

export default function sitemap(): MetadataRoute.Sitemap {
  // Routes statiques
  const staticRoutes = [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 1.0,
    },
    {
      url: `${SITE_URL}/#pratiques`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/#tarifs`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
  ];

  /*
   * // Exemple de génération dynamique pour le futur blog
   * import { getAllArticles } from '@/lib/articles';
   * const articles = getAllArticles();
   * const blogRoutes = articles.map(article => ({
   *   url: `${SITE_URL}/blog/${article.slug}`,
   *   lastModified: new Date(article.updatedAt || article.publishedAt),
   *   changeFrequency: 'monthly' as const,
   *   priority: 0.6,
   * }));
   * 
   * return [...staticRoutes, ...blogRoutes];
   */

  return [...staticRoutes];
}
