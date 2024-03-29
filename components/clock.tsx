"use client";

import { useState, useEffect } from "react";

export default function Clock() {
  const [date, setDate] = useState(new Date());

  function refreshClock() {
    setDate(new Date());
  }

  useEffect(() => {
    const timerId = setInterval(refreshClock, 1000);

    return () => {
      clearInterval(timerId);
    };
  }, []);

  return (
    <span className="tabular-nums">
      {date.toLocaleTimeString([], {
        timeZone: "Europe/London",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      })}
    </span>
  );
}
