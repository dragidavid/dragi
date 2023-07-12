"use client";

import { useState, useEffect } from "react";

import { cn } from "lib/cn";

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

  return <span className={cn("w-[59px]")}>{date.toLocaleTimeString()}</span>;
}
