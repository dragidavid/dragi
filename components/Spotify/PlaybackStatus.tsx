import { Disc3 } from "lucide-react";

import { cn } from "lib/cn";

export default function PlaybackStatus({
  currentlyPlaying,
}: {
  currentlyPlaying: boolean;
}) {
  return (
    <div
      className={cn(
        "mb-3 flex items-center gap-2 text-xs font-black uppercase",
      )}
    >
      {currentlyPlaying ? <span>now playing</span> : <span>last played</span>}

      <Disc3
        size={18}
        className={cn(currentlyPlaying && "animate-spin")}
        aria-hidden
      />
    </div>
  );
}
