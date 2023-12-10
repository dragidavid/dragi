import { MotionSpan } from "components/primitives/motion";

import { cn } from "lib/cn";

export type Position = "tl" | "tr" | "bl" | "br";

type Positions = [] | [Position, ...Position[]];

const styles: Record<
  Position,
  {
    top?: number;
    bottom?: number;
    left?: number;
    right?: number;
    transform?: string;
  }
> = {
  tl: {
    top: 0,
    left: 0,
    transform: "translate(-50%, -50%)",
  },
  tr: {
    top: 0,
    right: 0,
    transform: "translate(50%, -50%)",
  },
  bl: {
    bottom: 0,
    left: 0,
    transform: "translate(-50%, 50%)",
  },
  br: {
    bottom: 0,
    right: 0,
    transform: "translate(50%, 50%)",
  },
};

export default function Joint({
  origin,
  positions,
}: {
  origin: string;
  positions: { [key in Position]: string };
}) {
  return (
    <>
      {(Object.keys(positions) as Positions).map((position: Position) => (
        <MotionSpan
          key={`${origin}-${position}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2, delay: Math.random() * (0.8 - 0) + 0 }}
          className={cn(
            "absolute z-40 h-[13px] w-[13px]",
            "pointer-events-none",
            "text-inverse",
            positions[position],
          )}
          style={styles[position]}
          aria-hidden
        >
          <svg viewBox="0 0 11 11" height="100%" width="100%">
            <defs>
              <linearGradient id="vertical" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="currentColor" stopOpacity="0" />
                <stop offset="50%" stopColor="currentColor" stopOpacity="1" />
                <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
              </linearGradient>

              <linearGradient id="horizontal" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="currentColor" stopOpacity="0" />
                <stop offset="50%" stopColor="currentColor" stopOpacity="1" />
                <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
              </linearGradient>
            </defs>
            <rect x="5" y="0" height="11" width="1" fill="url(#vertical)" />
            <rect x="0" y="5" height="1" width="11" fill="url(#horizontal)" />
          </svg>
        </MotionSpan>
      ))}
    </>
  );
}
