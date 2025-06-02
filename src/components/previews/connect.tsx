import { Link } from "@/components/link";
import { Squiggle } from "@/components/squiggle";

import { cn } from "@/lib/cn";

export function Connect() {
  return (
    <div
      className={cn(
        "flex h-full flex-col",
        "bg-inverse/5",
        "dark:bg-inverse/[8%]",
      )}
    >
      <div
        className={cn(
          "relative size-full space-y-5 rounded-xl p-6 text-sm text-pretty",
          "inset-ring-inverse/10 bg-background shadow-inverse/10 shadow-lg inset-ring",
          "dark:shadow-extreme/50 dark:shadow-xl",
        )}
      >
        <p>
          Reach me at <Link href="https://x.com/drgdfyi">@drgdfyi</Link> or
          shoot an email to{" "}
          <Link href="mailto:hello@drgd.fyi">hello@drgd.fyi</Link>.
        </p>

        <Squiggle />

        <p>
          Check out my work on{" "}
          <Link href="https://github.com/dragidavid/drgd">GitHub</Link>.
        </p>
      </div>

      <div className={cn("px-4 pt-0.5 pb-1")}>
        <span className="label-bottom">connect</span>
      </div>
    </div>
  );
}
