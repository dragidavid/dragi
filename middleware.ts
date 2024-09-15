import { type NextRequest, NextResponse } from "next/server";
import { Redis } from "@upstash/redis";

import { getCountry } from "lib/country";

export const config = {
  matcher: "/",
};

const redis = Redis.fromEnv();

export async function middleware(req: NextRequest) {
  const { geo } = req;

  const currentLocation = {
    city: geo?.city || "localhost",
    country: geo?.country ? getCountry(geo.country) : "3000",
  };

  await redis.set(
    "location",
    `last visit from ${currentLocation.city}, ${currentLocation.country}`,
  );

  const response = NextResponse.next();

  return response;
}
