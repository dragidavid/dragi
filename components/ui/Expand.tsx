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
        default: { duration: 0.5, delay: 0.1 },
      },
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
        onFocus={() => setIsHovered(true)}
        onBlur={() => setIsHovered(false)}
        className={cn(
          "absolute right-0 top-0 z-50",
          "pointer-events-auto outline-none",
          "text-secondary",
          "transition-colors duration-75 ease-in-out",
          "hover:text-primary",
          "focus:text-primary",
          "group"
        )}
      >
        <Arrow isHovered={isHovered} />
        <span className="sr-only">Expand</span>
      </Link>

      {rect && (
        <svg
          width={rect.width}
          height={rect.height}
          className={cn(
            "absolute inset-0 z-50",
            "outline-none",
            "text-primary"
          )}
        >
          {/* <motion.path
            d={`M${rect.width},0 V${rect.height} H0 V0 Z`}
            stroke="currentColor"
            fill="transparent"
            variants={path}
            initial="hidden"
            animate={isHovered ? "visible" : "reversed"}
            transition={{
              default: { duration: 0.5 },
            }}
          /> */}

          <motion.path
            d={`M${rect.width},0 V${rect.height} H0`}
            stroke="currentColor"
            fill="transparent"
            variants={path}
            initial="hidden"
            animate={isHovered ? "visible" : "reversed"}
            transition={{
              default: { duration: 0.5 },
            }}
          />
          <motion.path
            d={`M${rect.width},0 H0 V${rect.height}`}
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

function Arrow({ isHovered }: { isHovered: boolean }) {
  const variants = {
    line: {
      rest: {
        x2: 6,
        y2: 4,
        transition: {
          duration: 0.1,
          delay: 0.26,
        },
      },
      hover: {
        x2: 10,
        y2: 0,
        transition: {
          duration: 0.1,
        },
      },
    },
    arrowHead: {
      rest: {
        opacity: 0,
        pathLength: 0,
        transition: {
          duration: 0.2,
          opacity: {
            delay: 0.1,
          },
        },
      },
      hover: {
        opacity: 1,
        pathLength: 1,
        transition: {
          duration: 0.1,
          delay: 0.13,
        },
      },
    },
  };

  return (
    <div className={cn("h-[18px] w-[18px]")}>
      <motion.svg
        xmlns="http://www.w3.org/2000/svg"
        height="100%"
        width="100%"
        viewBox="0 0 10 10"
        fill="none"
        strokeWidth="0.5"
        color="currentColor"
        initial="rest"
        animate={isHovered ? "hover" : "rest"}
      >
        <motion.line
          x1="1"
          y1="9"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          variants={variants.line}
        />
        {/* <motion.line
          x1="8"
          y1="2"
          x2="2"
          y2="2"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          variants={variants.arrowHead}
        />
        <motion.line
          x1="8"
          y1="2"
          x2="8"
          y2="8"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          variants={variants.arrowHead}
        /> */}
      </motion.svg>
    </div>
  );
}
