# TheLazyEngineer — Personal Technology Publication

> **Understand the technology shaping tomorrow.**

A production-ready personal technology publication built with **Next.js 15 (App Router)**, **TypeScript (Strict Mode)**, **Tailwind CSS v4**, and native **MDX**.

Designed with a futuristic, cyber-minimalist dark aesthetic (`#080A0A` near-black and `#B7FF3C` neon green accent), comprehensive SEO, full-text client search, table of contents, syntax highlighting with one-click copy, and zero external backend/database dependencies.

---

## Features

- **Blazing Fast & Serverless**: Built using React Server Components with static pre-rendering. Zero mandatory external APIs or databases.
- **Native MDX Publishing Pipeline**: Simply write markdown/MDX files in `content/blog/`. Frontmatter is strongly validated using **Zod**.
- **Automated Reading Metrics**: Automatic reading time estimation, heading extraction, and dynamic table of contents generation.
- **Fast Client Search**: Instant, keyboard-driven search indexing titles, descriptions, categories, tags, and article bodies.
- **Robust Security**: Built-in HTTP security headers (CSP, HSTS, X-Content-Type-Options, Referrer-Policy, Permissions-Policy).
- **Comprehensive SEO & Feeds**:
  - Dynamic XML Sitemap (`/sitemap.xml`)
  - RSS 2.0 Feed (`/rss.xml`)
  - Automated `robots.txt` (`/robots.txt`)
  - Schema.org JSON-LD (WebSite, Article, and BreadcrumbList)
  - OpenGraph & Twitter Cards
- **High-Tech Brand Identity**: Integrated official circuit-monogram emblem, custom responsive cover SVGs, and accessible contrast ratios.

---

## Tech Stack

| Layer | Technology |
| :--- | :--- |
| **Framework** | Next.js 15 (App Router, Turbopack) |
| **Language** | TypeScript (Strict Mode) |
| **Styling** | Tailwind CSS v4 with custom design tokens |
| **Content** | MDX via `next-mdx-remote/rsc` & `gray-matter` |
| **Syntax Highlighting** | `sugar-high` (zero-dependency, ultra-lightweight) |
| **Icons** | `lucide-react` |
| **Validation** | `zod` |
| **Deployment** | Vercel (Edge-ready) |

---

## Getting Started

### Prerequisites

- Node.js `18.18+` or `20+`
- npm, pnpm, or bun

### 1. Installation

```bash
git clone https://github.com/yourusername/TheLazyEngineer.git
cd TheLazyEngineer
npm install
```

### 2. Environment Setup

Copy the environment template:

```bash
cp .env.example .env.local
```

For standard local development, the default values work out-of-the-box without requiring third-party API keys:

```env
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### 3. Local Development

Start the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Content Publishing Workflow

Adding a new article to **TheLazyEngineer** takes less than a minute.

### 1. Create the MDX File

Create a new `.mdx` file in `content/blog/` named with your desired URL slug:

```bash
# Example
touch content/blog/understanding-vector-databases.mdx
```

### 2. Add Frontmatter

At the very top of your file, include the required frontmatter metadata:

```yaml
---
title: "Understanding Vector Databases From First Principles"
description: "A deep dive into high-dimensional embeddings, similarity search algorithms, and vector indexing."
date: "2026-10-25"
updatedAt: "2026-10-25"
slug: "understanding-vector-databases"
category: "Generative AI"
tags:
  - Vector Database
  - AI
  - Embeddings
  - Architecture
coverImage: "/images/articles/vector-databases.svg"
coverAlt: "3D visualization of high-dimensional vector clusters"
featured: false
draft: false
---
```

### Frontmatter Schema Reference

| Field | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `title` | `string` | **Yes** | Article headline |
| `description` | `string` | **Yes** | 1-2 sentence excerpt for cards and SEO |
| `date` | `YYYY-MM-DD` | **Yes** | Initial publication date |
| `updatedAt` | `YYYY-MM-DD` | No | Date of last technical update |
| `slug` | `string` | **Yes** | URL slug (must match filename) |
| `category` | `string` | **Yes** | Name of category (e.g. `AI Explained`, `Programming`) |
| `tags` | `string[]` | No | List of searchable topic tags |
| `coverImage` | `string` | No | Path to image in `public/images/articles/` (fallback used if omitted) |
| `coverAlt` | `string` | No | Accessible description of cover artwork |
| `featured` | `boolean` | No | If `true`, pinned to the homepage featured slot |
| `draft` | `boolean` | No | If `true`, excluded from public lists, search, RSS, and sitemap |

### 3. Add Images

Place cover images and inline graphics into `public/images/articles/`.

Inside your MDX file, you can reference them using standard markdown or the enhanced `<Image />` component:

```markdown
![Architecture Diagram](/images/articles/my-diagram.svg)
```

### 4. Special MDX Components

You can use custom interactive components inside your articles:

#### Callout Boxes

```jsx
<Callout type="tip" title="Performance Pro-Tip">
  Always use Promise.allSettled when handling independent batch API requests!
</Callout>

<Callout type="warning" title="Breaking Change">
  This API was deprecated in Node.js v22.
</Callout>
```

#### Code Blocks with Copy Buttons

Simply use standard fenced code blocks:

````markdown
```typescript
export async function fetchUser(id: string): Promise<User> {
  const res = await fetch(`/api/users/${id}`);
  return res.json();
}
```
````

A syntax-highlighted block with an automated copy button will be rendered.

---

## Project Structure

```
d:/TheLazyEngineer/
├── content/
│   └── blog/                   # MDX Article Markdown Files
├── public/
│   ├── images/
│   │   └── articles/           # Article cover artwork (SVG / WebP)
│   ├── logo/
│   │   └── logo.png            # Official TheLazyEngineer emblem
│   └── icon.png                # Tab favicon
├── src/
│   ├── app/
│   │   ├── about/              # /about page
│   │   ├── blog/
│   │   │   ├── [slug]/         # Individual article reading view
│   │   │   └── page.tsx        # All articles archive
│   │   ├── categories/
│   │   │   ├── [slug]/         # Category-filtered articles
│   │   │   └── page.tsx        # Categories directory
│   │   ├── contact/            # /contact page
│   │   ├── privacy/            # /privacy policy
│   │   ├── terms/              # /terms of use
│   │   ├── search/             # /search interface
│   │   ├── rss.xml/            # Dynamic RSS 2.0 Feed route
│   │   ├── layout.tsx          # Root Layout & Metadata
│   │   ├── page.tsx            # Homepage
│   │   ├── sitemap.ts          # XML Sitemap generator
│   │   ├── robots.ts           # Robots.txt generator
│   │   ├── not-found.tsx       # 404 handler
│   │   └── error.tsx           # Runtime error boundary
│   ├── components/
│   │   ├── blog/               # ArticleCard, FeaturedArticle, TOC
│   │   ├── home/               # Hero, Showcase, Newsletter, AboutPreview
│   │   ├── layout/             # Header, Footer, Logo
│   │   ├── mdx/                # Custom MDX components & copy button
│   │   ├── search/             # Client search interface
│   │   └── ui/                 # CategoryBadge, CoverImage, Breadcrumbs, etc.
│   └── lib/
│       ├── articles.ts         # Article discovery, sorting & queries
│       ├── categories.ts       # Category registry
│       ├── mdx.ts              # MDX compilation & heading extraction
│       ├── reading-time.ts     # Word count & reading time utility
│       ├── search.ts           # Search indexer & fuzzy filter
│       ├── seo.ts              # OpenGraph & JSON-LD generators
│       ├── site-config.ts      # Global site configuration
│       └── validation.ts       # Zod frontmatter schema
├── next.config.ts              # Security headers & Turbopack config
└── package.json
```

---

## Customizing Site Settings

Edit `src/lib/site-config.ts` to update your publication details, author name, social links, or navigation items:

```typescript
export const siteConfig = {
  name: "TheLazyEngineer",
  tagline: "Understand the technology shaping tomorrow.",
  url: "https://thelazyengineer.com",
  author: {
    name: "The Lazy Engineer",
    links: {
      github: "https://github.com/yourusername",
      twitter: "https://twitter.com/yourusername",
      email: "hello@thelazyengineer.com",
    },
  },
  // ...
};
```

---

## Deployment to Vercel

The publication is fully optimized for zero-config deployment on Vercel:

1. Push your repository to GitHub:
   ```bash
   git add .
   git commit -m "feat: complete TheLazyEngineer publication"
   git push origin main
   ```
2. Log into [Vercel](https://vercel.com) and click **"Add New Project"**.
3. Import your `TheLazyEngineer` GitHub repository.
4. Set the environment variable:
   - `NEXT_PUBLIC_SITE_URL`: `https://your-domain.com` (or your `.vercel.app` URL)
5. Click **Deploy**.

Vercel will automatically build the static pages, compile the MDX articles, and deploy globally across its edge network.

---

## License

Code snippets are provided under the [MIT License](LICENSE). Editorial articles and illustrations copyright © TheLazyEngineer.
