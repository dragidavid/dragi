import About from "components/Previews/About";
import Tools from "components/Previews/Tools";
import Projects from "components/Previews/Projects";
import Craft from "components/Previews/Craft";
import Spotify from "components/Previews/Spotify";

import Line from "components/ui/Line";
import Joint from "components/ui/Joint";
import Expand from "components/ui/Expand";

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
      <Line className={cn("left-0 h-double w-px", "-translate-x-1/2")} />

      <Wrapper>
        <Section
          jointPositions={["tl", "tr"]}
          sectionStyles={cn("md:row-span-2")}
          lineStyles={cn("-right-full w-double", "md:right-0 md:w-screen")}
        >
          <About />
        </Section>

        <Section
          href="tools"
          jointPositions={["tl", "tr", "bl", "br"]}
          lineStyles={cn("-right-full w-double", "md:right-0 md:w-screen")}
          showBottomLine
        >
          <Tools />
        </Section>
      </Wrapper>

      <Line
        className={cn(
          "left-1/2 h-double w-px",
          "translate-x-[calc(var(--container-size)/-6-0.5px)]",
          "invisible",
          "md:visible"
        )}
      />

      <Wrapper>
        <Section
          href="projects"
          jointPositions={["tl"]}
          sectionStyles={cn("md:row-span-2 md:row-start-2")}
          lineStyles={cn("-left-1/2 -right-1/2", "md:left-0 md:right-0")}
          showBottomLine
        >
          <Projects />
        </Section>
      </Wrapper>

      <Line
        className={cn(
          "right-1/2 h-double w-px",
          "translate-x-[calc(var(--container-size)/6+0.5px)]",
          "invisible",
          "md:visible"
        )}
      />

      <Wrapper>
        <Section
          href="craft"
          jointPositions={["tl", "tr"]}
          lineStyles={cn("-left-1/2 w-double", "md:left-0 md:w-screen")}
        >
          <Craft />
        </Section>

        <Section
          href="spotify"
          jointPositions={["tl", "tr", "bl", "br"]}
          sectionStyles={cn("md:row-span-2")}
          lineStyles={cn("-left-1/2 w-double", "md:left-0 md:w-screen")}
          showBottomLine
          alwaysShowBottomLine
        >
          <Spotify />
        </Section>
      </Wrapper>

      <Line className={cn("right-0 h-double w-px", "translate-x-1/2")} />
    </div>
  );
}

function Wrapper({ children }: { children: React.ReactNode }) {
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
  href,
  jointPositions,
  sectionStyles,
  lineStyles,
  showBottomLine,
  alwaysShowBottomLine,
}: {
  children: React.ReactNode;
  href?: string;
  jointPositions: Positions;
  sectionStyles?: string;
  lineStyles: string;
  showBottomLine?: boolean;
  alwaysShowBottomLine?: boolean;
}) {
  return (
    <div
      className={cn(
        "relative flex max-h-[calc(var(--container-size)*2/3)]",
        sectionStyles,
        "md:max-h-none md:max-w-[calc(var(--container-size)/3)]"
      )}
    >
      <Line className={cn(lineStyles, "h-px", "-translate-y-1/2")} />

      <Joint positions={jointPositions} />

      <div className={cn("flex-1 overflow-hidden")}>
        {href && <Expand href={href} />}

        {children}
      </div>

      {showBottomLine && (
        <Line
          className={cn(
            lineStyles,
            "bottom-0 h-px",
            "translate-y-1/2",
            !alwaysShowBottomLine && "invisible",
            "md:visible"
          )}
        />
      )}
    </div>
  );
}
