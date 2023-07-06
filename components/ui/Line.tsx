import { cn } from "lib/cn";

export default function Line({ className }: { className: string }) {
  return (
    <div
      className={cn(
        "absolute z-20",
        "pointer-events-none select-none",
        className,
        "bg-subtle-grey"
      )}
    />
  );
}
