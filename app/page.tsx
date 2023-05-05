import About from "components/Previews/About";
import Tools from "components/Previews/Tools";
import Projects from "components/Previews/Projects";
import Craft from "components/Previews/Craft";
import Spotify from "components/Previews/Spotify";

import Line from "components/ui/Line";
import Joint from "components/ui/Joint";

import { cn } from "lib/cn";

import type { Positions } from "components/ui/Joint";

export default function Page() {
  return (
    <div
      className={cn(
        "relative flex w-full flex-col items-center justify-center",
        "md:h-[--container-size] md:flex-row"
      )}
    >
      <Line
        className={cn("-bottom-1/2 -top-1/2 left-0 w-px", "-translate-x-1/2")}
      />

      <Column>
        <Section
          jointPositions={["tl", "tr"]}
          sectionStyles="md:row-span-2"
          lineStyles="-right-full w-double md:right-0 md:w-screen"
        >
          <About />
        </Section>

        <Section
          jointPositions={["tl", "tr", "bl", "br"]}
          lineStyles="-right-full w-double md:right-0 md:w-screen"
          showBottomLine
        >
          <Tools />
        </Section>
      </Column>

      <Line
        className={cn(
          "left-1/2 h-screen w-px",
          "invisible",
          "translate-x-[calc(var(--container-size)/-6-0.5px)]",
          "md:visible"
        )}
      />

      <Column>
        <Section
          jointPositions={["tl"]}
          sectionStyles="md:row-span-2 md:row-start-2"
          lineStyles="-left-1/2 -right-1/2 md:left-0 md:right-0"
          showBottomLine
        >
          <Projects />
        </Section>
      </Column>

      <Line
        className={cn(
          "right-1/2 h-screen w-px",
          "invisible",
          "translate-x-[calc(var(--container-size)/6+0.5px)]",
          "md:visible"
        )}
      />

      <Column>
        <Section
          jointPositions={["tl", "tr"]}
          lineStyles="-left-1/2 w-double md:left-0 md:w-screen"
        >
          <Craft />
        </Section>

        <Section
          jointPositions={["tl", "tr", "bl", "br"]}
          sectionStyles="md:row-span-2"
          lineStyles="-left-1/2 w-double md:left-0 md:w-screen"
          showBottomLine
          alwaysShowBottomLine
        >
          <Spotify />
        </Section>
      </Column>

      <Line
        className={cn("-bottom-1/2 -top-1/2 right-0 w-px", "translate-x-1/2")}
      />
    </div>
  );
}

function Column({ children }: { children: React.ReactNode }) {
  return (
    <div
      className={cn(
        "h-full w-full",
        "md:grid md:max-w-[calc(var(--container-size)/3)] md:grid-rows-3"
      )}
    >
      {children}
    </div>
  );
}

function Section({
  children,
  jointPositions,
  sectionStyles,
  lineStyles,
  showBottomLine,
  alwaysShowBottomLine,
}: {
  children: React.ReactNode;
  jointPositions: Positions;
  sectionStyles?: string;
  lineStyles: string;
  showBottomLine?: boolean;
  alwaysShowBottomLine?: boolean;
}) {
  return (
    <div
      className={cn(
        "relative flex max-h-[calc(var(--container-size)/2)]",
        sectionStyles,
        "md:max-h-none"
      )}
    >
      <Line className={cn(lineStyles, "h-px -translate-y-[0.5px]")} />

      <Joint positions={jointPositions} />

      <div className={cn("flex-1 overflow-hidden p-[0.5px]")}>{children}</div>

      {showBottomLine && (
        <Line
          className={cn(
            lineStyles,
            "bottom-0 h-px translate-y-[0.5px]",
            !alwaysShowBottomLine && "invisible",
            "md:visible"
          )}
        />
      )}
    </div>
  );
}
