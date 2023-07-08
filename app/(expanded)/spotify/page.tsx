import Spotify from "components/Spotify";
import TopTracks from "components/Spotify/TopTracks";

import { cn } from "lib/cn";

export default function Page() {
  return (
    <div className={cn("flex h-full flex-col gap-6", "md:flex-row")}>
      <div className={cn("md:w-2/5")}>
        <Spotify />
      </div>

      <div className={cn("md:w-3/5 md:overflow-auto")}>
        <TopTracks />
      </div>
    </div>
  );
}
