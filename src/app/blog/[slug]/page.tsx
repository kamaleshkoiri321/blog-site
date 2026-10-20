import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Calendar, Clock, ArrowLeft, ArrowRight, User } from "lucide-react";
import {
  getArticleBySlug,
  getPublishedArticles,
  getRelatedArticles,
  getAdjacentArticles,
} from "@/lib/articles";
import { compileMdxContent, extractHeadings } from "@/lib/mdx";
import { siteConfig } from "@/lib/site-config";
import { formatDate } from "@/lib/utils";
import { formatReadingTime } from "@/lib/reading-time";
import { generateSeoMetadata, generateArticleJsonLd } from "@/lib/seo";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { CategoryBadge } from "@/components/ui/category-badge";
import { CoverImage } from "@/components/ui/cover-image";
import { TagList } from "@/components/ui/tag-list";
import {
  MobileTableOfContents,
  DesktopTableOfContents,
} from "@/components/blog/table-of-contents";
import { ShareLinks } from "@/components/ui/share-links";
import { ArticleCard } from "@/components/blog/article-card";

interface ArticlePageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const articles = getPublishedArticles();
  return articles.map((article) => ({
    slug: article.slug,
  }));
}

export async function generateMetadata({
  params,
}: ArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article) {
    return {
      title: "Article Not Found",
    };
  }

  return generateSeoMetadata({
    title: article.title,
    description: article.description,
    path: `/blog/${article.slug}`,
    image: article.coverImage,
    type: "article",
    publishedTime: article.date,
    modifiedTime: article.updatedAt || article.date,
    tags: article.tags,
  });
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  const headings = extractHeadings(article.content);
  const mdxContent = await compileMdxContent(article.content);
  const relatedArticles = getRelatedArticles(article.slug, siteConfig.relatedArticlesCount);
  const { previous, next } = getAdjacentArticles(article.slug);
  const jsonLd = generateArticleJsonLd(article);
  const fullArticleUrl = `${siteConfig.url}/blog/${article.slug}`;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <article className="py-10 md:py-16">
        <div className="mx-auto max-w-[var(--spacing-content)] px-4 sm:px-6 lg:px-8">
          {/* Breadcrumbs */}
          <Breadcrumbs
            items={[
              { label: "Blog", href: "/blog" },
              { label: article.category, href: `/categories/${article.categorySlug}` },
              { label: article.title, href: `/blog/${article.slug}` },
            ]}
          />

          {/* Header */}
          <header className="mb-8 max-w-4xl">
            <div className="flex items-center gap-3 mb-4">
              <CategoryBadge name={article.category} size="md" />
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-text-primary tracking-tight leading-[1.15] mb-4">
              {article.title}
            </h1>

            <p className="text-lg sm:text-xl text-text-secondary leading-relaxed mb-6">
              {article.description}
            </p>

            {/* Author & Meta bar */}
            <div className="flex flex-wrap items-center justify-between gap-4 py-4 border-y border-border text-sm text-text-tertiary">
              <div className="flex flex-wrap items-center gap-4 sm:gap-6">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full bg-accent/10 border border-border-accent flex items-center justify-center text-accent">
                    <User className="w-3.5 h-3.5" />
                  </div>
                  <span className="font-medium text-text-primary">
                    {siteConfig.author.name}
                  </span>
                </div>

                <div className="flex items-center gap-1.5">
                  <Calendar className="w-4 h-4 text-text-muted" />
                  <time dateTime={article.date}>{formatDate(article.date)}</time>
                  {article.updatedAt && article.updatedAt !== article.date && (
                    <span className="text-xs text-text-muted">
                      (Updated {formatDate(article.updatedAt)})
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-text-muted" />
                  <span>{formatReadingTime(article.readingTime)}</span>
                </div>
              </div>

              {/* Top Share Links */}
              <ShareLinks title={article.title} url={fullArticleUrl} />
            </div>
          </header>

          {/* Article Cover Image */}
          {article.coverImage && (
            <div className="mb-12 max-w-4xl">
              <CoverImage
                src={article.coverImage}
                alt={article.coverAlt || article.title}
                aspectRatio="wide"
                priority
              />
            </div>
          )}

          {/* Layout: Sidebar TOC + Main Prose */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Main Content Column */}
            <div className="lg:col-span-8">
              {/* Mobile Table of Contents (collapsible outline, only visible on small screens) */}
              <MobileTableOfContents headings={headings} />

              {/* MDX Body */}
              <div className="prose">{mdxContent}</div>

              {/* Tags */}
              <div className="mt-12 pt-6 border-t border-border">
                <div className="text-xs font-mono text-text-muted uppercase tracking-wider mb-3">
                  Article Tags
                </div>
                <TagList tags={article.tags} />
              </div>

              {/* Bottom Share & Back to Blog */}
              <div className="mt-8 pt-6 border-t border-border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <ShareLinks title={article.title} url={fullArticleUrl} />
                <Link
                  href="/blog"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-accent hover:gap-3 transition-all"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back to all articles</span>
                </Link>
              </div>

              {/* Previous and Next Navigation */}
              <nav
                className="mt-12 grid grid-cols-1 sm:grid-cols-2 gap-4"
                aria-label="Previous and Next Articles"
              >
                {previous ? (
                  <Link
                    href={`/blog/${previous.slug}`}
                    className="p-5 rounded-[var(--radius-lg)] border border-border bg-bg-card hover:border-border-hover hover:bg-bg-card-hover transition-all text-left flex flex-col justify-between"
                  >
                    <span className="text-xs font-mono text-text-muted uppercase mb-2 flex items-center gap-1">
                      <ArrowLeft className="w-3 h-3" /> Previous
                    </span>
                    <span className="text-sm font-semibold text-text-primary line-clamp-2">
                      {previous.title}
                    </span>
                  </Link>
                ) : (
                  <div />
                )}

                {next ? (
                  <Link
                    href={`/blog/${next.slug}`}
                    className="p-5 rounded-[var(--radius-lg)] border border-border bg-bg-card hover:border-border-hover hover:bg-bg-card-hover transition-all text-right flex flex-col justify-between"
                  >
                    <span className="text-xs font-mono text-text-muted uppercase mb-2 flex items-center justify-end gap-1">
                      Next <ArrowRight className="w-3 h-3" />
                    </span>
                    <span className="text-sm font-semibold text-text-primary line-clamp-2">
                      {next.title}
                    </span>
                  </Link>
                ) : (
                  <div />
                )}
              </nav>
            </div>

            {/* Desktop Sticky Table of Contents Sidebar */}
            <aside className="hidden lg:block lg:col-span-4 pl-4 border-l border-border/60">
              <DesktopTableOfContents headings={headings} />
            </aside>
          </div>

          {/* Related Articles Section */}
          {relatedArticles.length > 0 && (
            <section className="mt-20 pt-12 border-t border-border">
              <h2 className="text-2xl font-bold text-text-primary tracking-tight mb-8">
                Related Articles
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {relatedArticles.map((rel) => (
                  <ArticleCard key={rel.slug} article={rel} />
                ))}
              </div>
            </section>
          )}
        </div>
      </article>
    </>
  );
}
