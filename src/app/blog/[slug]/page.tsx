import { getArticleBySlug, getAllArticles } from '@/lib/articles';
import { buildMetadata, SITE_URL } from '@/lib/seo';
import { ArticleJsonLd } from '@/components/seo/ArticleJsonLd';
import { BreadcrumbListSchema } from '@/components/seo/BreadcrumbListSchema';
import { notFound } from 'next/navigation';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);

  if (!article) return buildMetadata({ noIndex: true });

  return buildMetadata({
    title: article.title,
    description: article.description,
    path: `/blog/${article.slug}`,
    image: article.coverImage,
  });
}

// Permet de générer statiquement les pages du blog au build (Static Site Generation avec App Router)
export async function generateStaticParams() {
  const articles = await getAllArticles();
  return articles.map((article) => ({
    slug: article.slug,
  }));
}

export default async function ArticlePage({ params }: PageProps) {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  const breadcrumbItems = [
    { label: 'Accueil', href: SITE_URL },
    { label: 'Blog', href: `${SITE_URL}/blog` },
    { label: article.title, href: `${SITE_URL}/blog/${article.slug}` },
  ];

  return (
    <>
      <ArticleJsonLd article={article} />
      <BreadcrumbListSchema items={breadcrumbItems} />
      
      <main className="flex flex-col w-full min-h-screen pt-32 pb-20 px-gutter-mobile sm:px-gutter-desktop">
        <article className="max-w-3xl mx-auto w-full">
          <header className="mb-12 text-center">
            <h1 className="text-4xl sm:text-5xl font-display text-burgundy-deep mb-6 leading-tight">
              {article.title}
            </h1>
            <div className="flex justify-center items-center gap-4 text-sm opacity-70 uppercase tracking-widest font-sans">
              <time dateTime={article.publishedAt}>
                {new Date(article.publishedAt).toLocaleDateString('fr-FR', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </time>
              <span>·</span>
              <span>{article.readingTime} min</span>
              <span>·</span>
              <span>Par {article.author.name}</span>
            </div>
          </header>

          <div dangerouslySetInnerHTML={{ __html: article.content }} className="prose prose-burgundy max-w-none" />
        </article>
      </main>
    </>
  );
}
