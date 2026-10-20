import type { Metadata } from "next";
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
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { generateSeoMetadata } from "@/lib/seo";

export const metadata: Metadata = generateSeoMetadata({
  title: "Categories",
  description:
    "Browse articles by topic: Artificial Intelligence, Machine Learning, Programming, Web Development, Developer Tools, and more.",
  path: "/categories",
});

const iconMap: Record<string, React.ReactNode> = {
  Brain: <Brain className="w-6 h-6" />,
  TrendingUp: <TrendingUp className="w-6 h-6" />,
  Sparkles: <Sparkles className="w-6 h-6" />,
  Code: <Code className="w-6 h-6" />,
  Globe: <Globe className="w-6 h-6" />,
  Wrench: <Wrench className="w-6 h-6" />,
  Compass: <Compass className="w-6 h-6" />,
  Laugh: <Laugh className="w-6 h-6" />,
};

export default function CategoriesPage() {
  const counts = getCategoriesWithCount();
  const countMap = new Map(counts.map((c) => [c.slug, c.count]));

  return (
    <div className="py-12 md:py-16">
      <div className="mx-auto max-w-[var(--spacing-content)] px-4 sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ label: "Categories", href: "/categories" }]} />

        <div className="pb-8 border-b border-border mb-10">
          <div className="text-xs font-mono text-accent uppercase tracking-wider mb-2">
            Taxonomy Directory
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-text-primary tracking-tight">
            Topics &amp; Categories
          </h1>
          <p className="text-text-secondary mt-2 max-w-xl text-sm sm:text-base leading-relaxed">
            Curated directories covering specialized fields across the modern engineering landscape.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => {
            const count = countMap.get(category.slug) || 0;
            const icon = iconMap[category.icon] || <Code className="w-6 h-6" />;

            return (
              <Link
                key={category.slug}
                href={`/categories/${category.slug}`}
                className="group p-6 rounded-[var(--radius-lg)] border border-border bg-bg-card hover:bg-bg-card-hover hover:border-border-accent transition-all duration-200 flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-[var(--radius-md)] bg-bg-tertiary border border-border group-hover:border-accent/40 text-accent flex items-center justify-center mb-5 transition-colors">
                    {icon}
                  </div>
                  <h2 className="text-xl font-bold text-text-primary group-hover:text-accent transition-colors mb-2">
                    {category.name}
                  </h2>
                  <p className="text-sm text-text-secondary leading-relaxed mb-6">
                    {category.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-border/60 flex items-center justify-between text-xs font-mono">
                  <span className="text-text-muted">
                    {count} {count === 1 ? "article" : "articles"}
                  </span>
                  <span className="text-accent flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                    <span>Browse</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
