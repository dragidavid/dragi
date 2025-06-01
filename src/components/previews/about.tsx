import { svgs } from "@/components/svg";
import { Link } from "@/components/link";
import { Toggle } from "@/components/toggle";

import { cn } from "@/lib/cn";

export function About() {
  return (
    <div
      className={cn(
        "flex size-full flex-col",
        "to-inverse/30 from-inverse/5 bg-gradient-to-b to-[120px]",
        "dark:from-inverse/10 dark:to-extreme/70",
      )}
    >
      <div className={cn("flex justify-between px-4 pt-1.5 pb-1")}>
        <div className={cn("flex items-center gap-2")}>
          <svgs.flags.gb.Component
            className={cn("size-4 overflow-hidden rounded-full", "saturate-50")}
          />

          <span className="label-top">currently in London</span>
        </div>

        <Toggle />
      </div>

      <div
        className={cn(
          "relative size-full space-y-5 rounded-xl p-6",
          "inset-ring-inverse/10 bg-background inset-ring",
        )}
      >
        <div className="-space-y-0.5">
          <h3 className="font-medium">David Dragovacz</h3>

          <p
            className={cn("text-sm", "text-inverse/60", "dark:text-inverse/50")}
          >
            product engineer at{" "}
            <Link href="https://www.remote.com">Remote</Link>
          </p>
        </div>

        <div className={cn("space-y-3 text-sm text-pretty")}>
          <p>
            Crafting web experiences with a keen eye for design and an obsession
            for the minutiae.
          </p>

          <p>
            Previously, I helped build the restaurant platform at{" "}
            <Link href="https://deliveroo.co.uk">Deliveroo</Link>.
          </p>
        </div>
      </div>
    </div>
  );
}
