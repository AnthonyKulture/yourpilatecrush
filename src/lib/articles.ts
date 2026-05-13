import { Article } from '@/types/blog';

const mockArticles: Article[] = [];

export async function getAllArticles(): Promise<Article[]> {
  return mockArticles.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
}

export async function getArticleBySlug(slug: string): Promise<Article | null> {
  const articles = await getAllArticles();
  return articles.find(article => article.slug === slug) || null;
}

export async function getRelatedArticles(currentArticle: Article, limit = 3): Promise<Article[]> {
  const articles = await getAllArticles();
  return articles
    .filter(a => a.slug !== currentArticle.slug)
    .filter(a => a.category.slug === currentArticle.category.slug || a.tags.some(t => currentArticle.tags.includes(t)))
    .slice(0, limit);
}
