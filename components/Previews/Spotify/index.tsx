import Spotify from "components/Spotify";

import { cn } from "lib/cn";

export default function Preview() {
  return (
    <div className={cn("relative h-full")}>
      <Spotify />
    </div>
  );
}
