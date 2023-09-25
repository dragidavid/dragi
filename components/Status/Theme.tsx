"use client";

import { useState, useEffect } from "react";
import { useTheme } from "next-themes";

import { SunMedium, Moon } from "lucide-react";

import { cn } from "lib/cn";

import { useWindowSize } from "lib/hooks/useWindowSize";

export default function Theme({ vertical = false }: { vertical: boolean }) {
  const [mounted, setMounted] = useState(false);

  const { setTheme, theme } = useTheme();

  const { isXs } = useWindowSize();

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
        "focus:text-primary",
        vertical && "rotate-180",
      )}
    >
      <span>
        {theme === "light" ? (
          <Moon size={isXs ? 18 : 15} />
        ) : (
          <SunMedium size={isXs ? 18 : 15} />
        )}
      </span>
      <span className="sr-only">Toggle theme</span>
    </button>
  );
}
