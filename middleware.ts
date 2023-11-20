import { type NextRequest, NextResponse } from "next/server";

import { redis } from "lib/redis";
import { getCountry } from "lib/country";

export const config = {
  matcher: "/",
};

export async function middleware(req: NextRequest) {
  const { geo } = req;

  const currentLocation = {
    city: geo?.city || "localhost",
    country: geo?.country ? getCountry(geo.country) : "3000",
  };

  await redis.set(
    "location",
    `last visit from ${currentLocation.city.toLowerCase()}, ${currentLocation.country.toLowerCase()}`,
  );

  const response = NextResponse.next();

  return response;
}
