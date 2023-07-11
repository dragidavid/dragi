// "use client";

import Marquee from "react-fast-marquee";

import Clock from "components/Status/Clock";

import { cn } from "lib/cn";
import { redis } from "lib/redis";

export default async function Status() {
  const location = (await redis.get("location")) as {
    city: string;
    country: string;
  };

  return (
    <Marquee speed={20} delay={3}>
      <div
        className={cn("mr-3 flex items-center gap-3 font-mono", "select-none")}
      >
        <Clock />

        <div className={cn("h-1 w-1 rounded-full", "bg-primary")} />

        <span>london, united kingdom</span>

        {location && (
          <>
            <div className={cn("h-1 w-1 rounded-full", "bg-primary")} />

            <span>
              last visit from {location.city.toLowerCase()},{" "}
              {location.country.toLowerCase()}
            </span>

            <div className={cn("h-1 w-1 rounded-full", "bg-primary")} />
          </>
        )}
      </div>
    </Marquee>
  );
}
