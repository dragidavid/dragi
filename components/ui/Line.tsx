import { cn } from "lib/cn";

export default function Line({ className }: { className: string }) {
  return (
    <div
      className={cn(
        "absolute z-20",
        "pointer-events-none",
        className,
        "bg-subtle-grey/40"
      )}
      aria-hidden
    />
  );
}
