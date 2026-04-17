import { getAllArticles } from '@/lib/articles';
import { SITE_NAME, SITE_URL } from '@/lib/seo';

// Revalider le cache toutes les heures
export const revalidate = 3600;

export async function GET() {
  const articles = await getAllArticles();
  
  const rssXml = `<?xml version="1.0" encoding="UTF-8" ?>
    <rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
      <channel>
        <title>${SITE_NAME} - Blog</title>
        <link>${SITE_URL}/blog</link>
        <description>Conseils et expertises Pilates &amp; Lagree.</description>
        <language>fr</language>
        <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
        <atom:link href="${SITE_URL}/feed.xml" rel="self" type="application/rss+xml"/>
        ${articles.map(article => {
          const articleUrl = `${SITE_URL}/blog/${article.slug}`;
          return `
            <item>
              <title><![CDATA[${article.title}]]></title>
              <link>${articleUrl}</link>
              <guid isPermaLink="true">${articleUrl}</guid>
              <pubDate>${new Date(article.publishedAt).toUTCString()}</pubDate>
              <description><![CDATA[${article.description}]]></description>
              ${article.category ? `<category>${article.category.name}</category>` : ''}
              ${article.coverImage ? `<enclosure url="${SITE_URL}${article.coverImage}" length="0" type="image/webp" />` : ''}
            </item>
          `;
        }).join('')}
      </channel>
    </rss>`;

  return new Response(rssXml, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 's-maxage=3600, stale-while-revalidate',
    },
  });
}
