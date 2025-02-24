"use client";

import { usePathname } from "next/navigation";

import Clock from "components/clock";
import Location from "components/location";
import ThemeToggle from "components/theme-toggle";

import { cn } from "lib/cn";

type ItemProps = {
  position: "tl" | "tr" | "bl" | "br";
  children: React.ReactNode;
};

const positions: Record<ItemProps["position"], string> = {
  tl: "left-4 top-4",
  tr: "right-4 top-4",
  bl: "bottom-4 left-4 md:visible invisible",
  br: "bottom-4 right-4 md:visible invisible",
};

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
      <Item position="tl">
        <Clock />
      </Item>

      <Item position="tr">
        <ThemeToggle />
      </Item>

      <Item position="bl">
        <Location />
      </Item>

      <Item position="br">something else comes here</Item>
    </div>
  );
}

function Item({ position, children }: ItemProps) {
  return (
    <div
      className={cn(
        "fixed duration-200 animate-in fade-in",
        positions[position],
      )}
    >
      {children}
    </div>
  );
}
