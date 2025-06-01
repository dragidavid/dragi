import { Cross } from "@/components/cross";
import { Module } from "@/components/module";

import { About, Connect, Spotify, Stack, Work } from "@/components/previews";

import { cn } from "@/lib/cn";

const MODULES = [
  {
    id: "about",
    Component: <About />,
    moduleStyles: "md:col-span-2 md:row-span-7",
  },
  {
    id: "work",
    Component: <Work />,
    moduleStyles: "md:row-span-13 md:row-start-8",
  },
  {
    id: "connect",
    Component: <Connect />,
    moduleStyles: "md:row-span-7",
  },
  {
    id: "spotify",
    Component: <Spotify />,
    moduleStyles: "md:row-span-13",
  },
  {
    id: "stack",
    Component: <Stack />,
    moduleStyles: "md:row-span-3 md:row-start-8",
  },
] as const;

export default async function Page() {
  return (
    <div className={cn("relative -mx-px", "bg-pattern-diagonal")}>
      <Cross positions={["tl", "tr", "bl", "br"]} />

      <div
        className={cn(
          "relative flex min-h-screen flex-col items-center justify-start gap-x-4 gap-y-6 px-4 py-12",
          "xs:justify-center xs:p-4 xs:max-w-lg xs:mx-auto xs:gap-4",
          "md:mx-auto md:grid md:h-(--container-size) md:min-h-0 md:max-w-none md:grid-cols-3 md:grid-rows-20",
        )}
      >
        {MODULES.map((module) => (
          <Module
            key={module.id}
            className={cn(
              "flex h-full max-h-[calc(var(--container-size)*2/3)]",
              module.moduleStyles,
            )}
          >
            {module.Component}
          </Module>
        ))}
      </div>
    </div>
  );
}
