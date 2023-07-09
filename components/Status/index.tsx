"use client";

import Marquee from "react-fast-marquee";

import { cn } from "lib/cn";
import VisitorLocation from "./VisitorLocation";

export default function Status() {
  return (
    <div className={cn("relative h-full")}>
      <Marquee speed={20}>
        <div className={cn("mr-3 flex items-center gap-3")}>
          <span>18:23:12</span>
          <div className={cn("h-0.5 w-0.5 rounded-full", "bg-primary")} />
          <span>london, uk</span>
          <div className={cn("h-0.5 w-0.5 rounded-full", "bg-primary")} />
          <VisitorLocation />
          <div className={cn("h-0.5 w-0.5 rounded-full", "bg-primary")} />
        </div>
      </Marquee>
    </div>
  );
}
