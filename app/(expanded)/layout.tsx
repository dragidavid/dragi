import Navigation from "components/Navigation";

import Line from "components/ui/Line";
import Cross from "components/ui/Cross";

import { cn } from "lib/cn";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div
      className={cn(
        "relative flex h-[70vh] max-h-[var(--root-container)] max-w-3xl flex-col items-center justify-center",
        "vertical-line"
      )}
      // className={cn(
      //   "relative flex h-[70vh] max-h-[var(--root-container)] w-[var(--page-container)] flex-col items-center justify-center",
      //   "vertical-line"
      // )}
    >
      {/* VERTICAL LINE */}
      {/* <div
        className={cn(
          "absolute left-0 z-20 h-screen w-px",
          "-translate-x-1/2",
          "bg-subtle-gray"
        )}
      /> */}

      <div className={cn("w-full")}>
        <Line fullWidth />

        <div className={cn("relative h-full w-full")}>
          <Cross corners={["tl", "tr"]} />

          <Navigation />
        </div>

        <Line fullWidth />
      </div>

      <div className={cn("h-full w-full")}>
        <div className={cn("relative z-30 h-full w-full p-[0.5px]")}>
          <Cross corners={["tl", "tr", "bl", "br"]} />

          <div className={cn("h-full overflow-auto")}>{children}</div>
        </div>

        <Line fullWidth />
      </div>

      {/* VERTICAL LINE */}
      {/* <div
        className={cn(
          "absolute right-0 z-20 h-screen w-px",
          "translate-x-1/2",
          "bg-subtle-gray"
        )}
      /> */}
    </div>
  );
}
