import { useState, useEffect } from "react";
import { useRef } from "react";
import useSWR from "swr";
import dynamic from "next/dynamic";

import Marquee from "components/Spotify/Marquee";

import fetcher from "lib/fetcher";
import { getColors } from "lib/utils";

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
      {/* Canvas and blobs */}
      <Scene>
        <NewBlob colors={colors} />
      </Scene>

      {/* Backdrop blur */}
      <div className="absolute inset-0 backdrop-blur-xl" />

      {/* Noise layer */}
      <div className="absolute inset-0 bg-noise opacity-10" />

      {/* Spotify Logo and Track Information*/}
      <div className="absolute inset-0 flex flex-col justify-between p-5">
        <div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-[72px] w-[72px] fill-current md:h-12 md:w-12 lg:h-[72px] lg:w-[72px]"
            viewBox="0 0 72 72"
          >
            <path d="M36 0C16.117 0 0 16.117 0 36s16.117 36 36 36 36-16.117 36-36C72 16.12 55.883.002 36 0Zm16.51 51.92a2.242 2.242 0 0 1-3.085.747c-8.453-5.166-19.095-6.333-31.625-3.47a2.242 2.242 0 0 1-2.688-1.688A2.24 2.24 0 0 1 16.8 44.82c13.712-3.132 25.476-1.783 34.966 4.014a2.245 2.245 0 0 1 .744 3.086Zm4.405-9.798a2.809 2.809 0 0 1-3.862.923c-9.674-5.947-24.427-7.669-35.872-4.196a2.81 2.81 0 0 1-3.503-1.869 2.812 2.812 0 0 1 1.872-3.5c13.073-3.968 29.328-2.047 40.439 4.782a2.805 2.805 0 0 1 .926 3.86Zm.378-10.21c-11.605-6.89-30.746-7.524-41.824-4.163a3.365 3.365 0 0 1-4.199-2.243 3.37 3.37 0 0 1 2.246-4.2c12.717-3.86 33.855-3.116 47.214 4.814a3.368 3.368 0 0 1-3.437 5.792Z" />
          </svg>
        </div>

        <div className="flex flex-col gap-1 font-header">
          <Marquee
            text={nowPlaying?.title ?? recentlyPlayed?.title}
            trackUrl={nowPlaying?.trackUrl ?? recentlyPlayed?.trackUrl}
            className="text-4xl font-black hover:cursor-ne-resize hover:underline"
          />
          <Marquee
            text={nowPlaying?.artist ?? recentlyPlayed?.artist}
            className="text-md font-medium"
          />
        </div>
      </div>
    </div>
  );
}
