import { Article } from '@/types/blog';
import { calculateReadingTime } from './readingTime';

// --- STUB : Ce fichier préparera l'intégration avec votre CMS ou vos dossiers locaux MDX ---
// Si vous utilisez Contentlayer ou Next-MDX-Remote plus tard, ces fonctions remplaceront les mock data.

const mockArticles: Article[] = [
  {
    slug: 'les-bienfaits-du-pilates-reformer',
    title: 'Les bienfaits incontestés du Pilates Reformer pour la posture',
    description: 'Découvrez comment la pratique sur machine révolutionne votre alignement et tonifie votre corps en profondeur.',
    content: '## Introduction\n\nTous les bienfaits du Pilates...',
    publishedAt: '2024-03-20T10:00:00Z',
    author: {
      name: 'Candice',
    },
    category: {
      name: 'Méthodes',
      slug: 'methodes',
    },
    tags: ['Reformer', 'Posture', 'Tonification'],
    readingTime: calculateReadingTime('## Introduction\n\nTous les bienfaits du Pilates...').minutes,
    wordCount: calculateReadingTime('## Introduction\n\nTous les bienfaits du Pilates...').wordCount,
    coverImage: '/images/blog/reformer-benefits.webp'
  }
];

export async function getAllArticles(): Promise<Article[]> {
  // Remplacer par un fetch() API CMS ou fs.readdir() local
  return mockArticles.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
}

export async function getArticleBySlug(slug: string): Promise<Article | null> {
  const articles = await getAllArticles();
  return articles.find(article => article.slug === slug) || null;
}

export async function getRelatedArticles(currentArticle: Article, limit = 3): Promise<Article[]> {
  const articles = await getAllArticles();
  // Logique métier : tri par tags communs ou même catégorie
  return articles
    .filter(a => a.slug !== currentArticle.slug)
    .filter(a => a.category.slug === currentArticle.category.slug || a.tags.some(t => currentArticle.tags.includes(t)))
    .slice(0, limit);
}
