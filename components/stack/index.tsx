import Logos from "components/stack/logos";

import { cn } from "lib/cn";

export default async function Stack({
  className,
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "grid h-full auto-rows-auto grid-cols-3 grid-rows-[repeat(2,auto)] gap-px",
        "bg-muted",
        "md:grid-rows-[repeat(3,auto)]",
        className,
      )}
    >
      <div
        className={cn(
          "col-span-3 grid min-h-10 place-items-center",
          "bg-background",
          "md:hidden",
        )}
      >
        <span className={cn("font-mono text-xs")}>my stack</span>
      </div>

      <Logos />
    </div>
  );
}
