import { memo } from "react";

import { cn } from "@/lib/cn";

export const Link = memo(
  ({
    href,
    children,
    className,
    ...props
  }: React.AnchorHTMLAttributes<HTMLAnchorElement>) => {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={cn(
          "inline-flex outline-hidden",
          "decoration-inverse/20 underline underline-offset-[3px]",
          "hover:decoration-current",
          "focus:decoration-current",
          className,
        )}
        {...props}
      >
        {children}
      </a>
    );
  },
);
