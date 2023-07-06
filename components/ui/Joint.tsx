import { cn } from "lib/cn";

type Position = "tl" | "tr" | "bl" | "br";

export type Positions = [Position, ...Position[]] & { length: 1 | 2 | 3 | 4 };

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

export default function Joint({ positions }: { positions: Positions }) {
  return (
    <>
      {positions.map((position: Position) => (
        <span
          key={position}
          className={cn(
            "absolute z-40 h-[17px] w-[17px]",
            "pointer-events-none select-none",
            "text-primary"
          )}
          style={styles[position]}
        >
          <svg viewBox="0 0 17 17">
            <defs>
              <linearGradient id="vertical" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop stopColor="currentColor" stopOpacity="0" />
                <stop offset="50%" stopColor="currentColor" stopOpacity="1" />
                <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
              </linearGradient>

              <linearGradient id="horizontal" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop stopColor="currentColor" stopOpacity="0" />
                <stop offset="50%" stopColor="currentColor" stopOpacity="1" />
                <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
              </linearGradient>
            </defs>

            <rect x="8" y="0" width="1" height="17" fill="url(#vertical)" />
            <rect x="0" y="8" width="17" height="1" fill="url(#horizontal)" />
          </svg>
        </span>
      ))}
    </>
  );
}
