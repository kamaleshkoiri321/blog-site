import { z } from "zod";

export const articleFrontmatterSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  date: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: "Invalid date format",
  }),
  updatedAt: z
    .string()
    .refine((val) => !isNaN(Date.parse(val)), {
      message: "Invalid updatedAt date format",
    })
    .optional(),
  slug: z.string().min(1, "Slug is required"),
  category: z.string().min(1, "Category is required"),
  tags: z.array(z.string()).default([]),
  coverImage: z.string().optional(),
  coverAlt: z.string().optional(),
  featured: z.boolean().default(false),
  draft: z.boolean().default(false),
});

export type ArticleFrontmatter = z.infer<typeof articleFrontmatterSchema>;

export interface Article extends ArticleFrontmatter {
  content: string;
  readingTime: number;
  categorySlug: string;
}

export function validateFrontmatter(
  data: Record<string, unknown>,
  filePath: string
): ArticleFrontmatter {
  const result = articleFrontmatterSchema.safeParse(data);
  if (!result.success) {
    const errors = result.error.issues
      .map((i) => `  - ${i.path.join(".")}: ${i.message}`)
      .join("\n");
    console.warn(`⚠️ Invalid frontmatter in ${filePath}:\n${errors}`);
    throw new Error(`Invalid frontmatter in ${filePath}`);
  }
  return result.data;
}
