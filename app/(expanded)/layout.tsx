import Navigation from "components/Navigation";

import Line from "components/ui/Line";
import Joint, { type Positions } from "components/ui/Joint";

import { cn } from "lib/cn";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div
      className={cn(
        "relative flex w-full flex-col items-center justify-center",
        "md:h-[--container-size]"
      )}
    >
      <Line
        className={cn("-bottom-full -top-full left-0 w-px", "-translate-x-1/2")}
      />

      <Section>
        <Navigation />
      </Section>

      <Section
        className="flex h-[calc(100vh-8rem-var(--navigation-height))] md:h-[calc(var(--container-size)-var(--navigation-height))]"
        jointPositions={["tl", "tr", "bl", "br"]}
        showTopLine
        showBottomLine
      >
        <div className={cn("h-full flex-1 overflow-auto p-[0.5px]")}>
          {children}
        </div>
      </Section>

      <Line
        className={cn("-bottom-full -top-full right-0 w-px", "translate-x-1/2")}
      />
    </div>
  );
}

function Section({
  children,
  className,
  jointPositions,
  showTopLine,
  showBottomLine,
}: {
  children: React.ReactNode;
  jointPositions?: Positions;
  showTopLine?: boolean;
  showBottomLine?: boolean;
  className?: string;
}) {
  return (
    <div className={cn("relative w-full", className)}>
      {showTopLine && (
        <Line className={cn("-left-full h-px w-double -translate-y-1/2")} />
      )}

      {jointPositions && <Joint positions={jointPositions} />}

      {children}

      {showBottomLine && (
        <Line
          className={cn("-left-full bottom-0 h-px w-double translate-y-1/2")}
        />
      )}
    </div>
  );
}
