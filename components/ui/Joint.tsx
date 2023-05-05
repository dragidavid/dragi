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
            "absolute z-40 h-[7px] w-[7px]",
            "pointer-events-none select-none",
            "text-primary"
          )}
          style={styles[position]}
        >
          <svg viewBox="0 0 7 7">
            <line x1="3.5" x2="3.5" y2="7" stroke="currentColor" />
            <line x1="7" y1="3.5" y2="3.5" stroke="currentColor" />
          </svg>
        </span>
      ))}
    </>
  );
}
