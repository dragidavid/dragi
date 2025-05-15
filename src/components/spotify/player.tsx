"use client";

import { useState, useEffect, useMemo, memo } from "react";
import dynamic from "next/dynamic";
import useSWR from "swr";
import Image from "next/image";

import Artists from "@/components/spotify/artists";
import Marquee from "@/components/marquee";
import StyledLink from "@/components/styled-link";

import { logos } from "@/components/primitives/logo";
import { MotionDiv } from "@/components/primitives/motion";

import { cn } from "@/lib/cn";
import { colors } from "@/lib/colors";
import { fetcher } from "@/lib/fetcher";

import type { Album, Artist, Track, Color, Player } from "@/lib/types";

const Scene = dynamic(() => import("@/components/three/scene"), { ssr: false });
const SimpleBlobs = dynamic(() => import("@/components/three/simple-blobs"), {
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
  }, [track?.currentlyPlaying, track?.album.image]);

  const memoizedBlobScene = useMemo(
    () => localColors && <BlobScene colors={localColors} />,
    [localColors],
  );

  const memoizedContainer = useMemo(
    () => (
      <Container>
        {memoizedBlobScene}

        {!playerLoading && track && (
          <TrackInfo track={track} preview={preview} />
        )}
        {(playerError || !track) && !playerLoading && (
          <ErrorMessage preview={preview} />
        )}
      </Container>
    ),
    [memoizedBlobScene, playerLoading, track, preview, playerError],
  );

  return memoizedContainer;
}

const ErrorMessage = memo(({ preview }: { preview: boolean }) => {
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
});
ErrorMessage.displayName = "ErrorMessage";

const BlobScene = memo(({ colors }: { colors: Color[] }) => {
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
});
BlobScene.displayName = "BlobScene";

const TrackInfo = memo(
  ({ track, preview }: { track: Track; preview: boolean }) => {
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

        <spotify.Component className={cn("size-10")} />

        <div className={cn("relative flex flex-col gap-1")}>
          <PlayingStatus currentlyPlaying={track.currentlyPlaying} />
          <TrackName name={track.name} url={track.trackUrl} />
          <ArtistNames artists={track.artists} />
        </div>
      </MotionDiv>
    );
  },
);
TrackInfo.displayName = "TrackInfo";

const PlayingStatus = memo(
  ({ currentlyPlaying }: { currentlyPlaying: Track["currentlyPlaying"] }) => {
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
  },
);
PlayingStatus.displayName = "PlayingStatus";

const TrackName = memo(
  ({ name, url }: { name: Track["name"]; url: Track["trackUrl"] }) => {
    return (
      <Marquee className={cn("text-xl font-bold")}>
        <StyledLink href={url} className="decoration-transparent">
          {name}
        </StyledLink>
      </Marquee>
    );
  },
);
TrackName.displayName = "TrackName";

const ArtistNames = memo(({ artists }: { artists: Artist[] }) => {
  return (
    <Marquee className={cn("text-xs font-medium", "text-secondary")}>
      <Artists artists={artists} />
    </Marquee>
  );
});
ArtistNames.displayName = "ArtistNames";

const AlbumImage = memo(
  ({
    image,
    blurHash,
  }: {
    image: Album["image"];
    blurHash: Album["imageBlurHash"];
  }) => {
    return (
      <div
        className={cn(
          "absolute top-1/2 left-1/2 z-10 overflow-hidden rounded-md",
          "pointer-events-none",
          "shadow-fancy",
          "-translate-x-1/2 -translate-y-3/4",
        )}
      >
        <Image
          src={image}
          alt="album-image"
          width={160}
          height={160}
          blurDataURL={blurHash}
          placeholder="blur"
        />
      </div>
    );
  },
);
AlbumImage.displayName = "AlbumImage";

const Blur = memo(() => {
  return (
    <div
      className={cn(
        "absolute inset-0 z-10",
        "pointer-events-none",
        "bg-background/10 saturate-150 backdrop-blur-xl",
      )}
    />
  );
});
Blur.displayName = "Blur";
const Noise = memo(() => {
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
});
Noise.displayName = "Noise";

const Vignette = memo(() => {
  return (
    <>
      <div
        className={cn(
          "absolute inset-0 z-10",
          "pointer-events-none",
          "bg-radial-at-center from-transparent to-red-500",
        )}
      />
      {[30, 60].map((height) => (
        <div
          key={`stacked-fade-${height}`}
          className={cn(
            "absolute bottom-0 left-0 z-10 w-full",
            "pointer-events-none",
            "bg-linear-to-b from-transparent backdrop-blur-sm",
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
});
Vignette.displayName = "Vignette";

const Container = memo(({ children }: { children: React.ReactNode }) => {
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
});
Container.displayName = "Container";
