import Marquee from "react-fast-marquee";

import Clock from "components/Status/Clock";

import { cn } from "lib/cn";
import { redis } from "lib/redis";

export default async function Status() {
  return (
    <Marquee speed={15}>
      <div className={cn("flex items-center text-sm", "text-secondary/50")}>
        <Clock />

        <Separator />

        <span>london, united kingdom</span>

        <Separator />

        <LastVisitFrom />

        <Separator />
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
    <div className={cn("flex items-center")}>
      <span>{location}</span>
    </div>
  );
}

function Separator() {
  return <div className={cn("mx-5 h-1 w-1 rounded-full", "bg-secondary/50")} />;
}
