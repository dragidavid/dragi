"use client";

import { useState, useEffect } from "react";
import { useTheme } from "next-themes";

import { cn } from "lib/cn";

export default function ThemeToggle() {
  const [mounted, setMounted] = useState(false);

  const { setTheme, theme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <button
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      className={cn(
        "outline-none",
        "transition-colors duration-100 ease-in-out",
        "hover:text-primary",
        "focus:text-primary"
      )}
    >
      <span>{theme === "light" ? "dark" : "light"}</span>
      <span className="sr-only">Toggle theme</span>
    </button>
  );
}
