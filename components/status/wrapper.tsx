"use client";

import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";
import Marquee from "react-fast-marquee";
import { AnimatePresence, motion } from "framer-motion";

const Clock = dynamic(() => import("components/status/clock"), {
  ssr: false,
});
import ThemeToggle from "components/status/theme-toggle";

import { cn } from "lib/cn";
import { useWindowSize } from "lib/hooks/useWindowSize";

export default function Wrapper({
  children,
  play = false,
}: {
  children: React.ReactNode;
  play?: boolean;
}) {
  const pathname = usePathname();

  const { isXs, isMobile, isDesktop } = useWindowSize();

  const shouldRenderVerticalStatus = Boolean(isXs && pathname !== "/");

  const shouldRenderMarquee = Boolean(
    (isMobile || play || pathname === "/") && !shouldRenderVerticalStatus,
  );

  const content = (
    <motion.div
      key="status"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0 } }}
      transition={{
        duration: 0.4,
        delay: 0.4,
      }}
      className={cn(
        "flex w-full py-0.5 text-sm",
        "text-secondary",
        shouldRenderVerticalStatus && "py-6",
        isDesktop && "justify-between px-1",
      )}
    >
      <div className={cn("flex items-center")}>
        <Clock />

        <Separator />

        <span>london, united kingdom</span>

        <Separator />

        {children}

        <Separator hidden={isDesktop && !play} />
      </div>

      <div className={cn("flex items-center")}>
        <ThemeToggle vertical={shouldRenderVerticalStatus} />

        <Separator
          hidden={(isDesktop && !play) || shouldRenderVerticalStatus}
        />
      </div>
    </motion.div>
  );

  return (
    <AnimatePresence mode="wait">
      {shouldRenderMarquee ? (
        <Marquee pauseOnHover speed={20}>
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
      className={cn(
        "mx-5 h-1 w-1 rounded-full",
        "bg-secondary/40",
        isXs && "my-3",
      )}
    />
  );
}
