import { JsonLd } from './JsonLd';
import { Article } from '@/types/blog';
import { SITE_URL, SITE_NAME } from '@/lib/seo';

interface ArticleJsonLdProps {
  article: Article;
}

export function ArticleJsonLd({ article }: ArticleJsonLdProps) {
  const url = `${SITE_URL}/blog/${article.slug}`;
  
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url,
    },
    headline: article.title,
    description: article.description,
    image: article.coverImage.startsWith('http') ? article.coverImage : `${SITE_URL}${article.coverImage}`,
    datePublished: article.publishedAt,
    dateModified: article.updatedAt || article.publishedAt,
    author: {
      '@type': 'Person',
      name: article.author.name,
      ...(article.author.avatarUrl && { image: article.author.avatarUrl }),
    },
    publisher: {
      '@type': 'Organization',
      name: SITE_NAME,
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_URL}/favicon.ico`, // À remplacer par logo.png
      },
    },
    wordCount: article.wordCount,
    timeRequired: `PT${article.readingTime}M`, // Format ISO 8601 Duration
  };

  return <JsonLd data={schema} />;
}
