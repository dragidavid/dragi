"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

import { cn } from "lib/cn";

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
          "relative flex h-6 w-6 rounded-full",
          "select-none outline-none",
          "bg-secondary blur-[2px]",
          "transition-all duration-100 ease-in-out",
          "hover:bg-primary",
          "after:absolute after:inset-1 after:-z-10 after:bg-sky-500 after:blur-[1px]",
          "before:absolute before:inset-1 before:-z-10 before:bg-fuchsia-500 before:blur-[1px]",
          "glitch"
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
  const pathname = usePathname();

  return (
    <nav
      className={cn(
        "relative flex h-[--navigation-height] w-full overflow-hidden font-mono font-medium",
        "text-secondary"
      )}
    >
      {links.map(({ id, label, href }) => (
        <Link
          key={id}
          href={href}
          className={cn(
            "flex-1",
            "select-none outline-none",
            "transition-all duration-100 ease-in-out",
            // TODO figure out a better focus style here
            "focus:text-primary focus-visible:bg-gradient-to-b focus-visible:from-transparent focus-visible:to-primary/[5%]"
          )}
        >
          <div
            className={cn(
              "relative flex h-full items-center justify-center",
              pathname === href && "text-primary",
              "transition-colors duration-100 ease-in-out",
              "hover:text-primary"
            )}
            style={{
              WebkitTapHighlightColor: "transparent",
            }}
          >
            {label}

            {pathname === href && (
              <motion.span
                layoutId="strike-through"
                transition={{ type: "spring", bounce: 0.2, duration: 0.7 }}
                className={cn(
                  "absolute z-10 h-px w-full",
                  "bg-primary mix-blend-exclusion"
                )}
              />
            )}
          </div>
        </Link>
      ))}
    </nav>
  );
}
