import { cn } from "lib/cn";

export default function StyledLink({
  href,
  children,
  className,
  ...props
}: React.AnchorHTMLAttributes<HTMLAnchorElement>) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "outline-none",
        "underline decoration-transparent underline-offset-2",
        "hover:cursor-alias hover:underline hover:decoration-inherit",
        "focus:underline focus:decoration-inherit",
        className,
      )}
      {...props}
    >
      {children}
    </a>
  );
}
