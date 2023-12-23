"use client";

import { useState, useEffect } from "react";
import { useTheme } from "next-themes";

import { Button } from "components/primitives/button";

import Icon from "components/ui/icon";

import { cn } from "lib/cn";

export default function ThemeToggle({
  vertical = false,
  ...props
}: React.HTMLAttributes<HTMLButtonElement> & {
  vertical: boolean;
}) {
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
      className={cn("!size-min", "text-inherit", vertical && "rotate-180")}
      {...props}
    >
      {theme === "light" ? (
        <Icon name="moon" size="theme-toggle" />
      ) : (
        <Icon name="sun" size="theme-toggle" />
      )}
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
