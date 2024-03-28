"use client";

import { TooltipProvider } from "components/primitives/tooltip";
import { ThemeProvider } from "next-themes";

import { type ThemeProviderProps } from "next-themes/dist/types";

export default function Providers({ children, ...props }: ThemeProviderProps) {
  return (
    <ThemeProvider {...props}>
      <TooltipProvider delayDuration={100}>{children}</TooltipProvider>
    </ThemeProvider>
  );
}
