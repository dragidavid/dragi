import About from "components/Previews/About";
import Tools from "components/Previews/Tools";
import Projects from "components/Previews/Projects";
import Craft from "components/Previews/Craft";
import Spotify from "components/Previews/Spotify";

import Line from "components/ui/Line";
import Cross from "components/ui/Cross";

import { cn } from "lib/cn";

import type { Corners } from "components/ui/Cross";

export default function Page() {
  return (
    <div
      className={cn("relative flex h-full w-full items-center justify-center")}
    >
      <div
        className={cn("absolute left-0 z-20 h-screen w-px", "bg-subtle-gray")}
        style={{
          transform: "translateX(-50%)",
        }}
      />

      <Column>
        <Section
          corners={["tl", "tr"]}
          sectionStyles="row-span-2"
          lineStyles="absolute right-0 w-screen"
        >
          <About />
        </Section>

        <Section
          corners={["tl", "tr", "bl", "br"]}
          lineStyles="absolute right-0 w-screen"
          topAndBottom
        >
          <Tools />
        </Section>
      </Column>

      <div
        className={cn("absolute left-1/2 z-20 h-screen w-px", "bg-subtle-gray")}
        style={{
          transform: `translateX(calc(var(--container-size) / -6 - 0.5px))`,
        }}
      />

      <Column>
        <Section
          corners={["tl"]}
          sectionStyles="row-span-2 row-start-2"
          lineStyles="absolute left-0 right-0"
          topAndBottom
        >
          <Projects />
        </Section>
      </Column>

      <div
        className={cn(
          "absolute right-1/2 z-20 h-screen w-px",
          "bg-subtle-gray"
        )}
        style={{
          transform: `translateX(calc(var(--container-size) / 6 + 0.5px))`,
        }}
      />

      <Column>
        <Section corners={["tl", "tr"]} lineStyles="absolute left-0 w-screen">
          <Craft />
        </Section>

        <Section
          corners={["tl", "tr", "bl", "br"]}
          sectionStyles="row-span-2"
          lineStyles="absolute left-0 w-screen"
          topAndBottom
        >
          <Spotify />
        </Section>
      </Column>

      <div
        className={cn("absolute right-0 z-20 h-screen w-px", "bg-subtle-gray")}
        style={{
          transform: "translateX(50%)",
        }}
      />
    </div>
  );
}

function Column({ children }: { children: React.ReactNode }) {
  return <div className={cn("grid h-full w-full grid-rows-3")}>{children}</div>;
}

function Section({
  children,
  corners,
  sectionStyles,
  lineStyles,
  topAndBottom,
}: {
  children: React.ReactNode;
  corners: Corners;
  sectionStyles?: string;
  lineStyles: string;
  topAndBottom?: boolean;
}) {
  return (
    <div className={cn("relative", sectionStyles)}>
      <Line className={cn(lineStyles)} />

      <div
        className={cn(
          "relative z-30 h-full w-full max-w-[calc(var(--container-size)/3)] p-[0.5px]"
        )}
      >
        <Cross corners={corners} />

        {children}
      </div>

      {topAndBottom && <Line className={cn(lineStyles)} />}
    </div>
  );
}
