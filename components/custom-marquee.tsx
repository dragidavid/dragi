import { useState, useEffect, useRef, useCallback } from "react";
import { useAnimation } from "framer-motion";

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

      if (newMoveBy !== moveBy && newMoveBy > 0) {
        setMoveBy(newMoveBy);
      } else {
        setMoveBy(undefined);
      }
    }
  }, [moveBy]);

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
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    controls.set({ x: 0 });

    if (moveBy) {
      setIsAnimationActive(true);

      controls.start({ x: [0, -moveBy, -moveBy, 0] }).then(() => {
        setIsAnimationActive(false);

        setDelay(0);
      });
    }
  }, [moveBy, controls]);

  return (
    <MotionDiv
      ref={containerRef}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={className}
    >
      <MotionDiv
        ref={textRef}
        animate={controls}
        transition={{
          duration: (moveBy! / 50) * 3,
          times: [0, 0.45, 0.55, 1],
          delay: delay,
          ease: "linear",
        }}
        onHoverStart={startAnimation}
        onTap={startAnimation}
        className={cn("w-max whitespace-nowrap", "will-change-transform")}
        tabIndex={-1}
      >
        {children}
      </MotionDiv>
    </MotionDiv>
  );
}
