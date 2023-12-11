import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";

import Providers from "contexts/Providers";

import { cn } from "lib/cn";

import "styles/globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={cn(GeistSans.variable, GeistMono.variable, "antialiased")}
      suppressHydrationWarning
    >
      <head />
      <body
        className={cn(
          "overflow-x-clip",
          "bg-background text-primary caret-primary",
          "selection:bg-primary selection:text-background",
        )}
      >
        <Providers attribute="class" defaultTheme="system" enableSystem>
          <main
            className={cn(
              "mx-auto w-screen max-w-[448px] overflow-hidden",
              // "select-none",
              "xs:flex xs:min-h-screen xs:items-center xs:overflow-y-clip xs:overflow-x-visible",
              "md:w-[--container-size] md:max-w-none",
            )}
          >
            {children}
          </main>
        </Providers>
      </body>
    </html>
  );
}
