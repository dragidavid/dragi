import { useState, useEffect, useRef, useCallback } from "react";
import { motion, useAnimation } from "framer-motion";
import clsx from "clsx";

import SeparatedList from "components/Spotify/SeparatedList";

import type { Artist } from "lib/types";

interface MarqueeProps {
  type: "trackTitle" | "artists";
  trackTitle?: string;
  trackUrl?: string;
  artists?: Artist[];
  className: string;
}

export default function Marquee({
  type,
  trackTitle,
  trackUrl,
  artists,
  className,
}: MarqueeProps) {
  const [moveBy, setMoveBy] = useState<number | undefined>(undefined);
  const [isAnimationActive, setIsAnimationActive] = useState<boolean>(false);
  const [delay, setDelay] = useState<number>(3);

  const controls = useAnimation();

  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

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
    getMoveBy();
  }, [moveBy, trackTitle, artists]);

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

  const render: {
    [key in typeof type]: JSX.Element;
  } = {
    trackTitle: (
      <a
        href={trackUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="hover:cursor-ne-resize hover:underline"
      >
        {trackTitle}
      </a>
    ),
    artists: (
      <SeparatedList
        items={artists}
        render={(artist: Artist) => (
          <a
            key={artist.id}
            href={artist.artistUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:cursor-ne-resize hover:underline"
          >
            {artist.name}
          </a>
        )}
      />
    ),
  };

  return (
    <motion.div
      ref={containerRef}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={clsx("overflow-hidden", className)}
    >
      <motion.div
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
        className="w-max whitespace-nowrap will-change-transform"
      >
        {render[type]}
      </motion.div>
    </motion.div>
  );
}
