import { cn } from "lib/cn";

/**
 *
 * Reusable component, the `className` prop is used to position the line
 */
export default function Line({ className }: { className: string }) {
  return (
    <div
      className={cn(
        "absolute z-20",
        "pointer-events-none select-none",
        className,
        "bg-subtle-gray"
      )}
    />
  );
}