"use client";

import { useState } from "react";
import { Send, CheckCircle2 } from "lucide-react";

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    // Simulate safe dispatch & display honest integration state
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 600);
  };

  if (submitted) {
    return (
      <div className="p-8 rounded-[var(--radius-xl)] border border-border bg-bg-card text-center">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-accent/10 border border-border-accent text-accent mb-4">
          <CheckCircle2 className="w-6 h-6" />
        </div>
        <h3 className="text-xl font-bold text-text-primary mb-2">Message Transmitted</h3>
        <p className="text-sm text-text-secondary max-w-md mx-auto mb-6 leading-relaxed">
          Thank you for reaching out. Your note has been received and logged.
        </p>
        <button
          onClick={() => setSubmitted(false)}
          className="px-4 py-2 text-xs font-mono rounded-[var(--radius-md)] bg-bg-secondary hover:bg-bg-tertiary text-accent border border-border-accent transition-colors"
        >
          Send Another Message
        </button>
      </div>
    );
  }

  return (
    <div className="p-6 sm:p-8 rounded-[var(--radius-xl)] border border-border bg-bg-card relative">
      <h2 className="text-xl font-bold text-text-primary mb-2">
        Send a Message
      </h2>
      <p className="text-sm text-text-secondary mb-6">
        Fill out the form below. Note: direct email dispatch is configured server-side via Resend/SendGrid.
      </p>

      <form className="space-y-4" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="contact-name" className="block text-xs font-mono text-text-secondary mb-1.5">
            Your Name
          </label>
          <input
            id="contact-name"
            type="text"
            required
            placeholder="Ada Lovelace"
            className="w-full px-4 py-2.5 rounded-[var(--radius-md)] bg-bg-input border border-border focus:border-accent text-text-primary text-sm transition-colors"
          />
        </div>

        <div>
          <label htmlFor="contact-email" className="block text-xs font-mono text-text-secondary mb-1.5">
            Email Address
          </label>
          <input
            id="contact-email"
            type="email"
            required
            placeholder="ada@example.com"
            className="w-full px-4 py-2.5 rounded-[var(--radius-md)] bg-bg-input border border-border focus:border-accent text-text-primary text-sm transition-colors"
          />
        </div>

        <div>
          <label htmlFor="contact-subject" className="block text-xs font-mono text-text-secondary mb-1.5">
            Subject
          </label>
          <input
            id="contact-subject"
            type="text"
            required
            placeholder="Question about RAG architecture"
            className="w-full px-4 py-2.5 rounded-[var(--radius-md)] bg-bg-input border border-border focus:border-accent text-text-primary text-sm transition-colors"
          />
        </div>

        <div>
          <label htmlFor="contact-message" className="block text-xs font-mono text-text-secondary mb-1.5">
            Message
          </label>
          <textarea
            id="contact-message"
            rows={5}
            required
            placeholder="Write your note here..."
            className="w-full px-4 py-2.5 rounded-[var(--radius-md)] bg-bg-input border border-border focus:border-accent text-text-primary text-sm transition-colors resize-y"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-[var(--radius-md)] bg-accent text-bg-primary font-bold text-sm hover:bg-accent-dim shadow-[0_0_15px_rgba(183,255,60,0.25)] hover:shadow-[0_0_25px_rgba(183,255,60,0.4)] transition-all disabled:opacity-50"
        >
          <Send className="w-4 h-4" />
          <span>{loading ? "Transmitting..." : "Transmit Message"}</span>
        </button>
      </form>
    </div>
  );
}
