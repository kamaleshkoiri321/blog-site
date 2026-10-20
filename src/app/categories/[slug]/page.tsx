import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { categories, getCategoryBySlug } from "@/lib/categories";
import { getArticlesByCategory } from "@/lib/articles";
import { ArticleCard } from "@/components/blog/article-card";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { EmptyState } from "@/components/ui/empty-state";
import { generateSeoMetadata } from "@/lib/seo";

interface CategoryPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return categories.map((cat) => ({
    slug: cat.slug,
  }));
}

export async function generateMetadata({
  params,
}: CategoryPageProps): Promise<Metadata> {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);

  if (!category) {
    return {
      title: "Category Not Found",
    };
  }

  return generateSeoMetadata({
    title: `${category.name} Articles`,
    description: category.description,
    path: `/categories/${category.slug}`,
  });
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);

  if (!category) {
    notFound();
  }

  const articles = getArticlesByCategory(category.slug);

  return (
    <div className="py-12 md:py-16">
      <div className="mx-auto max-w-[var(--spacing-content)] px-4 sm:px-6 lg:px-8">
        <Breadcrumbs
          items={[
            { label: "Categories", href: "/categories" },
            { label: category.name, href: `/categories/${category.slug}` },
          ]}
        />

        <div className="pb-8 border-b border-border mb-10">
          <div className="text-xs font-mono text-accent uppercase tracking-wider mb-2">
            Topic Archive
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-text-primary tracking-tight">
            {category.name}
          </h1>
          <p className="text-text-secondary mt-2 max-w-xl text-sm sm:text-base leading-relaxed">
            {category.description}
          </p>
          <div className="mt-4 text-xs font-mono text-text-muted">
            Found {articles.length} {articles.length === 1 ? "article" : "articles"} in this category
          </div>
        </div>

        {articles.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.map((article) => (
              <ArticleCard key={article.slug} article={article} />
            ))}
          </div>
        ) : (
          <EmptyState
            title={`No articles in ${category.name} yet`}
            description="Articles in this category are currently being written. Explore our other technical guides in the meantime."
            actionText="Browse All Articles"
            actionHref="/blog"
          />
        )}
      </div>
    </div>
  );
}
