"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";
import useSWR from "swr";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { AnimatePresence } from "framer-motion";

import Artists from "components/spotify/artists";

import Marquee from "components/custom-marquee";
import StyledLink from "components/styled-link";

import {
  ContextMenu,
  ContextMenuTrigger,
  ContextMenuContent as ContextMenuContentPrimitive,
  ContextMenuLabel,
  ContextMenuSeparator,
  ContextMenuCheckboxItem,
} from "components/primitives/context-menu";
import { MotionDiv } from "components/primitives/motion";

import Icon from "components/ui/icon";

import { cn } from "lib/cn";
import { colors } from "lib/colors";
import { fetcher } from "lib/fetcher";
import {
  glassAtom,
  blurAtom,
  noiseAtom,
  albumImageAtom,
  playerTrackAtom,
} from "lib/atoms";

import { type Track, type Color } from "lib/types";

const Scene = dynamic(() => import("components/three/scene"), {
  ssr: false,
});
const SimpleBlobs = dynamic(() => import("components/three/simple-blobs"), {
  ssr: false,
});

export default function Player({ preview = false }: { preview?: boolean }) {
  const [localColors, setLocalColors] = useState<Color[] | undefined>(
    undefined,
  );

  const setPlayerTrack = useSetAtom(playerTrackAtom);

  const { data: track, error: trackError } = useSWR<Track>(
    "/api/spotify/player",
    fetcher,
    {
      refreshInterval: 90000,
      revalidateOnFocus: false,
      errorRetryCount: 2,
      onSuccess: (data) => {
        setPlayerTrack(data);
      },
    },
  );

  useEffect(() => {
    if (track && track.currentlyPlaying && track.album.image) {
      colors(track.album.image).then((res) => {
        setLocalColors(res);
      });
    }

    if (track && !track.currentlyPlaying) {
      setLocalColors(undefined);
    }
  }, [track]);

  return (
    <ContextMenu>
      <ContextMenuTrigger disabled={trackError}>
        <div
          className={cn(
            "relative h-full min-h-[calc(var(--container-size)*2/3)] w-full overflow-hidden",
          )}
        >
          {localColors && (
            <MotionDiv
              key={track?.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{
                duration: 0.4,
                delay: 0.8,
              }}
              className={cn("absolute inset-0", "pointer-events-none")}
            >
              <Scene>
                <SimpleBlobs colors={localColors} />
              </Scene>
            </MotionDiv>
          )}
          <BlurLayer />

          <GlassLayer />

          <NoiseLayer hasError={Boolean(trackError)} />

          <SmallFade />

          <AlbumImage albumImage={track?.album.image} />

          <div
            className={cn(
              "absolute inset-6 z-10 flex flex-col justify-between",
              preview && "inset-4",
              (trackError || !track) && "text-secondary/20",
            )}
          >
            <Icon
              name="spotify-logo"
              size="80"
              className={cn(
                "transition-opacity duration-200 ease-in-out",
                "-translate-x-1.5 -translate-y-1.5",
                track ? "opacity-100" : "opacity-0",
              )}
            />

            {trackError ? (
              <div className={cn("text-sm")}>
                <p>Something went wrong...</p>
              </div>
            ) : track ? (
              <MotionDiv
                key={track.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{
                  duration: 0.4,
                }}
                className={cn("relative flex flex-col gap-1")}
              >
                <div
                  className={cn(
                    "mb-3 flex items-center gap-2 text-xs font-black",
                  )}
                >
                  {track.currentlyPlaying ? (
                    <span>now playing</span>
                  ) : (
                    <span>last played</span>
                  )}

                  <Icon
                    name="player"
                    className={cn(track.currentlyPlaying && "animate-spin")}
                    aria-hidden
                  />
                </div>

                <Marquee className={cn("text-3xl font-black")}>
                  <StyledLink href={track.trackUrl}>{track.name}</StyledLink>
                </Marquee>

                <Marquee className={cn("text-sm font-medium")}>
                  <Artists artists={track.artists} />
                </Marquee>
              </MotionDiv>
            ) : null}
          </div>
        </div>
      </ContextMenuTrigger>

      <ContextMenuContent />
    </ContextMenu>
  );
}

function GlassLayer() {
  const showGlass = useAtomValue(glassAtom);

  return (
    <AnimatePresence mode="wait">
      {showGlass ? (
        <MotionDiv
          key="blur"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{
            duration: 0.2,
          }}
          className={cn(
            "absolute inset-0 z-10",
            "pointer-events-none",
            "mix-blend-overlay backdrop-blur-xl [background-image:repeating-linear-gradient(90deg,rgba(255,255,255,0.12),rgba(0,0,0,0.14)_9.5%,rgba(255,255,255,0.17)_12%)]",
          )}
        />
      ) : null}
    </AnimatePresence>
  );
}

function BlurLayer() {
  const showBlur = useAtomValue(blurAtom);

  return (
    <AnimatePresence mode="wait">
      {showBlur ? (
        <MotionDiv
          key="blur"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{
            duration: 0.2,
          }}
          className={cn(
            "absolute inset-0 z-10",
            "pointer-events-none",
            "bg-background/20 backdrop-blur-xl",
          )}
        />
      ) : null}
    </AnimatePresence>
  );
}

function NoiseLayer({ hasError = false }: { hasError?: boolean }) {
  const [showNoise, setShowNoise] = useAtom(noiseAtom);

  if (hasError) {
    setShowNoise(true);
  }

  return (
    <AnimatePresence mode="wait">
      {showNoise ? (
        <MotionDiv
          key="noise"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.4 }}
          exit={{ opacity: 0 }}
          transition={{
            duration: 0.2,
          }}
          className={cn("absolute inset-0 z-10", "pointer-events-none")}
        >
          <svg id="noice" height="100%" width="100%">
            <filter id="noise-filter">
              <feTurbulence
                type="fractalNoise"
                baseFrequency="1.08"
                numOctaves="4"
                stitchTiles="stitch"
              ></feTurbulence>
              <feColorMatrix type="saturate" values="0"></feColorMatrix>
              <feComponentTransfer>
                <feFuncR type="linear" slope="0.5"></feFuncR>
                <feFuncG type="linear" slope="0.5"></feFuncG>
                <feFuncB type="linear" slope="0.5"></feFuncB>
                <feFuncA type="linear" slope="0.52"></feFuncA>
              </feComponentTransfer>
              <feComponentTransfer>
                <feFuncR type="linear" slope="1.56" intercept="-0.28" />
                <feFuncG type="linear" slope="1.56" intercept="-0.28" />
                <feFuncB type="linear" slope="1.56" intercept="-0.28" />
              </feComponentTransfer>
            </filter>
            <rect height="100%" width="100%" filter="url(#noise-filter)" />
          </svg>
        </MotionDiv>
      ) : null}
    </AnimatePresence>
  );
}

function SmallFade() {
  return (
    <div
      className={cn(
        "absolute bottom-0 left-0 right-0 z-10 h-1/2",
        "pointer-events-none",
        "bg-gradient-to-b from-transparent via-background/50 to-background",
      )}
    />
  );
}

function AlbumImage({ albumImage }: { albumImage?: string }) {
  const showAlbumImage = useAtomValue(albumImageAtom);

  return (
    <AnimatePresence mode="wait">
      {albumImage && showAlbumImage ? (
        <MotionDiv
          key="album-image"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{
            duration: 0.2,
          }}
          className={cn(
            "absolute left-1/2 top-1/2 z-10 h-[178px] w-[178px]",
            "pointer-events-none",
            "shadow-xl",
            "-translate-x-1/2 -translate-y-1/2",
          )}
        >
          <Image src={albumImage} fill alt="album-image" />
        </MotionDiv>
      ) : null}
    </AnimatePresence>
  );
}

function ContextMenuContent() {
  const [showGlass, setShowGlass] = useAtom(glassAtom);
  const [showBlur, setShowBlur] = useAtom(blurAtom);
  const [showNoise, setShowNoise] = useAtom(noiseAtom);
  const [showAlbumImage, setShowAlbumImage] = useAtom(albumImageAtom);

  return (
    <ContextMenuContentPrimitive className="w-64">
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
      <ContextMenuCheckboxItem
        checked={showGlass}
        onCheckedChange={() => setShowGlass(!showGlass)}
      >
        Show glass
      </ContextMenuCheckboxItem>
    </ContextMenuContentPrimitive>
  );
}
