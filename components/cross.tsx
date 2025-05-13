import { MotionDiv } from "@/components/primitives/motion";

import { cn } from "@/lib/cn";

import type { Corner } from "@/lib/types";

type Positions = [] | [Corner, ...Corner[]];

const styles: Record<Corner, React.CSSProperties> = {
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

export default function Cross({
  parent,
  positions,
}: {
  parent: string;
  positions: Partial<Record<Corner, string>>;
}) {
  return (
    <>
      {(Object.keys(positions) as Positions).map((position: Corner) => {
        const randomDelay = Math.random() * (0.8 - 0) + 0;

        return (
          <MotionDiv
            key={`${parent}-${position}`}
            initial={{
              opacity: 0,
              filter: "brightness(200%) contrast(200%)",
            }}
            animate={{
              opacity: 1,
              filter: "brightness(100%) contrast(100%)",
            }}
            transition={{
              opacity: { duration: 0.2, delay: randomDelay },
              filter: { duration: 0.4, delay: randomDelay + 0.2 },
            }}
            className={cn(
              "absolute z-40 size-[9px]",
              "pointer-events-none",
              positions[position],
            )}
            style={styles[position]}
            aria-hidden
          >
            <CrossShape />
          </MotionDiv>
        );
      })}
    </>
  );
}

export function CrossShape({
  className,
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("relative grid size-full place-items-center", className)}
    >
      <span className={cn("absolute h-px w-full", "bg-secondary")} />
      <span className={cn("absolute h-full w-px", "bg-secondary")} />
    </div>
  );
}
