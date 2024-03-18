"use client";

import { TooltipProvider } from "components/primitives/tooltip";
import { Provider as JotaiProvider } from "jotai";
import { ThemeProvider as NextThemesProvider } from "next-themes";

import { type ThemeProviderProps } from "next-themes/dist/types";

export default function Providers({ children, ...props }: ThemeProviderProps) {
  return (
    <NextThemesProvider {...props}>
      <JotaiProvider>
        <TooltipProvider>{children}</TooltipProvider>
      </JotaiProvider>
    </NextThemesProvider>
  );
}
