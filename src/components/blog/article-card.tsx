import Link from "next/link";
import { Clock, Calendar } from "lucide-react";
import { CoverImage } from "@/components/ui/cover-image";
import { CategoryBadge } from "@/components/ui/category-badge";
import { formatDateShort } from "@/lib/utils";
import { formatReadingTime } from "@/lib/reading-time";
import type { Article } from "@/lib/validation";

interface ArticleCardProps {
  article: Article;
}

export function ArticleCard({ article }: ArticleCardProps) {
  return (
    <article className="group rounded-[var(--radius-lg)] border border-border bg-bg-card hover:border-border-hover hover:bg-bg-card-hover transition-all duration-[var(--duration-normal)] overflow-hidden">
      <Link href={`/blog/${article.slug}`} className="block" aria-label={article.title}>
        <CoverImage
          src={article.coverImage}
          alt={article.coverAlt || article.title}
          className="rounded-none rounded-t-[var(--radius-lg)]"
        />
      </Link>

      <div className="p-5">
        <div className="mb-3">
          <CategoryBadge name={article.category} size="sm" />
        </div>

        <Link href={`/blog/${article.slug}`} className="block group/title">
          <h3 className="text-lg font-semibold text-text-primary leading-snug mb-2 group-hover/title:text-accent transition-colors duration-[var(--duration-fast)] line-clamp-2">
            {article.title}
          </h3>
        </Link>

        <p className="text-sm text-text-secondary mb-4 line-clamp-2 leading-relaxed">
          {article.description}
        </p>

        <div className="flex items-center gap-4 text-xs text-text-tertiary">
          <span className="flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5" aria-hidden="true" />
            <time dateTime={article.date}>{formatDateShort(article.date)}</time>
          </span>
          <span className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5" aria-hidden="true" />
            {formatReadingTime(article.readingTime)}
          </span>
        </div>
      </div>
    </article>
  );
}
