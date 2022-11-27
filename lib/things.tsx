import { HomeIcon } from "@heroicons/react/24/solid";

export const things = [
  {
    id: "projects",
    label: "Projects",
    baseStyles: "col-span-2 col-start-1 row-span-3",
    isExpandable: true,
    href: "/projects",
  },
  {
    id: "sketches",
    label: "Sketches",
    baseStyles: "col-span-2 col-start-1 row-span-2",
    isExpandable: true,
    href: "/sketches",
  },
  {
    id: "goods",
    label: "Goods",
    baseStyles: "col-span-2 col-start-1 row-span-2",
    isExpandable: true,
    href: "/goods",
  },
  {
    id: "home",
    label: <HomeIcon className="h-6 w-6" />,
    baseStyles: "col-span-2 col-start-3 row-span-5 row-start-1",
    isExpandable: false,
    href: "/",
  },
  {
    id: "tools",
    label: "Tools",
    baseStyles: "col-span-2 row-span-2",
    isExpandable: true,
    href: "/tools",
  },
  {
    id: "spotify",
    label: "Spotify",
    baseStyles: "col-span-2 col-start-5 row-span-4 row-start-1",
    isExpandable: true,
    href: "/spotify",
  },
  {
    id: "blog",
    label: "Blog",
    baseStyles: "col-span-2 col-start-5 row-span-3 row-start-5",
    isExpandable: true,
    href: "/blog",
  },
];
