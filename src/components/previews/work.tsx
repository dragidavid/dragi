import Image from "next/image";

import { Link } from "@/components/link";

import { cn } from "@/lib/cn";

export function Work() {
  return (
    <div
      className={cn(
        "flex size-full flex-col",
        "to-inverse/30 from-inverse/5 bg-gradient-to-b to-[120px]",
        "dark:from-inverse/10 dark:to-extreme/70",
      )}
    >
      <div className={cn("px-4 pt-1.5 pb-1")}>
        <span className="label-top">my work</span>
      </div>

      <div
        className={cn(
          "relative size-full space-y-6 rounded-xl p-6",
          "inset-ring-inverse/10 bg-background inset-ring",
        )}
      >
        <div
          className={cn(
            "flex items-center gap-3",
            "md:flex-col md:items-start md:gap-1",
          )}
        >
          <div
            className={cn(
              "relative mr-1 ml-1 size-8",
              "md:my-0.5 md:ml-0 md:size-7",
            )}
          >
            <Image src="/assets/aura.png" alt="aura logo" fill />
          </div>

          <div className="-space-y-0.5">
            <h3 className="font-medium">
              <Link href="https://aura.drgd.fyi">aura</Link>
            </h3>
            <p
              className={cn(
                "text-sm",
                "text-inverse/60",
                "dark:text-inverse/50",
              )}
            >
              Get colors from any image.
            </p>
          </div>
        </div>

        <div
          className={cn(
            "flex items-center gap-3",
            "md:flex-col md:items-start md:gap-1",
          )}
        >
          <div className={cn("relative size-10", "md:-ml-1 md:size-8")}>
            <Image src="/assets/shade.png" alt="shade logo" fill />
          </div>

          <div className="-space-y-0.5">
            <h3 className="font-medium">
              <Link href="https://shade.drgd.fyi">shade</Link>
            </h3>
            <p
              className={cn(
                "text-sm",
                "text-inverse/60",
                "dark:text-inverse/50",
              )}
            >
              A simple code sharing app.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
