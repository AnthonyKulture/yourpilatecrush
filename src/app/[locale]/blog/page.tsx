import { buildMetadata } from '@/lib/seo';
import { getAllArticles } from '@/lib/articles';
import { getTranslations } from 'next-intl/server';
import Link from 'next/link';
import type { Metadata } from 'next';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'seo.blog' });
  return buildMetadata({
    title: t('title'),
    description: t('description'),
    path: '/blog',
    locale,
  });
}

export default async function BlogIndexPage() {
  const articles = await getAllArticles();

  return (
    <main className="flex flex-col w-full min-h-screen pt-32 pb-20 px-gutter-mobile sm:px-gutter-desktop">
      <div className="max-w-4xl mx-auto w-full">
        <h1 className="text-5xl font-display text-burgundy-deep mb-4">Le Journal</h1>
        <p className="text-xl mb-12 opacity-80">Conseils et expertises Pilates & Lagree.</p>

        <div className="flex flex-col gap-8">
          {articles.map((article) => (
            <article key={article.slug} className="border border-burgundy-deep/10 p-6 rounded-2xl">
              <Link href={`/blog/${article.slug}`}>
                <h2 className="text-2xl font-bold mb-2 hover:text-gold-champagne transition-colors">
                  {article.title}
                </h2>
              </Link>
              <p className="text-sm opacity-60 mb-4">{new Date(article.publishedAt).toLocaleDateString('fr-FR')} · {article.readingTime} min de lecture</p>
              <p className="opacity-80">{article.description}</p>
              <div className="mt-4 flex gap-2">
                {article.tags.map(tag => (
                  <span key={tag} className="text-xs bg-burgundy-deep/5 px-2 py-1 rounded-md">{tag}</span>
                ))}
              </div>
            </article>
          ))}
          {articles.length === 0 && (
            <p className="opacity-60 text-lg">Les articles arrivent bientôt.</p>
          )}
        </div>
      </div>
    </main>
  );
}
