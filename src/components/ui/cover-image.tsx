import Image from "next/image";

interface CoverImageProps {
  src?: string;
  alt?: string;
  priority?: boolean;
  className?: string;
  aspectRatio?: "video" | "wide" | "square";
  objectFit?: "cover" | "contain";
}

export function CoverImage({
  src,
  alt = "Article cover image",
  priority = false,
  className = "",
  aspectRatio = "video",
  objectFit = "contain",
}: CoverImageProps) {
  const aspectClasses = {
    video: "aspect-video",
    wide: "aspect-[21/9]",
    square: "aspect-square",
  };

  if (!src) {
    return (
      <div
        className={`w-full max-w-full ${aspectClasses[aspectRatio]} bg-bg-tertiary rounded-[var(--radius-md)] overflow-hidden flex items-center justify-center ${className}`}
        aria-hidden="true"
      >
        {/* Branded fallback pattern */}
        <svg
          className="w-full h-full"
          viewBox="0 0 800 450"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect width="800" height="450" fill="#101412" />
          {/* Grid pattern */}
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#1E2422" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="800" height="450" fill="url(#grid)" />
          {/* TL monogram */}
          <g transform="translate(340, 160)">
            <rect x="0" y="0" width="120" height="120" rx="24" stroke="#B7FF3C" strokeWidth="1.5" fill="none" opacity="0.3" />
            <path d="M25 35h40M45 35v55" stroke="#B7FF3C" strokeWidth="3.5" strokeLinecap="round" opacity="0.4" />
            <path d="M65 35v55h30" stroke="#F4F5F2" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.3" />
          </g>
          {/* Accent dots */}
          <circle cx="200" cy="120" r="2" fill="#B7FF3C" opacity="0.2" />
          <circle cx="600" cy="330" r="2" fill="#B7FF3C" opacity="0.2" />
          <circle cx="680" cy="100" r="1.5" fill="#B7FF3C" opacity="0.15" />
          <circle cx="120" cy="350" r="1.5" fill="#B7FF3C" opacity="0.15" />
        </svg>
      </div>
    );
  }

  return (
    <div
      className={`w-full max-w-full ${aspectClasses[aspectRatio]} relative overflow-hidden rounded-[var(--radius-md)] bg-[#0A0D0C] flex items-center justify-center ${className}`}
    >
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 720px"
        className={objectFit === "contain" ? "object-contain p-2 sm:p-3" : "object-cover"}
        priority={priority}
        unoptimized={src.endsWith(".svg") || src.startsWith("http")}
      />
    </div>
  );
}
