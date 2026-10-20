import type { Metadata } from "next";
import { siteConfig } from "@/lib/site-config";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { generateSeoMetadata } from "@/lib/seo";

export const metadata: Metadata = generateSeoMetadata({
  title: "Privacy Policy",
  description: `Privacy Policy for ${siteConfig.name}. We respect your privacy and run zero intrusive trackers.`,
  path: "/privacy",
});

export default function PrivacyPage() {
  return (
    <div className="py-12 md:py-16">
      <div className="mx-auto max-w-[var(--spacing-content)] px-4 sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ label: "Privacy Policy", href: "/privacy" }]} />

        <div className="pb-8 border-b border-border mb-10 max-w-3xl">
          <div className="text-xs font-mono text-accent uppercase tracking-wider mb-2">
            Legal Transparency
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-text-primary tracking-tight">
            Privacy Policy
          </h1>
          <p className="text-xs font-mono text-text-muted mt-2">
            Last Updated: October 20, 2026
          </p>
        </div>

        <div className="prose">
          <h2>1. Fundamental Commitment to Privacy</h2>
          <p>
            At <strong>{siteConfig.name}</strong> (&ldquo;we&rdquo;, &ldquo;us&rdquo;, or &ldquo;our&rdquo;), privacy is not an afterthought—it is a core architectural principle. This is a personal technology blog built for education and reading.
          </p>
          <p>
            We do not sell personal data, we do not utilize behavioral advertising tracking networks, and we do not profile your reading habits across the web.
          </p>

          <h2>2. Data We Do Not Collect</h2>
          <ul>
            <li>We do not place tracking cookies on your device.</li>
            <li>We do not record sensitive personal identifiers.</li>
            <li>We do not monitor your keystrokes or mouse telemetry.</li>
          </ul>

          <h2>3. Information You Voluntarily Provide</h2>
          <p>
            If you choose to communicate with us through our contact form or via email, we collect the details you provide (such as your name, email address, and message content) solely for the purpose of responding to your inquiry.
          </p>

          <h2>4. Hosting &amp; Server Infrastructure</h2>
          <p>
            This website is hosted on global edge infrastructure (such as Vercel). When you access any webpage, web servers automatically receive standard technical transmission logs (including your IP address, browser user-agent, requested URL, and timestamp). These logs are utilized strictly for network delivery, DDoS mitigation, and server security.
          </p>

          <h2>5. Third-Party Links</h2>
          <p>
            Articles on {siteConfig.name} frequently link to external developer documentation, open-source repositories, and external tools. We are not responsible for the privacy practices of external sites.
          </p>

          <h2>6. Updates to This Policy</h2>
          <p>
            Any modifications to this privacy policy will be posted on this page with an updated revision date.
          </p>
        </div>
      </div>
    </div>
  );
}
