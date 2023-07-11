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
    },
    reversed: {
      pathLength: 0,
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
        className={cn(
          "absolute right-0.5 top-0.5 z-50",
          "pointer-events-auto select-none outline-none",
          "text-secondary",
          "transition-colors duration-75 ease-in-out",
          "hover:text-primary focus:text-primary",
          "group"
        )}
      >
        <Arrow />
        <span className="sr-only">Expand</span>
      </Link>

      {rect && (
        <svg
          width={rect.width}
          height={rect.height}
          className={cn("absolute inset-0 z-[99]", "text-primary/50")}
        >
          <motion.path
            d={`M${rect.width},0 V${rect.height} H0 V0 Z`}
            stroke="currentColor"
            fill="transparent"
            variants={path}
            initial="hidden"
            animate={isHovered ? "visible" : "reversed"}
            transition={{
              default: { duration: 0.5 },
            }}
          />
        </svg>
      )}
    </div>
  );
}

function Arrow() {
  const variants = {
    rest: {
      d: "M2,4 L6,4 L6,8",
      x2: 6,
      y2: 4,
    },
    hover: {
      d: "M2,2 L8,2 L8,8",
      x2: 8,
      y2: 2,
      transition: {
        duration: 0.1,
      },
    },
  };

  return (
    <div className={cn("h-[18px] w-[18px]", "select-none")}>
      <motion.svg
        viewBox="0 0 10 10"
        width="100%"
        height="100%"
        initial="rest"
        whileHover="hover"
        animate="rest"
      >
        <motion.line
          x1="1"
          y1="9"
          stroke="currentColor"
          strokeWidth="1"
          variants={variants}
        />
        <motion.path
          stroke="currentColor"
          strokeWidth="1"
          fill="transparent"
          variants={variants}
        />
      </motion.svg>
    </div>
  );
}
