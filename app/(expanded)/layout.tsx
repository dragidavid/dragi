import Navigation from "components/Navigation";

import Cross from "components/ui/Cross";
import { VerticalLine, HorizontalLine } from "components/ui/Line";

import { cn } from "lib/cn";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div
      className={cn(
        "flex w-[var(--page-container)] flex-col items-center justify-center"
      )}
    >
      <VerticalLine source="page" verticalOffset={-2} />

      <div className={cn("relative w-full")}>
        <HorizontalLine fullWidth />

        <Cross corners={["tl", "tr"]} />

        <Navigation />

        <HorizontalLine fullWidth />
      </div>

      <div
        className={cn("relative h-[70vh] max-h-[var(--root-container)] w-full")}
      >
        <Cross corners={["tl", "tr", "bl", "br"]} />

        <div className={cn("h-full overflow-auto")}>{children}</div>

        <HorizontalLine fullWidth />
      </div>

      <VerticalLine source="page" verticalOffset={2} />
    </div>
  );
}
