import { memo } from "react";

import { cn } from "@/lib/cn";

export type Corner = "tl" | "tr" | "bl" | "br";

const CORNER_STYLES: Record<Corner, React.CSSProperties> = {
  tl: {
    top: 0,
    left: 0,
    transform: "translate(-45%, -50%)",
  },
  tr: {
    top: 0,
    right: 0,
    transform: "translate(50%, -50%)",
  },
  bl: {
    bottom: 0,
    left: 0,
    transform: "translate(-45%, 55%)",
  },
  br: {
    bottom: 0,
    right: 0,
    transform: "translate(50%, 55%)",
  },
} as const;

export const Cross = memo(({ positions }: { positions: Corner[] }) => {
  const uniquePositions = [...new Set(positions)];

  return (
    <>
      {uniquePositions.map((position: Corner) => {
        return (
          <div
            key={position}
            aria-hidden
            className={cn(
              "absolute z-10 hidden size-4",
              "pointer-events-none",
              "md:block",
            )}
            style={CORNER_STYLES[position]}
          >
            <div className={cn("relative grid size-full place-items-center")}>
              <div
                className={cn(
                  "relative size-[11px] rounded-sm",
                  "bg-inverse/20 border-background border backdrop-blur-sm",
                )}
              />
            </div>
          </div>
        );
      })}
    </>
  );
});
Cross.displayName = "Cross";
