import { MetadataRoute } from 'next';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://yourpilatecrush.studio';

export default function robots(): MetadataRoute.Robots {
  // Pratique courante pour éviter l'indexation des environnements de dev/preview
  const isProduction = process.env.NODE_ENV === 'production' && process.env.VERCEL_ENV !== 'preview';

  if (!isProduction) {
    return {
      rules: {
        userAgent: '*',
        disallow: '/',
      },
    };
  }

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: [
        '/api/',       // Bloquer l'indexation des endpoints internes
        '/_next/',     // Inutile de crawler les assets internes Next
        '/admin/',     // Si un backoffice est présent plus tard
      ],
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
