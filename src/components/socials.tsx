import StyledLink from "@/components/styled-link";

import { cn } from "@/lib/cn";

export default function Socials() {
  return (
    <div className={cn("flex items-center gap-8 text-xs", "text-secondary")}>
      <StyledLink href="https://x.com/dragidavid">x/twitter</StyledLink>

      <StyledLink href="https://github.com/dragidavid">github</StyledLink>

      <StyledLink copy>me@dragi.me</StyledLink>
    </div>
  );
}
