import Link from "next/link";

import { ArrowUpRight } from "lucide-react";

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
        className={cn("-bottom-full -top-full left-0 w-px", "-translate-x-1/2")}
      />

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
          "left-1/2 h-screen w-px",
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
          "right-1/2 h-screen w-px",
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

      <Line
        className={cn("-bottom-full -top-full right-0 w-px", "translate-x-1/2")}
      />
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
  extra,
  jointPositions,
  sectionStyles,
  lineStyles,
  showBottomLine,
  alwaysShowBottomLine,
}: {
  children: React.ReactNode;
  href?: string;
  extra?: React.ReactNode;
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
        "md:max-h-none md:max-w-[calc(var(--container-size)/3)]"
      )}
    >
      <Line className={cn(lineStyles, "h-px", "-translate-y-[0.5px]")} />

      <Joint positions={jointPositions} />

      <div className={cn("flex-1 overflow-hidden p-1")}>{children}</div>

      {(extra || href) && (
        <Link
          href={`/${href}`}
          className={cn("absolute right-0 top-0 z-50", "group")}
        >
          <ArrowUpRight
            size={16}
            className={cn(
              "transition-transform duration-100",
              "group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            )}
            aria-hidden={true}
          />
          <span className="sr-only">Go to {href}</span>
        </Link>
      )}

      {showBottomLine && (
        <Line
          className={cn(
            lineStyles,
            "bottom-0 h-px",
            "translate-y-[0.5px]",
            !alwaysShowBottomLine && "invisible",
            "md:visible"
          )}
        />
      )}
    </div>
  );
}
