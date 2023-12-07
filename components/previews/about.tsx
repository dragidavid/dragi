import Status from "components/status";
import Socials from "components/socials";

import { cn } from "lib/cn";

export default function Preview() {
  return (
    <div className={cn("relative flex h-full flex-col")}>
      <div className="h-6">
        <Status play />
      </div>

      <div
        className={cn(
          "flex grow flex-col gap-10 px-4 py-6",
          "md:justify-between md:gap-0",
        )}
      >
        <div className={cn("flex flex-col gap-5")}>
          <p className={cn("font-medium", "text-secondary")}>David Dragovacz</p>

          <p className={cn("text-balance text-lg font-light")}>
            Crafting web experiences with a keen eye for design and an obsession
            for the minutiae.
          </p>
        </div>

        <Socials />
      </div>
    </div>
  );
}
