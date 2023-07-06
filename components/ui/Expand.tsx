// TODO - Replace current icon with a custom one

"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

import { ArrowUpRight } from "lucide-react";

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
        <ArrowUpRight
          size={18}
          className={cn(
            "transition-transform duration-75 ease-in-out",
            "will-change-transform",
            "group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:scale-105 group-focus:-translate-y-1 group-focus:translate-x-1 group-focus:scale-105"
          )}
          aria-hidden={true}
        />
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
