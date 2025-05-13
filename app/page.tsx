import Fade from "@/components/fade";
import Line from "@/components/line";
import Module from "@/components/module";

import { About, Stack, Projects, Craft, Spotify } from "@/components/previews";

import { cn } from "@/lib/cn";

import type { Side, LineExtension } from "@/lib/types";

const commonBaseLineClasses: Record<Side, string> = {
  top: "hidden h-px w-full -translate-y-1/2 bg-muted md:block",
  right: "right-0 hidden h-full w-px translate-x-1/2 bg-muted md:block",
  bottom: "bottom-0 h-px w-full translate-y-1/2 bg-muted",
  left: "hidden h-full w-px -translate-x-1/2 bg-muted md:block",
};

const commonLineExtensions: Partial<Record<LineExtension, string>> = {
  "tl-to-left":
    "h-px w-screen origin-left -translate-y-1/2 rotate-180 bg-horizontal-dashed",
  "bl-to-left":
    "bottom-0 h-px w-screen origin-left translate-y-1/2 rotate-180 bg-horizontal-dashed",
  "tr-to-right":
    "right-0 h-px w-screen origin-right -translate-y-1/2 rotate-180 bg-horizontal-dashed",
  "br-to-right":
    "bottom-0 right-0 h-px w-screen origin-right translate-y-1/2 rotate-180 bg-horizontal-dashed",
  "tl-to-top":
    "hidden h-screen w-px origin-top -translate-x-1/2 rotate-180 bg-vertical-dashed md:block",
  "tr-to-top":
    "right-0 hidden h-screen w-px origin-top translate-x-1/2 rotate-180 bg-vertical-dashed md:block",
  "bl-to-bottom":
    "bottom-0 hidden h-screen w-px origin-bottom -translate-x-1/2 rotate-180 bg-vertical-dashed md:block",
  "br-to-bottom":
    "bottom-0 right-0 hidden h-screen w-px origin-bottom translate-x-1/2 rotate-180 bg-vertical-dashed md:block",
};

const modules = [
  {
    id: "about",
    component: <About />,
    baseLines: ["top", "right", "bottom", "left"],
    tiltedLines: {
      tl: "invisible left-0 top-0 bg-horizontal-dashed md:visible",
    },
    lineExtensions: {
      "tl-to-top": commonLineExtensions["tl-to-top"],
      "tl-to-left": cn(commonLineExtensions["tl-to-left"], "hidden md:block"),
      "tr-to-top": commonLineExtensions["tr-to-top"],
      "bl-to-left": commonLineExtensions["bl-to-left"],
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
    id: "stack",
    page: "stack",
    expandable: false,
    component: <Stack />,
    baseLines: ["top", "bottom", "left"],
    tiltedLines: {
      bl: "invisible bottom-0 left-0 bg-horizontal-dashed md:visible",
    },
    lineExtensions: {
      "tl-to-left": commonLineExtensions["tl-to-left"],
      "bl-to-left": commonLineExtensions["bl-to-left"],
      "tr-to-right": cn(commonLineExtensions["tr-to-right"], "md:hidden"),
      "br-to-right": cn(commonLineExtensions["br-to-right"], "md:hidden"),
      "bl-to-bottom": commonLineExtensions["bl-to-bottom"],
      "br-to-bottom": commonLineExtensions["br-to-bottom"],
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
    baseLines: ["bottom", "left"],
    lineExtensions: {
      "br-to-bottom": commonLineExtensions["br-to-bottom"],
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
    baseLines: ["top", "right", "bottom"],
    tiltedLines: {
      tr: "invisible right-0 top-0 bg-horizontal-dashed md:visible",
    },
    lineExtensions: {
      "tl-to-left": cn(commonLineExtensions["tl-to-left"], "md:hidden"),
      "bl-to-left": cn(commonLineExtensions["bl-to-left"], "md:hidden"),
      "tr-to-top": commonLineExtensions["tr-to-top"],
      "tr-to-right": commonLineExtensions["tr-to-right"],
      "br-to-right": commonLineExtensions["br-to-right"],
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
    baseLines: ["right", "bottom", "left"],
    lineOverrides: {
      bottom: "hidden md:block",
    },
    tiltedLines: {
      br: "invisible bottom-0 right-0 bg-horizontal-dashed md:visible",
    },
    lineExtensions: {
      "br-to-right": cn(commonLineExtensions["br-to-right"], "hidden md:block"),
      "br-to-bottom": commonLineExtensions["br-to-bottom"],
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
  lines: (section.baseLines as Side[]).reduce(
    (lines, key) => ({
      ...lines,
      [key]: cn(
        commonBaseLineClasses[key as keyof typeof commonBaseLineClasses],
        section.lineOverrides?.[key as keyof typeof section.lineOverrides],
      ),
    }),
    {} as Record<Side, string>,
  ),
}));

const fadeClasses = {
  top: cn(
    "left-0 top-0 h-[9vh] w-screen",
    "bg-linear-to-t from-transparent to-background",
    "md:h-1/6",
  ),
  left: cn(
    "top-0 left-0 h-screen w-[7vw] invisible",
    "bg-linear-to-l from-transparent to-background",
    "xs:visible",
    "sm:w-1/6",
  ),
  bottom: cn(
    "bottom-0 left-0 h-[11vh] w-screen",
    "bg-linear-to-b from-transparent to-background",
    "md:h-1/6",
  ),
  right: cn(
    "top-0 right-0 h-screen w-[7vw] invisible",
    "bg-linear-to-r from-transparent to-background",
    "xs:visible",
    "sm:w-1/6",
  ),
};

export default async function Page() {
  return (
    <div className={cn("size-full px-3", "md:px-0")}>
      <div
        className={cn(
          "relative flex min-h-screen w-full flex-col items-center justify-start py-12",
          "xs:justify-center",
          "md:grid md:h-(--container-size) md:min-h-0 md:grid-cols-3 md:grid-rows-3 md:py-0",
        )}
      >
        <Fade
          sides={Object.entries(fadeClasses).map(([id, className]) => ({
            id,
            className,
          }))}
        />

        <Line
          className={cn(
            "-bottom-full -top-full left-0 w-px",
            "bg-muted",
            "-translate-x-1/2",
            "md:hidden",
          )}
        />

        {modules.map((module) => (
          <Module
            key={module.id}
            id={module.id}
            page={module.page}
            expandable={module.expandable}
            preview
            lines={module.lines}
            tiltedLines={module.tiltedLines}
            lineExtensions={module.lineExtensions}
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
            "-inset-y-full right-0 w-px",
            "bg-muted",
            "translate-x-1/2",
            "md:hidden",
          )}
        />
      </div>
    </div>
  );
}
