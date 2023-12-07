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
        "transition-[color,text-decoration-color] duration-150",
        "hover:cursor-ne-resize hover:underline hover:decoration-inherit",
        "focus:underline",
        className,
      )}
      {...props}
    >
      {children}
    </a>
  );
}
