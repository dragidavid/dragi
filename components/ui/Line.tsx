import { cn } from "lib/cn";

type Orientation = "horizontal" | "vertical";

export default function Line({
  orientation,
  fullWidth,
  className,
  verticalOffset,
}: {
  orientation: Orientation;
  fullWidth?: boolean;
  className?: string;
  verticalOffset?: number;
}) {
  if (orientation === "vertical") {
    return (
      <div
        className={cn(
          "fixed top-0 z-10 h-screen w-px",
          "bg-white/30"
          // "bg-gradient-to-b from-transparent via-white/30 to-transparent"
        )}
        style={{
          transform: verticalOffset
            ? `translateX(${verticalOffset}px)`
            : undefined,
        }}
      />
    );
  }

  return (
    <div
      className={cn(
        "z-10 h-px w-screen -translate-y-[0.5px]",
        fullWidth && "fixed left-0",
        className,
        "bg-white/30"
        // "bg-gradient-to-r from-transparent via-white/30 to-transparent"
      )}
    />
  );
}
