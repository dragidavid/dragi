import clsx from "clsx";

import { Providers } from "app/providers";
import { Analytics } from "app/analytics";

import localFont from "@next/font/local";

import Navigation from "components/Navigation";

import "styles/globals.css";
import MotionMain from "components/MotionMain";

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
  return (
    <html lang="en" className={clsx(mona.variable, hubot.variable)}>
      <body className="h-screen bg-[#050505] text-[#f5f5f5] antialiased">
        {/* <Navigation /> */}

        <Providers>
          {/* <main className="flex h-full w-full items-center justify-center"> */}
          <MotionMain>{children}</MotionMain>
          {/* </main> */}
        </Providers>

        <Analytics />
      </body>
    </html>
  );
}
