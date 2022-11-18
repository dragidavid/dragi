"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import clsx from "clsx";

const items = [
  {
    label: "Projects",
    href: "/projects",
  },
  {
    label: "Goods",
    href: "/goods",
  },
  {
    label: "Sketches",
    href: "/sketches",
  },
  {
    label: "Blog",
    href: "/blog",
  },
  {
    label: "Spotify",
    href: "/spotify",
  },
  {
    label: "Tools",
    href: "/tools",
  },
];

export default function Navigation() {
  const pathname = usePathname();

  if (pathname === "/") {
    return null;
  }

  return (
    <motion.nav initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <ul className="flex gap-6">
        {items.map((item) => (
          <li
            key={item.href}
            className={clsx(
              pathname === item.href ? "font-bold" : "font-normal"
            )}
          >
            <Link href={item.href}>{item.label}</Link>
          </li>
        ))}
      </ul>
    </motion.nav>
  );
}
