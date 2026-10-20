export interface Category {
  name: string;
  slug: string;
  description: string;
  icon: string; // Lucide icon name
}

export const categories: Category[] = [
  {
    name: "AI Explained",
    slug: "ai-explained",
    description:
      "Beginner-friendly explanations of artificial intelligence concepts, models, and breakthroughs.",
    icon: "Brain",
  },
  {
    name: "Machine Learning",
    slug: "machine-learning",
    description:
      "Deep dives into machine learning algorithms, training, evaluation, and real-world applications.",
    icon: "TrendingUp",
  },
  {
    name: "Generative AI",
    slug: "generative-ai",
    description:
      "Exploring large language models, image generators, RAG, fine-tuning, and generative AI tools.",
    icon: "Sparkles",
  },
  {
    name: "Programming",
    slug: "programming",
    description:
      "Practical programming tutorials, language deep dives, and software engineering fundamentals.",
    icon: "Code",
  },
  {
    name: "Web Development",
    slug: "web-development",
    description:
      "Frontend, backend, APIs, frameworks, and everything related to building for the web.",
    icon: "Globe",
  },
  {
    name: "Developer Tools",
    slug: "developer-tools",
    description:
      "Useful tools, websites, extensions, and resources that make developers more productive.",
    icon: "Wrench",
  },
  {
    name: "Tech Discoveries",
    slug: "tech-discoveries",
    description:
      "Interesting technology finds, emerging trends, and things worth paying attention to.",
    icon: "Compass",
  },
  {
    name: "Engineering Humor",
    slug: "engineering-humor",
    description:
      "The lighter side of engineering — jokes, memes, and relatable developer moments.",
    icon: "Laugh",
  },
];

export function getCategoryBySlug(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug);
}

export function getCategoryByName(name: string): Category | undefined {
  return categories.find(
    (c) => c.name.toLowerCase() === name.toLowerCase()
  );
}

export function getCategorySlug(categoryName: string): string {
  const cat = getCategoryByName(categoryName);
  return cat ? cat.slug : categoryName.toLowerCase().replace(/\s+/g, "-");
}
