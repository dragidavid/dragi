import { cn } from "lib/cn";

export default function Line({
  className,
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("absolute z-30", "pointer-events-none", className)}
      aria-hidden
    />
  );
}
