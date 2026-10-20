export default function Loading() {
  return (
    <div className="py-24 flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        {/* Animated neon spinner */}
        <div className="relative w-12 h-12">
          <div className="w-12 h-12 rounded-full border-2 border-border" />
          <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-accent animate-spin" />
        </div>
        <p className="text-xs font-mono text-text-muted tracking-wider uppercase">
          Compiling View...
        </p>
      </div>
    </div>
  );
}
