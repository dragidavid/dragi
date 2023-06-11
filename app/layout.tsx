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
          "min-h-screen overflow-x-clip",
          "bg-almost-black text-primary caret-fuchsia-500",
          "selection:bg-fuchsia-500 selection:text-primary"
        )}
      >
        <main
          className={cn(
            "mx-auto min-h-screen w-screen max-w-[448px] overflow-y-clip",
            "sm:flex sm:items-center",
            "md:w-[--container-size] md:max-w-none"
          )}
        >
          <Fade
            sides={[
              {
                id: "top",
                className: cn(
                  "fixed left-0 top-0 z-50 h-[9%] w-screen",
                  "bg-gradient-to-t from-transparent to-almost-black",
                  "md:h-1/6"
                ),
              },
              {
                id: "left",
                className: cn(
                  "fixed top-0 left-0 z-50 h-screen w-[7%]",
                  "bg-gradient-to-l from-transparent to-almost-black",
                  "sm:w-1/6"
                ),
              },
              {
                id: "bottom",
                className: cn(
                  "fixed bottom-0 left-0 z-50 h-[9%] w-screen",
                  "bg-gradient-to-b from-transparent to-almost-black",
                  "md:h-1/6"
                ),
              },
              {
                id: "right",
                className: cn(
                  "fixed top-0 right-0 z-50 h-screen w-[7%]",
                  "bg-gradient-to-r from-transparent to-almost-black",
                  "sm:w-1/6"
                ),
              },
            ]}
          />

          <div className={cn("h-full w-full px-4 py-16", "md:px-0")}>
            {children}
          </div>
        </main>
      </body>
    </html>
  );
}
