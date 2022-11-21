"use client";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";

import type { ReactNode } from "react";

export default function MotionMain({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  return (
    <main className="flex h-full w-full items-center justify-center">
      <AnimatePresence initial={false} mode="wait">
        {children}
      </AnimatePresence>
    </main>
  );
}

/**
 * 1. create state that contains the boxes and have them by key
 *  1.1. key would be the id of the box and the value is the html block, the styles for the correct position and styles for the expanded version (the expanded version would be the same for all the boxes)
 * 2. on click, expand boxes, filter state based on clicked box id (so they wont be rendered)
 *  2.1. add exit animation to those boxes and animate the expanded box
 */
