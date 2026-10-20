import Link from "next/link";
import { ArrowRight, Terminal } from "lucide-react";
import { siteConfig } from "@/lib/site-config";

export function AboutPreview() {
  return (
    <section className="py-16 md:py-20 border-t border-border bg-bg-primary">
      <div className="mx-auto max-w-[var(--spacing-content)] px-4 sm:px-6 lg:px-8">
        <div className="rounded-[var(--radius-xl)] border border-border bg-bg-card/60 p-8 sm:p-12 relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8">
              <div className="inline-flex items-center gap-2 text-xs font-mono text-accent uppercase tracking-wider mb-3">
                <Terminal className="w-3.5 h-3.5" />
                <span>Behind The Blog</span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-bold text-text-primary tracking-tight mb-4">
                Curious by nature, building for the future.
              </h2>

              <p className="text-text-secondary leading-relaxed mb-4">
                <strong>{siteConfig.name}</strong> is a personal publication dedicated to deconstructing complex technology into clear, intuitive concepts. From LLMs and retrieval algorithms to modern web architecture and everyday developer tools, this is where curiosity meets code.
              </p>

              <p className="text-text-secondary leading-relaxed mb-6">
                The goal isn&apos;t just reading tutorials — it&apos;s gaining a genuine understanding of how things work under the hood.
              </p>

              <Link
                href="/about"
                className="inline-flex items-center gap-2 text-sm font-semibold text-accent hover:gap-3 transition-all"
              >
                <span>Read the full story & manifesto</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="lg:col-span-4 border-t lg:border-t-0 lg:border-l border-border pt-6 lg:pt-0 lg:pl-8">
              <div className="space-y-4 font-mono text-xs text-text-secondary">
                <div className="p-3.5 rounded-[var(--radius-md)] bg-bg-tertiary border border-border">
                  <div className="text-accent font-semibold mb-1">01. Zero Jargon Fluff</div>
                  <div>Direct explainers with architectural diagrams & mental models.</div>
                </div>
                <div className="p-3.5 rounded-[var(--radius-md)] bg-bg-tertiary border border-border">
                  <div className="text-accent font-semibold mb-1">02. Hands-on Code</div>
                  <div>Real snippets, error handling, and production considerations.</div>
                </div>
                <div className="p-3.5 rounded-[var(--radius-md)] bg-bg-tertiary border border-border">
                  <div className="text-accent font-semibold mb-1">03. Fast & Open</div>
                  <div>Lightweight static markdown architecture with zero bloated trackers.</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
