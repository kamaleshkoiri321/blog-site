"use client";

import { useState, useTransition } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Search, X, Calendar, Clock } from "lucide-react";
import { searchArticles, type SearchableArticle } from "@/lib/search";
import { categories } from "@/lib/categories";
import { formatDateShort } from "@/lib/utils";
import { formatReadingTime } from "@/lib/reading-time";
import { CategoryBadge } from "@/components/ui/category-badge";
import { CoverImage } from "@/components/ui/cover-image";

interface SearchInterfaceProps {
  initialIndex: SearchableArticle[];
}

export function SearchInterface({ initialIndex }: SearchInterfaceProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get("q") || "";
  const initialCategory = searchParams.get("category") || "";

  const [query, setQuery] = useState(initialQuery);
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [, startTransition] = useTransition();

  const updateUrl = (newQuery: string, newCategory: string) => {
    const params = new URLSearchParams();
    if (newQuery.trim()) params.set("q", newQuery.trim());
    if (newCategory) params.set("category", newCategory);

    const queryString = params.toString();
    startTransition(() => {
      router.replace(queryString ? `/search?${queryString}` : "/search", {
        scroll: false,
      });
    });
  };

  const handleQueryChange = (val: string) => {
    setQuery(val);
    updateUrl(val, selectedCategory);
  };

  const handleCategoryToggle = (categorySlug: string) => {
    const nextCategory = selectedCategory === categorySlug ? "" : categorySlug;
    setSelectedCategory(nextCategory);
    updateUrl(query, nextCategory);
  };

  const handleClear = () => {
    setQuery("");
    updateUrl("", selectedCategory);
  };

  const results = searchArticles(initialIndex, query, selectedCategory || undefined);
  const hasActiveFilters = query.trim().length > 0 || selectedCategory.length > 0;

  return (
    <div>
      {/* Search Bar Input */}
      <div className="relative mb-6">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted" />
        <input
          type="text"
          value={query}
          onChange={(e) => handleQueryChange(e.target.value)}
          placeholder="Search by title, topic, tag, or keywords..."
          className="w-full pl-12 pr-12 py-3.5 rounded-[var(--radius-lg)] bg-bg-card border border-border focus:border-accent text-text-primary placeholder:text-text-muted text-base transition-colors"
          autoFocus
        />
        {query && (
          <button
            onClick={handleClear}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-1 rounded-full text-text-muted hover:text-text-primary hover:bg-bg-tertiary transition-colors"
            aria-label="Clear search query"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Category Filter Chips */}
      <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 text-xs font-mono">
        <span className="text-text-muted shrink-0 mr-1">Filter:</span>
        <button
          onClick={() => handleCategoryToggle("")}
          className={`px-3 py-1.5 rounded-full shrink-0 border transition-colors ${
            !selectedCategory
              ? "bg-accent text-bg-primary font-bold border-accent"
              : "bg-bg-secondary text-text-secondary border-border hover:border-border-hover"
          }`}
        >
          All Topics
        </button>
        {categories.map((cat) => {
          const isSelected = selectedCategory === cat.slug;
          return (
            <button
              key={cat.slug}
              onClick={() => handleCategoryToggle(cat.slug)}
              className={`px-3 py-1.5 rounded-full shrink-0 border transition-colors ${
                isSelected
                  ? "bg-accent text-bg-primary font-bold border-accent"
                  : "bg-bg-secondary text-text-secondary border-border hover:border-border-accent hover:text-text-primary"
              }`}
            >
              {cat.name}
            </button>
          );
        })}
      </div>

      {/* Results Status Feedback */}
      <div className="flex items-center justify-between pb-4 mb-6 border-b border-border text-xs font-mono text-text-tertiary">
        <div>
          Showing {results.length} {results.length === 1 ? "result" : "results"}
          {query && (
            <span>
              {" "}for <span className="text-accent">&ldquo;{query}&rdquo;</span>
            </span>
          )}
          {selectedCategory && (
            <span>
              {" "}in <span className="text-accent">{selectedCategory}</span>
            </span>
          )}
        </div>
        {hasActiveFilters && (
          <button
            onClick={() => {
              setQuery("");
              setSelectedCategory("");
              updateUrl("", "");
            }}
            className="text-text-muted hover:text-accent underline transition-colors"
          >
            Reset all filters
          </button>
        )}
      </div>

      {/* Results Grid / List */}
      {results.length > 0 ? (
        <div className="space-y-4">
          {results.map((article) => (
            <article
              key={article.slug}
              className="p-5 rounded-[var(--radius-lg)] border border-border bg-bg-card hover:bg-bg-card-hover hover:border-border-hover transition-all flex flex-col md:flex-row gap-5 items-start md:items-center justify-between"
            >
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <CategoryBadge name={article.category} size="sm" />
                  <div className="flex items-center gap-3 text-xs text-text-tertiary font-mono">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      <time dateTime={article.date}>{formatDateShort(article.date)}</time>
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      {formatReadingTime(article.readingTime)}
                    </span>
                  </div>
                </div>

                <Link href={`/blog/${article.slug}`}>
                  <h3 className="text-lg font-bold text-text-primary hover:text-accent transition-colors mb-1.5">
                    {article.title}
                  </h3>
                </Link>

                <p className="text-sm text-text-secondary line-clamp-2 leading-relaxed">
                  {article.description}
                </p>

                {/* Tags */}
                {article.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mt-3">
                    {article.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs font-mono px-2 py-0.5 rounded bg-bg-tertiary text-text-tertiary border border-border"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {article.coverImage && (
                <div className="shrink-0 w-full md:w-36 h-24 overflow-hidden rounded-[var(--radius-md)]">
                  <CoverImage
                    src={article.coverImage}
                    alt={article.coverAlt || article.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
            </article>
          ))}
        </div>
      ) : (
        /* No Results State */
        <div className="py-16 text-center rounded-[var(--radius-xl)] border border-border border-dashed bg-bg-card/40 my-6">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-bg-tertiary text-text-muted mb-4">
            <Search className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-bold text-text-primary mb-2">
            No matching articles found
          </h3>
          <p className="text-sm text-text-secondary max-w-md mx-auto mb-6 leading-relaxed">
            We couldn&apos;t find any articles matching your search criteria. Try using broader keywords, or clear your category filter.
          </p>
          <button
            onClick={() => {
              setQuery("");
              setSelectedCategory("");
              updateUrl("", "");
            }}
            className="px-4 py-2 text-xs font-mono rounded-[var(--radius-md)] bg-bg-secondary hover:bg-bg-tertiary text-accent border border-border-accent transition-colors"
          >
            Clear Search &amp; View All
          </button>
        </div>
      )}
    </div>
  );
}
