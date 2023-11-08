import { cn } from "lib/cn";

export default function StyledLink({
  href,
  label,
  className,
  ...props
}: React.AnchorHTMLAttributes<HTMLAnchorElement> & {
  label: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "outline-none",
        "underline-offset-2",
        "hover:cursor-ne-resize hover:underline",
        "focus:underline",
        className,
      )}
      {...props}
    >
      {label}
    </a>
  );
}
