import type { Metadata } from "next";
import { siteConfig } from "@/lib/site-config";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { generateSeoMetadata } from "@/lib/seo";

export const metadata: Metadata = generateSeoMetadata({
  title: "Terms of Use",
  description: `Terms and conditions for utilizing materials and code published on ${siteConfig.name}.`,
  path: "/terms",
});

export default function TermsPage() {
  return (
    <div className="py-12 md:py-16">
      <div className="mx-auto max-w-[var(--spacing-content)] px-4 sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ label: "Terms of Use", href: "/terms" }]} />

        <div className="pb-8 border-b border-border mb-10 max-w-3xl">
          <div className="text-xs font-mono text-accent uppercase tracking-wider mb-2">
            Usage Agreement
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-text-primary tracking-tight">
            Terms of Use
          </h1>
          <p className="text-xs font-mono text-text-muted mt-2">
            Effective Date: October 20, 2026
          </p>
        </div>

        <div className="prose">
          <h2>1. Acceptance of Terms</h2>
          <p>
            By accessing and reading <strong>{siteConfig.name}</strong>, you agree to comply with and be bound by these terms. If you do not agree to these terms, please discontinue using this website.
          </p>

          <h2>2. Open-Source Code Snippets &amp; Licensing</h2>
          <p>
            Unless explicitly noted otherwise, all standalone code snippets, utility functions, and programming demonstrations published on this blog are provided under the permissive <strong>MIT License</strong>.
          </p>
          <p>
            You are free to copy, modify, and incorporate these snippets into your personal or commercial software projects without attribution, provided you understand they are provided &ldquo;as is&rdquo; without warranty of any kind.
          </p>

          <h2>3. Intellectual Property of Editorial Content</h2>
          <p>
            The original written articles, custom SVG graphics, illustrations, and editorial layout of {siteConfig.name} are the intellectual property of the author. You may quote short passages with proper attribution and a backlink to the original article, but full syndication or automated scraping is prohibited without written permission.
          </p>

          <h2>4. Technical Disclaimer</h2>
          <p>
            The guides and opinions on this website reflect personal engineering experiences and architectural research. Technology stacks evolve rapidly. While every effort is made to ensure accuracy at the time of publication, no guarantee is made that code will function in every environment or remain compatible with future framework versions.
          </p>

          <h2>5. Limitation of Liability</h2>
          <p>
            In no event shall {siteConfig.name} or its author be liable for any direct, indirect, incidental, or consequential damages resulting from the use or inability to use code, configurations, or technical advice found on this site.
          </p>
        </div>
      </div>
    </div>
  );
}
