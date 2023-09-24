"use client";

import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";
import Marquee from "react-fast-marquee";
import { AnimatePresence, motion } from "framer-motion";

const Clock = dynamic(() => import("components/Status/Clock"), { ssr: false });

import Theme from "components/Status/Theme";

import Separator from "components/ui/Separator";

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

  const shouldRenderMarquee = Boolean(
    (isMobile || play || pathname === "/") && !isXs,
  );

  const content = (
    <motion.div
      key="status"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0 } }}
      transition={{
        duration: 0.4,
      }}
      className={cn(
        "flex w-full text-sm",
        "text-secondary/50",
        isXs && "py-6",
        isDesktop && "justify-between px-1 py-0.5",
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
        <Theme />

        <Separator hidden={(isDesktop && !play) || isXs} />
      </div>
    </motion.div>
  );

  return (
    <AnimatePresence mode="wait">
      {shouldRenderMarquee ? <Marquee speed={10}>{content}</Marquee> : content}
    </AnimatePresence>
  );
}
