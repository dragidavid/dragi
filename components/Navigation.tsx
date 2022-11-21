import Link from "next/link";
import clsx from "clsx";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

import { HomeIcon } from "@heroicons/react/24/solid";

interface NavigationItem {
  label: string | JSX.Element;
  href: string;
}

const NavigationItems: NavigationItem[] = [
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
    label: <HomeIcon className="h-6 w-6" />,
    href: "/",
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

  return (
    <motion.nav
      exit={{ opacity: 0 }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="w-full"
    >
      <ul className="flex gap-6 text-sm">
        {NavigationItems.map((item) => (
          <li
            key={item.href}
            className={clsx(
              pathname === item.href ? "text-inherit" : "text-[#888]",
              "flex w-[calc(100%/7)] items-center justify-center transition-colors duration-200 hover:text-inherit"
            )}
          >
            <Link href={item.href}>{item.label}</Link>
          </li>
        ))}
      </ul>
    </motion.nav>
  );
}
