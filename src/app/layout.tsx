import { Analytics } from "@vercel/analytics/react";

import { GeistSans } from "geist/font/sans";
import { Instrument_Serif } from "next/font/google";

import { Providers } from "@/components/providers";

import { cn } from "@/lib/cn";

import "@/app/globals.css";

import type { Metadata } from "next";

export const metadata: Metadata = {
  metadataBase: new URL("https://drgd.fyi"),
  title: "David Dragovacz",
  description: "Product engineer working at Remote.",
  openGraph: {
    title: "David Dragovacz",
    description: "Product engineer working at Remote.",
    url: "https://drgd.fyi",
    siteName: "David Dragovacz",
    images: ["/og.jpg"],
  },
  twitter: {
    card: "summary_large_image",
    title: "David Dragovacz",
    description: "Product engineer working at Remote.",
    images: ["/og.jpg"],
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-32x32.png",
    apple: "/apple-touch-icon.png",
  },
};

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  variable: "--font-instrument-serif",
  weight: ["400"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      dir="ltr"
      className={cn(
        GeistSans.variable,
        instrumentSerif.variable,
        "antialiased",
      )}
      suppressHydrationWarning
    >
      <body
        className={cn(
          "touch-pan-y",
          "bg-background text-primary caret-primary",
          "selection:bg-rose-100 selection:text-rose-600",
          "dark:selection:bg-rose-400/10 dark:selection:text-rose-400",
        )}
      >
        <Providers attribute="class">
          <main
            className={cn(
              "isolate mx-auto h-dvh w-full max-w-screen",
              "border-inverse/20 border-dashed",
              "md:w-container md:flex md:max-w-none md:items-center md:border-x",
            )}
          >
            {/* Horizontal borders across */}
            <div
              aria-hidden
              className={cn(
                "absolute inset-x-0 hidden h-[calc(var(--spacing-container)+2px)]",
                "pointer-events-none",
                "border-inverse/20 border-y border-dashed",
                "md:block",
              )}
            />

            {children}
          </main>

          <Analytics />
        </Providers>
      </body>
    </html>
  );
}
