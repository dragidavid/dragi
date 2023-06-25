import Spotify from "components/Spotify";

import { cn } from "lib/cn";

export default function Page() {
  return (
    <div className={cn("h-full")}>
      <Spotify />
    </div>
  );
}
