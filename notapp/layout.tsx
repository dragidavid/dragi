"use client";
import clsx from "clsx";

import { Providers } from "app/providers";
import { Analytics } from "app/analytics";

import localFont from "@next/font/local";

import Navigation from "components/Navigation";

import "styles/globals.css";

import { usePathname } from "next/navigation";
import { AnimatePresence, domAnimation, LazyMotion, m } from "framer-motion";

const variants = {
  initial: {
    opacity: 0,
    left: "-100%",
    scale: 0.6,
  },
  animate: {
    opacity: 1,
    left: 0,
    scale: 1,
  },
  exit: {
    opacity: 0,
    left: "100%",
    scale: 0.6,
  },
};

const mona = localFont({
  src: "../public/fonts/Mona-Sans.woff2",
  variable: "--font-mona",
});

const hubot = localFont({
  src: "../public/fonts/Hubot-Sans.woff2",
  variable: "--font-hubot",
});

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  const pathname = usePathname();

  return (
    <html
      lang="en"
      className={clsx(
        "bg-[#050505] text-[#f5f5f5] antialiased",
        mona.variable,
        hubot.variable
      )}
    >
      <body className="mx-auto h-screen max-w-3xl">
        <Navigation />
        <Providers>
          <LazyMotion features={domAnimation}>
            <AnimatePresence mode="wait">
              <m.div
                key={pathname}
                className="h-2/3 w-full border-4 border-red-700 bg-slate-300 text-3xl font-black text-black"
                variants={variants}
                transition={{ duration: 1 }}
                initial="initial"
                animate="animate"
                exit="exit"
              >
                {children}
              </m.div>
            </AnimatePresence>
          </LazyMotion>
        </Providers>
        <Analytics />
      </body>
    </html>
  );
}
