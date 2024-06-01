"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import useSWR from "swr";

import Artists from "components/spotify/artists";

import Icon from "components/icon";
import Marquee from "components/custom-marquee";
import BlurImage from "components/blur-image";
import StyledLink from "components/styled-link";

import { MotionDiv } from "components/primitives/motion";

import { cn } from "lib/cn";
import { colors } from "lib/colors";
import { fetcher } from "lib/fetcher";

import { type Color, type Player } from "lib/types";

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
    if (track && track.currentlyPlaying && track.album.image) {
      colors(track.album.image).then((res) => {
        setLocalColors(res);
      });
    }

    if (track && !track.currentlyPlaying) {
      setLocalColors(undefined);
    }
  }, [track]);

  if ((playerError || !track) && !playerLoading) {
    return (
      <Container>
        <MotionDiv
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            duration: 0.2,
          }}
          className={cn(
            "absolute inset-6 z-10 flex flex-col justify-end text-sm",
            "text-secondary/20",
            preview && "inset-4",
          )}
        >
          <span>something went wrong...</span>
        </MotionDiv>
      </Container>
    );
  }

  return (
    <Container>
      {localColors && (
        <MotionDiv
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

      {!playerLoading && track && (
        <MotionDiv
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            duration: 0.2,
          }}
          className={cn(
            "absolute inset-6 z-10 flex flex-col justify-between",
            preview && "inset-4",
          )}
        >
          <AlbumImage
            albumImage={track.album.image}
            blurHash={track.album.imageBlurHash}
          />

          <Icon
            name="spotify-logo"
            size="80"
            className={cn("-translate-x-1.5 -translate-y-1.5")}
          />

          <div className={cn("relative flex flex-col gap-1")}>
            <div
              className={cn(
                "mb-3 flex items-center gap-2 font-mono text-xs",
                "select-none",
                "highlight",
              )}
            >
              {track.currentlyPlaying ? (
                <span>now playing</span>
              ) : (
                <span>last played</span>
              )}
            </div>

            <Marquee className={cn("text-2xl font-bold")}>
              <StyledLink href={track.trackUrl}>{track.name}</StyledLink>
            </Marquee>

            <Marquee className={cn("text-sm font-medium", "text-secondary")}>
              <Artists artists={track.artists} />
            </Marquee>
          </div>
        </MotionDiv>
      )}
    </Container>
  );
}

function AlbumImage({
  albumImage,
  blurHash,
}: {
  albumImage: string;
  blurHash: string;
}) {
  return (
    <div
      className={cn(
        "absolute left-1/2 top-1/2 z-10 overflow-hidden rounded-md",
        "pointer-events-none",
        "shadow-lg",
        "-translate-x-1/2 -translate-y-3/4",
      )}
    >
      <BlurImage
        src={albumImage}
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
        "bg-background/10 backdrop-blur-xl",
      )}
    />
  );
}

function Noise() {
  return (
    <div className={cn("absolute inset-0 z-10", "pointer-events-none")}>
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
    </div>
  );
}

function RadialFade() {
  return (
    <>
      <div
        className={cn(
          "absolute bottom-0 left-0 z-10 h-48 w-full",
          "bg-gradient-to-b from-transparent to-background",
          "md:hidden",
        )}
      />
      <div
        className={cn(
          "absolute inset-0 z-10",
          "pointer-events-none",
          "bg-gradient-radial from-transparent via-background/50 to-background",
        )}
      />
    </>
  );
}

function Container({ children }: { children: React.ReactNode }) {
  return (
    <div
      className={cn(
        "relative h-full min-h-[calc(var(--container-size)*2/3)] w-full overflow-hidden",
        "select-none",
      )}
    >
      <Blur />

      <Noise />

      <RadialFade />

      {children}
    </div>
  );
}
