// TODO USE KV

import { cn } from "lib/cn";
import { redis } from "lib/redis";

export default async function LastVisitFrom() {
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
