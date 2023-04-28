import Line from "components/ui/Line";
import Cross from "components/ui/Cross";

import { cn } from "lib/cn";

export default function Page() {
  return (
    <div
      className={cn(
        "mx-auto grid h-full w-[840px] grid-cols-3 justify-items-center"
      )}
    >
      <Line orientation="vertical" verticalOffset={-420} />

      <div className={cn("flex w-full items-center")}>
        <div className={cn("grid h-[70vh] max-h-[896px] w-full grid-rows-3")}>
          <div className={cn("relative row-span-2 h-full w-full")}>
            <Line orientation="horizontal" className={cn("absolute right-0")} />
            <div className={cn("relative h-full w-full")}>
              <Cross corners={["tl", "tr"]} />
              About
            </div>
          </div>

          <div className={cn("relative")}>
            <Line orientation="horizontal" className={cn("absolute right-0")} />
            <div className={cn("relative h-full w-full")}>
              <Cross corners={["tl", "tr", "bl", "br"]} />
              Tools
            </div>
            <Line orientation="horizontal" fullWidth />
          </div>
        </div>
      </div>

      <Line orientation="vertical" verticalOffset={-140} />

      <div className={cn("flex w-full items-center")}>
        <div className={cn("grid h-[70vh] max-h-[896px] w-full grid-rows-3")}>
          <div className={cn("relative row-span-2 row-start-2 h-full w-full")}>
            <Line orientation="horizontal" className={cn("absolute left-0")} />
            <div className={cn("relative h-full w-full")}>
              <Cross corners={["tl"]} />
              Projects
            </div>
          </div>
        </div>
      </div>

      <Line orientation="vertical" verticalOffset={140} />

      <div className={cn("flex w-full items-center")}>
        <div className={cn("grid h-[70vh] max-h-[896px] w-full grid-rows-3")}>
          <div className={cn("relative h-full w-full")}>
            <Line orientation="horizontal" className={cn("absolute left-0")} />

            <div className={cn("relative h-full w-full")}>
              <Cross corners={["tl", "tr"]} />
              Craft
            </div>
          </div>

          <div className={cn("relative row-span-2 h-full w-full")}>
            <Cross corners={["tl", "tr", "bl", "br"]} />
            Spotify
          </div>
        </div>
      </div>

      <Line orientation="vertical" verticalOffset={420} />
    </div>
  );
}
