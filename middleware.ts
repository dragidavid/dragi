import { NextRequest, NextResponse } from "next/server";

import { redis } from "lib/redis";
import { getCountry } from "lib/country";

export const config = {
  matcher: "/",
};

export async function middleware(req: NextRequest) {
  const { geo } = req;

  const city = geo?.city || "localhost";
  const country = geo?.country || "3000";

  const location = {
    city,
    country: getCountry(country),
  };

  await redis.set(
    "location",
    `last visit from ${location.city.toLowerCase()}, ${location.country.toLowerCase()}`
  );

  return NextResponse.next();
}
