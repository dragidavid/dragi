"use client";

import { useState, useEffect } from "react";
import { useTheme } from "next-themes";

import { Button } from "components/primitives/button";

import { cn } from "lib/cn";

export default function ThemeToggle({
  ...props
}: { isVertical: boolean } & React.HTMLAttributes<HTMLButtonElement>) {
  const { isVertical, ...rest } = props;

  const [mounted, setMounted] = useState(false);

  const { setTheme, theme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <Button
      size="icon"
      variant="subtle"
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      className={cn(
        "size-5",
        "focus-visible:ring-0 focus-visible:ring-background",
        isVertical && "size-3.5",
      )}
      tabIndex={-1}
      {...rest}
    >
      <span
        className={cn(
          "size-3 rounded-full",
          "bg-secondary",
          "hover:bg-inverse",
          isVertical && "size-3.5",
        )}
      />
      <span className="sr-only">Theme toggle</span>
    </Button>
  );
}
