"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";

import {
  MotionSvg,
  MotionLine,
  MotionPath,
} from "components/primitives/motion";

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
    <div
      ref={divRef}
      className={cn("absolute -inset-[0.5px]", "pointer-events-none")}
    >
      <Link
        href={`/${href}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onFocus={() => setIsHovered(true)}
        onBlur={() => setIsHovered(false)}
        className={cn(
          "absolute right-0 top-0 z-50",
          "pointer-events-auto outline-none",
        )}
      >
        <Arrow isHovered={isHovered} />
        <span className="sr-only">Expand</span>
      </Link>

      {rect && (
        <svg
          height={rect.height}
          width={rect.width}
          fill="none"
          strokeWidth="2"
          className={cn(
            "absolute inset-0 z-50 text-inverse",
            "pointer-events-none",
          )}
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
              <stop offset="0%" stopColor="currentColor" />
              <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
            </linearGradient>
            <linearGradient
              id="gradientToLeft"
              x1="1"
              x2="0"
              y1="0"
              y2="0"
              gradientUnits="objectBoundingBox"
            >
              <stop offset="0%" stopColor="currentColor" />
              <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
            </linearGradient>
          </defs>

          <MotionPath
            variants={path}
            initial="hidden"
            animate={isHovered ? "visible" : "reversed"}
            d={`M${rect.width},0 V${rect.height} H0`}
            stroke="url(#gradientToBottom)"
          />

          <MotionPath
            variants={path}
            initial="hidden"
            animate={isHovered ? "visible" : "reversed"}
            d={`M${rect.width},0 H0 V${rect.height}`}
            stroke="url(#gradientToLeft)"
          />
        </svg>
      )}
    </div>
  );
}

function Arrow({ isHovered }: { isHovered: boolean }) {
  const variants = {
    rest: {
      x2: 4,
      y2: 6,
      stroke: "hsl(var(--secondary))",
      transition: {
        duration: 0.1,
        delay: 0.4,
      },
    },
    hover: {
      x2: 10,
      y2: 0,
      stroke: "currentColor",
      transition: {
        duration: 0.1,
      },
    },
  };

  return (
    <div className="size-3">
      <MotionSvg
        viewBox="0 0 10 10"
        height="100%"
        width="100%"
        initial="rest"
        animate={isHovered ? "hover" : "rest"}
      >
        <MotionLine x1="0" y1="10" strokeLinecap="round" variants={variants} />
      </MotionSvg>
    </div>
  );
}
