import Link from "next/link";
import { Terminal, ArrowLeft } from "lucide-react";

interface EmptyStateProps {
  title?: string;
  description?: string;
  actionText?: string;
  actionHref?: string;
}

export function EmptyState({
  title = "No articles found",
  description = "Check back soon for new content, or try searching with different keywords.",
  actionText = "Explore All Articles",
  actionHref = "/blog",
}: EmptyStateProps) {
  return (
    <div className="py-16 px-4 text-center rounded-[var(--radius-xl)] border border-border border-dashed bg-bg-card/40 my-8">
      <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-bg-tertiary border border-border text-accent mb-4 shadow-[0_0_15px_rgba(183,255,60,0.15)]">
        <Terminal className="w-6 h-6" />
      </div>
      <h3 className="text-xl font-bold text-text-primary mb-2">{title}</h3>
      <p className="text-sm text-text-secondary max-w-md mx-auto mb-6 leading-relaxed">
        {description}
      </p>
      {actionHref && (
        <Link
          href={actionHref}
          className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-[var(--radius-md)] bg-bg-secondary hover:bg-bg-tertiary text-accent border border-border-accent hover:border-accent transition-all"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{actionText}</span>
        </Link>
      )}
    </div>
  );
}
