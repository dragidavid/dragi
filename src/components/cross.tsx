"use client";

import { memo } from "react";
import { motion } from "motion/react";

import { cn } from "@/lib/cn";

export type Corner = "tl" | "tr" | "bl" | "br";

const CORNER_STYLES: Record<Corner, React.CSSProperties> = {
  tl: {
    top: 0,
    left: 0,
    transform: "translate(-45%, -55%)",
  },
  tr: {
    top: 0,
    right: 0,
    transform: "translate(45%, -55%)",
  },
  bl: {
    bottom: 0,
    left: 0,
    transform: "translate(-45%, 55%)",
  },
  br: {
    bottom: 0,
    right: 0,
    transform: "translate(45%, 55%)",
  },
} as const;

export const Cross = memo(({ positions }: { positions: Corner[] }) => {
  const uniquePositions = [...new Set(positions)];

  return (
    <>
      {uniquePositions.map((position: Corner) => {
        const delay = Math.random() * (0.8 - 0) + 0;

        return (
          <motion.div
            key={position}
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
              filter: "brightness(60%)",
            }}
            transition={{
              opacity: { duration: 0.2, delay },
              filter: { duration: 0.4, delay: delay + 0.2 },
            }}
            aria-hidden
            className={cn(
              "absolute z-10 hidden size-[13px]",
              "pointer-events-none",
              "md:block",
            )}
            style={CORNER_STYLES[position]}
          >
            <div className={cn("relative grid size-full place-items-center")}>
              <span className={cn("absolute h-px w-full", "bg-inverse")} />
              <span className={cn("absolute h-full w-px", "bg-inverse")} />
            </div>
          </motion.div>
        );
      })}
    </>
  );
});
