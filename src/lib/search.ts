import type { Article } from "./validation";

export interface SearchableArticle {
  slug: string;
  title: string;
  description: string;
  category: string;
  categorySlug: string;
  tags: string[];
  date: string;
  readingTime: number;
  coverImage?: string;
  coverAlt?: string;
  content: string;
}

export function buildSearchIndex(
  articles: Article[]
): SearchableArticle[] {
  return articles.map((article) => ({
    slug: article.slug,
    title: article.title,
    description: article.description,
    category: article.category,
    categorySlug: article.categorySlug,
    tags: article.tags,
    date: article.date,
    readingTime: article.readingTime,
    coverImage: article.coverImage,
    coverAlt: article.coverAlt,
    // Strip MDX/markdown syntax for search
    content: article.content
      .replace(/import\s+.*?from\s+['"].*?['"]/g, "")
      .replace(/<[^>]*>/g, "")
      .replace(/```[\s\S]*?```/g, "")
      .replace(/`[^`]*`/g, "")
      .replace(/!\[.*?\]\(.*?\)/g, "")
      .replace(/\[([^\]]*)\]\([^)]*\)/g, "$1")
      .replace(/[#*_~>|]/g, "")
      .replace(/---/g, "")
      .replace(/\n{3,}/g, "\n\n")
      .trim(),
  }));
}

export function searchArticles(
  articles: SearchableArticle[],
  query: string,
  categoryFilter?: string
): SearchableArticle[] {
  let results = articles;

  if (categoryFilter) {
    results = results.filter(
      (a) => a.categorySlug === categoryFilter
    );
  }

  if (!query.trim()) return results;

  const terms = query
    .toLowerCase()
    .split(/\s+/)
    .filter((t) => t.length > 0);

  return results.filter((article) => {
    const searchableText = [
      article.title,
      article.description,
      article.category,
      ...article.tags,
      article.content,
    ]
      .join(" ")
      .toLowerCase();

    return terms.every((term) => searchableText.includes(term));
  });
}
