"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

import { LayoutGrid } from "lucide-react";

import Fade from "components/ui/Fade";

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
    label: <LayoutGrid size={18} />,
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
        "relative grid h-12 w-full grid-cols-5 overflow-hidden font-mono font-medium",
        "text-secondary"
      )}
    >
      <Fade
        sides={[
          // {
          //   id: "middle",
          //   styles:
          //     "absolute z-20 top-1/4 left-[calc(50%-56px)] h-1/2 w-32 bg-gradient-to-r from-transparent via-subtle-gray to-transparent mix-blend-darken",
          // },
          {
            id: "left",
            styles:
              "absolute z-20 top-1/4 left-0 h-1/2 w-16 bg-gradient-to-l from-transparent to-subtle-gray mix-blend-darken",
          },
          {
            id: "right",
            styles:
              "absolute z-20 top-1/4 right-0 h-1/2 w-16 bg-gradient-to-r from-transparent to-subtle-gray mix-blend-darken",
          },
        ]}
      />

      {links.map(({ id, label, href }, i) => (
        <Link key={id} href={href}>
          <div
            className={cn(
              "relative flex h-full items-center justify-center p-2",
              "transition-colors duration-100 ease-in-out",
              "hover:text-primary",
              pathname === href && "text-primary"
            )}
            style={{
              WebkitTapHighlightColor: "transparent",
            }}
          >
            {label}

            {pathname === href && (
              <motion.span
                layoutId="underline"
                transition={{ type: "spring", bounce: 0.2, duration: 7 }}
                className={cn(
                  "absolute left-0 z-10 h-px w-full",
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
