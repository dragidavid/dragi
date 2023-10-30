import { cn } from "lib/cn";

export default function Line({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "absolute z-30",
        "pointer-events-none",
        "bg-accent",
        className,
      )}
      aria-hidden
    />
  );
}
