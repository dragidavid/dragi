import Module from "components/module";

import { About, Tools, Projects, Craft, Spotify } from "components/previews";

import Fade from "components/ui/fade";
import Line from "components/ui/line";

import { cn } from "lib/cn";

import { type Side } from "lib/types";

const commonClasses: Record<Side, string> = {
  top: "hidden h-px -translate-y-1/2 md:block",
  right: "right-0 hidden h-screen w-px translate-x-1/2 md:block",
  bottom: "bottom-0 h-px translate-y-1/2",
  left: "left-0 hidden h-screen w-px -translate-x-1/2 md:block",
};

const modules = [
  {
    id: "about",
    component: <About />,
    lines: {
      top: "-right-full w-double bg-horizontal-dashed md:right-0 md:w-screen",
      right: "bottom-0 bg-vertical-dashed",
      bottom:
        "-right-full w-double bg-horizontal-dashed md:right-0 md:w-screen",
      left: "bottom-0 bg-vertical-dashed",
    },
    tiltedLines: {
      tl: "invisible left-0 top-0 h-screen w-px origin-top rotate-[135deg] bg-vertical-dashed md:visible",
    },
    crosses: {
      tl: "invisible md:visible",
      tr: "invisible md:visible",
      bl: "invisible md:visible",
      br: "invisible",
    },
    moduleStyles: "md:col-span-2",
  },
  {
    id: "tools",
    page: "tools",
    component: <Tools />,
    lines: {
      top: "right-0 w-screen bg-horizontal-dashed",
      bottom:
        "-right-full w-double bg-horizontal-dashed md:right-0 md:w-screen",
      left: "top-0 bg-vertical-dashed",
    },
    tiltedLines: {
      bl: "invisible bottom-0 left-0 h-screen w-px origin-bottom -rotate-[135deg] bg-vertical-dashed md:visible",
    },
    crosses: {
      tl: "visible",
      tr: "visible",
      bl: "visible",
      br: "visible",
    },
    moduleStyles: "md:row-start-3",
  },
  {
    id: "projects",
    page: "projects",
    component: <Projects />,
    lines: {
      bottom: "-left-full w-double bg-horizontal-dashed md:left-0 md:w-full",
      left: "top-0 bg-vertical-dashed",
    },
    crosses: {
      tl: "invisible md:visible",
      tr: "invisible",
      bl: "visible md:invisible",
      br: "visible md:invisible",
    },
    moduleStyles: "md:row-span-2 md:row-start-2",
  },
  {
    id: "craft",
    page: "craft",
    component: <Craft />,
    lines: {
      top: "left-0 w-screen bg-horizontal-dashed",
      right: "bottom-0 bg-vertical-dashed",
      bottom: "-left-full w-double bg-accent md:left-0 md:w-screen",
    },
    tiltedLines: {
      tr: "invisible right-0 top-0 h-screen w-px origin-top -rotate-[135deg] bg-vertical-dashed md:visible",
    },
    crosses: {
      tl: "invisible md:visible",
      tr: "invisible md:visible",
      bl: "visible md:invisible",
      br: "visible md:invisible",
    },
  },
  {
    id: "spotify",
    page: "spotify",
    component: <Spotify />,
    lines: {
      right: "top-0 bg-accent",
      bottom: "-left-full w-double bg-accent md:left-0 md:w-screen",
      left: "top-0 bg-accent",
    },
    tiltedLines: {
      br: "invisible bottom-0 right-0 h-screen w-px origin-bottom rotate-[135deg] bg-vertical-dashed md:visible",
    },
    crosses: {
      tl: "invisible md:visible",
      tr: "invisible md:visible",
      bl: "invisible md:visible",
      br: "invisible md:visible",
    },
    moduleStyles: "md:row-span-2",
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
    {},
  ),
}));

export default function Page() {
  return (
    <div className={cn("size-full px-5", "sm:px-4")}>
      <div
        className={cn(
          "relative flex min-h-screen w-full flex-col items-center justify-start py-12",
          "xs:justify-center",
          "md:grid md:h-[--container-size] md:min-h-0 md:grid-cols-3 md:grid-rows-3 md:py-0",
        )}
      >
        <Fade
          sides={[
            {
              id: "top",
              className: cn(
                "left-0 top-0 h-[9vh] w-screen",
                "bg-gradient-to-t from-transparent to-background",
                "md:h-1/6",
              ),
            },
            {
              id: "left",
              className: cn(
                "top-0 left-0 h-screen w-[7vw] invisible",
                "bg-gradient-to-l from-transparent to-background",
                "xs:visible",
                "sm:w-1/6",
              ),
            },
            {
              id: "bottom",
              className: cn(
                "bottom-0 left-0 h-[11vh] w-screen",
                "bg-gradient-to-b from-transparent to-background",
                "md:h-1/6",
              ),
            },
            {
              id: "right",
              className: cn(
                "top-0 right-0 h-screen w-[7vw] invisible",
                "bg-gradient-to-r from-transparent to-background",
                "xs:visible",
                "sm:w-1/6",
              ),
            },
          ]}
        />

        <Line
          className={cn(
            "-bottom-full -top-full left-0 w-px",
            "bg-accent",
            "-translate-x-1/2",
            "md:hidden",
          )}
        />

        {modules.map((module) => (
          <Module
            key={module.id}
            id={module.id}
            page={module.page}
            preview
            lines={module.lines}
            tiltedLines={module.tiltedLines}
            crosses={module.crosses}
            className={cn(
              "flex h-full max-h-[calc(var(--container-size)*2/3)]",
              module.moduleStyles,
            )}
          >
            {module.component}
          </Module>
        ))}

        <Line
          className={cn(
            "-bottom-full -top-full right-0 w-px",
            "bg-accent",
            "translate-x-1/2",
            "md:hidden",
          )}
        />
      </div>
    </div>
  );
}
