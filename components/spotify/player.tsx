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
  albumImageAtom,
  blurAtom,
  noiseAtom,
  playerTrackAtom,
} from "lib/atoms";

import { type Track, type Color } from "lib/types";

const Scene = dynamic(() => import("components/three/scene"), {
  ssr: false,
});
const SimpleBlobs = dynamic(() => import("components/three/simple-blobs"), {
  ssr: false,
});

// Re-do the layers
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
            "select-none",
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

          <NoiseLayer hasError={Boolean(trackError)} />

          <RadialFade />

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
                    "mb-3 flex items-center gap-2 text-xs font-semibold",
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

                <Marquee className={cn("text-2xl font-bold")}>
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

function AlbumImage({ albumImage }: { albumImage?: string }) {
  const showAlbumImage = useAtomValue(albumImageAtom);

  return (
    <AnimatePresence mode="wait">
      {showAlbumImage && (
        <MotionDiv
          key="album-image"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{
            duration: 0.2,
          }}
          className={cn(
            "absolute left-1/2 top-1/2 z-10 flex size-40 items-center justify-center rounded-md",
            "pointer-events-none overflow-hidden",
            "bg-primary/5 shadow-lg",
            "-translate-x-1/2 -translate-y-3/4",
          )}
        >
          {albumImage && <Image src={albumImage} fill alt="album-image" />}
        </MotionDiv>
      )}
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
            "bg-background/10 backdrop-blur-xl",
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
          <svg height="100%" width="100%">
            <filter id="noise">
              <feTurbulence
                type="fractalNoise"
                baseFrequency="0.8"
                numOctaves="4"
                seed="15"
                stitchTiles="stitch"
                result="turbulence"
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
            <rect height="100%" width="100%" filter="url(#noise)" />
          </svg>
        </MotionDiv>
      ) : null}
    </AnimatePresence>
  );
}

function RadialFade() {
  return (
    <div
      className={cn(
        "absolute inset-0 z-10 ",
        "pointer-events-none",
        "bg-gradient-radial from-transparent via-background/50 to-background",
      )}
    />
  );
}

function ContextMenuContent() {
  const [showAlbumImage, setShowAlbumImage] = useAtom(albumImageAtom);
  const [showBlur, setShowBlur] = useAtom(blurAtom);
  const [showNoise, setShowNoise] = useAtom(noiseAtom);

  return (
    <ContextMenuContentPrimitive className="w-64">
      <ContextMenuLabel>Appearance</ContextMenuLabel>
      <ContextMenuSeparator />
      <ContextMenuCheckboxItem
        checked={showAlbumImage}
        onCheckedChange={() => setShowAlbumImage(!showAlbumImage)}
      >
        Album image
      </ContextMenuCheckboxItem>
      <ContextMenuCheckboxItem
        checked={showBlur}
        onCheckedChange={() => setShowBlur(!showBlur)}
      >
        Blur
      </ContextMenuCheckboxItem>
      <ContextMenuCheckboxItem
        checked={showNoise}
        onCheckedChange={() => setShowNoise(!showNoise)}
      >
        Noise
      </ContextMenuCheckboxItem>
    </ContextMenuContentPrimitive>
  );
}
