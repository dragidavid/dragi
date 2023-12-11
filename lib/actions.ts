"use server";

import { Redis } from "@upstash/redis";

const redis = Redis.fromEnv();

export async function getLocation() {
  return await redis.get("location");
}
