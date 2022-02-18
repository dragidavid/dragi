import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { motion } from "framer-motion";
// import Image from "next/image";
import { SunIcon, MoonIcon } from "@heroicons/react/outline";

import { Category } from "lib/types";

const CATEGORIES: Category[] = [
  {
    label: "All",
  },
  {
    label: "About",
  },
  {
    label: "Projects",
  },
  {
    label: "Media",
  },
];

export default function Navigation() {
  const [mounted, setMounted] = useState<boolean>(false);
  const [selectedCategory, setSelectedCategory] = useState<Category>(
    CATEGORIES[0]
  );
  const { theme, setTheme } = useTheme();

  useEffect(() => setMounted(true), []);

  return (
    <nav className="mx-auto flex w-full max-w-[400px] select-none flex-col justify-between gap-2 px-4 pt-3 pb-7 text-sm sm:max-w-[400px] md:max-w-[480px] lg:max-w-[1024px] lg:flex-row lg:gap-0 lg:py-10 xl:max-w-[1280px]">
      <div className="relative flex items-center justify-center">
        {/* <Image src="/logo.svg" alt="logo" width={96} height={72} /> */}
        <span>LOGO</span>
      </div>

      <div className="flex grow items-center lg:justify-end">
        <div className="flex w-full overflow-hidden rounded-xl bg-slate-200 p-[6px] dark:border-2 dark:border-slate-800 dark:bg-transparent lg:w-auto">
          <ul className="flex grow justify-between">
            {CATEGORIES.map((category: Category) => (
              <li
                key={category.label}
                className="relative flex items-center rounded-lg bg-transparent px-3 text-black transition-all hover:cursor-pointer dark:text-white sm:px-4 lg:hover:opacity-50"
                onClick={() => setSelectedCategory(category)}
              >
                {selectedCategory === category ? (
                  <motion.div
                    className="absolute inset-0 w-full rounded-lg bg-white will-change-transform dark:bg-slate-800"
                    layoutId="background"
                  />
                ) : null}
                <span className="relative">{category.label}</span>
              </li>
            ))}
          </ul>

          <span className="relative m-2 w-[2px] rounded-full bg-white dark:bg-slate-800" />

          <button
            aria-label="dark-mode-toggle"
            type="button"
            className="rounded-lg bg-slate-200 p-1 transition-all hover:bg-white dark:bg-inherit dark:hover:bg-slate-800"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          >
            {mounted && theme === "dark" ? (
              <SunIcon className="m-1 h-5 w-5 stroke-white" />
            ) : (
              <MoonIcon className="m-1 h-5 w-5 stroke-black" />
            )}
          </button>
        </div>
      </div>
    </nav>
  );
}
