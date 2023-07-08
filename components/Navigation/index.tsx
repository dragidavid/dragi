"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";

import Line from "components/ui/Line";
import Joint from "components/ui/Joint";

import { cn } from "lib/cn";
import { debounce } from "lib/debounce";

const links = [
  {
    id: "projects",
    label: "Projects",
    href: "/projects",
  },
  {
    id: "craft",
    label: "Craft",
    href: "/craft",
  },
  {
    id: "home",
    label: (
      <div
        className={cn(
          "relative flex h-5 w-5",
          "select-none outline-none",
          "bg-secondary",
          "transition-all duration-100 ease-in-out",
          "hover:bg-primary"
        )}
      />
    ),
    href: "/",
  },
  {
    id: "tools",
    label: "Tools",
    href: "/tools",
  },
  {
    id: "spotify",
    label: "Spotify",
    href: "/spotify",
  },
];

export default function Navigation() {
  const [height, setHeight] = useState(0);

  const navRef = useRef<HTMLDivElement>(null);

  const pathname = usePathname();

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
        "relative flex h-[--mobile-navigation-height] w-full font-mono font-medium",
        "bg-almost-black text-secondary",
        "md:h-[--desktop-navigation-height]"
      )}
    >
      {links.map(({ id, label, href }, index: number) => (
        <Link
          key={id}
          href={href}
          className={cn(
            "relative flex-1",
            "select-none outline-none",
            pathname === href && "text-primary",
            "transition-all duration-100 ease-in-out",
            "hover:text-primary",
            "focus:text-primary focus-visible:after:absolute focus-visible:after:bottom-0 focus-visible:after:left-0 focus-visible:after:z-50 focus-visible:after:h-px focus-visible:after:w-full focus-visible:after:translate-y-1/2 focus-visible:after:bg-primary"
          )}
          style={{
            height: `${height}vh`,
          }}
        >
          <div
            className={cn(
              "relative flex h-full items-start justify-center py-7"
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
                    "-translate-x-1/2"
                  )}
                />

                <Joint positions={["tl"]} />
              </>
            )}

            {label}

            <AnimatePresence>
              {pathname === href && (
                <motion.span
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
                    "bg-gradient-to-b from-primary/10 via-primary/5 to-transparent"
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
