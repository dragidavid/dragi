import { cn } from "lib/cn";

type CommonProps = {
  className?: string;
};

type VerticalLineProps = CommonProps & {
  source: "root" | "page";
  verticalOffset: number;
};

type HorizontalLineProps = CommonProps & {
  fullWidth?: boolean;
};

export function VerticalLine({
  source,
  verticalOffset,
  className,
}: VerticalLineProps) {
  return (
    <div
      className={cn("fixed top-0 z-20 h-screen w-px", "bg-white/30", className)}
      style={{
        transform: `translateX(calc(var(--${source}-container)/${verticalOffset}))`,
      }}
    />
  );
}

export function HorizontalLine({ fullWidth, className }: HorizontalLineProps) {
  return (
    <div
      className={cn(
        "z-20 h-px -translate-y-[0.5px]",
        fullWidth && "fixed left-0 w-screen",
        className,
        "bg-white/30"
      )}
    />
  );
}
