import Link from "next/link";
import Image from "next/image";
import { Clock, Calendar, ArrowRight } from "lucide-react";
import { CategoryBadge } from "@/components/ui/category-badge";
import { formatDate } from "@/lib/utils";
import { formatReadingTime } from "@/lib/reading-time";
import type { Article } from "@/lib/validation";

interface FeaturedArticleProps {
  article: Article;
}

export function FeaturedArticle({ article }: FeaturedArticleProps) {
  return (
    <article className="group rounded-[var(--radius-xl)] border border-border bg-bg-card hover:border-border-hover transition-all duration-[var(--duration-normal)] overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 items-stretch min-w-0">
        <Link
          href={`/blog/${article.slug}`}
          className="block relative w-full h-full min-h-[260px] sm:min-h-[300px] lg:min-h-full overflow-hidden bg-[#0A0D0C] min-w-0 p-4 sm:p-6 flex items-center justify-center border-b lg:border-b-0 lg:border-r border-border/60"
          aria-label={article.title}
        >
          <div className="relative w-full h-full aspect-[16/9] lg:aspect-auto min-h-[220px] sm:min-h-[260px] lg:min-h-[320px] overflow-hidden flex items-center justify-center">
            {article.coverImage ? (
              <Image
                src={article.coverImage}
                alt={article.coverAlt || article.title}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-contain drop-shadow-[0_0_20px_rgba(183,255,60,0.2)] group-hover:scale-[1.03] transition-transform duration-300"
                unoptimized={article.coverImage.endsWith(".svg") || article.coverImage.startsWith("http")}
              />
            ) : (
              <div className="w-full h-full bg-bg-tertiary flex items-center justify-center text-text-muted">
                {article.title}
              </div>
            )}
          </div>
        </Link>

        <div className="p-6 sm:p-8 lg:p-10 flex flex-col justify-center min-w-0">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-xs font-semibold text-accent uppercase tracking-widest">
              Featured
            </span>
            <span className="text-text-muted">·</span>
            <CategoryBadge name={article.category} size="sm" />
          </div>

          <Link href={`/blog/${article.slug}`} className="block group/title">
            <h2 className="text-2xl sm:text-3xl font-bold text-text-primary leading-tight mb-3 group-hover/title:text-accent transition-colors duration-[var(--duration-fast)]">
              {article.title}
            </h2>
          </Link>

          <p className="text-text-secondary mb-6 leading-relaxed line-clamp-3 text-sm sm:text-base">
            {article.description}
          </p>

          <div className="flex items-center gap-4 text-sm text-text-tertiary mb-6">
            <span className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4" aria-hidden="true" />
              <time dateTime={article.date}>{formatDate(article.date)}</time>
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-4 h-4" aria-hidden="true" />
              {formatReadingTime(article.readingTime)}
            </span>
          </div>

          <Link
            href={`/blog/${article.slug}`}
            className="inline-flex items-center gap-2 text-sm font-semibold text-accent hover:gap-3 transition-all duration-[var(--duration-normal)]"
          >
            <span>Read Article</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </article>
  );
}
