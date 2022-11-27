import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import clsx from "clsx";
import { usePathname } from "next/navigation";
import { motion, LayoutGroup, AnimatePresence } from "framer-motion";

import { useTabs } from "lib/useTabs";

import { cages } from "lib/cages";

export default function Navigation() {
  const pathname = usePathname();

  const navRef = useRef<HTMLDivElement>(null);
  const [buttonRefs, setButtonRefs] = useState<Array<HTMLButtonElement | null>>(
    []
  );
  const [hoveredTabIndex, setHoveredTabIndex] = useState<number | null>(null);
  const [hookProps] = useState({
    tabs: cages,
    initialTabId: pathname?.slice(1) || "home",
  });

  const {
    tabProps: { tabs, selectedTabIndex, setSelectedTab },
  } = useTabs(hookProps);
  const navRect = navRef.current?.getBoundingClientRect();
  const selectedRect = buttonRefs[selectedTabIndex]?.getBoundingClientRect();
  const hoveredRect =
    buttonRefs[hoveredTabIndex ?? -1]?.getBoundingClientRect();

  useEffect(() => {
    setButtonRefs((prev) => prev.slice(0, tabs.length));
  }, [tabs.length]);

  return (
    <motion.nav
      ref={navRef}
      exit={{ opacity: 0 }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="relative z-0 flex w-full py-2 font-header text-sm font-medium text-[#888]"
      onPointerLeave={() => setHoveredTabIndex(null)}
    >
      <LayoutGroup id="tabs">
        {tabs.map((item, index) => (
          <motion.button
            key={index}
            ref={(el) => (buttonRefs[index] = el)}
            onPointerEnter={() => {
              setHoveredTabIndex(index);
            }}
            onFocus={() => {
              setHoveredTabIndex(index);
            }}
            onClick={() => {
              setSelectedTab([index, index > selectedTabIndex ? 1 : -1]);
            }}
            className={clsx(
              "relative z-20 h-10 w-[calc(100%/7)] transition-colors duration-200",
              {
                "text-[#f5f5f5]":
                  hoveredTabIndex === index || selectedTabIndex === index,
              }
            )}
          >
            <Link
              href={item.href}
              className="flex h-full w-full items-center justify-center"
            >
              {item.navigationLabel}
            </Link>
          </motion.button>
        ))}

        <AnimatePresence>
          {hoveredRect && navRect && (
            <motion.div
              key="hover"
              className="absolute top-0 left-0 z-10 rounded-md bg-[#333]"
              initial={{
                x: hoveredRect.left - navRect.left,
                y: hoveredRect.top - navRect.top,
                width: hoveredRect.width,
                height: hoveredRect.height,
                opacity: 0,
              }}
              animate={{
                x: hoveredRect.left - navRect.left,
                y: hoveredRect.top - navRect.top,
                width: hoveredRect.width,
                height: hoveredRect.height,
                opacity: 1,
              }}
              exit={{
                x: hoveredRect.left - navRect.left,
                y: hoveredRect.top - navRect.top,
                width: hoveredRect.width,
                height: hoveredRect.height,
                opacity: 0,
              }}
              transition={{
                type: "tween",
                ease: "easeOut",
                duration: 0.15,
              }}
            />
          )}
        </AnimatePresence>

        {selectedRect && navRect && (
          <motion.div
            className={
              "absolute bottom-0 left-0 z-10 h-[2px] rounded-full bg-[#f5f5f5]"
            }
            initial={false}
            animate={{
              width: selectedRect.width * 0.8,
              x: `calc(${selectedRect.left - navRect.left}px + 10%)`,
              opacity: 1,
            }}
            transition={{
              type: "tween",
              ease: "easeOut",
              duration: 0.15,
            }}
          />
        )}
      </LayoutGroup>
    </motion.nav>
  );
}
