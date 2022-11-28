import { useState, useEffect } from "react";
import useSWR from "swr";
import dynamic from "next/dynamic";
import { useRef } from "react";
import { motion } from "framer-motion";

import fetcher from "lib/fetcher";
import { getColors, classNames } from "lib/utils";

import { useLayoutContext } from "contexts/LayoutContext";

import type { Track, Color } from "lib/types";

const Scene = dynamic(() => import("components/Scene"), { ssr: true });
const NewBlob = dynamic(() => import("components/Spotify/NewBlob"), {
  ssr: false,
});

export default function NewPlayer() {
  const boundsRef = useRef<HTMLDivElement>(null!);

  const [colors, setColors] = useState<Color[] | undefined>(undefined);
  const [shouldFetchRecentlyPlayedTrack, setShouldFetchRecentlyPlayedTrack] =
    useState<boolean>(false);

  const { data: nowPlaying } = useSWR<Track>(
    "/api/spotify/now-playing",
    fetcher,
    {
      revalidateOnFocus: false,
    }
  );
  const { data: recentlyPlayed } = useSWR<Partial<Track>>(
    shouldFetchRecentlyPlayedTrack ? "/api/spotify/recently-played" : null,
    fetcher,
    {
      revalidateOnFocus: false,
    }
  );

  useEffect(() => {
    if (nowPlaying && nowPlaying.isPlaying && nowPlaying.albumImageUrl) {
      getColors(nowPlaying.albumImageUrl).then((res) => {
        setColors(res);
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [nowPlaying]);

  useEffect(() => {
    if (
      nowPlaying &&
      !nowPlaying.isPlaying &&
      Object.keys(nowPlaying).length === 1
    ) {
      setShouldFetchRecentlyPlayedTrack(true);
    }
  }, [nowPlaying]);

  return (
    <div
      ref={boundsRef}
      className="relative h-full max-w-xs overflow-hidden rounded-xl"
    >
      <Scene>
        <NewBlob colors={colors} />
      </Scene>
      <div className="absolute bottom-0 m-3 font-header">
        <h1 className="text-4xl font-black">Song Name</h1>
        <h2 className="text-lg font-medium">Artist or multiple artists</h2>
      </div>
    </div>
  );
}
