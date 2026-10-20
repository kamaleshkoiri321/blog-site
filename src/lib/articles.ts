import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { validateFrontmatter, type Article } from "./validation";
import { calculateReadingTime } from "./reading-time";
import { getCategorySlug } from "./categories";

const CONTENT_DIR = path.join(process.cwd(), "content", "blog");

function getMdxFiles(): string[] {
  if (!fs.existsSync(CONTENT_DIR)) {
    return [];
  }
  return fs
    .readdirSync(CONTENT_DIR)
    .filter((file) => file.endsWith(".mdx"));
}

export function getAllArticles(): Article[] {
  const files = getMdxFiles();
  const articles: Article[] = [];

  for (const file of files) {
    try {
      const filePath = path.join(CONTENT_DIR, file);
      const raw = fs.readFileSync(filePath, "utf-8");
      const { data, content } = matter(raw);

      const frontmatter = validateFrontmatter(
        data as Record<string, unknown>,
        file
      );

      articles.push({
        ...frontmatter,
        content,
        readingTime: calculateReadingTime(content),
        categorySlug: getCategorySlug(frontmatter.category),
      });
    } catch (error) {
      console.warn(`⚠️ Skipping ${file}:`, error);
      continue;
    }
  }

  return articles.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

export function getPublishedArticles(): Article[] {
  return getAllArticles().filter((article) => !article.draft);
}

export function getFeaturedArticle(): Article | undefined {
  return getPublishedArticles().find((article) => article.featured);
}

export function getArticleBySlug(slug: string): Article | undefined {
  return getPublishedArticles().find((article) => article.slug === slug);
}

export function getArticlesByCategory(categorySlug: string): Article[] {
  return getPublishedArticles().filter(
    (article) => article.categorySlug === categorySlug
  );
}

export function getArticlesByTag(tag: string): Article[] {
  return getPublishedArticles().filter((article) =>
    article.tags.some((t) => t.toLowerCase() === tag.toLowerCase())
  );
}

export function getRelatedArticles(
  currentSlug: string,
  count: number = 3
): Article[] {
  const current = getArticleBySlug(currentSlug);
  if (!current) return [];

  const published = getPublishedArticles().filter(
    (a) => a.slug !== currentSlug
  );

  // Score articles by relevance: same category (+3), shared tags (+1 each)
  const scored = published.map((article) => {
    let score = 0;
    if (article.categorySlug === current.categorySlug) score += 3;
    for (const tag of article.tags) {
      if (current.tags.includes(tag)) score += 1;
    }
    return { article, score };
  });

  return scored
    .sort((a, b) => b.score - a.score)
    .slice(0, count)
    .map((s) => s.article);
}

export function getAdjacentArticles(slug: string): {
  previous: Article | null;
  next: Article | null;
} {
  const articles = getPublishedArticles();
  const index = articles.findIndex((a) => a.slug === slug);

  if (index === -1) return { previous: null, next: null };

  return {
    previous: index < articles.length - 1 ? articles[index + 1] : null,
    next: index > 0 ? articles[index - 1] : null,
  };
}

export function getAllTags(): string[] {
  const tags = new Set<string>();
  for (const article of getPublishedArticles()) {
    for (const tag of article.tags) {
      tags.add(tag);
    }
  }
  return Array.from(tags).sort();
}

export function getCategoriesWithCount(): { slug: string; name: string; count: number }[] {
  const articles = getPublishedArticles();
  const map = new Map<string, { name: string; count: number }>();

  for (const article of articles) {
    const existing = map.get(article.categorySlug);
    if (existing) {
      existing.count++;
    } else {
      map.set(article.categorySlug, {
        name: article.category,
        count: 1,
      });
    }
  }

  return Array.from(map.entries())
    .map(([slug, data]) => ({ slug, ...data }))
    .sort((a, b) => b.count - a.count);
}
