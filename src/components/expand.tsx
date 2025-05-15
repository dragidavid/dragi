"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";

import {
  MotionPath,
  MotionSvg,
  MotionLine,
} from "@/components/primitives/motion";

import { cn } from "@/lib/cn";

export default function Expand({ href }: { href: string }) {
  const [rect, setRect] = useState<DOMRect | null>(null);
  const [isHovered, setIsHovered] = useState(false);

  const divRef = useRef<HTMLDivElement>(null);

  const pathVariants = {
    initial: { pathLength: 0 },
    animate: {
      pathLength: 1,
      transition: { duration: 0.4, delay: 0.1 },
    },
    reversed: {
      pathLength: 0,
      transition: { duration: 0.4 },
    },
  };

  useEffect(() => {
    if (!divRef.current) return;

    const resizeObserver = new ResizeObserver(([entry]) => {
      if (entry && entry.target === divRef.current) {
        setRect(entry.contentRect);
      }
    });

    resizeObserver.observe(divRef.current);
    setRect(divRef.current.getBoundingClientRect());

    return () => resizeObserver.disconnect();
  }, []);

  const handleHover = (hovered: boolean) => () => setIsHovered(hovered);

  return (
    <div
      ref={divRef}
      className={cn("absolute -inset-[0.5px]", "pointer-events-none")}
    >
      <Link
        href={`/${href}`}
        onMouseEnter={handleHover(true)}
        onMouseLeave={handleHover(false)}
        onFocus={handleHover(true)}
        onBlur={handleHover(false)}
        className={cn(
          "absolute top-0 right-0 z-50",
          "pointer-events-auto outline-hidden",
        )}
      >
        <Pointer isHovered={isHovered} />
        <span className="sr-only">Expand</span>
      </Link>

      {rect && (
        <svg
          height={rect.height}
          width={rect.width}
          fill="none"
          strokeWidth="2"
          className={cn(
            "text-secondary absolute inset-0 z-50",
            "pointer-events-none",
          )}
        >
          {["Bottom", "Left"].map((direction) => (
            <MotionPath
              key={direction}
              variants={pathVariants}
              initial="initial"
              animate={isHovered ? "animate" : "reversed"}
              d={
                direction === "Bottom"
                  ? `M${rect.width},0 V${rect.height} H0`
                  : `M${rect.width},0 H0 V${rect.height}`
              }
              stroke="currentColor"
            />
          ))}
        </svg>
      )}
    </div>
  );
}

function Pointer({ isHovered }: { isHovered: boolean }) {
  const pointerVariants = {
    rest: {
      x2: 16,
      y2: 8,
      stroke: "hsl(var(--primary))",
      transition: { duration: 0.1, delay: 0.4 },
    },
    hover: {
      x2: 24,
      y2: 0,
      stroke: "hsl(var(--secondary))",
      transition: { duration: 0.1 },
    },
  };

  return (
    <div className="size-6">
      <MotionSvg
        viewBox="0 0 24 24"
        height="100%"
        width="100%"
        initial="rest"
        animate={isHovered ? "hover" : "rest"}
      >
        <MotionLine x1="8" y1="16" variants={pointerVariants} strokeWidth="1" />
      </MotionSvg>
    </div>
  );
}
