import { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/seo';
import { getAllArticles } from '@/lib/articles';

const locales = ['fr', 'en'] as const;

const getFullUrl = (locale: string, path: string) => {
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  const normalizedPath = cleanPath === '/' ? '' : cleanPath;
  const prefix = locale === 'en' ? '/en' : '';
  return `${SITE_URL}${prefix}${normalizedPath || '/'}`;
};

const buildAlternates = (path: string) => ({
  languages: {
    fr: getFullUrl('fr', path),
    en: getFullUrl('en', path),
    'x-default': getFullUrl('fr', path),
  },
});

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const articles = await getAllArticles();

  const staticRoutes = [
    { path: '',                  lastModified: new Date('2025-05-01') },
    { path: '/blog',             lastModified: new Date('2025-05-01') },
    { path: '/mentions-legales', lastModified: new Date('2025-01-01') },
  ];

  const staticEntries: MetadataRoute.Sitemap = locales.flatMap((locale) =>
    staticRoutes.map((route) => ({
      url: getFullUrl(locale, route.path),
      lastModified: route.lastModified,
      alternates: buildAlternates(route.path),
    }))
  );

  const articleEntries: MetadataRoute.Sitemap = locales.flatMap((locale) =>
    articles.map((article) => ({
      url: getFullUrl(locale, `/blog/${article.slug}`),
      lastModified: new Date(article.publishedAt),
      alternates: buildAlternates(`/blog/${article.slug}`),
    }))
  );

  return [...staticEntries, ...articleEntries];
}
