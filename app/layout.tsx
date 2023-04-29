import { cn } from "lib/cn";
import localFont from "next/font/local";

import "styles/globals.css";

const mona = localFont({
  src: "../public/fonts/Mona-Sans.woff2",
  variable: "--font-mona",
});

const hubot = localFont({
  src: "../public/fonts/Hubot-Sans.woff2",
  variable: "--font-hubot",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={cn(
          mona.variable,
          hubot.variable,
          "grid min-h-screen grid-rows-1 font-sans antialiased",
          "bg-gray-950 text-gray-300 caret-fuchsia-500 selection:bg-fuchsia-500"
        )}
      >
        <main className={cn("")}>{children}</main>
      </body>
    </html>
  );
}
