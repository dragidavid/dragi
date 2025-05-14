import { cn } from "@/lib/cn";

import type { Corner } from "@/lib/types";
import { MotionDiv } from "@/components/primitives/motion";

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
  const baseProps = {
    className: cn("absolute z-30", "pointer-events-none", className),
    style: tilted
      ? {
          height: "1px",
          transformOrigin: origin ? cornerToOrigin[origin] : undefined,
          transform: `rotate(${angle}deg)`,
        }
      : {},
    "aria-hidden": true,
  };

  return tilted ? (
    <MotionDiv
      {...baseProps}
      initial={{ width: 0 }}
      animate={{ width: `${length}px` }}
      transition={{ duration: 0.8 }}
    />
  ) : (
    <div {...baseProps} />
  );
}
