import { cn } from "lib/cn";

export default function Line({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "absolute z-20",
        "pointer-events-none",
        "bg-line/90",
        className
      )}
      aria-hidden
    />
  );
}
