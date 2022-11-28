import { ThemeProvider } from "next-themes";
import { Analytics } from "@vercel/analytics/react";
import { usePathname } from "next/navigation";
import { AnimatePresence, domAnimation, LazyMotion, m } from "framer-motion";
import localFont from "@next/font/local";
import clsx from "clsx";

import Navigation from "components/Navigation";

import type { AppProps } from "next/app";

import "node_modules/react-grid-layout/css/styles.css";
import "node_modules/react-resizable/css/styles.css";

import "styles/globals.css";

const mona = localFont({
  src: "../public/fonts/Mona-Sans.woff2",
  variable: "--font-mona",
});

const hubot = localFont({
  src: "../public/fonts/Hubot-Sans.woff2",
  variable: "--font-hubot",
});

const App = ({ Component, pageProps }: AppProps) => {
  const pathname = usePathname();

  return (
    <ThemeProvider attribute="class" defaultTheme="system">
      <div
        className={clsx(
          "h-screen w-full font-sans",
          mona.variable,
          hubot.variable
        )}
      >
        <LazyMotion features={domAnimation}>
          <div className="flex h-1/5 items-center">
            <AnimatePresence>
              {pathname !== "/" ? <Navigation /> : null}
            </AnimatePresence>
          </div>
          <div className="h-4/5">
            <AnimatePresence mode="wait">
              <m.main
                key={pathname}
                initial={{
                  opacity: 0,
                }}
                animate={{
                  opacity: 1,
                }}
                exit={{
                  opacity: 0,
                }}
                className={clsx(
                  "h-[60vh] w-full overflow-hidden rounded-xl",
                  pathname === "/" ? "border-none" : "border-2 border-white/20 "
                )}
              >
                <Component {...pageProps} />
              </m.main>
            </AnimatePresence>
          </div>
        </LazyMotion>
      </div>
      <Analytics />
    </ThemeProvider>
  );
};

export default App;
