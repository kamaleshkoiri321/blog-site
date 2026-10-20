"use client";

import { useState, useRef } from "react";
import { Check, Copy } from "lucide-react";

export function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout>>(null);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback for older browsers
      const textarea = document.createElement("textarea");
      textarea.value = text;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
      setCopied(true);
      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <button
      onClick={handleCopy}
      className="absolute top-3 right-3 p-1.5 rounded-[var(--radius-sm)] bg-bg-tertiary/80 border border-border hover:border-border-hover text-text-tertiary hover:text-text-primary transition-all opacity-0 group-hover:opacity-100 focus:opacity-100"
      aria-label={copied ? "Copied!" : "Copy code"}
    >
      {copied ? (
        <Check className="w-3.5 h-3.5 text-accent" />
      ) : (
        <Copy className="w-3.5 h-3.5" />
      )}
    </button>
  );
}
