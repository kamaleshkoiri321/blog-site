import Link from "next/link";
import Image from "next/image";

interface LogoProps {
  showWordmark?: boolean;
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function Logo({
  showWordmark = true,
  size = "md",
  className = "",
}: LogoProps) {
  const sizeMap = {
    sm: { img: 32, text: "text-base" },
    md: { img: 38, text: "text-lg" },
    lg: { img: 56, text: "text-2xl" },
  };

  const currentSize = sizeMap[size];

  return (
    <Link
      href="/"
      className={`flex items-center gap-3 group transition-transform duration-200 active:scale-95 ${className}`}
      aria-label="TheLazyEngineer — Home"
    >
      {/* High-tech TL Emblem */}
      <div className="relative shrink-0 flex items-center justify-center drop-shadow-[0_0_10px_rgba(183,255,60,0.3)] group-hover:drop-shadow-[0_0_16px_rgba(183,255,60,0.55)] transition-all duration-300">
        <Image
          src="/logo/logo.png?v=3"
          alt="TheLazyEngineer Emblem"
          width={currentSize.img}
          height={currentSize.img}
          className="rounded-full object-contain transform transition-transform duration-300 group-hover:scale-105"
          priority
          unoptimized
        />
      </div>

      {showWordmark && (
        <span
          className={`${currentSize.text} font-bold tracking-tight text-text-primary flex items-center`}
        >
          <span>TheLazy</span>
          <span className="text-accent font-extrabold drop-shadow-[0_0_8px_rgba(183,255,60,0.3)]">
            Engineer
          </span>
        </span>
      )}
    </Link>
  );
}
