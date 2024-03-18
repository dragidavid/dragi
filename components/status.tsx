"use client";

import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";
import Marquee from "react-fast-marquee";
import { AnimatePresence } from "framer-motion";

const Clock = dynamic(() => import("components/clock"), {
  ssr: false,
});
import ThemeToggle from "components/theme-toggle";
import LastVisitFrom from "components/last-visit-from";

import { MotionDiv } from "components/primitives/motion";

import { cn } from "lib/cn";
import { useWindowSize } from "lib/hooks/useWindowSize";

export default function Status({ play = false }: { play?: boolean }) {
  const pathname = usePathname();

  const { isXs, isMobile, isDesktop } = useWindowSize();

  const shouldRenderVerticalStatus = Boolean(isXs && pathname !== "/");

  const shouldRenderMarquee = Boolean(
    (isMobile || play || pathname === "/") && !shouldRenderVerticalStatus,
  );

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
        "flex w-full py-0.5 text-xs",
        "select-none",
        "text-secondary",
        "xs:text-sm",
        shouldRenderVerticalStatus && "py-6",
        isDesktop && "justify-between px-1",
      )}
    >
      <div className={cn("flex items-center")}>
        <Clock />

        <Separator />

        {/* replace this with dynamic data */}
        <span>london, united kingdom</span>

        <Separator />

        <LastVisitFrom />

        <Separator hidden={isDesktop && !play} />
      </div>

      <div className={cn("flex items-center")}>
        <ThemeToggle />

        <Separator
          hidden={(isDesktop && !play) || shouldRenderVerticalStatus}
        />
      </div>
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
  const { isXs } = useWindowSize();

  if (hidden) return null;

  return (
    <div
      className={cn("mx-5 size-1 rounded-full", "bg-accent", isXs && "my-3")}
      aria-hidden
    />
  );
}
