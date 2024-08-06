"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import { cn } from "lib/cn";
import { getLogos } from "lib/get-logos";

import { useInterval } from "lib/hooks/use-interval";

export default async function Stack({
  className,
}: React.HTMLAttributes<HTMLDivElement>) {
  const logos = await getLogos();

  return (
    <div
      className={cn(
        "grid h-full auto-rows-auto grid-cols-3 grid-rows-[repeat(2,auto)] gap-px",
        "bg-muted",
        "md:grid-rows-[repeat(3,auto)]",
        className,
      )}
    >
      <div
        className={cn(
          "col-span-2 grid place-items-center",
          "bg-background",
          "md:hidden",
        )}
      >
        <span className={cn("font-mono text-xs")}>my stack</span>
      </div>

      {/* Mobile */}
      {[0, 3, 6].map((startIndex, i) => (
        <LogoLoop
          key={startIndex}
          logos={logos}
          startIndex={startIndex}
          index={i}
        />
      ))}

      {/* Desktop */}
      {Object.entries(logos)
        .slice(4)
        .map(([id, logo]) => (
          <div
            key={id}
            className={cn(
              "hidden size-auto min-h-20 place-items-center",
              "bg-background",
              "md:grid md:min-h-max",
            )}
          >
            <logo.Component className="size-4" />
          </div>
        ))}
    </div>
  );
}

function LogoLoop({
  logos,
  startIndex,
  index,
}: {
  logos: Record<string, any>;
  startIndex: number;
  index: number;
}) {
  const [id, logo] = useLogoRotation(logos, startIndex);

  return (
    <div
      className={cn(
        "grid size-auto min-h-20 place-items-center",
        "bg-background",
        "md:hidden",
      )}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={id}
          initial={{ opacity: 0, scale: 0.8, filter: "blur(10px)" }}
          animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          exit={{ opacity: 0, scale: 0.8, filter: "blur(10px)" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <logo.Component className="size-4" />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

function useLogoRotation(logos: Record<string, any>, startIndex: number) {
  const [currentIndex, setCurrentIndex] = useState(startIndex);

  useInterval(() => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % Object.keys(logos).length);
  }, 3000);

  return Object.entries(logos)[currentIndex];
}
