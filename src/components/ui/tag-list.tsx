import Link from "next/link";
import { Hash } from "lucide-react";

interface TagListProps {
  tags: string[];
  className?: string;
}

export function TagList({ tags, className = "" }: TagListProps) {
  if (!tags || tags.length === 0) return null;

  return (
    <div className={`flex flex-wrap items-center gap-2 ${className}`}>
      {tags.map((tag) => (
        <Link
          key={tag}
          href={`/search?q=${encodeURIComponent(tag)}`}
          className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-mono rounded-[var(--radius-sm)] bg-bg-tertiary text-text-secondary hover:text-accent hover:bg-bg-card-hover border border-border hover:border-border-accent transition-colors"
          aria-label={`View articles tagged with ${tag}`}
        >
          <Hash className="w-3 h-3 text-text-muted" />
          <span>{tag}</span>
        </Link>
      ))}
    </div>
  );
}
