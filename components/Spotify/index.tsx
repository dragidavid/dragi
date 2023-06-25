"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import useSWR from "swr";
import { motion } from "framer-motion";

import Marquee from "components/Spotify/Marquee";
import PlaybackStatus from "components/Spotify/PlaybackStatus";

import { cn } from "lib/cn";
import { fetcher } from "lib/fetcher";
import { getColors } from "lib/utils";

import type { Color } from "lib/types";

const Scene = dynamic(() => import("components/Spotify/Scene"), { ssr: true });
const Blob = dynamic(() => import("components/Spotify/Blob"), {
  ssr: false,
});

export default function NewPlayer() {
  const [colors, setColors] = useState<undefined | Color[]>(undefined);

  const { data: nowPlaying } = useSWR("/api/spotify", fetcher, {
    refreshInterval: 90000,
    revalidateOnFocus: false,
  });

  useEffect(() => {
    if (nowPlaying && nowPlaying.currentlyPlaying && nowPlaying.albumImageUrl) {
      getColors(nowPlaying.albumImageUrl).then((res) => {
        setColors(res);
      });
    }

    if (nowPlaying && !nowPlaying.currentlyPlaying) {
      setColors(undefined);
    }
  }, [nowPlaying]);

  console.log(colors);

  return (
    <div className="relative h-full w-full overflow-hidden">
      {/* Canvas and blobs */}
      {colors && (
        <motion.div
          key={nowPlaying?.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            duration: 0.4,
            delay: 0.8,
          }}
          className={cn("absolute inset-0")}
        >
          <Scene>
            <Blob colors={colors} />
          </Scene>
        </motion.div>
      )}

      {/* Backdrop blur */}
      <div className="absolute inset-0 bg-black/20 backdrop-blur-xl" />

      {/* Noise layer */}
      <div className="absolute inset-0 bg-noise opacity-10" />

      {/* Spotify Logo and Track Information*/}
      <div className="absolute inset-0 flex flex-col justify-between">
        <div className={cn("h-16 w-16")}>
          <svg viewBox="0 0 72 72" className="fill-primary">
            <path d="M36 0C16.117 0 0 16.117 0 36s16.117 36 36 36 36-16.117 36-36C72 16.12 55.883.002 36 0Zm16.51 51.92a2.242 2.242 0 0 1-3.085.747c-8.453-5.166-19.095-6.333-31.625-3.47a2.242 2.242 0 0 1-2.688-1.688A2.24 2.24 0 0 1 16.8 44.82c13.712-3.132 25.476-1.783 34.966 4.014a2.245 2.245 0 0 1 .744 3.086Zm4.405-9.798a2.809 2.809 0 0 1-3.862.923c-9.674-5.947-24.427-7.669-35.872-4.196a2.81 2.81 0 0 1-3.503-1.869 2.812 2.812 0 0 1 1.872-3.5c13.073-3.968 29.328-2.047 40.439 4.782a2.805 2.805 0 0 1 .926 3.86Zm.378-10.21c-11.605-6.89-30.746-7.524-41.824-4.163a3.365 3.365 0 0 1-4.199-2.243 3.37 3.37 0 0 1 2.246-4.2c12.717-3.86 33.855-3.116 47.214 4.814a3.368 3.368 0 0 1-3.437 5.792Z" />
          </svg>
        </div>

        {nowPlaying ? (
          <motion.div
            key={nowPlaying?.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className={cn("flex flex-col gap-1")}
          >
            <PlaybackStatus
              currentlyPlaying={Boolean(nowPlaying?.currentlyPlaying)}
            />

            <Marquee className={cn("text-4xl font-black")}>
              <a
                href={nowPlaying?.trackUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={cn("hover:cursor-ne-resize hover:underline")}
              >
                {nowPlaying?.title}
              </a>
            </Marquee>

            <Marquee className={cn("text-md font-medium")}>
              {nowPlaying.artists.map(
                (
                  artist: { id: string; artistUrl: string; name: string },
                  i: number
                ) => (
                  <a
                    key={artist.id}
                    href={artist.artistUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cn("hover:cursor-ne-resize hover:underline")}
                  >
                    {artist.name}
                    {i !== nowPlaying.artists.length - 1 && ", "}
                  </a>
                )
              )}
            </Marquee>
          </motion.div>
        ) : null}
      </div>
    </div>
    // </AnimatePresence>
  );
}
