import Link from "next/link";

import Logos from "@/components/stack/logos";

import { cn } from "@/lib/cn";

export default async function Stack({
  className,
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "relative grid h-full auto-rows-auto grid-cols-3 grid-rows-[repeat(2,auto)] gap-px",
        "bg-muted",
        "md:grid-rows-[repeat(3,auto)]",
        className,
      )}
    >
      <div
        className={cn(
          "col-span-3 grid min-h-10 place-items-center font-mono text-xs",
          "bg-background",
          "md:hidden",
        )}
      >
        <span
          className={cn("group-hover:bg-primary group-hover:text-background")}
        >
          view the stack
        </span>
      </div>

      <Link href="/stack" className={cn("absolute inset-0 z-10", "md:hidden")}>
        <span className="sr-only">view the stack</span>
      </Link>

      <Logos />
    </div>
  );
}
