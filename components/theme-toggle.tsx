"use client";

import { useState, useEffect, useCallback } from "react";
import { useTheme } from "next-themes";

import { Button } from "components/primitives/button";

import { cn } from "lib/cn";

export default function ThemeToggle({ isVertical }: { isVertical: boolean }) {
  const [mounted, setMounted] = useState(false);

  const { setTheme, theme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme(theme === "light" ? "dark" : "light");
  }, [setTheme, theme]);

  if (!mounted) {
    return null;
  }

  return (
    <div className={cn("grid place-items-center", isVertical && "size-5")}>
      <Button
        size="icon"
        variant="subtle"
        onClick={toggleTheme}
        className={cn(
          "size-3 rounded-full",
          "bg-secondary",
          "hover:bg-inverse",
          isVertical && "size-3.5",
        )}
        tabIndex={-1}
      />
    </div>
  );
}
