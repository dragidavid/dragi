"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence } from "framer-motion";

import { MotionSpan } from "components/primitives/motion";

import Icon from "components/ui/icon";
import Line from "components/ui/line";
import Joint from "components/ui/joint";

import { cn } from "lib/cn";
import { debounce } from "lib/debounce";

const links = [
  {
    id: "projects",
    icon: <Icon name="code" size="navigation" />,
    href: "/projects",
  },
  {
    id: "craft",
    icon: <Icon name="craft" size="navigation" />,
    href: "/craft",
  },
  {
    id: "home",
    icon: <Icon name="home" size="navigation" />,
    href: "/",
  },
  {
    id: "tools",
    icon: <Icon name="toolbox" size="navigation" />,
    href: "/tools",
  },
  {
    id: "spotify",
    icon: <Icon name="music" size="navigation" />,
    href: "/spotify",
  },
];

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
    }, 800);

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
        "relative flex h-[--mobile-navigation-height] w-full",
        "text-secondary",
        "md:h-[--desktop-navigation-height]",
      )}
    >
      {links.map(({ id, icon, href }, index) => (
        <Link
          key={id}
          href={href}
          title={id}
          className={cn(
            "relative flex-1",
            "outline-none",
            "transition-all duration-100 ease-in-out",
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
              "bg-extreme",
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
                    "-translate-x-1/2",
                  )}
                />

                <Joint
                  origin={`link-${id}`}
                  positions={{
                    tl: "visible",
                    tr: "invisible",
                    bl: "invisible",
                    br: "invisible",
                  }}
                />
              </>
            )}

            {icon}

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
                    "bg-gradient-to-b from-accent/60 to-transparent",
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
