import { useState, useEffect, useRef } from "react";
import { motion, useAnimation } from "framer-motion";

type TrackInformationProps = {
  text?: string;
  className?: string;
};

const TrackInformation = ({ text, className }: TrackInformationProps) => {
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

  useEffect(() => {
    window.addEventListener("resize", getMoveBy);
  }, []);

  useEffect(() => {
    getMoveBy();
  }, [text]);

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
    <div className={`overflow-hidden ${className}`} ref={containerRef}>
      <motion.span
        animate={controls}
        transition={{
          duration: (moveBy! / 50) * 3,
          times: [0, 0.45, 0.55, 1],
          delay: delay,
          ease: "linear",
        }}
        className="inline-flex whitespace-nowrap"
        onHoverStart={() => {
          if (!isAnimationActive && moveBy) {
            setIsAnimationActive(true);
            controls
              .start({ x: [0, -moveBy, -moveBy, 0] })
              .then(() => setIsAnimationActive(false));
          }
        }}
        ref={textRef}
      >
        {text}
      </motion.span>
    </div>
  );
};

export default TrackInformation;
