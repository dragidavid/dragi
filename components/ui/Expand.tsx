"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

import { cn } from "lib/cn";

export default function Expand({ href }: { href: string }) {
  const [rect, setRect] = useState<DOMRect | null>(null);
  const [isHovered, setIsHovered] = useState(false);

  const divRef = useRef<HTMLDivElement>(null);

  const path = {
    hidden: {
      pathLength: 0,
    },
    visible: {
      pathLength: 1,
      transition: {
        default: { duration: 0.4, delay: 0.1 },
      },
    },
    reversed: {
      pathLength: 0,
      transition: {
        default: { duration: 0.4 },
      },
    },
  };

  useEffect(() => {
    if (divRef.current) {
      const resizeObserver = new ResizeObserver((entries) => {
        for (let entry of entries) {
          if (entry.target === divRef.current) {
            setRect(entry.contentRect);
          }
        }
      });

      resizeObserver.observe(divRef.current);

      setRect(divRef.current.getBoundingClientRect());

      return () => {
        resizeObserver.disconnect();
      };
    }
  }, []);

  return (
    <div ref={divRef} className={cn("absolute inset-0", "pointer-events-none")}>
      <Link
        href={`/${href}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onFocus={() => setIsHovered(true)}
        onBlur={() => setIsHovered(false)}
        className={cn(
          "absolute right-0 top-0 z-50",
          "pointer-events-auto outline-none"
        )}
      >
        <Arrow isHovered={isHovered} />
        <span className="sr-only">Expand</span>
      </Link>

      {rect && (
        <svg
          height={rect.height}
          width={rect.width}
          strokeWidth="1.5"
          className={cn("absolute inset-0 z-50", "pointer-events-none")}
        >
          <defs>
            <linearGradient
              id="gradientToBottom"
              x1="0"
              x2="0"
              y1="0"
              y2="1"
              gradientUnits="objectBoundingBox"
            >
              <stop offset="0%" stopColor="hsl(var(--primary))" />
              <stop
                offset="100%"
                stopColor="hsl(var(--primary))"
                stopOpacity="0.2"
              />
            </linearGradient>
            <linearGradient
              id="gradientToLeft"
              x1="1"
              x2="0"
              y1="0"
              y2="0"
              gradientUnits="objectBoundingBox"
            >
              <stop offset="0%" stopColor="hsl(var(--primary))" />
              <stop
                offset="100%"
                stopColor="hsl(var(--primary))"
                stopOpacity="0.2"
              />
            </linearGradient>
          </defs>

          <motion.path
            d={`M${rect.width},0 V${rect.height} H0`}
            stroke="url(#gradientToBottom)"
            fill="transparent"
            variants={path}
            initial="hidden"
            animate={isHovered ? "visible" : "reversed"}
          />

          <motion.path
            d={`M${rect.width},0 H0 V${rect.height}`}
            stroke="url(#gradientToLeft)"
            fill="transparent"
            variants={path}
            initial="hidden"
            animate={isHovered ? "visible" : "reversed"}
          />
        </svg>
      )}
    </div>
  );
}

function Arrow({ isHovered }: { isHovered: boolean }) {
  const variants = {
    rest: {
      x2: 6,
      y2: 4,
      transition: {
        duration: 0.1,
        delay: 0.4,
      },
    },
    hover: {
      x2: 10,
      y2: 0,
      transition: {
        duration: 0.1,
      },
    },
  };

  return (
    <div className={cn("h-[18px] w-[18px]")}>
      <motion.svg
        viewBox="0 0 10 10"
        height="100%"
        width="100%"
        fill="none"
        strokeWidth="0.5"
        initial="rest"
        animate={isHovered ? "hover" : "rest"}
      >
        <motion.line
          x1="2"
          y1="8"
          stroke="hsl(var(--primary))"
          strokeLinecap="round"
          strokeLinejoin="round"
          variants={variants}
        />
      </motion.svg>
    </div>
  );
}
