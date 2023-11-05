import { cn } from "lib/cn";

export function Skeleton({
  className,
  styles,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & {
  styles?: React.CSSProperties;
}) {
  return (
    <div
      className={cn("rounded-md", "bg-primary/10", "animate-pulse", className)}
      style={styles || {}}
      {...props}
    />
  );
}
