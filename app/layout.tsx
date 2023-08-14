import { Inter } from "next/font/google";

import Providers from "contexts/Providers";

import { cn } from "lib/cn";
import { satoshi, spaceGrotesk, switzer, outfit } from "lib/fonts";

import "styles/globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={cn(
        inter.variable,
        satoshi.variable,
        spaceGrotesk.variable,
        switzer.variable,
        outfit.variable,
        "text-sm antialiased"
      )}
      suppressHydrationWarning
    >
      <head />
      <body
        className={cn(
          // "font-switzer",
          "overflow-x-clip",
          "bg-background text-primary caret-primary",
          "selection:bg-primary selection:text-background"
        )}
      >
        <Providers attribute="class" defaultTheme="system" enableSystem>
          <main
            className={cn(
              "mx-auto w-screen max-w-[448px] overflow-hidden",
              "select-none",
              "xs:flex xs:min-h-screen xs:items-center xs:overflow-y-clip xs:overflow-x-visible",
              "md:w-[--container-size] md:max-w-none"
            )}
          >
            {children}
          </main>
        </Providers>
      </body>
    </html>
  );
}
