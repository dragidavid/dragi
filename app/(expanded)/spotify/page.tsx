import Spotify from "components/Spotify";
import TopTracks from "components/Spotify/TopTracks";

import { cn } from "lib/cn";

export default function Page() {
  return (
    <div className={cn("flex h-full flex-col", "md:flex-row")}>
      <div className={cn("md:w-1/3")}>
        <Spotify />
      </div>

      <div className={cn("md:w-2/3 md:overflow-auto")}>
        <TopTracks />
      </div>
    </div>
  );
}
