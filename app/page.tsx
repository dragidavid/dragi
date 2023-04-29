import About from "components/Previews/About";
import Tools from "components/Previews/Tools";
import Projects from "components/Previews/Projects";
import Craft from "components/Previews/Craft";
import Spotify from "components/Previews/Spotify";

import Cross from "components/ui/Cross";
import { VerticalLine, HorizontalLine } from "components/ui/Line";

import { cn } from "lib/cn";

import type { Corners } from "components/ui/Cross";

export default function Page() {
  return (
    <div
      className={cn(
        "flex w-[var(--root-container)] items-center justify-center"
      )}
    >
      <VerticalLine source="root" verticalOffset={-2} />

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

      <VerticalLine source="root" verticalOffset={-6} />

      <Column>
        <Section
          corners={["tl"]}
          extraSectionStyles="row-span-2 row-start-2"
          extraLineStyles="absolute left-0 w-full"
        >
          <Projects />
        </Section>
      </Column>

      <VerticalLine source="root" verticalOffset={6} />

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

      <VerticalLine source="root" verticalOffset={2} />
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
      <HorizontalLine className={cn(extraLineStyles)} />

      <div
        className={cn(
          "relative z-50 h-full w-full max-w-[calc(var(--root-container)/3)]"
        )}
      >
        <Cross corners={corners} />

        {children}
      </div>

      {hasFullWidthLine && <HorizontalLine fullWidth />}
    </div>
  );
}
