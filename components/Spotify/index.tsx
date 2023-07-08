"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";
import useSWR from "swr";
import { useAtom } from "jotai";
import { atomWithStorage } from "jotai/utils";
import { AnimatePresence, motion } from "framer-motion";

import Artists from "components/Spotify/Artists";
import PlaybackStatus from "components/Spotify/PlaybackStatus";

import Marquee from "components/ui/Marquee";
import {
  ContextMenu,
  ContextMenuTrigger,
  ContextMenuContent,
  ContextMenuLabel,
  ContextMenuSeparator,
  ContextMenuCheckboxItem,
} from "components/ui/primitives/ContextMenu";

import { cn } from "lib/cn";
import { fetcher } from "lib/fetcher";
import { getColors } from "lib/utils";

const Scene = dynamic(() => import("components/Spotify/Scene"), { ssr: false });
const Blob = dynamic(() => import("components/Spotify/Blob"), {
  ssr: false,
});

const blurAtom = atomWithStorage("showBlur", true);
const noiseAtom = atomWithStorage("showNoise", true);
const albumImageAtom = atomWithStorage("showAlbumImage", false);

export default function Spotify() {
  const [colors, setColors] = useState<
    undefined | { name: string; hex: string }[]
  >(undefined);

  const { data: track } = useSWR("/api/spotify/track", fetcher, {
    refreshInterval: 90000,
    revalidateOnFocus: false,
  });

  useEffect(() => {
    if (track && track.currentlyPlaying && track.album.image) {
      getColors(track.album.image).then((res) => {
        setColors(res);
      });
    }

    if (track && !track.currentlyPlaying) {
      setColors(undefined);
    }
  }, [track]);

  return (
    <ContextMenu>
      <ContextMenuTrigger>
        <div
          className={cn(
            "relative h-full min-h-[calc(var(--container-size)*2/3)] w-full overflow-hidden",
            "select-none"
          )}
        >
          {colors && (
            <motion.div
              key={track?.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{
                duration: 0.4,
                delay: 0.8,
              }}
              className={cn(
                "absolute inset-0",
                "pointer-events-none select-none"
              )}
            >
              <Scene>
                <Blob colors={colors} />
              </Scene>
            </motion.div>
          )}

          <BlurLayer />

          <NoiseLayer />

          <SmallFade />

          <AlbumImage albumImage={track?.album.image} />

          <div className={cn("absolute inset-2 flex flex-col justify-between")}>
            <Logo />

            {track ? (
              <motion.div
                key={track.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{
                  duration: 0.2,
                }}
                className={cn("relative flex flex-col gap-1")}
              >
                <PlaybackStatus
                  currentlyPlaying={Boolean(track.currentlyPlaying)}
                />

                <Marquee className={cn("text-4xl font-black")}>
                  <a
                    href={track.trackUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cn("hover:cursor-ne-resize hover:underline")}
                  >
                    {track.name}
                  </a>
                </Marquee>

                <Marquee className={cn("text-md font-medium")}>
                  <Artists artists={track.artists} />
                </Marquee>
              </motion.div>
            ) : null}
          </div>
        </div>
      </ContextMenuTrigger>

      <Content />
    </ContextMenu>
  );
}

// TODO - REMOVE THE LINE ON THE BOTTOM ON MOBILE AND ALSO REMOVE THE JOINTS

function Logo() {
  return (
    <div className={cn("h-[72px] w-[72px]", "pointer-events-none select-none")}>
      <svg viewBox="0 0 72 72">
        <path
          d="M36 0C16.117 0 0 16.117 0 36s16.117 36 36 36 36-16.117 36-36C72 16.12 55.883.002 36 0Zm16.51 51.92a2.242 2.242 0 0 1-3.085.747c-8.453-5.166-19.095-6.333-31.625-3.47a2.242 2.242 0 0 1-2.688-1.688A2.24 2.24 0 0 1 16.8 44.82c13.712-3.132 25.476-1.783 34.966 4.014a2.245 2.245 0 0 1 .744 3.086Zm4.405-9.798a2.809 2.809 0 0 1-3.862.923c-9.674-5.947-24.427-7.669-35.872-4.196a2.81 2.81 0 0 1-3.503-1.869 2.812 2.812 0 0 1 1.872-3.5c13.073-3.968 29.328-2.047 40.439 4.782a2.805 2.805 0 0 1 .926 3.86Zm.378-10.21c-11.605-6.89-30.746-7.524-41.824-4.163a3.365 3.365 0 0 1-4.199-2.243 3.37 3.37 0 0 1 2.246-4.2c12.717-3.86 33.855-3.116 47.214 4.814a3.368 3.368 0 0 1-3.437 5.792Z"
          fill="currentColor"
        />
      </svg>
    </div>
  );
}

function BlurLayer() {
  const [showBlur] = useAtom(blurAtom);

  return (
    <AnimatePresence mode="wait">
      {showBlur ? (
        <motion.div
          key="blur"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{
            duration: 0.2,
          }}
          className={cn(
            "absolute inset-0",
            "pointer-events-none select-none",
            "bg-black/20 backdrop-blur-xl"
          )}
        />
      ) : null}
    </AnimatePresence>
  );
}

function NoiseLayer() {
  const [showNoise] = useAtom(noiseAtom);

  return (
    <AnimatePresence mode="wait">
      {showNoise ? (
        <motion.div
          key="noise"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.4 }}
          exit={{ opacity: 0 }}
          transition={{
            duration: 0.2,
          }}
          className={cn("absolute inset-0", "pointer-events-none select-none")}
        >
          <svg id="noice" className={cn("h-full w-full")}>
            <filter id="noise-filter">
              <feTurbulence
                type="fractalNoise"
                baseFrequency="1.08"
                numOctaves="4"
                stitchTiles="stitch"
              ></feTurbulence>
              <feColorMatrix type="saturate" values="0"></feColorMatrix>
              <feComponentTransfer>
                <feFuncR type="linear" slope="0.4"></feFuncR>
                <feFuncG type="linear" slope="0.4"></feFuncG>
                <feFuncB type="linear" slope="0.4"></feFuncB>
                <feFuncA type="linear" slope="0.52"></feFuncA>
              </feComponentTransfer>
              <feComponentTransfer>
                <feFuncR type="linear" slope="1.56" intercept="-0.28" />
                <feFuncG type="linear" slope="1.56" intercept="-0.28" />
                <feFuncB type="linear" slope="1.56" intercept="-0.28" />
              </feComponentTransfer>
            </filter>
            <rect width="100%" height="100%" filter="url(#noise-filter)"></rect>
          </svg>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

function SmallFade() {
  return (
    <div
      className={cn(
        "absolute bottom-0 left-0 right-0 h-1/2",
        "pointer-events-none select-none",
        "bg-gradient-to-b from-transparent via-almost-black/50 to-almost-black"
      )}
    />
  );
}

function AlbumImage({ albumImage }: { albumImage?: string }) {
  const [showAlbumImage] = useAtom(albumImageAtom);

  return (
    <AnimatePresence mode="wait">
      {albumImage && showAlbumImage ? (
        <motion.div
          key="album-image"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.2 } }}
          transition={{
            duration: 0.4,
          }}
          className={cn(
            "absolute left-1/2 top-1/2 h-[178px] w-[178px]",
            "pointer-events-none select-none",
            "shadow-lg shadow-almost-black/50",
            "-translate-x-1/2 -translate-y-1/2"
          )}
        >
          <Image src={albumImage} fill alt="album-image" />
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

function Content() {
  const [showBlur, setShowBlur] = useAtom(blurAtom);
  const [showNoise, setShowNoise] = useAtom(noiseAtom);
  const [showAlbumImage, setShowAlbumImage] = useAtom(albumImageAtom);

  return (
    <ContextMenuContent className="w-64">
      <ContextMenuLabel>Appearance</ContextMenuLabel>
      <ContextMenuSeparator />
      <ContextMenuCheckboxItem
        checked={showAlbumImage}
        onCheckedChange={() => setShowAlbumImage(!showAlbumImage)}
      >
        Show album image
      </ContextMenuCheckboxItem>
      <ContextMenuCheckboxItem
        checked={showBlur}
        onCheckedChange={() => setShowBlur(!showBlur)}
      >
        Show blur
      </ContextMenuCheckboxItem>
      <ContextMenuCheckboxItem
        checked={showNoise}
        onCheckedChange={() => setShowNoise(!showNoise)}
      >
        Show noise
      </ContextMenuCheckboxItem>
    </ContextMenuContent>
  );
}
