export const siteConfig = {
  name: "TheLazyEngineer",
  tagline: "Understand the technology shaping tomorrow.",
  description:
    "Practical coding guides, clear AI explainers, developer discoveries, and ideas from a curious engineer.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  locale: "en_US",
  language: "en",

  author: {
    name: "The Lazy Engineer",
    role: "Founder & Lead Author",
    location: "Global / Remote",
    avatar: "/logo/logo.png",
    bio: "A curious engineer who loves building things, breaking things, and explaining how complex technology works under the hood.",
    // Add your social links here
    links: {
      github: "", // e.g., "https://github.com/yourusername"
      twitter: "", // e.g., "https://twitter.com/yourusername"
      linkedin: "", // e.g., "https://linkedin.com/in/yourusername"
      email: "", // e.g., "hello@thelazyengineer.com"
    },
  },

  // Navigation items
  nav: [
    { label: "Home", href: "/" },
    { label: "Blog", href: "/blog" },
    { label: "Categories", href: "/categories" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ],

  // Footer navigation groups
  footerNav: {
    main: [
      { label: "Home", href: "/" },
      { label: "Blog", href: "/blog" },
      { label: "About", href: "/about" },
      { label: "Contact", href: "/contact" },
    ],
    legal: [
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms of Use", href: "/terms" },
    ],
  },

  // Default Open Graph image
  ogImage: "/images/og-default.png",

  // Number of articles per page
  articlesPerPage: 9,

  // Number of related articles to show
  relatedArticlesCount: 3,
} as const;

export type SiteConfig = typeof siteConfig;
