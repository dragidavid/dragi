import Marquee from "react-fast-marquee";

import Clock from "components/Status/Clock";

import { cn } from "lib/cn";
import { redis } from "lib/redis";

export default async function Status() {
  return (
    <Marquee speed={15} delay={3}>
      <div className={cn("mr-3 flex items-center gap-3", "text-secondary")}>
        <Clock />

        <Separator />

        <span>london, united kingdom</span>

        <LastVisitFrom />
      </div>
    </Marquee>
  );
}

async function LastVisitFrom() {
  const location = (await redis.get("location")) as string;

  if (!location) {
    return null;
  }

  return (
    <div className={cn("flex items-center gap-3")}>
      <Separator />

      <span>{location}</span>

      <Separator />
    </div>
  );
}

function Separator() {
  return <div className={cn("h-1 w-1 rounded-full", "bg-secondary")} />;
}
