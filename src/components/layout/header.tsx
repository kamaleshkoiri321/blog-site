"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search, Menu, X } from "lucide-react";
import { Logo } from "./logo";
import { siteConfig } from "@/lib/site-config";

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  // Close menu on navigation
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  // Close menu if window is resized to desktop breakpoint
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setMobileOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-bg-primary/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-[var(--spacing-content)] items-center justify-between px-4 sm:px-6 lg:px-8">
        <Logo />

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1" aria-label="Main navigation">
          {siteConfig.nav.map((item) => {
            const isActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`px-3.5 py-2 rounded-[var(--radius-sm)] text-sm font-medium transition-colors duration-[var(--duration-fast)] ${
                  isActive
                    ? "text-accent bg-accent-subtle"
                    : "text-text-secondary hover:text-text-primary hover:bg-bg-tertiary"
                }`}
              >
                {item.label}
              </Link>
            );
          })}

          <Link
            href="/search"
            className="ml-2 p-2 rounded-[var(--radius-sm)] text-text-secondary hover:text-text-primary hover:bg-bg-tertiary transition-colors duration-[var(--duration-fast)]"
            aria-label="Search articles"
          >
            <Search className="w-4.5 h-4.5" />
          </Link>
        </nav>

        {/* Mobile Controls */}
        <div className="flex items-center gap-2 md:hidden">
          <Link
            href="/search"
            className="p-2 rounded-[var(--radius-sm)] text-text-secondary hover:text-text-primary hover:bg-bg-tertiary transition-colors"
            aria-label="Search articles"
          >
            <Search className="w-5 h-5" />
          </Link>
          <button
            id="mobile-menu-toggle"
            onClick={() => setMobileOpen(!mobileOpen)}
            className="p-2 rounded-[var(--radius-sm)] text-text-secondary hover:text-text-primary hover:bg-bg-tertiary transition-colors"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Overlay */}
      {mobileOpen && (
        <div className="md:hidden fixed inset-x-0 top-16 bottom-0 z-50 bg-[#080A0A] border-t border-border overflow-y-auto">
          <nav className="flex flex-col p-6 gap-2" aria-label="Mobile navigation">
            {siteConfig.nav.map((item) => {
              const isActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className={`px-4 py-3.5 rounded-[var(--radius-md)] text-base font-medium transition-colors ${
                    isActive
                      ? "text-accent bg-accent-subtle font-semibold"
                      : "text-text-secondary hover:text-text-primary hover:bg-bg-tertiary"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
            <div className="pt-2 mt-2 border-t border-border/60">
              <Link
                href="/search"
                onClick={() => setMobileOpen(false)}
                className="px-4 py-3.5 rounded-[var(--radius-md)] text-base font-medium text-text-secondary hover:text-text-primary hover:bg-bg-tertiary transition-colors flex items-center gap-2.5"
              >
                <Search className="w-4 h-4 text-accent" />
                <span>Search Articles</span>
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
