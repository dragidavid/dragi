import Clock from "components/clock";
import Location from "components/location";
import ThemeToggle from "components/theme-toggle";

import { MotionDiv } from "components/primitives/motion";

import { cn } from "lib/cn";

export default function Status() {
  return (
    <MotionDiv
      key="status"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2, delay: 0.4 }}
      className={cn(
        "flex min-w-max items-center justify-between gap-3 py-6 font-mono text-2xs",
        "select-none",
        "text-secondary",
        "xs:text-xs",
      )}
    >
      <Clock />

      <Separator />

      <span>london, united kingdom</span>

      <Separator />

      <Location />

      <Separator />

      <ThemeToggle />
    </MotionDiv>
  );
}

function Separator() {
  return <div className={cn("size-1 rounded-full", "bg-accent")} aria-hidden />;
}
