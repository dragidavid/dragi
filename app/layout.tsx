import { Inter } from "next/font/google";

import Fade from "components/ui/Fade";

import { cn } from "lib/cn";

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
    <html lang="en" className={cn(inter.variable, "text-sm antialiased")}>
      <body
        className={cn(
          "min-h-screen",
          "bg-almost-black text-primary caret-fuchsia-500 selection:bg-fuchsia-500 selection:text-primary"
        )}
      >
        <main
          className={cn(
            "grid min-h-screen justify-items-center overflow-x-clip p-3",
            "sm:place-items-center sm:p-0"
          )}
        >
          {/* <Fade
            sides={[
              {
                id: "top",
                styles:
                  "fixed z-40 top-0 left-0 h-1/6 w-screen bg-gradient-to-t from-transparent to-almost-black",
              },
              {
                id: "left",
                styles:
                  "fixed z-40 top-0 left-0 h-screen w-1/6 bg-gradient-to-l from-transparent to-almost-black",
              },
              {
                id: "bottom",
                styles:
                  "fixed z-40 bottom-0 left-0 h-1/6 w-screen bg-gradient-to-b from-transparent to-almost-black",
              },
              {
                id: "right",
                styles:
                  "fixed z-40 top-0 right-0 h-screen w-1/6 bg-gradient-to-r from-transparent to-almost-black",
              },
            ]}
          /> */}

          <div
            className={cn("relative h-[--container-size] w-[--container-size]")}
          >
            {children}
          </div>
        </main>
      </body>
    </html>
  );
}
