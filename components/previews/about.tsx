import Status from "components/status";
import Socials from "components/socials";
import StyledLink from "components/styled-link";

import { cn } from "lib/cn";

export default function Preview() {
  return (
    <div className={cn("relative flex h-full flex-col")}>
      <div className={cn("flex h-6 items-center justify-center")}>
        <Status play />
      </div>

      <div
        className={cn(
          "flex grow flex-col gap-10 px-4 py-6",
          "md:justify-between md:gap-0",
        )}
      >
        <div className={cn("flex flex-col gap-3")}>
          <div className={cn("flex flex-col")}>
            <p className="font-medium">David Dragovacz</p>
            <p className={cn("text-xs font-light", "text-secondary")}>
              software engineer at{" "}
              <StyledLink href="https://www.remote.com">remote</StyledLink>
            </p>
          </div>

          <p className={cn("text-balance text-sm font-light")}>
            Crafting web experiences with a keen eye for design and an obsession
            for the minutiae.
          </p>
        </div>

        <Socials />
      </div>
    </div>
  );
}
