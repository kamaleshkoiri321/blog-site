import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Terminal,
  Cpu,
  BookOpen,
  ShieldCheck,
  Sparkles,
  MapPin,
  Mail,
} from "lucide-react";
import { siteConfig } from "@/lib/site-config";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { generateSeoMetadata } from "@/lib/seo";

export const metadata: Metadata = generateSeoMetadata({
  title: "About the Author & Publication",
  description:
    "Meet the author and discover the mission, architecture, and editorial philosophy behind TheLazyEngineer.",
  path: "/about",
});

export default function AboutPage() {
  const { author } = siteConfig;
  const hasGithub = Boolean(author.links.github);
  const hasTwitter = Boolean(author.links.twitter);
  const hasLinkedin = Boolean(author.links.linkedin);
  const hasEmail = Boolean(author.links.email);

  return (
    <div className="py-12 md:py-16">
      <div className="mx-auto max-w-[var(--spacing-content)] px-4 sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ label: "About", href: "/about" }]} />

        {/* Hero Banner */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center pb-12 border-b border-border mb-12">
          <div className="lg:col-span-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent-subtle border border-border-accent text-accent text-xs font-mono font-medium mb-4">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Publication Dossier</span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-text-primary tracking-tight leading-tight mb-4">
              Behind TheLazy<span className="text-accent">Engineer</span>
            </h1>
            <p className="text-lg text-text-secondary leading-relaxed">
              A personal space on the web dedicated to exploring, deconstructing, and writing about the technologies shaping our world.
            </p>
          </div>

          <div className="lg:col-span-4 flex justify-center lg:justify-end items-center">
            <div className="relative w-44 h-44 flex items-center justify-center">
              <Image
                src="/logo/logo.png?v=3"
                alt="TheLazyEngineer Official Emblem"
                width={176}
                height={176}
                className="w-full h-full object-contain transform hover:scale-105 transition-transform duration-300 drop-shadow-[0_0_25px_rgba(183,255,60,0.3)]"
                priority
                unoptimized
              />
            </div>
          </div>
        </div>

        {/* Author Profile Section (Configurable Profile) */}
        <section className="mb-14">
          <div className="p-8 sm:p-10 rounded-[var(--radius-xl)] border border-border bg-gradient-to-br from-bg-card via-bg-secondary to-bg-card relative overflow-hidden">
            {/* Ambient neon accent */}
            <div
              className="absolute -right-16 -top-16 w-64 h-64 bg-accent/5 rounded-full blur-[80px] pointer-events-none"
              aria-hidden="true"
            />

            <div className="relative z-10">
              {/* Profile Details */}
              <div>
                <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-3">
                  <span className="text-xs font-mono text-accent uppercase tracking-wider">
                    Author Profile
                  </span>
                  <span className="text-text-muted">•</span>
                  <span className="text-xs text-text-secondary font-mono font-medium">
                    {author.role}
                  </span>
                  <span className="text-text-muted">•</span>
                  <div className="inline-flex items-center gap-1.5 text-xs font-mono text-text-tertiary">
                    <MapPin className="w-3.5 h-3.5 text-accent" />
                    <span>{author.location}</span>
                  </div>
                </div>

                <h2 className="text-2xl sm:text-3xl font-extrabold text-text-primary mb-3">
                  {author.name}
                </h2>

                <p className="text-text-secondary leading-relaxed mb-6 max-w-2xl">
                  {author.bio}
                </p>

                {/* Focus Areas / Technical Skills */}
                <div className="mb-6">
                  <div className="text-xs font-mono text-text-muted uppercase tracking-wider mb-2">
                    Primary Focus Areas
                  </div>
                  <div className="flex flex-wrap gap-2 text-xs font-mono">
                    <span className="px-3 py-1 rounded-[var(--radius-sm)] bg-bg-tertiary border border-border text-text-secondary">
                      Artificial Intelligence &amp; LLMs
                    </span>
                    <span className="px-3 py-1 rounded-[var(--radius-sm)] bg-bg-tertiary border border-border text-text-secondary">
                      RAG &amp; Vector Databases
                    </span>
                    <span className="px-3 py-1 rounded-[var(--radius-sm)] bg-bg-tertiary border border-border text-text-secondary">
                      Next.js &amp; React Architecture
                    </span>
                    <span className="px-3 py-1 rounded-[var(--radius-sm)] bg-bg-tertiary border border-border text-text-secondary">
                      TypeScript &amp; Web Standards
                    </span>
                    <span className="px-3 py-1 rounded-[var(--radius-sm)] bg-bg-tertiary border border-border text-text-secondary">
                      REST APIs &amp; Distributed Systems
                    </span>
                  </div>
                </div>

                {/* Social & Contact Actions */}
                <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-border/80">
                  {hasEmail && (
                    <a
                      href={`mailto:${author.links.email}`}
                      className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-[var(--radius-md)] bg-bg-tertiary hover:bg-bg-card-hover border border-border text-xs text-text-secondary hover:text-accent font-medium transition-colors"
                    >
                      <Mail className="w-3.5 h-3.5 text-accent" />
                      <span>Email</span>
                    </a>
                  )}

                  {hasGithub && (
                    <a
                      href={author.links.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-[var(--radius-md)] bg-bg-tertiary hover:bg-bg-card-hover border border-border text-xs text-text-secondary hover:text-accent font-medium transition-colors"
                    >
                      <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
                        <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                      </svg>
                      <span>GitHub</span>
                    </a>
                  )}

                  {hasTwitter && (
                    <a
                      href={author.links.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-[var(--radius-md)] bg-bg-tertiary hover:bg-bg-card-hover border border-border text-xs text-text-secondary hover:text-accent font-medium transition-colors"
                    >
                      <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                      </svg>
                      <span>Twitter / X</span>
                    </a>
                  )}

                  {hasLinkedin && (
                    <a
                      href={author.links.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-[var(--radius-md)] bg-bg-tertiary hover:bg-bg-card-hover border border-border text-xs text-text-secondary hover:text-accent font-medium transition-colors"
                    >
                      <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                      </svg>
                      <span>LinkedIn</span>
                    </a>
                  )}

                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-accent hover:underline ml-auto"
                  >
                    <span>Get in touch</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>

                <div className="mt-4 pt-3 border-t border-border/40 text-[11px] font-mono text-text-muted">
                  * Author details, bio, and social handles are editable in <code>src/lib/site-config.ts</code>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Content Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-8 prose">
            <h2>Why &ldquo;The Lazy Engineer&rdquo;?</h2>
            <p>
              The name is inspired by Larry Wall&apos;s famous quote that the three virtues of a great programmer are <em>Laziness, Impatience, and Hubris</em>.
            </p>
            <p>
              In engineering, true &ldquo;laziness&rdquo; isn&apos;t about apathy—it is the driving force behind automation. It&apos;s writing a clean script today so you don&apos;t have to do tedious manual work tomorrow. It&apos;s building modular, self-documenting architectures because you don&apos;t want to spend your weekend debugging monolithic spaghetti code.
            </p>

            <h2>The Editorial Mission</h2>
            <p>
              This website is my personal notebook, research desk, and publication. It exists to serve three core objectives:
            </p>
            <ul>
              <li>
                <strong>Demystify Complex Abstractions:</strong> Break down mathematical and architectural concepts—from transformer attention heads to asynchronous event loops—into crystal-clear mental models.
              </li>
              <li>
                <strong>Provide Production-Grade Insights:</strong> Share practical guides with real code snippets, honest error handling, and performance considerations rather than trivial &ldquo;Hello World&rdquo; templates.
              </li>
              <li>
                <strong>Explore Emerging Discoveries:</strong> Document promising developer tools, open-source libraries, and technology shifts as they happen.
              </li>
            </ul>

            <h2>Technology &amp; Principles</h2>
            <p>
              TheLazyEngineer is built with an uncompromising commitment to performance, privacy, and simplicity:
            </p>
            <ul>
              <li><strong>Zero Trackers:</strong> No bloated advertising scripts, behavioral pixels, or intrusive tracking cookies.</li>
              <li><strong>Modern Static Delivery:</strong> Powered by Next.js App Router, React Server Components, and native MDX content.</li>
              <li><strong>Accessible by Design:</strong> Keyboard navigable, responsive across all screen sizes, and adhering to strict semantic HTML standards.</li>
            </ul>

            <div className="mt-10 p-6 rounded-[var(--radius-lg)] border border-border bg-bg-card">
              <h3 className="text-lg font-bold text-text-primary mb-2">
                Have an inquiry or discovered a technical typo?
              </h3>
              <p className="text-sm text-text-secondary mb-4">
                Feedback, corrections, and thoughtful technical conversations are always welcome.
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 text-sm font-semibold text-accent hover:gap-3 transition-all"
              >
                <span>Visit the Contact Page</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Sidebar */}
          <aside className="lg:col-span-4 space-y-6">
            <div className="p-6 rounded-[var(--radius-lg)] border border-border bg-bg-card">
              <h3 className="text-sm font-bold text-text-primary uppercase tracking-wider mb-4 font-mono text-accent">
                Core Domains
              </h3>
              <ul className="space-y-3 text-sm text-text-secondary">
                <li className="flex items-start gap-2.5">
                  <Cpu className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                  <span>Artificial Intelligence &amp; LLMs</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Terminal className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                  <span>Full-Stack Web Engineering</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <BookOpen className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                  <span>Distributed Systems &amp; APIs</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <ShieldCheck className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                  <span>Performance, UX &amp; Security</span>
                </li>
              </ul>
            </div>

            <div className="p-6 rounded-[var(--radius-lg)] border border-border bg-bg-secondary text-xs font-mono text-text-muted">
              <div>{"// SITE ARCHITECTURE"}</div>
              <div className="mt-2 text-text-secondary">Next.js 15 (App Router)</div>
              <div>TypeScript (Strict Mode)</div>
              <div>Tailwind CSS v4</div>
              <div>MDX Engine</div>
              <div className="mt-3 text-accent">Status: 100% Operational</div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
