"use client";

import Icon from "components/icon";
import StyledLink from "components/styled-link";

import { Button } from "components/primitives/button";

import { cn } from "lib/cn";

export default function Socials() {
  return (
    <div className={cn("flex justify-between gap-2 text-sm", "text-secondary")}>
      <StyledLink
        href="mailto:me@dragi.me"
        className={cn("hover:text-primary, focus:text-primary")}
      >
        me@dragi.me
      </StyledLink>

      <div className={cn("flex items-center gap-4")}>
        <Button
          size="icon"
          variant="subtle"
          onClick={() => window.open("https://x.com/dragidavid")}
          className={cn("!size-min cursor-ne-resize", "text-inherit")}
        >
          <Icon name="x-logo" size="20" />
          <span className="sr-only">X/Twitter logo</span>
        </Button>

        <Button
          size="icon"
          variant="subtle"
          onClick={() => window.open("https://github.com/dragidavid")}
          className={cn("!size-min cursor-ne-resize", "text-inherit")}
        >
          <Icon name="github-logo" size="20" />
          <span className="sr-only">GitHub logo</span>
        </Button>
      </div>
    </div>
  );
}
