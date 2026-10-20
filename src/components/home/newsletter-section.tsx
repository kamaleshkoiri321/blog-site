import { Mail, Sparkles } from "lucide-react";

export function NewsletterSection() {
  return (
    <section className="py-16 border-t border-border bg-bg-secondary/50">
      <div className="mx-auto max-w-[var(--spacing-content)] px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-[var(--radius-xl)] border border-border bg-bg-card p-8 sm:p-12 overflow-hidden">
          {/* Subtle accent glow */}
          <div
            className="absolute -right-20 -bottom-20 w-80 h-80 bg-accent/5 rounded-full blur-[100px] pointer-events-none"
            aria-hidden="true"
          />

          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent-subtle border border-border-accent text-accent text-xs font-mono mb-4">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Newsletter Preview</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-bold text-text-primary tracking-tight mb-3">
              Stay ahead with curated technical insights.
            </h2>

            <p className="text-text-secondary text-sm sm:text-base leading-relaxed mb-6">
              When activated, get new explainers, architecture teardowns, and engineering discoveries delivered directly to your inbox. No spam, ever.
            </p>

            {/* Provider integration point notice */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 max-w-lg">
              <div className="relative flex-1">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
                <input
                  type="email"
                  disabled
                  placeholder="Integration ready (connect via .env)"
                  className="w-full pl-10 pr-4 py-2.5 rounded-[var(--radius-md)] bg-bg-input border border-border text-sm text-text-muted cursor-not-allowed"
                />
              </div>
              <button
                type="button"
                disabled
                className="px-5 py-2.5 rounded-[var(--radius-md)] bg-bg-tertiary text-text-muted text-sm font-semibold cursor-not-allowed border border-border"
              >
                Coming Soon
              </button>
            </div>

            <p className="text-xs text-text-tertiary mt-3 font-mono">
              * Connect Resend, ConvertKit, or Buttondown in <code>lib/site-config.ts</code>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
