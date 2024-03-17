import Player from "components/spotify/player";
import Timeline from "components/spotify/timeline";

import Line from "components/ui/line";
import Cross from "components/ui/cross";

import { cn } from "lib/cn";

export default function Page() {
  return (
    <div className={cn("flex h-full flex-col", "md:flex-row")}>
      <div className={cn("relative", "md:w-2/5")}>
        <Player />

        <Line
          className={cn(
            "bottom-0 right-0 top-0 hidden w-px",
            "bg-accent",
            "translate-x-1/2",
            "md:block",
          )}
        />

        <Cross
          origin="spotify-player"
          positions={{
            tl: "hidden",
            tr: "hidden md:block",
            bl: "hidden",
            br: "hidden",
          }}
        />
      </div>

      <div className={cn("md:w-3/5 md:overflow-auto")}>
        <Timeline />
      </div>
    </div>
  );
}
