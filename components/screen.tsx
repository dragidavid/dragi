"use client";

import { useEffect, useState } from "react";

import { cn } from "lib/cn";

export default function Screen() {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  if (process.env.NODE_ENV !== "development") {
    return null;
  }

  useEffect(() => {
    function updateDimensions() {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }

    updateDimensions();

    window.addEventListener("resize", updateDimensions);

    return () => {
      window.removeEventListener("resize", updateDimensions);
    };
  }, []);

  const { width, height } = dimensions;

  return (
    <div
      className={cn(
        "fixed bottom-5 left-5 z-50 flex items-center space-x-2 rounded-full px-2.5 py-1 font-mono text-sm font-medium",
        "border border-accent bg-extreme text-inverse",
      )}
    >
      <span>
        {width.toLocaleString()} x {height.toLocaleString()}
      </span>

      <div className={cn("h-4 w-px", "bg-accent")} />

      <span className="sm:hidden">XS</span>
      <span className={cn("hidden", "sm:inline", "md:hidden")}>SM</span>
      <span className={cn("hidden", "md:inline", "lg:hidden")}>MD</span>
      <span className={cn("hidden", "lg:inline", "xl:hidden")}>LG</span>
      <span className={cn("hidden", "xl:inline", "2xl:hidden")}>XL</span>
      <span className={cn("hidden", "2xl:inline")}>2XL</span>
    </div>
  );
}
