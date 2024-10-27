import { cn } from "lib/cn";

import type { Corner } from "lib/types";

const cornerToOrigin: Record<Corner, string> = {
  tl: "top left",
  tr: "top right",
  bl: "bottom left",
  br: "bottom right",
};

export default function Line({
  tilted,
  angle,
  length,
  origin,
  className,
}: React.HTMLAttributes<HTMLDivElement> & {
  tilted?: boolean;
  angle?: number;
  length?: number;
  origin?: Corner;
}) {
  if (angle) {
    console.log(angle);
  }

  const tiltedLineStyle: React.CSSProperties = {
    position: "absolute",
    width: `${length}px`,
    height: "1px",
    transformOrigin: origin ? cornerToOrigin[origin] : undefined,
    transform: `rotate(${angle}deg)`,
  };

  return (
    <div
      className={cn("absolute z-30", "pointer-events-none", className)}
      style={tilted ? tiltedLineStyle : {}}
      aria-hidden
    />
  );
}
