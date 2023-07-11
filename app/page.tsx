import About from "components/Previews/About";
import Tools from "components/Previews/Tools";
import Projects from "components/Previews/Projects";
import Craft from "components/Previews/Craft";
import Spotify from "components/Previews/Spotify";

import Line from "components/ui/Line";
import Joint, { type Positions } from "components/ui/Joint";
import Expand from "components/ui/Expand";

import { cn } from "lib/cn";

const commonClasses = {
  top: "hidden h-px -translate-y-1/2 md:block",
  right: "right-0 hidden h-screen w-px translate-x-1/2 md:block",
  bottom: "bottom-0 h-px translate-y-1/2",
  left: "left-0 hidden h-screen w-px -translate-x-1/2 md:block",
};

const sections = [
  {
    component: <About />,
    lines: {
      top: "-right-full w-double md:right-0 md:w-screen",
      right: "bottom-0",
      bottom: "-right-full w-double md:right-0 md:w-screen",
      left: "bottom-0",
    },
    jointPositions: ["tl", "tr", "bl"],
    sectionStyles: "md:col-span-2",
  },
  {
    page: "tools",
    component: <Tools />,
    lines: {
      top: "right-0 w-screen",
      bottom: "-right-full w-double md:right-0 md:w-screen",
      left: "top-0",
    },
    jointPositions: ["tl", "tr", "bl", "br"],
    sectionStyles: "md:row-start-3",
  },
  {
    page: "projects",
    component: <Projects />,
    lines: {
      right: "top-0",
      bottom: "-left-full w-double md:left-0 md:w-screen",
      left: "top-0",
    },
    jointPositions: ["tl"],
    sectionStyles: "md:row-span-2 md:row-start-2",
  },
  {
    page: "craft",
    component: <Craft />,
    lines: {
      top: "left-0 w-screen",
      right: "bottom-0",
      bottom: "-left-full w-double md:left-0 md:w-screen",
    },
    jointPositions: ["tl", "tr"],
  },
  {
    page: "spotify",
    component: <Spotify />,
    lines: {
      right: "top-0",
    },
    jointPositions: ["tl", "tr", "bl", "br"],
    sectionStyles: "md:row-span-2",
  },
].map((section) => ({
  ...section,
  lines: (
    Object.keys(section.lines) as Array<keyof typeof commonClasses>
  ).reduce(
    (lines, key) => ({
      ...lines,
      [key]: cn(commonClasses[key], section.lines[key]),
    }),
    {}
  ),
}));

export default function Page() {
  return (
    <div
      className={cn(
        "relative flex w-full flex-col items-center justify-center",
        "md:grid md:h-[--container-size] md:grid-cols-3 md:grid-rows-3"
      )}
    >
      <Line
        className={cn(
          "left-0 hidden h-double w-px",
          "-translate-x-1/2",
          "xs:block",
          "md:hidden"
        )}
      />

      {sections.map((section, i) => (
        <Section
          key={i}
          page={section.page}
          lines={section.lines}
          jointPositions={section.jointPositions as Positions}
          sectionStyles={cn(section.sectionStyles)}
        >
          {section.component}
        </Section>
      ))}

      <Line
        className={cn(
          "right-0 hidden h-double w-px",
          "translate-x-1/2",
          "xs:block",
          "md:hidden"
        )}
      />
    </div>
  );
}

function Section({
  children,
  page,
  lines,
  jointPositions,
  sectionStyles,
}: {
  children: React.ReactNode;
  page?: string;
  lines?: {
    top?: string;
    right?: string;
    bottom?: string;
    left?: string;
  };
  jointPositions: Positions;
  sectionStyles?: string;
}) {
  return (
    <div
      className={cn(
        "relative flex h-full max-h-[calc(var(--container-size)*2/3)] w-full",
        sectionStyles
      )}
    >
      {lines &&
        (Object.keys(lines) as Array<keyof typeof lines>).map((side) => (
          <Line key={side} className={cn(lines[side])} />
        ))}

      <Joint positions={jointPositions} />

      <div className={cn("flex-1 overflow-hidden")}>
        {page && <Expand href={page} />}

        {children}
      </div>
    </div>
  );
}
