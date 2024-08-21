"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence } from "framer-motion";

import Line from "components/line";
import Cross from "components/cross";

import { MotionSpan } from "components/primitives/motion";

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

export default function Navigation() {
  const pathname = usePathname();

  const isActive = (href: string) => pathname.includes(href) && href !== "/";

  return (
    <nav
      className={cn(
        "relative flex h-auto w-full font-mono text-2xs",
        "text-secondary",
        "xs:h-full",
        "md:text-xs",
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
                  WebkitTextStroke: "2px hsl(var(--muted))",
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
