"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AlertTriangle, RotateCcw, Home } from "lucide-react";

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log runtime errors in development
    console.error("Uncaught application error:", error);
  }, [error]);

  return (
    <div className="py-24 md:py-32 flex items-center justify-center">
      <div className="mx-auto max-w-lg px-4 text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-error/10 border border-error/20 text-error mb-6 shadow-[0_0_20px_rgba(239,68,68,0.2)]">
          <AlertTriangle className="w-8 h-8" />
        </div>

        <div className="text-xs font-mono text-error uppercase tracking-widest mb-2">
          RUNTIME EXCEPTION CAUGHT
        </div>

        <h1 className="text-3xl font-extrabold text-text-primary tracking-tight mb-4">
          Something broke during execution.
        </h1>

        <p className="text-text-secondary text-sm leading-relaxed mb-8">
          An unexpected error occurred while rendering this view. You can attempt to re-render the component or return to the main dashboard.
        </p>

        {error.message && (
          <div className="mb-8 p-3 rounded-[var(--radius-md)] bg-bg-code border border-border text-xs font-mono text-text-muted overflow-x-auto text-left">
            <code>{error.message}</code>
          </div>
        )}

        <div className="flex flex-wrap items-center justify-center gap-4">
          <button
            onClick={() => reset()}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-[var(--radius-md)] bg-accent text-bg-primary font-bold text-sm hover:bg-accent-dim transition-all"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Try Again</span>
          </button>

          <Link
            href="/"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-[var(--radius-md)] bg-bg-secondary hover:bg-bg-tertiary text-text-primary border border-border text-sm font-semibold transition-all"
          >
            <Home className="w-4 h-4" />
            <span>Go Home</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
