import { NextRequest, NextResponse } from "next/server";

import { redis } from "lib/redis";
import { getCountry } from "lib/country";

export const config = {
  matcher: "/",
};

export async function middleware(req: NextRequest) {
  const { geo } = req;

  const city = geo?.city || "San Francisco";
  const country = geo?.country || "US";

  const location = {
    city,
    country: getCountry(country),
  };

  await redis.set("location", location);

  return NextResponse.next();
}
