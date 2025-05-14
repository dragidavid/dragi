"use server";

import { redis } from "@/lib/redis";

export async function getLocation() {
  return await redis.get("location");
}
