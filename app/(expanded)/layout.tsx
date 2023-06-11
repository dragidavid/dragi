import Navigation from "components/Navigation";

import Line from "components/ui/Line";
import Joint from "components/ui/Joint";

import { cn } from "lib/cn";

import type { Positions } from "components/ui/Joint";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div
      className={cn(
        "relative flex w-full flex-col items-center justify-center",
        "md:h-[--container-size]"
      )}
    >
      <Line
        className={cn("-bottom-1/2 -top-1/2 left-0 w-px", "-translate-x-1/2")}
      />

      <Section jointPositions={["tl", "tr"]}>
        <Navigation />
      </Section>

      <Section
        className="flex h-[calc(100vh-8rem-var(--navigation-height))] md:h-[calc(var(--container-size)-var(--navigation-height))]"
        jointPositions={["tl", "tr", "bl", "br"]}
        showBottomLine
      >
        <div className={cn("flex-1 overflow-auto p-[0.5px]")}>{children}</div>
      </Section>

      <Line
        className={cn("-bottom-1/2 -top-1/2 right-0 w-px", "translate-x-1/2")}
      />
    </div>
  );
}

function Section({
  children,
  className,
  jointPositions,
  showBottomLine,
}: {
  children: React.ReactNode;
  className?: string;
  jointPositions: Positions;
  showBottomLine?: boolean;
}) {
  return (
    <div className={cn("relative w-full", className)}>
      <Line className={cn("-left-full h-px w-double -translate-y-[0.5px]")} />

      <Joint positions={jointPositions} />

      {children}

      {showBottomLine && (
        <Line
          className={cn(
            "-left-full bottom-0 h-px w-double translate-y-[0.5px]"
          )}
        />
      )}
    </div>
  );
}

function Wrapper({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <div className={cn("relative w-full", className)}>{children}</div>;
}
