// import Status from "components/Status";

import { cn } from "lib/cn";
import { headers } from "next/headers";

export const runtime = "edge";

async function getLocation() {
  const headersList = headers();

  const city = headersList.get("x-vercel-ip-city");

  return {
    city: city ? city : "unknown",
  };
}

export default async function Preview() {
  const headersList = headers();

  const country = headersList.get("x-vercel-ip-country");

  const { city } = await getLocation();

  return (
    <div className={cn("relative h-full")}>
      {city}-{country}
    </div>
  );
}
