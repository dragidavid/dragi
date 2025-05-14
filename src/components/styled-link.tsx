"use client";

import { useState } from "react";

import { cn } from "@/lib/cn";

export default function StyledLink({
  href,
  copy,
  children,
  className,
  ...props
}: React.AnchorHTMLAttributes<HTMLAnchorElement> & {
  copy?: boolean;
  href?: string;
}) {
  const [isCopied, setIsCopied] = useState(false);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    if (copy) {
      e.preventDefault();

      navigator.clipboard.writeText(children as string).then(() => {
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000);
      });
    }
  };

  return (
    <a
      href={href}
      target={href ? "_blank" : undefined}
      rel={href ? "noopener noreferrer" : undefined}
      className={cn(
        "outline-none",
        "underline decoration-muted underline-offset-[3px]",
        "hover:decoration-current",
        "focus:decoration-current",
        className,
      )}
      onClick={handleClick}
      {...props}
    >
      {isCopied ? "copied!" : children}
    </a>
  );
}
