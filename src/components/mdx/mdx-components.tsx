import { highlight } from "sugar-high";
import { CopyButton } from "./copy-button";
import type { MDXComponents } from "mdx/types";
import Image from "next/image";
import { Info, AlertTriangle, Lightbulb } from "lucide-react";

function CodeBlock({ children, className, ...props }: React.ComponentProps<"code">) {
  const isInline = !className;
  if (isInline) {
    return <code {...props}>{children}</code>;
  }

  const codeString = typeof children === "string" ? children : "";
  const html = highlight(codeString);

  return (
    <div className="relative group">
      <code
        dangerouslySetInnerHTML={{ __html: html }}
        className={className}
        {...props}
      />
      <CopyButton text={codeString} />
    </div>
  );
}

function MdxImage({
  src,
  alt,
  caption,
  credit,
  width = 800,
  height = 450,
}: {
  src: string;
  alt: string;
  caption?: string;
  credit?: string;
  width?: number;
  height?: number;
}) {
  return (
    <figure className="my-6">
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        className="rounded-[var(--radius-md)] w-full h-auto"
        sizes="(max-width: 768px) 100vw, 720px"
        unoptimized={src.endsWith(".svg") || src.startsWith("http")}
      />
      {(caption || credit) && (
        <figcaption className="mt-2 text-center text-sm text-text-tertiary">
          {caption}
          {credit && (
            <span className="block text-xs mt-0.5 text-text-muted">
              {credit}
            </span>
          )}
        </figcaption>
      )}
    </figure>
  );
}

function Callout({
  type = "info",
  title,
  children,
}: {
  type?: "info" | "warning" | "tip";
  title?: string;
  children: React.ReactNode;
}) {
  const icons = {
    info: <Info className="w-5 h-5 text-info shrink-0" />,
    warning: <AlertTriangle className="w-5 h-5 text-warning shrink-0" />,
    tip: <Lightbulb className="w-5 h-5 text-success shrink-0" />,
  };

  return (
    <div className={`callout callout-${type}`}>
      <div className="flex items-start gap-3">
        {icons[type]}
        <div>
          {title && (
            <p className="font-semibold text-text-primary text-sm mb-1">
              {title}
            </p>
          )}
          <div className="text-sm text-text-secondary">{children}</div>
        </div>
      </div>
    </div>
  );
}

export const mdxComponents: MDXComponents = {
  code: CodeBlock,
  img: (props) => {
    const src = props.src || "";
    return (
      <Image
        src={src}
        alt={props.alt || ""}
        width={800}
        height={450}
        className="rounded-[var(--radius-md)] w-full h-auto my-6"
        sizes="(max-width: 768px) 100vw, 720px"
        unoptimized={src.endsWith(".svg") || src.startsWith("http")}
      />
    );
  },
  a: (props) => (
    <a
      {...props}
      target={props.href?.startsWith("http") ? "_blank" : undefined}
      rel={props.href?.startsWith("http") ? "noopener noreferrer" : undefined}
    >
      {props.children}
    </a>
  ),
  Image: MdxImage,
  Callout,
};
