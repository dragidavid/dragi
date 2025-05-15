import Link from "next/link";

import Stack from "@/components/stack";

import { cn } from "@/lib/cn";

export default function Preview() {
  return (
    <div className={cn("relative h-full", "group")}>
      <Link
        href="/stack"
        className={cn(
          "absolute inset-0 z-10 hidden place-items-center font-mono text-xs",
          "outline-hidden",
          "scale-75 opacity-0 backdrop-blur-sm",
          "ease-out-quad transition-[opacity,transform] duration-200",
          "peer",
          "focus-visible:scale-100 focus-visible:opacity-100",
          "group-hover:scale-100 group-hover:opacity-100",
          "md:grid",
        )}
      >
        <span>view stack</span>
      </Link>

      <Stack
        className={cn(
          "ease-out-quad transition-opacity duration-200",
          "md:group-hover:opacity-40",
          "md:peer-focus-visible:opacity-40",
        )}
      />
    </div>
  );
}
