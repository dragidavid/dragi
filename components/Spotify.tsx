import { useState, useEffect } from "react";
import useSWR from "swr";
import { usePalette } from "react-palette";
import { motion, AnimatePresence } from "framer-motion";

import fetcher from "lib/fetcher";
import { randomNumber, randomArray } from "lib/utils";

export default function Spotify() {
  const { data } = useSWR("/api/spotify/now-playing", fetcher);

  // TODO make sure that we're only fetching the palette when there is data from the Spotify API
  const {
    data: palette,
    loading: paletteLoading,
    error: paletteError,
  } = usePalette(data ? data.albumImageUrl : "");

  return (
    <div className="h-full rounded-3xl bg-white dark:bg-gray-900">
      {palette && data && data.isPlaying && (
        <AnimatePresence exitBeforeEnter>
          {Object.values(palette)
            .slice(0, 3)
            .map((color: any, index: number) => (
              <motion.div
                key={color}
                className="absolute rounded-full mix-blend-multiply blur-xl filter dark:mix-blend-normal"
                // TODO Calculate the left/top/width/height values better
                style={{
                  backgroundColor: color,
                  left: `${randomNumber(0, 30)}%`,
                  top: `${randomNumber(0, 41)}%`,
                  height: `${randomNumber(17, 21)}rem`,
                  width: `${randomNumber(17, 21)}rem`,
                  borderRadius: `${randomNumber(70, 100)}% ${randomNumber(
                    70,
                    100
                  )}% ${randomNumber(70, 100)}% ${randomNumber(70, 100)}%`,
                }}
                initial={{ opacity: 0 }}
                exit={{ opacity: 0, transition: { duration: 2 } }}
                // ⬇️ Ensure that we animate from the starting scale/position and we end on starting scale/position to avoid blobs jumping around ⬇️
                animate={{
                  opacity: 0.6,
                  x: [0, ...randomArray(4, -111, 111), 0],
                  y: [0, ...randomArray(4, -111, 111), 0],
                  scale: [1, ...randomArray(5, 0.72, 1.42, true), 1],
                  rotate: 360,
                }}
                transition={{
                  opacity: { duration: 2 },
                  default: {
                    ease: "easeInOut",
                    duration: 10,
                    repeat: Infinity,
                  },
                }}
              ></motion.div>
            ))}
        </AnimatePresence>
      )}
    </div>
  );
}
