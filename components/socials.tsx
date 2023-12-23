"use client";

import { Button } from "components/primitives/button";

import Icon from "components/ui/icon";
import StyledLink from "components/styled-link";

import { cn } from "lib/cn";

export default function Socials() {
  return (
    <div className={cn("flex gap-2 text-sm", "text-secondary")}>
      <StyledLink href="mailto:me@dragi.me" className="hover:text-primary">
        me@dragi.me
      </StyledLink>

      <div className={cn("flex grow items-center")}>
        <span
          className={cn(
            "h-px w-full",
            "bg-gradient-to-r from-transparent via-accent to-transparent",
          )}
        />
      </div>

      <div className={cn("flex items-center gap-4")}>
        <Button
          size="icon"
          variant="subtle"
          onClick={() => window.open("https://x.com/dragidavid")}
          className={cn("!size-min", "text-inherit")}
        >
          <Icon name="x-logo" size="20" />
          <span className="sr-only">X/Twitter logo</span>
        </Button>

        <Button
          size="icon"
          variant="subtle"
          onClick={() => window.open("https://github.com/dragidavid")}
          className={cn("!size-min", "text-inherit")}
        >
          <Icon name="github-logo" size="20" />
          <span className="sr-only">GitHub logo</span>
        </Button>
      </div>
    </div>
  );
}
