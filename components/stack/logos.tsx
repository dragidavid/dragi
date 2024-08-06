"use client";

import { useState, useCallback } from "react";
import { AnimatePresence } from "framer-motion";

import { logos } from "components/primitives/logo";
import { MotionDiv } from "components/primitives/motion";

import { cn } from "lib/cn";

import { useInterval } from "lib/hooks/use-interval";

const ROTATION_INTERVAL = 4000;
const LOGO_GROUPS = [0, 3, 6];
const STAGGER_DELAY = 80;

export default function LogoShowcase() {
  return (
    <>
      {/* Mobile */}
      {LOGO_GROUPS.map((startIndex, index) => (
        <Loop
          key={`loop-${startIndex}`}
          startIndex={startIndex}
          delay={(index + 1) * STAGGER_DELAY}
        />
      ))}

      {/* Desktop */}
      {Object.entries(logos).map(([id, { Component }]) => (
        <div
          key={id}
          className={cn(
            "hidden size-auto min-h-20 place-items-center",
            "bg-background",
            "md:grid md:min-h-max",
          )}
        >
          <Component className="size-4" />
        </div>
      ))}
    </>
  );
}

function Loop({ startIndex, delay }: { startIndex: number; delay: number }) {
  const [currentLogo, setCurrentLogo] = useState(
    () => Object.entries(logos)[startIndex],
  );

  const rotateLogo = useCallback(() => {
    setCurrentLogo(([, currentLogo]) => {
      const currentIndex = Object.values(logos).indexOf(currentLogo);
      const nextIndex = (currentIndex + 1) % Object.keys(logos).length;
      return Object.entries(logos)[nextIndex];
    });
  }, []);

  useInterval(rotateLogo, ROTATION_INTERVAL);

  const [id, { Component }] = currentLogo;

  return (
    <div
      className={cn(
        "grid size-auto min-h-20 place-items-center",
        "bg-background",
        "md:hidden",
      )}
    >
      <AnimatePresence mode="wait">
        <MotionDiv
          key={id}
          initial={{ opacity: 0, scale: 0.75, filter: "blur(8px)" }}
          animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          exit={{ opacity: 0, scale: 0.75, filter: "blur(8px)" }}
          transition={{
            duration: 0.4,
            ease: [0.455, 0.03, 0.515, 0.955],
            delay: delay / 1000,
          }}
        >
          <Component className="size-4.5" />
        </MotionDiv>
      </AnimatePresence>
    </div>
  );
}
