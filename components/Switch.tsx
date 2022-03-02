import { useState, useEffect, useRef } from "react";
import { useTheme } from "next-themes";
import { motion, AnimatePresence } from "framer-motion";
import { SunIcon, MoonIcon } from "@heroicons/react/outline";

const Switch = () => {
  const [mounted, setMounted] = useState<boolean>(false);
  const [animationBoundary, setAnimationBoundary] = useState<
    number | undefined
  >(undefined);

  const { theme, setTheme } = useTheme();

  useEffect(() => setMounted(true), []);

  const containerRef = useRef<HTMLDivElement>(null);

  const getBoundary = () => {
    if (containerRef.current) {
      setAnimationBoundary(containerRef.current.offsetWidth);
    }
  };

  useEffect(() => {
    window.addEventListener("resize", getBoundary);
  }, []);

  useEffect(() => {
    if (!animationBoundary) {
      getBoundary();
    }
  }, [animationBoundary]);

  return (
    <div
      className="grid-tile flex items-center justify-center"
      ref={containerRef}
    >
      <div
        className={`mt-10 h-[30%] w-[50%] rounded-[50%_50%_50%_50%_/_30%_30%_70%_70%] bg-gradient-to-b ${
          theme === "dark"
            ? "from-cyan-700 via-indigo-700 to-purple-700"
            : "from-yellow-100 via-amber-200 to-orange-200"
        } blur-xl`}
      />

      <AnimatePresence initial={false} exitBeforeEnter>
        {animationBoundary && (
          <motion.div
            key={theme === "dark" ? "dark" : "light"}
            className="absolute inset-x-0 inset-y-[35%] h-16 w-16 stroke-purple-600 will-change-transform md:h-20 md:w-20 xl:h-24 xl:w-24"
            style={{
              offsetPath: `path('M -10 120 Q ${animationBoundary / 2} -60 ${
                animationBoundary + 10
              } 120')`,
            }}
            initial={{ opacity: 0, offsetDistance: "0%" }}
            animate={{ opacity: 1, offsetDistance: "50%" }}
            exit={{ opacity: 0, offsetDistance: "100%" }}
            transition={{
              duration: 0.5,
              ease: "easeInOut",
            }}
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          >
            {mounted && theme === "dark" ? <MoonIcon /> : <SunIcon />}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Switch;
