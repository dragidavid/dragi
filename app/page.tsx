import Line from "components/ui/Line";
import Cross from "components/ui/Cross";

import { cn } from "lib/cn";

export default function Page() {
  return (
    <div
      className={cn(
        "mx-auto flex h-full w-[640px] flex-col items-center justify-center"
      )}
    >
      {/* Left vertical line */}
      <Line orientation="vertical" verticalOffset={-320} />

      <div className={cn("w-full")}>
        {/* Horizontal line above the navigation */}
        <Line orientation="horizontal" fullWidth />

        <div className={cn("relative h-full")}>
          <Cross corners={["tl", "tr"]} />

          <ul
            className={cn(
              "grid grid-cols-5",
              "[&>li]:h-full [&>li]:w-full [&>li]:p-3 [&>li]:text-center"
            )}
          >
            <li>Projects</li>
            <li>Craft</li>
            <li>home</li>
            <li>Tools</li>
            <li>Spotify</li>
          </ul>
        </div>

        {/* Horizontal line below the navigation */}
        <Line orientation="horizontal" fullWidth />
      </div>

      <div className={cn("h-[70vh] w-full")}>
        <div className={cn("relative h-full")}>
          <Cross corners={["tl", "tr", "bl", "br"]} />

          <div className={cn("h-full overflow-auto p-4")}></div>
        </div>

        {/* Horizontal line below the content */}
        <Line orientation="horizontal" fullWidth />
      </div>

      {/* Right vertical line */}
      <Line orientation="vertical" verticalOffset={320} />
    </div>
  );
}
