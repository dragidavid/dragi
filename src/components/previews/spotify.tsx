"use client";

import { memo, useMemo, useEffect } from "react";
import Image from "next/image";
import { motion, useMotionValue, useSpring } from "motion/react";
import useSWR from "swr";

import { svgs } from "@/components/svg";
import { Link } from "@/components/link";
import { Marquee } from "@/components/marquee";
import { Background } from "@/components/background";

import { cn } from "@/lib/cn";
import { fetcher } from "@/lib/fetcher";

import type { Album, Artist, Track, Player } from "@/lib/types";

const ANIMATION_CONFIG = {
  duration: 0.4,
  ease: [0.455, 0.03, 0.515, 0.955] as const,
} as const;

function getLabel(currentlyPlaying?: boolean, playerError?: unknown) {
  if (playerError) {
    return "error connecting to spotify…";
  }

  if (currentlyPlaying) {
    return "now playing";
  }

  return "last played";
}

export function Spotify() {
  const {
    data: player,
    isLoading: playerLoading,
    error: playerError,
  } = useSWR<Player>("/api/player", fetcher, {
    refreshInterval: 90000,
    revalidateOnFocus: false,
    errorRetryCount: 1,
    revalidateOnReconnect: false,
    dedupingInterval: 60000,
  });

  const { readyTrack, currentlyPlaying } = useMemo(() => {
    if (playerLoading) return { readyTrack: null, currentlyPlaying: false };

    const track = player?.nowPlaying || player?.recentlyPlayed?.[0];

    return {
      readyTrack: track || null,
      currentlyPlaying: track?.currentlyPlaying || false,
    };
  }, [player, playerLoading]);

  const label = useMemo(
    () => getLabel(currentlyPlaying, playerError),
    [currentlyPlaying, playerError],
  );

  const opacity = useMotionValue(0);
  const smoothOpacity = useSpring(opacity, { damping: 20, stiffness: 100 });

  useEffect(() => {
    opacity.set(readyTrack ? 1 : 0);
  }, [readyTrack, opacity]);

  return (
    <div
      className={cn(
        "relative flex size-full min-h-96 flex-col",
        "bg-inverse/5",
        "dark:bg-inverse/[8%]",
      )}
    >
      <div
        className={cn(
          "relative z-10 size-full overflow-hidden rounded-xl",
          "bg-background",
          "shadow-inverse/10 bg-background shadow-lg",
          "dark:shadow-extreme/50 dark:shadow-xl",
        )}
      >
        <Background colors={readyTrack?.colors ?? []} />

        <Blur />
        <Noise />
        <Vignette />

        {readyTrack && <TrackInfo track={readyTrack} />}

        {/* Adding the ring separately here so it is on top of everything else */}
        <div
          aria-hidden
          className={cn(
            "absolute inset-0 rounded-xl",
            "pointer-events-none",
            "inset-ring-inverse/10 inset-ring",
            "dark:inset-ring-inverse/10",
          )}
        />
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        style={{ opacity: smoothOpacity }}
        transition={ANIMATION_CONFIG}
        className={cn("relative px-4 pt-0.5 pb-1")}
      >
        {/* Bottom border to indicate playback status */}
        <Status playerError={playerError} currentlyPlaying={currentlyPlaying} />

        <span className="label-bottom">{label}</span>
      </motion.div>
    </div>
  );
}

const Status = memo(
  ({
    playerError,
    currentlyPlaying,
  }: {
    playerError?: unknown;
    currentlyPlaying?: boolean;
  }) => {
    return (
      <div
        aria-hidden
        className={cn(
          "absolute inset-0 rounded-b-xl",
          "pointer-events-none",
          !!playerError && "border-b border-rose-400 dark:border-rose-500",
          currentlyPlaying && "border-b border-emerald-300/80",
        )}
      />
    );
  },
);
Status.displayName = "Status";

const TrackInfo = memo(({ track }: { track: Track }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={ANIMATION_CONFIG}
      className={cn("absolute inset-6 flex flex-col justify-between")}
    >
      <AlbumImage image={track.album.image} alt={track.album.name} />

      <svgs.logos.spotify.Component className="size-8" />

      <div className={cn("relative flex flex-col")}>
        <Title name={track.name} url={track.trackUrl} />
        <Artists artists={track.artists} />
      </div>
    </motion.div>
  );
});
TrackInfo.displayName = "TrackInfo";

const Title = memo(
  ({ name, url }: { name: Track["name"]; url: Track["trackUrl"] }) => {
    return (
      <Marquee className={cn("text-lg font-bold")}>
        <Link href={url} className="decoration-transparent">
          {name}
        </Link>
      </Marquee>
    );
  },
);
Title.displayName = "Title";

const Artists = memo(({ artists }: { artists: Artist[] }) => {
  const elements = useMemo(() => {
    return artists.map(({ id, artistUrl, name }, index) => {
      const isLast = index === artists.length - 1;

      return (
        <span key={id}>
          <Link href={artistUrl} className="decoration-transparent">
            {name}
          </Link>

          {!isLast && <span className="text-inverse/40">, </span>}
        </span>
      );
    });
  }, [artists]);

  return (
    <Marquee className={cn("text-sm", "text-inverse/40")}>{elements}</Marquee>
  );
});
Artists.displayName = "Artists";

const AlbumImage = memo(
  ({ image, alt }: { image: Album["image"]; alt: Album["name"] }) => {
    return (
      <div
        className={cn(
          "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-4/6 overflow-hidden rounded-md",
          "pointer-events-none",
          "shadow-fancy",
        )}
      >
        <Image src={image} alt={alt} width={100} height={100} quality={90} />
      </div>
    );
  },
);
AlbumImage.displayName = "AlbumImage";

const Blur = memo(() => {
  return (
    <div
      aria-hidden
      className={cn(
        "absolute inset-x-0 top-0 bottom-0.5 rounded-xl",
        "pointer-events-none",
        "bg-background/10 backdrop-blur-2xl backdrop-brightness-150 backdrop-saturate-200",
      )}
    />
  );
});
Blur.displayName = "Blur";

const Noise = memo(() => {
  const noiseFilter = useMemo(
    () => (
      <svg className="size-full">
        <defs>
          <filter id="noise">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="1.4"
              numOctaves="4"
              seed="14"
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
        </defs>
        <rect height="100%" width="100%" filter="url(#noise)" />
      </svg>
    ),
    [],
  );

  return (
    <div
      aria-hidden
      className={cn(
        "absolute inset-0 rounded-xl",
        "pointer-events-none",
        "opacity-40",
      )}
    >
      {noiseFilter}
    </div>
  );
});
Noise.displayName = "Noise";

const Vignette = memo(() => {
  const elements = useMemo(() => {
    const heights = [30, 60] as const;

    return (
      <>
        <div
          aria-hidden
          className={cn(
            "absolute inset-0 rounded-xl",
            "pointer-events-none",
            "to-background/40 bg-radial from-transparent",
          )}
        />

        {heights.map((height) => (
          <div
            key={`stacked-fade-${height}`}
            aria-hidden
            className={cn(
              "absolute bottom-0 left-0 w-full",
              "pointer-events-none",
              "bg-linear-to-b from-transparent",
              height === 30 ? "to-background/40" : "to-background",
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
  }, []);

  return elements;
});
Vignette.displayName = "Vignette";
