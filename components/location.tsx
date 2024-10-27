"use client";

import { useState, useEffect } from "react";

import { getLocation } from "lib/actions";

export default function Location() {
  const [location, setLocation] = useState<string | null>(null);

  useEffect(() => {
    async function fetchLocation() {
      try {
        const fetchedLocation = await getLocation();

        setLocation(fetchedLocation as string);
      } catch (error) {
        console.error("Couldn't fetch last location:", error);

        setLocation("unknown");
      }
    }

    fetchLocation();
  }, []);

  if (!location) return <span>locating...</span>;

  return <span>{location}</span>;
}
