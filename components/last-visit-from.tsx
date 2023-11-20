"use client";

import { useState, useEffect } from "react";

import { cn } from "lib/cn";
import { getLocation } from "lib/actions";

export default function LastVisitFrom() {
  const [location, setLocation] = useState<string | null>(null);

  useEffect(() => {
    async function fetchLocation() {
      const location = await getLocation();

      setLocation(location as string);
    }

    fetchLocation();
  }, []);

  if (!location) {
    return null;
  }

  return (
    <div className={cn("flex items-center")}>
      <span>{location}</span>
    </div>
  );
}
