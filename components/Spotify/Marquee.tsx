import { useState, useEffect, useRef, useCallback } from "react";
import { motion, useAnimation } from "framer-motion";
import clsx from "clsx";

interface MarqueeProps {
  text?: string;
  trackUrl?: string;
  className: string;
}

export default function Marquee({ text, trackUrl, className }: MarqueeProps) {
  const [moveBy, setMoveBy] = useState<number | undefined>(undefined);
  const [isAnimationActive, setIsAnimationActive] = useState<boolean>(false);
  const [delay, setDelay] = useState<number>(3);

  const controls = useAnimation();

  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);

  const getMoveBy = () => {
    if (textRef.current && containerRef.current) {
      if (textRef.current?.offsetWidth > containerRef.current?.offsetWidth) {
        setMoveBy(
          textRef.current?.offsetWidth - containerRef.current?.clientWidth
        );
      } else {
        setMoveBy(undefined);
      }
    }
  };

  const startAnimation = useCallback(() => {
    if (!isAnimationActive && moveBy) {
      setIsAnimationActive(true);
      controls
        .start({ x: [0, -moveBy, -moveBy, 0] })
        .then(() => setIsAnimationActive(false));
    }
  }, [controls, isAnimationActive, moveBy]);

  useEffect(() => {
    window.addEventListener("resize", getMoveBy);
  }, []);

  useEffect(() => {
    if (!moveBy) {
      getMoveBy();
    }
  }, [moveBy, text]);

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
    <motion.div
      ref={containerRef}
      onClick={() => window.open(trackUrl, "_blank")}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={clsx("overflow-hidden", className)}
    >
      <motion.span
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
        style={{ textDecoration: "inherit" }}
        className="inline-flex whitespace-nowrap will-change-transform"
      >
        {text}
      </motion.span>
    </motion.div>
  );
}
