"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence } from "framer-motion";

import Line from "components/line";
import Cross from "components/cross";

import { MotionSpan } from "components/primitives/motion";

import { cn } from "lib/cn";
import { debounce } from "lib/debounce";

const links = [
  {
    label: "projects",
    href: "/projects",
  },
  {
    label: "craft",
    href: "/craft",
  },
  {
    label: "home",
    href: "/",
  },
  {
    label: "/uses",
    href: "/uses",
  },
  {
    label: "spotify",
    href: "/spotify",
  },
] as const;

export default function Navigation() {
  const [height, setHeight] = useState(0);

  const navRef = useRef<HTMLDivElement>(null);

  const pathname = usePathname();

  const isActive = (href: string) => pathname.includes(href) && href !== "/";

  useEffect(() => {
    const calculateHeight = debounce(() => {
      const nav = navRef.current?.getBoundingClientRect();

      if (nav) {
        const vh = ((window.innerHeight - nav.top) / window.innerHeight) * 100;

        setHeight(vh);
      }
    }, 500);

    calculateHeight();

    window.addEventListener("resize", calculateHeight);

    return () => {
      window.removeEventListener("resize", calculateHeight);
    };
  }, []);

  return (
    <nav
      ref={navRef}
      className={cn(
        "relative flex h-[--mobile-navigation-height] w-full font-mono text-2xs",
        "text-secondary",
        "md:h-[--desktop-navigation-height] md:text-xs",
      )}
    >
      {links.map(({ label, href }, index) => (
        <Link
          key={label}
          href={href}
          title={label}
          className={cn(
            "relative flex-1",
            "outline-none",
            "hover:text-primary",
            "focus:text-primary",
            "focus-visible:after:absolute focus-visible:after:bottom-0 focus-visible:after:left-0 focus-visible:after:z-50 focus-visible:after:h-px focus-visible:after:w-full focus-visible:after:translate-y-1/2 focus-visible:after:bg-primary",
            isActive(href) && "text-primary",
          )}
          style={{
            height: `${height}vh`,
          }}
        >
          <div
            className={cn(
              "relative flex h-full items-start justify-center py-6",
            )}
            style={{
              WebkitTapHighlightColor: "transparent",
            }}
          >
            {index !== 0 && (
              <>
                <Line
                  className={cn(
                    "left-0 top-0 h-double w-px",
                    "bg-vertical-dashed",
                    "-translate-x-1/2",
                  )}
                />

                <Cross
                  origin={`link-${label}`}
                  positions={{
                    tl: "visible",
                    tr: "invisible",
                    bl: "invisible",
                    br: "invisible",
                  }}
                />
              </>
            )}

            <div className={cn("flex flex-col items-center gap-3")}>
              <span>{label}</span>

              <span
                className={cn(
                  "absolute -z-10 text-6xl font-extrabold",
                  "text-primary opacity-5",
                  "md:text-7xl",
                  isActive(href) && "opacity-100",
                )}
              >
                {index}
              </span>
            </div>

            <AnimatePresence>
              {isActive(href) && (
                <MotionSpan
                  initial={{
                    height: "0vh",
                  }}
                  animate={{
                    height: `${height}vh`,
                  }}
                  exit={{
                    height: "0vh",
                    opacity: 0,
                  }}
                  transition={{ duration: 0.4 }}
                  className={cn(
                    "absolute top-0 h-double w-full",
                    "pointer-events-none",
                    "bg-gradient-to-b from-primary/5 to-transparent",
                  )}
                />
              )}
            </AnimatePresence>
          </div>
        </Link>
      ))}
    </nav>
  );
}
