import type { Metadata } from "next";
import Link from "next/link";
import { Search } from "lucide-react";
import { ArticleCard } from "@/components/blog/article-card";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { getPublishedArticles, getAllTags } from "@/lib/articles";
import { generateSeoMetadata } from "@/lib/seo";

export const metadata: Metadata = generateSeoMetadata({
  title: "Blog — All Articles",
  description:
    "Explore all engineering guides, AI deep-dives, developer tools, and technology explainers by TheLazyEngineer.",
  path: "/blog",
});

export default function BlogPage() {
  const articles = getPublishedArticles();
  const tags = getAllTags();

  return (
    <div className="py-12 md:py-16">
      <div className="mx-auto max-w-[var(--spacing-content)] px-4 sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ label: "Blog", href: "/blog" }]} />

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-border mb-10">
          <div>
            <div className="text-xs font-mono text-accent uppercase tracking-wider mb-2">
              Writing &amp; Guides
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-text-primary tracking-tight">
              All Publications
            </h1>
            <p className="text-text-secondary mt-2 max-w-xl text-sm sm:text-base leading-relaxed">
              In-depth articles covering modern web architecture, artificial intelligence, practical programming, and developer tooling.
            </p>
          </div>

          <Link
            href="/search"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-[var(--radius-md)] bg-bg-secondary hover:bg-bg-tertiary border border-border hover:border-border-accent text-sm text-text-secondary hover:text-accent font-medium transition-colors"
          >
            <Search className="w-4 h-4" />
            <span>Search articles...</span>
          </Link>
        </div>

        {/* Popular Tags Bar */}
        {tags.length > 0 && (
          <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 text-xs font-mono text-text-muted">
            <span className="shrink-0 uppercase">Tags:</span>
            {tags.map((tag) => (
              <Link
                key={tag}
                href={`/search?q=${encodeURIComponent(tag)}`}
                className="shrink-0 px-2.5 py-1 rounded-full bg-bg-tertiary text-text-secondary hover:text-accent hover:border-border-accent border border-border transition-colors"
              >
                #{tag}
              </Link>
            ))}
          </div>
        )}

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map((article) => (
            <ArticleCard key={article.slug} article={article} />
          ))}
        </div>
      </div>
    </div>
  );
}
