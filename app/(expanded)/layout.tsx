import Navigation from "components/Navigation";

import Line from "components/ui/Line";
import Joint, { type Positions } from "components/ui/Joint";

import { cn } from "lib/cn";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div
      className={cn(
        "relative w-full",
        "xs:flex xs:flex-col xs:justify-center",
        "md:h-[--container-size]"
      )}
    >
      <Line
        className={cn(
          "left-0 hidden h-double w-px",
          "-translate-x-1/2",
          "xs:block"
        )}
      />

      <Section
        jointPositions={["tl", "tr"]}
        className="pb-[--mobile-navigation-height] xs:h-[calc(100vh-8vh-var(--mobile-navigation-height))] xs:pb-0 md:h-[calc(var(--container-size)-var(--desktop-navigation-height))]"
      >
        <Line
          className={cn(
            "-left-full hidden h-px w-double -translate-y-1/2",
            "xs:block"
          )}
        />

        <div className={cn("h-full flex-1 overflow-auto")}>{children}</div>
      </Section>

      <Section
        jointPositions={["tl", "tr"]}
        className="fixed bottom-0 left-0 xs:relative"
      >
        <Line className={cn("-left-full h-px w-double -translate-y-1/2")} />

        <Navigation />
      </Section>

      <Line
        className={cn(
          "right-0 hidden h-double w-px",
          "translate-x-1/2",
          "xs:block"
        )}
      />
    </div>
  );
}

function Section({
  children,
  jointPositions,
  className,
}: {
  children: React.ReactNode;
  jointPositions?: Positions;
  className?: string;
}) {
  return (
    <div className={cn("relative w-full", className)}>
      {jointPositions && <Joint positions={jointPositions} />}

      {children}
    </div>
  );
}
