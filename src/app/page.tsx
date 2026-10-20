import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Hero } from "@/components/home/hero";
import { FeaturedArticle } from "@/components/blog/featured-article";
import { ArticleCard } from "@/components/blog/article-card";
import { CategoriesShowcase } from "@/components/home/categories-showcase";
import { AboutPreview } from "@/components/home/about-preview";
import { NewsletterSection } from "@/components/home/newsletter-section";
import { getPublishedArticles, getFeaturedArticle } from "@/lib/articles";

export default function HomePage() {
  const allArticles = getPublishedArticles();
  const featured = getFeaturedArticle() || allArticles[0];
  const latestArticles = allArticles
    .filter((a) => a.slug !== featured?.slug)
    .slice(0, 6);

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <Hero />

      {/* Featured Article Section */}
      {featured && (
        <section className="py-16 md:py-20 border-b border-border bg-bg-primary">
          <div className="mx-auto max-w-[var(--spacing-content)] px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-8">
              <div>
                <span className="text-xs font-mono text-accent uppercase tracking-wider">
                  Must Read
                </span>
                <h2 className="text-2xl sm:text-3xl font-bold text-text-primary tracking-tight">
                  Featured Publication
                </h2>
              </div>
            </div>

            <FeaturedArticle article={featured} />
          </div>
        </section>
      )}

      {/* Latest Articles Grid */}
      <section className="py-16 md:py-20 bg-bg-secondary/30">
        <div className="mx-auto max-w-[var(--spacing-content)] px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
            <div>
              <span className="text-xs font-mono text-accent uppercase tracking-wider">
                Fresh From The Desk
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-text-primary tracking-tight">
                Latest Articles
              </h2>
            </div>
            <Link
              href="/blog"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-text-secondary hover:text-accent transition-colors"
            >
              <span>View All Articles</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {latestArticles.map((article) => (
              <ArticleCard key={article.slug} article={article} />
            ))}
          </div>
        </div>
      </section>

      {/* Categories Showcase */}
      <CategoriesShowcase />

      {/* About Preview */}
      <AboutPreview />

      {/* Newsletter Section */}
      <NewsletterSection />
    </div>
  );
}
