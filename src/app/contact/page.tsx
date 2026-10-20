import type { Metadata } from "next";
import { Mail, MessageSquare, Terminal } from "lucide-react";
import { siteConfig } from "@/lib/site-config";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { ContactForm } from "@/components/contact/contact-form";
import { generateSeoMetadata } from "@/lib/seo";

export const metadata: Metadata = generateSeoMetadata({
  title: "Contact",
  description:
    "Get in touch with TheLazyEngineer. Send feedback, technical suggestions, or collaboration inquiries.",
  path: "/contact",
});

export default function ContactPage() {
  const hasEmail = Boolean(siteConfig.author.links.email);
  const hasGithub = Boolean(siteConfig.author.links.github);

  return (
    <div className="py-12 md:py-16">
      <div className="mx-auto max-w-[var(--spacing-content)] px-4 sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ label: "Contact", href: "/contact" }]} />

        <div className="pb-8 border-b border-border mb-10">
          <div className="text-xs font-mono text-accent uppercase tracking-wider mb-2">
            Transmission Channel
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-text-primary tracking-tight">
            Get in Touch
          </h1>
          <p className="text-text-secondary mt-2 max-w-xl text-sm sm:text-base leading-relaxed">
            Have questions about an article, discovered a bug, or want to discuss a technical collaboration?
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Contact Details Column */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-6 rounded-[var(--radius-lg)] border border-border bg-bg-card">
              <h2 className="text-base font-bold text-text-primary mb-4 flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-accent" />
                <span>Direct Contact</span>
              </h2>

              <div className="space-y-4 text-sm">
                {hasEmail ? (
                  <div className="flex items-center gap-3">
                    <Mail className="w-4 h-4 text-accent" />
                    <a
                      href={`mailto:${siteConfig.author.links.email}`}
                      className="text-text-secondary hover:text-accent transition-colors"
                    >
                      {siteConfig.author.links.email}
                    </a>
                  </div>
                ) : (
                  <div className="text-xs text-text-muted font-mono p-3 rounded bg-bg-tertiary border border-border">
                    💡 Email address can be configured in <code>lib/site-config.ts</code>
                  </div>
                )}

                {hasGithub && (
                  <div className="flex items-center gap-3">
                    <svg className="w-4 h-4 text-accent" viewBox="0 0 24 24" fill="currentColor">
                      <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                    </svg>
                    <a
                      href={siteConfig.author.links.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-text-secondary hover:text-accent transition-colors"
                    >
                      GitHub Profile
                    </a>
                  </div>
                )}
              </div>
            </div>

            <div className="p-6 rounded-[var(--radius-lg)] border border-border bg-bg-secondary text-xs text-text-secondary space-y-3">
              <div className="text-accent font-mono font-semibold flex items-center gap-1.5">
                <Terminal className="w-3.5 h-3.5" />
                <span>RESPONSE POLICY</span>
              </div>
              <p className="leading-relaxed">
                As a personal publication, messages are reviewed directly by the author. Technical critiques, errata submissions, and architectural discussions receive priority.
              </p>
            </div>
          </div>

          {/* Form Column */}
          <div className="lg:col-span-7">
            <ContactForm />
          </div>
        </div>
      </div>
    </div>
  );
}
