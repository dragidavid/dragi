"use client";

import { useState } from "react";
import Image from "next/image";

import { cn } from "@/lib/cn";

import type { ComponentProps } from "react";

export default function BlurImage(props: ComponentProps<typeof Image>) {
  const [isLoading, setLoading] = useState(true);

  return (
    <Image
      {...props}
      alt={props.alt}
      onLoad={() => setLoading(false)}
      unoptimized
      className={cn(
        props.className,
        "duration-500 ease-in-out",
        isLoading ? "scale-105 blur-lg" : "scale-100 blur-0",
      )}
    />
  );
}
