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
    label: "Home",
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
        "grid w-full grid-cols-5 font-hubot font-medium",
        "text-secondary"
      )}
    >
      {links.map(({ id, label, href }) => (
        <Link
          key={id}
          href={href}
          className={cn(
            "relative flex items-center justify-center p-2.5",
            "transition-colors duration-100 ease-in-out",
            "hover:text-primary",
            pathname === href && "text-primary"
          )}
        >
          {label}

          {pathname === href && (
            <motion.span
              layoutId="underline"
              transition={{ type: "spring", bounce: 0.2, duration: 0.4 }}
              className={cn(
                "absolute -bottom-[0.5px] left-0 z-30 h-px w-full",
                "bg-primary"
              )}
            />
          )}
        </Link>
      ))}
    </nav>
  );
}
