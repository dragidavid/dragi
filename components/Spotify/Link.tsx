import { cn } from "lib/cn";

export default function Link({ href, label }: { href: string; label: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "outline-none",
        "hover:cursor-ne-resize hover:underline",
        "focus:underline"
      )}
    >
      {label}
    </a>
  );
}
