import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Sparkles, Terminal, Cpu } from "lucide-react";
import { siteConfig } from "@/lib/site-config";

export function Hero() {
  return (
    <section className="relative overflow-hidden py-16 md:py-24 border-b border-border bg-gradient-to-b from-bg-primary via-bg-secondary/40 to-bg-primary">
      {/* Background ambient neon glow */}
      <div
        className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-accent/10 rounded-full blur-[120px] pointer-events-none"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-[var(--spacing-content)] px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Text Content */}
          <div className="lg:col-span-7 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent-subtle border border-border-accent text-accent text-xs font-mono font-medium mb-6 animate-pulse">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Personal Engineering & AI Publication</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-text-primary tracking-tight leading-[1.1] mb-6">
              Understand the{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent via-[#D8FF85] to-accent drop-shadow-[0_0_25px_rgba(183,255,60,0.3)]">
                technology
              </span>{" "}
              shaping tomorrow.
            </h1>

            <p className="text-lg sm:text-xl text-text-secondary leading-relaxed mb-8 max-w-2xl mx-auto lg:mx-0">
              {siteConfig.description}
            </p>

            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4">
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-[var(--radius-md)] bg-accent text-bg-primary font-bold text-sm hover:bg-accent-dim shadow-[0_0_20px_rgba(183,255,60,0.3)] hover:shadow-[0_0_30px_rgba(183,255,60,0.5)] transition-all duration-200"
              >
                <span>Explore Articles</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                href="/categories/ai-explained"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-[var(--radius-md)] bg-bg-secondary hover:bg-bg-tertiary text-text-primary border border-border hover:border-border-accent font-semibold text-sm transition-all duration-200"
              >
                <Cpu className="w-4 h-4 text-accent" />
                <span>Explore AI</span>
              </Link>
            </div>

            {/* Quick Tech Pill Counter */}
            <div className="mt-10 pt-7 border-t border-border flex flex-wrap items-center justify-center lg:justify-start gap-4 sm:gap-6 text-sm text-text-primary font-mono font-medium">
              <div className="flex items-center gap-2">
                <Terminal className="w-4 h-4 text-accent drop-shadow-[0_0_8px_rgba(183,255,60,0.5)]" />
                <span className="text-text-primary tracking-wide">Zero fluff guides</span>
              </div>
              <span className="text-accent/60 hidden sm:inline" aria-hidden="true">•</span>
              <div className="text-text-primary tracking-wide">Modern Web & AI</div>
              <span className="text-accent/60 hidden sm:inline" aria-hidden="true">•</span>
              <div className="text-text-primary tracking-wide">Curated Discoveries</div>
            </div>
          </div>

          {/* Official Emblem Badge */}
          <div className="lg:col-span-5 flex justify-center items-center">
            <div className="relative w-64 h-64 sm:w-80 sm:h-80 flex items-center justify-center">
              <Image
                src="/logo/logo.png?v=3"
                alt="TheLazyEngineer Official High-Tech Emblem"
                width={320}
                height={320}
                priority
                unoptimized
                className="w-full h-full object-contain transform hover:scale-105 transition-transform duration-500 drop-shadow-[0_0_35px_rgba(183,255,60,0.35)]"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
