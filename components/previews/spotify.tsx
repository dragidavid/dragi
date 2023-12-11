import Player from "components/spotify/player";

import { cn } from "lib/cn";

export default function Preview() {
  return (
    <div className={cn("relative h-full")}>
      <Player preview />
    </div>
  );
}
