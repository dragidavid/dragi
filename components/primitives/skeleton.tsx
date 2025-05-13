import { cn } from "@/lib/cn";

export function Skeleton({
  className,
  style,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & {
  style?: React.CSSProperties;
}) {
  return (
    <div
      className={cn("rounded-md", "bg-accent", "animate-pulse", className)}
      style={style || {}}
      {...props}
    />
  );
}
