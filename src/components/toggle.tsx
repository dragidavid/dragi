"use client";

import { useCallback } from "react";
import { useTheme } from "next-themes";

import { cn } from "@/lib/cn";

export function Toggle() {
  const { setTheme, theme } = useTheme();

  const toggle = useCallback(() => {
    setTheme(theme === "light" ? "dark" : "light");
  }, [setTheme, theme]);

  return (
    <div className={cn("grid place-items-center")}>
      <button
        type="button"
        onClick={toggle}
        aria-label="Toggle theme"
        className={cn(
          "size-4 rounded-full",
          "from-inverse/30 to-inverse/10 bg-gradient-to-t",
          "hover:from-inverse hover:to-inverse/60",
          "dark:from-inverse/10 dark:to-inverse/20",
          "dark:hover:from-inverse/60 dark:hover:to-inverse",
        )}
      />
    </div>
  );
}
