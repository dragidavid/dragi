import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";

import Providers from "@/contexts/Providers";

import Frame from "@/components/frame";

import { cn } from "@/lib/cn";

import "styles/globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
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
          "selection:bg-rose-100 selection:text-rose-900",
          "dark:selection:bg-rose-400/10 dark:selection:text-rose-400",
        )}
      >
        <Providers attribute="class" defaultTheme="system" enableSystem>
          <Frame />

          <main
            className={cn(
              "isolate mx-auto w-screen max-w-md overflow-hidden",
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
