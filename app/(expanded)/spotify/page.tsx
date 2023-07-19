import Spotify from "components/Spotify";
import Favorites from "components/Spotify/Favorites";

import Line from "components/ui/Line";
import Joint from "components/ui/Joint";

import { cn } from "lib/cn";

export default function Page() {
  return (
    <div className={cn("flex h-full flex-col", "md:flex-row")}>
      <div className={cn("relative", "md:w-2/5")}>
        <Spotify />

        <Line
          className={cn(
            "bottom-0 right-0 hidden h-screen w-px",
            "translate-x-1/2",
            "md:block"
          )}
        />

        <Joint
          origin="spotify-player"
          positions={{
            tl: "invisible",
            tr: "invisible md:visible",
            bl: "invisible",
            br: "invisible",
          }}
        />
      </div>

      <div className={cn("md:w-3/5 md:overflow-auto")}>
        <Favorites />
      </div>
    </div>
  );
}
