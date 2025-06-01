"use client";

import { useState, useCallback, useMemo, memo } from "react";
import { motion, AnimatePresence } from "motion/react";

import { svgs } from "@/components/svg";

import { cn } from "@/lib/cn";

import { useInterval } from "@/lib/hooks/use-interval";

const ROTATION_INTERVAL = 4000;
const STAGGER_DELAY = 80;
const GROUPS = [0, 3, 6] as const;

const ANIMATION_CONFIG = {
  duration: 0.4,
  ease: [0.455, 0.03, 0.515, 0.955] as const,
} as const;

const LOGO_VARIANTS = {
  initial: {
    opacity: 0,
    scale: 0.75,
    filter: "blur(8px)",
  },
  animate: {
    opacity: 1,
    scale: 1,
    filter: "blur(0px)",
  },
  exit: {
    opacity: 0,
    scale: 0.75,
    filter: "blur(8px)",
  },
} as const;

const LOGO_ENTRIES = Object.entries(svgs.logos);

export function Stack() {
  return (
    <div
      className={cn(
        "relative flex h-full flex-col",
        "bg-inverse/5",
        "dark:bg-inverse/[8%]",
      )}
    >
      <div
        className={cn(
          "relative grid size-full grid-cols-3 rounded-xl",
          "ease-out-quad transition-opacity duration-200",
          "inset-ring-inverse/10 bg-background shadow-inverse/10 shadow-lg inset-ring",
          "dark:shadow-extreme/50 dark:shadow-xl",
        )}
      >
        {GROUPS.map((startIndex, index) => (
          <Loop
            key={`loop-${startIndex}`}
            startIndex={startIndex}
            delay={(index + 1) * STAGGER_DELAY}
          />
        ))}
      </div>

      <div className={cn("px-4 pt-0.5 pb-1")}>
        <span className="label-bottom">things I normally use</span>
      </div>
    </div>
  );
}

const Loop = memo(
  ({ startIndex, delay }: { startIndex: number; delay: number }) => {
    const [currentLogo, setCurrentLogo] = useState(
      () => LOGO_ENTRIES[startIndex],
    );

    const rotateLogo = useCallback(() => {
      setCurrentLogo(([currentId]) => {
        const currentIndex = LOGO_ENTRIES.findIndex(
          ([key]) => key === currentId,
        );
        const nextIndex = (currentIndex + 1) % LOGO_ENTRIES.length;

        return LOGO_ENTRIES[nextIndex];
      });
    }, []);

    useInterval(rotateLogo, ROTATION_INTERVAL);

    const [id, { Component }] = currentLogo;

    const transitionConfig = useMemo(
      () => ({
        ...ANIMATION_CONFIG,
        delay: delay / 1000,
      }),
      [delay],
    );

    return (
      <div
        className={cn(
          "relative grid min-h-14 place-items-center",
          "md:min-h-0",
        )}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={id}
            variants={LOGO_VARIANTS}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={transitionConfig}
            className="absolute"
          >
            <Component className="size-4" />
          </motion.div>
        </AnimatePresence>
      </div>
    );
  },
);
