import Link from "next/link";
import {
  Brain,
  TrendingUp,
  Sparkles,
  Code,
  Globe,
  Wrench,
  Compass,
  Laugh,
  ArrowRight,
} from "lucide-react";
import { categories } from "@/lib/categories";
import { getCategoriesWithCount } from "@/lib/articles";

const iconMap: Record<string, React.ReactNode> = {
  Brain: <Brain className="w-5 h-5" />,
  TrendingUp: <TrendingUp className="w-5 h-5" />,
  Sparkles: <Sparkles className="w-5 h-5" />,
  Code: <Code className="w-5 h-5" />,
  Globe: <Globe className="w-5 h-5" />,
  Wrench: <Wrench className="w-5 h-5" />,
  Compass: <Compass className="w-5 h-5" />,
  Laugh: <Laugh className="w-5 h-5" />,
};

export function CategoriesShowcase() {
  const counts = getCategoriesWithCount();
  const countMap = new Map(counts.map((c) => [c.slug, c.count]));

  return (
    <section className="py-16 md:py-20 border-t border-border bg-bg-secondary/40">
      <div className="mx-auto max-w-[var(--spacing-content)] px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
          <div>
            <div className="text-xs font-mono text-accent uppercase tracking-wider mb-2">
              Explore By Topic
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-text-primary tracking-tight">
              Featured Categories
            </h2>
          </div>
          <Link
            href="/categories"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-text-secondary hover:text-accent transition-colors"
          >
            <span>All Categories</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {categories.map((category) => {
            const articleCount = countMap.get(category.slug) || 0;
            const icon = iconMap[category.icon] || <Code className="w-5 h-5" />;

            return (
              <Link
                key={category.slug}
                href={`/categories/${category.slug}`}
                className="group p-5 rounded-[var(--radius-lg)] border border-border bg-bg-card hover:bg-bg-card-hover hover:border-border-accent transition-all duration-200 flex flex-col justify-between"
              >
                <div>
                  <div className="w-10 h-10 rounded-[var(--radius-md)] bg-bg-tertiary border border-border group-hover:border-accent/40 text-accent flex items-center justify-center mb-4 transition-colors">
                    {icon}
                  </div>
                  <h3 className="font-semibold text-text-primary group-hover:text-accent transition-colors mb-1.5">
                    {category.name}
                  </h3>
                  <p className="text-xs text-text-secondary line-clamp-2 leading-relaxed">
                    {category.description}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-border/60 flex items-center justify-between text-xs font-mono text-text-tertiary">
                  <span>{articleCount} {articleCount === 1 ? "article" : "articles"}</span>
                  <span className="text-accent opacity-0 group-hover:opacity-100 transition-opacity">
                    Explore →
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
