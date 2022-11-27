import { HomeIcon } from "@heroicons/react/24/solid";

import type { Cage } from "lib/types";

const borderStyles =
  "border-2 border-white/10 bg-[#050505] transition-colors duration-300 hover:border-white/20";

export const cages: Cage[] = [
  {
    id: "projects",
    navigationLabel: "Projects",
    styles: `${borderStyles} col-span-2 col-start-1 row-span-3`,
    hasOwnPage: true,
    href: "/projects",
  },
  {
    id: "sketches",
    navigationLabel: "Sketches",
    styles: `${borderStyles} col-span-2 col-start-1 row-span-2`,
    hasOwnPage: true,
    href: "/sketches",
  },
  {
    id: "goods",
    navigationLabel: "Goods",
    styles: `${borderStyles} col-span-2 col-start-1 row-span-2`,
    hasOwnPage: true,
    href: "/goods",
  },
  {
    id: "home",
    navigationLabel: <HomeIcon className="h-6 w-6" />,
    styles: "col-span-2 col-start-3 row-span-5 row-start-1",
    hasOwnPage: false,
    href: "/",
  },
  {
    id: "tools",
    navigationLabel: "Tools",
    styles: `${borderStyles} col-span-2 row-span-2`,
    hasOwnPage: true,
    href: "/tools",
  },
  {
    id: "spotify",
    navigationLabel: "Spotify",
    styles: `${borderStyles} col-span-2 col-start-5 row-span-4 row-start-1`,
    hasOwnPage: true,
    href: "/spotify",
  },
  {
    id: "blog",
    navigationLabel: "Blog",
    styles: `${borderStyles} col-span-2 col-start-5 row-span-3 row-start-5`,
    hasOwnPage: true,
    href: "/blog",
  },
];
