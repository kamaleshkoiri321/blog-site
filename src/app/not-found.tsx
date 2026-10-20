import Link from "next/link";
import { Terminal, Home, Search } from "lucide-react";

export default function NotFound() {
  return (
    <div className="py-24 md:py-32 flex items-center justify-center">
      <div className="mx-auto max-w-lg px-4 text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-bg-secondary border border-border text-accent mb-6 shadow-[0_0_20px_rgba(183,255,60,0.2)]">
          <Terminal className="w-8 h-8" />
        </div>

        <div className="text-xs font-mono text-accent uppercase tracking-widest mb-2">
          ERROR 404 — RESOURCE NOT FOUND
        </div>

        <h1 className="text-4xl font-extrabold text-text-primary tracking-tight mb-4">
          Page disappeared into the void.
        </h1>

        <p className="text-text-secondary text-sm sm:text-base leading-relaxed mb-8">
          The requested URL does not point to an active article or route. It may have been refactored, moved, or never existed in the repository.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-[var(--radius-md)] bg-accent text-bg-primary font-bold text-sm hover:bg-accent-dim transition-all"
          >
            <Home className="w-4 h-4" />
            <span>Return Home</span>
          </Link>

          <Link
            href="/search"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-[var(--radius-md)] bg-bg-secondary hover:bg-bg-tertiary text-text-primary border border-border text-sm font-semibold transition-all"
          >
            <Search className="w-4 h-4" />
            <span>Search Articles</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
