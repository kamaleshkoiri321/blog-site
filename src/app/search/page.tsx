import type { Metadata } from "next";
import { Suspense } from "react";
import { SearchInterface } from "@/components/search/search-interface";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { getPublishedArticles } from "@/lib/articles";
import { buildSearchIndex } from "@/lib/search";
import { generateSeoMetadata } from "@/lib/seo";

export const metadata: Metadata = generateSeoMetadata({
  title: "Search Articles",
  description:
    "Fast, keyboard-driven search across all technical explainers, architecture breakdowns, and programming tutorials.",
  path: "/search",
});

export default function SearchPage() {
  const publishedArticles = getPublishedArticles();
  const searchIndex = buildSearchIndex(publishedArticles);

  return (
    <div className="py-12 md:py-16">
      <div className="mx-auto max-w-[var(--spacing-content)] px-4 sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ label: "Search", href: "/search" }]} />

        <div className="pb-8 border-b border-border mb-10">
          <div className="text-xs font-mono text-accent uppercase tracking-wider mb-2">
            Index Query
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-text-primary tracking-tight">
            Search Articles
          </h1>
          <p className="text-text-secondary mt-2 max-w-xl text-sm sm:text-base leading-relaxed">
            Real-time client-side search across titles, descriptions, categories, tags, and full text content.
          </p>
        </div>

        <Suspense
          fallback={
            <div className="py-20 text-center text-sm font-mono text-text-muted">
              Loading search engine...
            </div>
          }
        >
          <SearchInterface initialIndex={searchIndex} />
        </Suspense>
      </div>
    </div>
  );
}
