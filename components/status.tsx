"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";
import Marquee from "react-fast-marquee";
import { AnimatePresence } from "framer-motion";

const Clock = dynamic(() => import("components/clock"), {
  ssr: false,
});
import ThemeToggle from "components/theme-toggle";

import { MotionDiv } from "components/primitives/motion";

import { cn } from "lib/cn";
import { getLocation } from "lib/actions";

import { useWindowSize } from "lib/hooks/use-window-size";

export default function Status({ play = false }: { play?: boolean }) {
  const [location, setLocation] = useState<string | null>(null);

  const pathname = usePathname();

  const { isXs, isMobile, isDesktop } = useWindowSize();

  const isVertical = Boolean(isXs && pathname !== "/");

  const shouldRenderMarquee = Boolean(
    (isMobile || play || pathname === "/") && !isVertical,
  );

  const shouldAddXMargin = pathname !== "/";

  useEffect(() => {
    async function fetchLocation() {
      const location = await getLocation();

      setLocation(location as string);
    }

    fetchLocation();
  }, []);

  const content = (
    <MotionDiv
      key="status"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0 } }}
      transition={{
        duration: 0.4,
        delay: 0.8,
      }}
      className={cn(
        "flex w-full items-center py-0.5 font-mono text-2xs",
        "select-none",
        "text-secondary",
        isVertical && "py-6",
        isDesktop && "justify-between",
        isDesktop && shouldAddXMargin && "px-1",
      )}
    >
      {location ? (
        <>
          <Clock />

          <Separator />

          <span>london, united kingdom</span>

          <Separator />

          <span>{location}</span>

          <Separator />

          <ThemeToggle isVertical={isVertical} />

          <Separator hidden={(isDesktop && !play) || isVertical} />
        </>
      ) : null}
    </MotionDiv>
  );

  return (
    <AnimatePresence mode="wait">
      {shouldRenderMarquee ? (
        <Marquee speed={20} pauseOnHover>
          {content}
        </Marquee>
      ) : (
        content
      )}
    </AnimatePresence>
  );
}

function Separator({ hidden = false }: { hidden?: boolean }) {
  const pathname = usePathname();

  const { isXs } = useWindowSize();

  const shouldIncreaseYMargin = Boolean(isXs && pathname !== "/");

  if (hidden) return null;

  return (
    <div
      className={cn(
        "mx-3 size-1 rounded-full",
        "bg-accent",
        shouldIncreaseYMargin && "my-3",
      )}
      aria-hidden
    />
  );
}
