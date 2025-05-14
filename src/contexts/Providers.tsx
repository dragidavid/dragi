"use client";

import { RootProvider } from "fumadocs-ui/provider";
import { ThemeProvider, type ThemeProviderProps } from "next-themes";


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
