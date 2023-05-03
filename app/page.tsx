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
      className={cn(
        "relative flex w-[var(--root-container)] items-center justify-center"
      )}
    >
      <div
        className={cn(
          "absolute left-0 z-20 h-screen w-px",
          "-translate-x-1/2",
          "bg-subtle-gray"
        )}
      />

      <Column>
        <Section
          corners={["tl", "tr"]}
          extraSectionStyles="row-span-2"
          extraLineStyles="absolute right-0 w-screen"
        >
          <About />
        </Section>

        <Section
          corners={["tl", "tr", "bl", "br"]}
          extraLineStyles="absolute right-0 w-screen"
          hasFullWidthLine
        >
          <Tools />
        </Section>
      </Column>

      <div
        className={cn("absolute left-1/2 z-20 h-screen w-px", "bg-subtle-gray")}
        style={{
          transform: `translateX(calc(var(--root-container) / -6 - 0.5px))`,
        }}
      />

      <Column>
        <Section
          corners={["tl"]}
          extraSectionStyles="row-span-2 row-start-2"
          extraLineStyles="absolute left-0 w-full"
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
          transform: `translateX(calc(var(--root-container) / 6 + 0.5px))`,
        }}
      />

      <Column>
        <Section corners={["tl", "tr"]} extraLineStyles="fixed-top-left">
          <Craft />
        </Section>

        <Section
          corners={["tl", "tr", "bl", "br"]}
          extraSectionStyles="row-span-2"
          extraLineStyles="fixed-top-left"
        >
          <Spotify />
        </Section>
      </Column>

      <div
        className={cn(
          "absolute right-0 z-20 h-screen w-px",
          "translate-x-1/2",
          "bg-subtle-gray"
        )}
      />
    </div>
  );
}

function Column({ children }: { children: React.ReactNode }) {
  return (
    <div className={cn("flex w-full items-center")}>
      <div
        className={cn(
          "grid h-[70vh] max-h-[var(--root-container)] w-full grid-rows-3"
        )}
      >
        {children}
      </div>
    </div>
  );
}

function Section({
  children,
  corners,
  extraSectionStyles,
  extraLineStyles,
  hasFullWidthLine,
}: {
  children: React.ReactNode;
  corners: Corners;
  extraSectionStyles?: string;
  extraLineStyles?: string;
  hasFullWidthLine?: boolean;
}) {
  return (
    <div className={cn("relative", extraSectionStyles)}>
      <Line className={cn(extraLineStyles)} />

      <div
        className={cn(
          "relative z-30 h-full w-full max-w-[calc(var(--root-container)/3)] p-[0.5px]"
        )}
      >
        <Cross corners={corners} />

        {children}
      </div>

      {hasFullWidthLine && <Line fullWidth />}
    </div>
  );
}
