import { useState, useEffect, useRef, useCallback } from "react";
import { useAnimation } from "framer-motion";
import * as motion from "framer-motion/client";

import { MotionDiv } from "components/primitives/motion";

import { cn } from "lib/cn";

export default function Marquee({
  children,
  className,
}: React.HTMLAttributes<HTMLDivElement>) {
  const [moveBy, setMoveBy] = useState<number | undefined>(undefined);
  const [isAnimationActive, setIsAnimationActive] = useState(false);
  const [delay, setDelay] = useState(3);

  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  const controls = useAnimation();

  const getMoveBy = useCallback(() => {
    if (textRef.current && containerRef.current) {
      const newMoveBy =
        textRef.current.offsetWidth - containerRef.current.clientWidth;

      if (newMoveBy > 0) {
        setMoveBy(newMoveBy);
      } else {
        setMoveBy(undefined);
      }
    }
  }, []);

  const startAnimation = useCallback(() => {
    if (!isAnimationActive && moveBy) {
      setIsAnimationActive(true);

      controls
        .start({ x: [0, -moveBy, -moveBy, 0] })
        .then(() => setIsAnimationActive(false));
    }
  }, [controls, isAnimationActive, moveBy]);

  useEffect(() => {
    getMoveBy();

    window.addEventListener("resize", getMoveBy);

    return () => {
      window.removeEventListener("resize", getMoveBy);
      controls.stop();
    };
  }, [getMoveBy, controls]);

  useEffect(() => {
    if (moveBy) {
      controls.set({ x: 0 });
      setIsAnimationActive(true);

      controls.start({ x: [0, -moveBy, -moveBy, 0] }).then(() => {
        setIsAnimationActive(false);
        setDelay(0);
      });
    }
  }, [moveBy, controls]);

  const duration = moveBy ? (moveBy / 50) * 3 : 0;

  return (
    <motion.div
      ref={containerRef}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={className}
      aria-live="off"
      aria-atomic="true"
    >
      <motion.div
        ref={textRef}
        animate={controls}
        transition={{
          duration,
          times: [0, 0.45, 0.55, 1],
          delay,
          ease: "linear",
        }}
        onHoverStart={startAnimation}
        onTap={startAnimation}
        className={cn("w-max whitespace-nowrap")}
        tabIndex={-1}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}
