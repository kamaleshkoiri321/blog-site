export function calculateReadingTime(content: string): number {
  const wordsPerMinute = 238;
  const wordCount = content
    .replace(/```[\s\S]*?```/g, "") // strip code blocks
    .replace(/`[^`]*`/g, "") // strip inline code
    .replace(/!\[.*?\]\(.*?\)/g, "") // strip images
    .replace(/\[.*?\]\(.*?\)/g, (match) => match.replace(/\[|\]|\(.*?\)/g, "")) // keep link text
    .replace(/<[^>]*>/g, "") // strip HTML
    .replace(/[#*_~>-]/g, "") // strip markdown formatting
    .trim()
    .split(/\s+/)
    .filter((word) => word.length > 0).length;

  const minutes = Math.ceil(wordCount / wordsPerMinute);
  return Math.max(1, minutes);
}

export function formatReadingTime(minutes: number): string {
  return `${minutes} min read`;
}
