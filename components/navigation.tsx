"use client";

import { useCallback, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, useScroll, useSpring } from "framer-motion";

import Line from "components/line";
import Cross from "components/cross";

import { MotionNav, MotionSpan } from "components/primitives/motion";

import { cn } from "lib/cn";

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
    label: "stack",
    href: "/stack",
  },
  {
    label: "spotify",
    href: "/spotify",
  },
] as const;

const useScrollDirection = (pathname: string) => {
  const lastScrollY = useRef(0);
  const isAtEdge = useRef(false);

  const { scrollY } = useScroll();

  const scale = useSpring(1, {
    stiffness: 100,
    damping: 30,
  });

  useEffect(() => {
    if (scale.get() !== 1) {
      scale.set(1);
    }
  }, [pathname]);

  useEffect(() => {
    return scrollY.on("change", (latest) => {
      const scrollDelta = latest - lastScrollY.current;
      const isScrollingDown = scrollDelta > 0;
      const isScrollingUp = scrollDelta < 0;

      const isAtTop = latest <= 0;
      const isAtBottom =
        latest + window.innerHeight >= document.documentElement.scrollHeight;

      if ((isAtTop && isScrollingUp) || (isAtBottom && isScrollingDown)) {
        isAtEdge.current = true;
        return;
      }

      if (isAtEdge.current && !isAtTop && !isAtBottom) {
        isAtEdge.current = false;
        return;
      }

      if (!isAtEdge.current) {
        if (isScrollingDown) {
          scale.set(0.6);
        } else if (isScrollingUp) {
          scale.set(1);
        }
      }

      lastScrollY.current = latest;
    });
  }, [scrollY, scale]);

  return scale;
};

export default function Navigation() {
  const pathname = usePathname();

  const scale = useScrollDirection(pathname);

  const isActive = useCallback(
    (href: string) => pathname.includes(href) && href !== "/",
    [pathname],
  );
  return (
    <MotionNav
      style={{ scale, transformOrigin: "bottom center" }}
      className={cn(
        "relative flex h-auto w-full overflow-hidden rounded-3xl font-mono text-2xs",
        "bg-gradient-to-b text-secondary backdrop-blur-md",
        "from-extreme to-inverse/[0.02]",
        "shadow-[0px_0px_0px_1px,0px_1px_1px_-0.5px,0px_3px_3px_-1.5px,0px_6px_6px_-3px,0px_12px_12px_-6px,0px_24px_24px_-12px] shadow-inverse/[0.04]",
        "dark:from-inverse/[0.01] dark:to-extreme/20",
        "dark:shadow-[inset_0px_1px_0px_0px_hsla(var(--inverse)/0.05),inset_0px_0px_1px_0px_hsla(var(--inverse)/0.08),0_0_1px_hsla(var(--extreme)/0.3),0_2px_2px_hsla(var(--extreme)/0.3),0_4px_4px_hsla(var(--extreme)/0.3),0_8px_8px_hsla(var(--extreme)/0.3)]",
        "xs:h-full xs:overflow-visible xs:rounded-none xs:bg-transparent xs:!shadow-none xs:backdrop-blur-none xs:![background-image:none]",
        "md:text-xs",
      )}
    >
      {links.map(({ label, href }, index) => (
        <Link
          key={label}
          href={href}
          title={label}
          className={cn(
            "relative aspect-square w-full flex-1",
            "outline-none",
            "hover:text-primary",
            "focus:text-primary",
            "focus-visible:after:absolute focus-visible:after:bottom-0 focus-visible:after:left-0 focus-visible:after:z-50 focus-visible:after:h-px focus-visible:after:w-full focus-visible:after:translate-y-1/2 focus-visible:after:bg-primary",
            "xs:aspect-auto",
            isActive(href) && "text-primary",
          )}
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
                    "invisible left-0 top-0 h-double w-px",
                    "bg-muted",
                    "-translate-x-1/2",
                    "xs:visible",
                  )}
                />

                <Cross
                  origin={`link-${label}`}
                  positions={{
                    tl: "invisible xs:visible",
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
                  "absolute font-sans text-5xl font-black",
                  "text-background",
                  "translate-y-1",
                  "md:translate-y-0.5 md:text-7xl",
                  isActive(href) && "text-primary",
                )}
                style={{
                  WebkitTextStroke: isActive(href)
                    ? "1px hsla(var(--inverse)/0.04)"
                    : "1px hsl(var(--muted))",
                }}
              >
                {index}
              </span>
            </div>

            <AnimatePresence>
              {isActive(href) && (
                <MotionSpan
                  initial={{
                    height: "0%",
                    opacity: 0,
                  }}
                  animate={{
                    height: "100%",
                    opacity: 1,
                  }}
                  exit={{
                    height: "0%",
                    opacity: 0,
                  }}
                  transition={{ duration: 0.4 }}
                  className={cn(
                    "absolute top-0 size-full",
                    "pointer-events-none",
                    "bg-gradient-to-b from-muted/80 to-transparent",
                  )}
                />
              )}
            </AnimatePresence>
          </div>
        </Link>
      ))}
    </MotionNav>
  );
}
