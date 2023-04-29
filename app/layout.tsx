import localFont from "next/font/local";

import { cn } from "lib/cn";

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
    <html
      lang="en"
      className={cn(
        mona.variable,
        hubot.variable,
        "font-sans text-sm antialiased"
      )}
    >
      <body
        className={cn(
          "min-h-screen",
          "bg-almost-black text-primary caret-fuchsia-500 selection:bg-fuchsia-500 selection:text-primary"
        )}
      >
        <main className={cn("grid min-h-screen place-items-center")}>
          {children}
        </main>
      </body>
    </html>
  );
}
