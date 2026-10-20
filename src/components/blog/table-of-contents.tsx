"use client";

import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";

interface TableOfContentsProps {
  headings: { id: string; text: string; level: number }[];
  variant?: "desktop" | "mobile";
}

export function TableOfContents({
  headings,
  variant = "desktop",
}: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>("");
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        }
      },
      {
        rootMargin: "-80px 0px -70% 0px",
        threshold: 0,
      }
    );

    for (const heading of headings) {
      const el = document.getElementById(heading.id);
      if (el) observer.observe(el);
    }

    return () => observer.disconnect();
  }, [headings]);

  if (headings.length === 0) return null;

  // Mobile Version: Collapsible dropdown block placed above prose (only visible on mobile screens)
  if (variant === "mobile") {
    return (
      <div className="lg:hidden mb-8 rounded-[var(--radius-md)] border border-border bg-bg-secondary p-3.5">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full flex items-center justify-between text-sm font-semibold text-text-primary"
          aria-expanded={isOpen}
        >
          <span className="flex items-center gap-2">
            <span className="text-accent text-xs font-mono uppercase tracking-wider">
              Outline
            </span>
            <span>Table of Contents</span>
          </span>
          <ChevronDown
            className={cn("w-4 h-4 text-text-muted transition-transform duration-200", isOpen && "rotate-180")}
          />
        </button>

        {isOpen && (
          <nav className="mt-3 pt-3 border-t border-border/70" aria-label="Table of contents">
            <TocLinks
              headings={headings}
              activeId={activeId}
              onClickLink={() => setIsOpen(false)}
            />
          </nav>
        )}
      </div>
    );
  }

  // Desktop Version: Sticky sidebar column (rendered ONLY in the desktop sidebar aside)
  return (
    <nav
      className="sticky top-24 max-h-[calc(100vh-8rem)] overflow-y-auto pr-2"
      aria-label="Table of contents"
    >
      <div className="flex items-center gap-2 mb-3">
        <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
        <p className="text-xs font-mono font-semibold text-text-tertiary uppercase tracking-wider">
          On this page
        </p>
      </div>
      <TocLinks headings={headings} activeId={activeId} />
    </nav>
  );
}

// Standalone mobile TOC export
export function MobileTableOfContents(props: { headings: { id: string; text: string; level: number }[] }) {
  return <TableOfContents {...props} variant="mobile" />;
}

// Standalone desktop TOC export
export function DesktopTableOfContents(props: { headings: { id: string; text: string; level: number }[] }) {
  return <TableOfContents {...props} variant="desktop" />;
}

function TocLinks({
  headings,
  activeId,
  onClickLink,
}: {
  headings: { id: string; text: string; level: number }[];
  activeId: string;
  onClickLink?: () => void;
}) {
  return (
    <ul className="space-y-1">
      {headings.map((heading) => (
        <li key={heading.id}>
          <a
            href={`#${heading.id}`}
            onClick={onClickLink}
            className={cn(
              "block text-sm py-1 border-l-2 transition-colors duration-[var(--duration-fast)] leading-snug",
              heading.level === 2 && "pl-3",
              heading.level === 3 && "pl-6 text-xs",
              heading.level >= 4 && "pl-9 text-xs",
              activeId === heading.id
                ? "border-accent text-accent font-semibold"
                : "border-transparent text-text-tertiary hover:text-text-primary hover:border-border-hover"
            )}
          >
            {heading.text}
          </a>
        </li>
      ))}
    </ul>
  );
}
