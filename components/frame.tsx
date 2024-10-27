"use client";

import { usePathname } from "next/navigation";

import Clock from "components/clock";
import Location from "components/location";
import ThemeToggle from "components/theme-toggle";

import { cn } from "lib/cn";

export default function Frame() {
  const pathname = usePathname();

  return (
    <div
      className={cn(
        "fixed z-10 font-mono text-xs",
        "select-none",
        "text-secondary",
        pathname !== "/" && "hidden xs:block",
      )}
    >
      {/* <Status /> */}
      <div className={cn("fixed left-4 top-4")}>
        <Clock />
      </div>

      <div className={cn("fixed right-4 top-4")}>
        <ThemeToggle />
      </div>

      <div className={cn("invisible fixed bottom-4 left-4", "md:visible")}>
        {/* TODO: Add location 👀 */}
        <span>london, united kingdom</span>
      </div>

      <div className={cn("invisible fixed bottom-4 right-4", "md:visible")}>
        <Location />
      </div>
    </div>
  );
}
