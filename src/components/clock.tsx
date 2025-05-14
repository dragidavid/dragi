"use client";

import { useState, useEffect } from "react";

function getFormattedTime() {
  return new Date().toLocaleTimeString([], {
    timeZone: "Europe/London",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
}

export default function Clock() {
  const [time, setTime] = useState(getFormattedTime());

  useEffect(() => {
    const timerId = setInterval(() => setTime(getFormattedTime()), 1000);

    return () => clearInterval(timerId);
  }, []);

  return <span className="tabular-nums">{time}</span>;
}
