import Link from "next/link";

import Stack from "components/stack";

import { cn } from "lib/cn";

export default function Preview() {
  return (
    <div className={cn("relative h-full", "group")}>
      <Link
        href="/stack"
        className={cn(
          "absolute inset-0 z-10 grid place-items-center font-mono text-xs",
          "outline-none",
          "scale-90 opacity-0",
          "ease-out-quad transition-[opacity,transform] duration-200",
          "peer",
          "focus-visible:scale-100 focus-visible:opacity-100",
          "group-hover:scale-100 group-hover:opacity-100",
        )}
      >
        <span>view the stack</span>
      </Link>

      <Stack
        className={cn(
          "ease-out-quad transition-[opacity,filter] duration-200",
          "group-hover:opacity-40 group-hover:blur-sm",
          "peer-focus-visible:opacity-40 peer-focus-visible:blur-sm",
        )}
      />
    </div>
  );
}
