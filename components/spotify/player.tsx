"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import useSWR from "swr";

import Artists from "components/spotify/artists";

import Marquee from "components/custom-marquee";
import BlurImage from "components/blur-image";
import StyledLink from "components/styled-link";

import { logos } from "components/primitives/logo";
import { MotionDiv } from "components/primitives/motion";

import { cn } from "lib/cn";
import { colors } from "lib/colors";
import { fetcher } from "lib/fetcher";

import type { Album, Artist, Track, Color, Player } from "lib/types";

const Scene = dynamic(() => import("components/three/scene"), { ssr: false });
const SimpleBlobs = dynamic(() => import("components/three/simple-blobs"), {
  ssr: false,
});

export default function Player({ preview = false }: { preview?: boolean }) {
  const [localColors, setLocalColors] = useState<Color[] | undefined>(
    undefined,
  );

  const {
    data: player,
    isLoading: playerLoading,
    error: playerError,
  } = useSWR<Player>("/api/player", fetcher, {
    refreshInterval: 90000,
    revalidateOnFocus: false,
    errorRetryCount: 1,
  });

  const track = player?.nowPlaying || player?.recentlyPlayed?.[0];

  useEffect(() => {
    const updateColors = async () => {
      if (track?.currentlyPlaying && track.album.image) {
        const newColors = await colors(track.album.image);

        setLocalColors(newColors);
      } else {
        setLocalColors(undefined);
      }
    };

    updateColors();
  }, [track]);

  if ((playerError || !track) && !playerLoading) {
    return (
      <Container>
        <ErrorMessage preview={preview} />
      </Container>
    );
  }

  return (
    <Container>
      {localColors && <BlobScene colors={localColors} />}

      {!playerLoading && track && <TrackInfo track={track} preview={preview} />}
    </Container>
  );
}

function ErrorMessage({ preview }: { preview: boolean }) {
  return (
    <MotionDiv
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className={cn(
        "absolute inset-6 z-10 flex flex-col justify-end font-mono text-xs",
        "select-text",
        "text-primary/20",
        preview && "inset-4",
      )}
    >
      <span>something went wrong...</span>
    </MotionDiv>
  );
}

function BlobScene({ colors }: { colors: Color[] }) {
  return (
    <MotionDiv
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4, delay: 0.8 }}
      className={cn("absolute inset-0", "pointer-events-none")}
    >
      <Scene>
        <SimpleBlobs colors={colors} />
      </Scene>
    </MotionDiv>
  );
}

function TrackInfo({ track, preview }: { track: Track; preview: boolean }) {
  const { spotify } = logos;

  return (
    <MotionDiv
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.2 }}
      className={cn(
        "absolute inset-6 z-10 flex flex-col justify-between",
        preview && "inset-4",
      )}
    >
      <AlbumImage
        image={track.album.image}
        blurHash={track.album.imageBlurHash}
      />

      <spotify.Component className={cn("size-14")} />

      <div className={cn("relative flex flex-col gap-1")}>
        <PlayingStatus currentlyPlaying={track.currentlyPlaying} />
        <TrackName name={track.name} url={track.trackUrl} />
        <ArtistNames artists={track.artists} />
      </div>
    </MotionDiv>
  );
}

function PlayingStatus({
  currentlyPlaying,
}: {
  currentlyPlaying: Track["currentlyPlaying"];
}) {
  return (
    <div
      className={cn(
        "mb-3 flex items-center gap-2 text-xs",
        "select-none",
        "highlight",
      )}
    >
      <span>{currentlyPlaying ? "now playing" : "last played"}</span>
    </div>
  );
}

function TrackName({
  name,
  url,
}: {
  name: Track["name"];
  url: Track["trackUrl"];
}) {
  return (
    <Marquee className={cn("text-xl font-bold")}>
      <StyledLink href={url}>{name}</StyledLink>
    </Marquee>
  );
}

function ArtistNames({ artists }: { artists: Artist[] }) {
  return (
    <Marquee className={cn("text-xs font-medium", "text-secondary")}>
      <Artists artists={artists} />
    </Marquee>
  );
}

function AlbumImage({
  image,
  blurHash,
}: {
  image: Album["image"];
  blurHash: Album["imageBlurHash"];
}) {
  return (
    <div
      className={cn(
        "absolute left-1/2 top-1/2 z-10 overflow-hidden rounded-md",
        "pointer-events-none",
        "enhanced-shadow",
        "-translate-x-1/2 -translate-y-3/4",
      )}
    >
      <BlurImage
        src={image}
        alt="album-image"
        width={160}
        height={160}
        blurDataURL={blurHash}
        placeholder="blur"
      />
    </div>
  );
}

function Blur() {
  return (
    <div
      className={cn(
        "absolute inset-0 z-10",
        "pointer-events-none",
        "bg-background/10 saturate-150 backdrop-blur-xl",
      )}
    />
  );
}

function Noise() {
  return (
    <div
      className={cn(
        "absolute inset-0 z-10",
        "pointer-events-none",
        "opacity-40",
      )}
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
          />
          <feColorMatrix type="saturate" values="0" />
          <feComponentTransfer>
            <feFuncR type="linear" slope="0.5" />
            <feFuncG type="linear" slope="0.5" />
            <feFuncB type="linear" slope="0.5" />
            <feFuncA type="linear" slope="0.52" />
          </feComponentTransfer>
          <feComponentTransfer>
            <feFuncR type="linear" slope="1.56" intercept="-0.28" />
            <feFuncG type="linear" slope="1.56" intercept="-0.28" />
            <feFuncB type="linear" slope="1.56" intercept="-0.28" />
          </feComponentTransfer>
        </filter>
        <rect height="100%" width="100%" filter="url(#noise)" />
      </svg>
    </div>
  );
}

function Vignette() {
  return (
    <>
      <div
        className={cn(
          "absolute inset-0 z-10",
          "pointer-events-none",
          "bg-gradient-radial from-transparent to-background",
        )}
      />
      {[30, 60].map((height) => (
        <div
          key={`stacked-fade-${height}`}
          className={cn(
            "absolute bottom-0 left-0 z-10 w-full",
            "pointer-events-none",
            "bg-gradient-to-b from-transparent backdrop-blur-sm",
            height === 30 ? "to-background/70" : "to-background",
            "md:hidden",
          )}
          style={{
            height: `${height}%`,
            WebkitMaskImage:
              "linear-gradient(to bottom, transparent, black 100%)",
          }}
        />
      ))}
    </>
  );
}

function Container({ children }: { children: React.ReactNode }) {
  return (
    <div
      className={cn(
        "relative size-full min-h-[calc(var(--container-size)*2/3)] overflow-hidden",
        "select-none",
      )}
    >
      <Blur />
      <Noise />
      <Vignette />

      {children}
    </div>
  );
}
