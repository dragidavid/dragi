"use client";

import { RootProvider } from "fumadocs-ui/provider";
import { ThemeProvider } from "next-themes";

import type { ThemeProviderProps } from "next-themes/dist/types";

export default function Providers({ children, ...props }: ThemeProviderProps) {
  return (
    <RootProvider
      search={{
        enabled: false,
      }}
      theme={{
        enabled: false,
      }}
    >
      <ThemeProvider {...props}>{children}</ThemeProvider>
    </RootProvider>
  );
}
