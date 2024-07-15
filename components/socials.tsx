import StyledLink from "components/styled-link";

import { cn } from "lib/cn";

export default function Socials() {
  return (
    <div
      className={cn(
        "flex items-center gap-8 font-mono text-xs",
        "text-secondary",
      )}
    >
      <StyledLink
        href="mailto:me@dragi.me"
        className={cn("hover:text-primary, focus:text-primary")}
      >
        me@dragi.me
      </StyledLink>

      <StyledLink
        href="https://x.com/dragidavid"
        className={cn("hover:text-primary, focus:text-primary")}
      >
        x/twitter
      </StyledLink>

      <StyledLink
        href="https://github.com/dragidavid"
        className={cn("hover:text-primary, focus:text-primary")}
      >
        github
      </StyledLink>
    </div>
  );
}
