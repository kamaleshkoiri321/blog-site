import Link from "next/link";
import { getCategorySlug } from "@/lib/categories";

interface CategoryBadgeProps {
  name: string;
  size?: "sm" | "md";
  linked?: boolean;
}

export function CategoryBadge({
  name,
  size = "sm",
  linked = true,
}: CategoryBadgeProps) {
  const slug = getCategorySlug(name);
  const sizeClasses = {
    sm: "text-xs px-2.5 py-1",
    md: "text-sm px-3 py-1.5",
  };

  const badge = (
    <span
      className={`inline-block rounded-full font-medium bg-accent-subtle text-accent border border-border-accent ${sizeClasses[size]} transition-colors duration-[var(--duration-fast)] ${linked ? "hover:bg-accent hover:text-bg-primary" : ""}`}
    >
      {name}
    </span>
  );

  if (linked) {
    return (
      <Link href={`/categories/${slug}`} aria-label={`View articles in ${name}`}>
        {badge}
      </Link>
    );
  }

  return badge;
}
